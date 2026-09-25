import { company, commercialTerms } from "./config.js";
import { products } from "./products.js";
import { validateName, validatePhone, formatPhoneInput, validateQuantity, validateDeliveryAddress, validateTermsAccepted } from "./validation.js";
import { evaluateReceivingEligibility } from "./delivery.js";
import { buildWhatsAppUrl, formatQuotationMessage, formatCorporateMessage } from "./whatsapp.js";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

/**
 * Formata valores em centavos para moeda BRL (SPEC §31).
 * @param {number} cents
 * @returns {string}
 */
export function formatCurrency(cents) {
  return currencyFormatter.format((cents ?? 0) / 100);
}

/**
 * Calcula o subtotal em centavos de um item: preço unitário × quantidade (SPEC §12 RN03).
 * @param {number} unitPriceCents
 * @param {number} quantity
 * @returns {number}
 */
export function calculateItemSubtotalCents(unitPriceCents, quantity) {
  const qty = Math.max(0, Math.floor(Number(quantity) || 0));
  return Math.round(Number(unitPriceCents || 0) * qty);
}

/**
 * Calcula o total estimado do orçamento em centavos somando todos os itens (SPEC §12 RN03).
 * Não inclui taxas automáticas.
 * @param {Array<{ productId: string, quantity: number }>} items
 * @param {Array<any>} productsList
 * @returns {number}
 */
export function calculateTotalCents(items, productsList = products) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    const product = productsList.find((p) => p.id === item.productId);
    if (!product || product.unitPriceCents === null || !product.quoteEnabled) return total;
    return total + calculateItemSubtotalCents(product.unitPriceCents, item.quantity);
  }, 0);
}

/**
 * Cria a instância inicial do estado único em memória (SPEC §30).
 */
export function createQuotationState() {
  return {
    customerType: null, // "PF" | "PJ" | null
    step: 1, // 1: Dados | 2: Produtos | 3: Recebimento | 4: Revisão | 5: WhatsApp
    customer: {
      name: "",
      phone: ""
    },
    items: [],
    receivingMethod: null,
    deliveryAddress: {
      street: "",
      number: "",
      neighborhood: "",
      complement: ""
    },
    destinationCommunity: "",
    notes: "",
    acceptedTerms: false
  };
}

/**
 * Reinicia o estado em memória para valores padrão (SPEC §13.3 e §26).
 * @param {object} stateObj
 */
export function resetQuotationState(stateObj = state) {
  stateObj.customerType = null;
  stateObj.step = 1;
  stateObj.customer = { name: "", phone: "" };
  stateObj.items = [];
  stateObj.receivingMethod = null;
  stateObj.deliveryAddress = { street: "", number: "", neighborhood: "", complement: "" };
  stateObj.destinationCommunity = "";
  stateObj.notes = "";
  stateObj.acceptedTerms = false;
}

/**
 * Adiciona um item ao carrinho no estado.
 * Bloqueia produtos de 3ª qualidade e produtos com quoteEnabled === false (RN02, SPEC §15, §35.15).
 * @param {object} stateObj
 * @param {string} productId
 * @param {number} quantity
 * @param {Array<any>} productsList
 * @returns {{ success: boolean, error: string | null }}
 */
export function addItemToState(stateObj, productId, quantity, productsList = products) {
  const qtyValidation = validateQuantity(quantity);
  if (!qtyValidation.isValid) {
    return { success: false, error: qtyValidation.error };
  }

  const product = productsList.find((p) => p.id === productId);
  if (!product) {
    return { success: false, error: "Produto não encontrado." };
  }

  if (product.quality === 3 || !product.quoteEnabled || product.unitPriceCents === null) {
    return {
      success: false,
      error: "Tijolos de 3ª qualidade e produtos sob consulta não entram no orçamento automático."
    };
  }

  const existingItem = stateObj.items.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += qtyValidation.value;
  } else {
    stateObj.items.push({
      productId,
      quantity: qtyValidation.value
    });
  }

  return { success: true, error: null };
}

/**
 * Atualiza a quantidade de um item no carrinho.
 * Se a nova quantidade for <= 0, remove o item (SPEC §35.19).
 * @param {object} stateObj
 * @param {string} productId
 * @param {number} newQuantity
 */
export function updateItemQuantityInState(stateObj, productId, newQuantity) {
  const qty = Number(newQuantity);
  if (!Number.isInteger(qty) || qty <= 0) {
    removeItemFromState(stateObj, productId);
    return;
  }
  const item = stateObj.items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = qty;
  }
}

/**
 * Remove um item do carrinho (SPEC §35.20).
 * @param {object} stateObj
 * @param {string} productId
 */
export function removeItemFromState(stateObj, productId) {
  stateObj.items = stateObj.items.filter((item) => item.productId !== productId);
}

// Instância ativa do estado da sessão
const state = createQuotationState();

/**
 * Utilitário para criação de elementos DOM seguros.
 */
function el(tagName, className, textContent) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (textContent !== undefined && textContent !== null) node.textContent = textContent;
  return node;
}

/**
 * Renderiza o painel de atendimento para Pessoa Jurídica (SPEC §13.2).
 */
function renderPjPanel(container) {
  container.replaceChildren();

  const card = el("div", "pj-card");
  
  const title = el("h3", "pj-card__title", "Atendimento Comercial para Pessoa Jurídica");
  const description = el(
    "p",
    "pj-card__description",
    "Para construtoras, empresas e pedidos corporativos, nosso setor comercial oferece atendimento dedicado para negociação de volumes, condições comerciais e prazos."
  );

  const message = formatCorporateMessage();
  const whatsappUrl = buildWhatsAppUrl(company.whatsappE164, message);

  const actions = el("div", "pj-card__actions");
  if (whatsappUrl) {
    const button = el("a", "btn btn--primary btn--whatsapp", "Falar com o setor comercial");
    button.href = whatsappUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    actions.append(button);
  } else {
    const pendingText = el("p", "pj-card__pending", `Contato direto com a equipe: ${company.whatsappDisplay}`);
    actions.append(pendingText);
  }

  card.append(title, description, actions);
  container.append(card);
}

/**
 * Renderiza o indicador de etapas para Pessoa Física (SPEC §13.3).
 */
function renderStepsIndicator(container, currentStep) {
  container.replaceChildren();

  const steps = [
    { number: 1, label: "Dados" },
    { number: 2, label: "Produtos" },
    { number: 3, label: "Recebimento" },
    { number: 4, label: "Revisão" },
    { number: 5, label: "WhatsApp" }
  ];

  const list = el("ol", "quotation-steps");
  list.setAttribute("aria-label", "Etapas do orçamento");

  steps.forEach((step) => {
    const item = el("li", "quotation-steps__item");
    if (step.number === currentStep) {
      item.classList.add("quotation-steps__item--active");
      item.setAttribute("aria-current", "step");
    } else if (step.number < currentStep) {
      item.classList.add("quotation-steps__item--completed");
    }

    const badge = el("span", "quotation-steps__number", String(step.number));
    const text = el("span", "quotation-steps__label", step.label);

    item.append(badge, text);
    list.append(item);
  });

  container.append(list);
}

/**
 * Renderiza a Etapa 1 do formulário da Pessoa Física (SPEC §14).
 */
function renderPfStep1(container, onAdvance) {
  container.replaceChildren();

  const stepWrapper = el("div", "quotation-step quotation-step--active");

  const header = el("div", "quotation-step__header");
  const title = el("h3", "quotation-step__title", "Etapa 1: Seus dados para contato");
  const intro = el(
    "p",
    "quotation-step__intro",
    "Informe seu nome e telefone para identificação na mensagem enviada ao WhatsApp da empresa."
  );
  header.append(title, intro);

  const form = el("form", "quotation-form");
  form.noValidate = true;

  // Campo Nome
  const groupName = el("div", "form-group");
  const labelName = el("label", "form-label", "Seu nome completo");
  labelName.htmlFor = "customer-name";

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.id = "customer-name";
  inputName.name = "customer-name";
  inputName.className = "form-input";
  inputName.placeholder = "Ex.: Maria de Souza";
  inputName.autocomplete = "name";
  inputName.required = true;
  inputName.value = state.customer.name;

  const errorName = el("span", "field-error");
  errorName.id = "error-name";
  errorName.setAttribute("role", "alert");
  errorName.setAttribute("aria-live", "polite");
  inputName.setAttribute("aria-describedby", "error-name");

  groupName.append(labelName, inputName, errorName);

  // Campo Telefone
  const groupPhone = el("div", "form-group");
  const labelPhone = el("label", "form-label", "Telefone com DDD");
  labelPhone.htmlFor = "customer-phone";

  const inputPhone = document.createElement("input");
  inputPhone.type = "tel";
  inputPhone.id = "customer-phone";
  inputPhone.name = "customer-phone";
  inputPhone.className = "form-input";
  inputPhone.placeholder = "Ex.: (93) 9165-4576";
  inputPhone.inputMode = "tel";
  inputPhone.autocomplete = "tel";
  inputPhone.required = true;
  inputPhone.value = state.customer.phone;

  // Limpeza de erros visuais ao digitar
  inputName.addEventListener("input", () => {
    // [Requisito 3.3] Alterar a aparência de algum elemento via JavaScript com .style
    inputName.style.borderColor = "";
    inputName.style.backgroundColor = "";
    errorName.textContent = "";
  });

  // Formatação amigável enquanto digita
  // [Requisito 3.4] Evento input com addEventListener
  inputPhone.addEventListener("input", (e) => {
    // [Requisito 3.3] Ler o que o usuário digitou usando .value
    inputPhone.value = formatPhoneInput(e.target.value);
    // [Requisito 3.3] Alterar a aparência de algum elemento via JavaScript com .style
    inputPhone.style.borderColor = "";
    inputPhone.style.backgroundColor = "";
    errorPhone.textContent = "";
  });

  const errorPhone = el("span", "field-error");
  errorPhone.id = "error-phone";
  errorPhone.setAttribute("role", "alert");
  errorPhone.setAttribute("aria-live", "polite");
  inputPhone.setAttribute("aria-describedby", "error-phone");

  groupPhone.append(labelPhone, inputPhone, errorPhone);

  // Botões de ação
  const actions = el("div", "quotation-form__actions");
  const nextBtn = el("button", "btn btn--primary", "Avançar para produtos");
  nextBtn.type = "submit";
  actions.append(nextBtn);

  form.append(groupName, groupPhone, actions);

  // [Requisito 3.4] Evento submit com addEventListener
  form.addEventListener("submit", (event) => {
    // [Requisito 3.4] Impedir recarregamento da página com event.preventDefault()
    event.preventDefault();

    let hasErrors = false;
    let firstInvalidField = null;

    // [Requisito 3.3] Ler o que o usuário digitou usando .value
    const nameResult = validateName(inputName.value);
    if (!nameResult.isValid) {
      // [Requisito 3.3] Alterar o conteúdo de um elemento com textContent
      errorName.textContent = nameResult.error;
      inputName.classList.add("form-input--error");
      // [Requisito 3.3] Alterar a aparência de algum elemento via JavaScript com .style
      inputName.style.borderColor = "var(--color-terracotta)";
      inputName.style.backgroundColor = "#FDF2F0";
      inputName.setAttribute("aria-invalid", "true");
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = inputName;
    } else {
      errorName.textContent = "";
      inputName.classList.remove("form-input--error");
      inputName.style.borderColor = "";
      inputName.style.backgroundColor = "";
      inputName.removeAttribute("aria-invalid");
      state.customer.name = nameResult.value;
    }

    // Validar Telefone
    const phoneResult = validatePhone(inputPhone.value);
    if (!phoneResult.isValid) {
      errorPhone.textContent = phoneResult.error;
      inputPhone.classList.add("form-input--error");
      // [Requisito 3.3] Alterar a aparência de algum elemento via JavaScript com .style
      inputPhone.style.borderColor = "var(--color-terracotta)";
      inputPhone.style.backgroundColor = "#FDF2F0";
      inputPhone.setAttribute("aria-invalid", "true");
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = inputPhone;
    } else {
      errorPhone.textContent = "";
      inputPhone.classList.remove("form-input--error");
      inputPhone.style.borderColor = "";
      inputPhone.style.backgroundColor = "";
      inputPhone.removeAttribute("aria-invalid");
      state.customer.phone = inputPhone.value;
    }

    if (hasErrors) {
      firstInvalidField?.focus();
    } else {
      onAdvance();
    }
  });

  stepWrapper.append(header, form);
  container.append(stepWrapper);
}

/**
 * Renderiza a Etapa 2: Seleção de Produtos e Carrinho (SPEC §15).
 */
function renderPfStep2(container, onBack, onAdvance) {
  container.replaceChildren();

  const stepWrapper = el("div", "quotation-step quotation-step--active");

  const header = el("div", "quotation-step__header");
  const title = el("h3", "quotation-step__title", "Etapa 2: Produtos do Orçamento");
  const intro = el(
    "p",
    "quotation-step__intro",
    "Escolha os produtos e informe a quantidade em unidades. O valor total estimado será calculado automaticamente."
  );
  header.append(title, intro);

  // Seletor para adicionar produtos
  const addSection = el("div", "quotation-add-product");
  const addTitle = el("h4", "quotation-add-product__title", "Adicionar item");

  const addForm = el("form", "quotation-add-form");
  addForm.noValidate = true;

  // Select de produtos elegíveis (quoteEnabled === true)
  const groupSelect = el("div", "form-group");
  const labelSelect = el("label", "form-label", "Selecione o produto");
  labelSelect.htmlFor = "select-product";

  const select = document.createElement("select");
  select.id = "select-product";
  select.className = "form-input form-select";

  // Apenas produtos elegíveis para orçamento automático (exclui 3ª qualidade)
  const eligibleProducts = products.filter((p) => p.quoteEnabled && p.unitPriceCents !== null);
  eligibleProducts.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    const qualityLabel = p.quality ? ` (${p.quality}ª qualidade)` : "";
    opt.textContent = `${p.name}${qualityLabel} — ${formatCurrency(p.unitPriceCents)} un.`;
    select.append(opt);
  });
  groupSelect.append(labelSelect, select);

  // Campo Quantidade em unidades
  const groupQty = el("div", "form-group");
  const labelQty = el("label", "form-label", "Quantidade (em unidades)");
  labelQty.htmlFor = "input-qty";

  const inputQty = document.createElement("input");
  inputQty.type = "number";
  inputQty.id = "input-qty";
  inputQty.name = "quantity";
  inputQty.className = "form-input";
  inputQty.min = "1";
  inputQty.step = "1";
  inputQty.inputMode = "numeric";
  inputQty.value = "500"; // Sugestão inicial amigável

  const errorQty = el("span", "field-error");
  errorQty.id = "error-qty";
  errorQty.setAttribute("role", "alert");
  errorQty.setAttribute("aria-live", "polite");
  inputQty.setAttribute("aria-describedby", "error-qty");

  groupQty.append(labelQty, inputQty, errorQty);

  const addBtn = el("button", "btn btn--secondary", "Adicionar ao orçamento");
  addBtn.type = "submit";

  addForm.append(groupSelect, groupQty, addBtn);
  addSection.append(addTitle, addForm);

  // Contêiner da lista de itens no carrinho
  const cartSection = el("div", "quotation-cart");
  const cartTitle = el("h4", "quotation-cart__title", "Itens adicionados");

  const cartList = el("div", "quotation-cart__list");
  const emptyMessage = el("p", "quotation-cart__empty", "Nenhum produto adicionado ainda. Adicione itens acima.");

  // Bloco de Total
  const totalBox = el("div", "quotation-total-box");
  const totalLabel = el("span", "quotation-total-box__label", "Total estimado:");
  const totalValue = el("strong", "quotation-total-box__value");
  totalValue.id = "quotation-total-value";
  totalValue.setAttribute("aria-live", "polite");
  const totalNote = el(
    "p",
    "quotation-total-box__note",
    commercialTerms.quoteConfirmationNote
  );
  totalBox.append(totalLabel, totalValue, totalNote);

  // Erro geral do carrinho (se tentar avançar vazio)
  const cartError = el("p", "field-error field-error--global");
  cartError.setAttribute("role", "alert");
  cartError.setAttribute("aria-live", "polite");
  cartError.tabIndex = -1;

  // Atualizador da visualização do carrinho
  const updateCartView = () => {
    cartList.replaceChildren();

    if (state.items.length === 0) {
      cartList.append(emptyMessage);
      totalValue.textContent = formatCurrency(0);
      // [Requisito 3.3] Alterar a aparência de elemento via JavaScript com .style
      totalValue.style.color = "var(--color-text)";
      return;
    }

    state.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) return;

      const itemRow = el("div", "cart-item");
      itemRow.dataset.productId = item.productId;

      const itemInfo = el("div", "cart-item__info");
      const itemName = el("strong", "cart-item__name", prod.name);
      const itemDetails = el(
        "span",
        "cart-item__details",
        `${prod.quality ? `${prod.quality}ª qualidade • ` : ""}Unitário: ${formatCurrency(prod.unitPriceCents)}`
      );
      itemInfo.append(itemName, itemDetails);

      // Quantidade editável
      const itemQtyGroup = el("div", "cart-item__quantity");
      const qtyLabel = el("label", "cart-item__qty-label", "Qtd:");
      qtyLabel.htmlFor = `cart-qty-${item.productId}`;

      const qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.id = `cart-qty-${item.productId}`;
      qtyInput.className = "form-input form-input--compact";
      qtyInput.min = "1";
      qtyInput.step = "1";
      qtyInput.inputMode = "numeric";
      qtyInput.value = String(item.quantity);
      qtyInput.setAttribute("aria-label", `Quantidade de ${prod.name}`);

      qtyInput.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        if (Number.isInteger(val) && val > 0) {
          updateItemQuantityInState(state, item.productId, val);
          const newSubtotal = calculateItemSubtotalCents(prod.unitPriceCents, val);
          subtotalVal.textContent = formatCurrency(newSubtotal);
          totalValue.textContent = formatCurrency(calculateTotalCents(state.items, products));
          // [Requisito 3.3] Alterar a aparência de elemento via JavaScript com .style
          totalValue.style.color = "var(--color-brand-green)";
          cartError.textContent = "";
        }
      });

      qtyInput.addEventListener("blur", (e) => {
        const val = Number(e.target.value);
        if (!Number.isInteger(val) || val <= 0) {
          // Se deixou em branco ou zero no blur, restaura a quantidade válida do estado
          qtyInput.value = String(item.quantity);
        }
      });

      itemQtyGroup.append(qtyLabel, qtyInput);

      // Subtotal do item
      const itemSubtotal = el("div", "cart-item__subtotal");
      const subtotalLabel = el("span", "cart-item__subtotal-label", "Subtotal:");
      const subtotalVal = el(
        "strong",
        "cart-item__subtotal-value",
        formatCurrency(calculateItemSubtotalCents(prod.unitPriceCents, item.quantity))
      );
      itemSubtotal.append(subtotalLabel, subtotalVal);

      // Botão Remover
      const removeBtn = el("button", "btn btn--danger cart-item__remove", "Remover");
      removeBtn.type = "button";
      removeBtn.setAttribute("aria-label", `Remover ${prod.name} do orçamento`);
      removeBtn.addEventListener("click", () => {
        removeItemFromState(state, item.productId);
        updateCartView();
      });

      itemRow.append(itemInfo, itemQtyGroup, itemSubtotal, removeBtn);
      cartList.append(itemRow);
    });

    const totalCents = calculateTotalCents(state.items, products);
    totalValue.textContent = formatCurrency(totalCents);
  };

  // Evento de adicionar produto
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorQty.textContent = "";
    cartError.textContent = "";

    const selectedId = select.value;
    const qtyValue = inputQty.value;

    const result = addItemToState(state, selectedId, qtyValue, products);
    if (!result.success) {
      errorQty.textContent = result.error;
      inputQty.focus();
    } else {
      updateCartView();
    }
  });

  cartSection.append(cartTitle, cartList, totalBox, cartError);

  // Ações de navegação da etapa
  const navActions = el("div", "quotation-form__actions");

  const backBtn = el("button", "btn btn--secondary", "Voltar para dados");
  backBtn.type = "button";
  backBtn.addEventListener("click", onBack);

  const nextBtn = el("button", "btn btn--primary", "Avançar para recebimento");
  nextBtn.type = "button";
  nextBtn.addEventListener("click", () => {
    if (state.items.length === 0) {
      cartError.textContent = "Adicione pelo menos um produto ao orçamento para continuar.";
      cartError.focus();
    } else {
      cartError.textContent = "";
      onAdvance();
    }
  });

  navActions.append(backBtn, nextBtn);

  stepWrapper.append(header, addSection, cartSection, navActions);
  container.append(stepWrapper);

  // Renderiza itens iniciais se já existirem no estado
  updateCartView();
}

/**
 * Renderiza a Etapa 3: Opções de Recebimento e Regras de Entrega (SPEC §16 e RN04–RN13).
 */
function renderPfStep3(container, onBack, onAdvance) {
  container.replaceChildren();

  const stepWrapper = el("div", "quotation-step quotation-step--active");

  const header = el("div", "quotation-step__header");
  const title = el("h3", "quotation-step__title", "Etapa 3: Forma de Recebimento");
  const intro = el(
    "p",
    "quotation-step__intro",
    "Escolha entre entrega na cidade, entrega no porto ou retirada direta na empresa."
  );
  header.append(title, intro);

  // Avaliação dinâmica de elegibilidade (SPEC §16)
  const eligibility = evaluateReceivingEligibility(state.items, products);

  // Se a entrega deixou de ser permitida devido a alteração prévia de itens, desmarca entrega
  if (!eligibility.isDeliveryAllowed && (state.receivingMethod === "cidade" || state.receivingMethod === "porto")) {
    state.receivingMethod = null;
  }

  // Aviso de elegibilidade de entrega
  const eligibilityBox = el("div", "eligibility-box");
  if (eligibility.isDeliveryAllowed) {
    eligibilityBox.classList.add("eligibility-box--success");
    eligibilityBox.textContent = `Entrega habilitada! Seu pedido possui ${eligibility.eligibleQuantity} tijolos inteiros elegíveis (mínimo de 500 unidades atendido).`;
  } else {
    eligibilityBox.classList.add("eligibility-box--warning");
    eligibilityBox.textContent = `${eligibility.deliveryExplanation} (Seu pedido possui ${eligibility.eligibleQuantity} tijolos inteiros elegíveis).`;
  }

  // Seletor de Modalidades (SPEC §16)
  const methodsFieldset = el("fieldset", "receiving-methods");
  const methodsLegend = el("legend", "receiving-methods__legend", "Selecione a modalidade de recebimento:");

  const methodsList = el("div", "receiving-methods__options");

  // Opção: Entrega na cidade
  const optCidade = el("label", "receiving-method-option");
  const inputCidade = document.createElement("input");
  inputCidade.type = "radio";
  inputCidade.name = "receiving-method";
  inputCidade.value = "cidade";
  inputCidade.className = "receiving-method-option__input";
  inputCidade.checked = state.receivingMethod === "cidade";
  if (!eligibility.methods.cidade.available) {
    inputCidade.disabled = true;
    optCidade.classList.add("receiving-method-option--disabled");
  }

  const cidadeTextWrap = el("div", "receiving-method-option__text-wrap");
  const cidadeLabel = el("strong", "receiving-method-option__title", "Entrega na cidade");
  const cidadeBadge = el("span", "receiving-method-option__badge", "Mínimo de 500 tijolos 6F/8F");
  cidadeTextWrap.append(cidadeLabel, cidadeBadge);
  optCidade.append(inputCidade, cidadeTextWrap);

  // Opção: Entrega no porto
  const optPorto = el("label", "receiving-method-option");
  const inputPorto = document.createElement("input");
  inputPorto.type = "radio";
  inputPorto.name = "receiving-method";
  inputPorto.value = "porto";
  inputPorto.className = "receiving-method-option__input";
  inputPorto.checked = state.receivingMethod === "porto";
  if (!eligibility.methods.porto.available) {
    inputPorto.disabled = true;
    optPorto.classList.add("receiving-method-option--disabled");
  }

  const portoTextWrap = el("div", "receiving-method-option__text-wrap");
  const portoLabel = el("strong", "receiving-method-option__title", "Entrega no porto");
  const portoBadge = el("span", "receiving-method-option__badge", "Mínimo de 500 tijolos 6F/8F");
  portoTextWrap.append(portoLabel, portoBadge);
  optPorto.append(inputPorto, portoTextWrap);

  // Opção: Retirada na empresa
  const optRetirada = el("label", "receiving-method-option");
  const inputRetirada = document.createElement("input");
  inputRetirada.type = "radio";
  inputRetirada.name = "receiving-method";
  inputRetirada.value = "retirada";
  inputRetirada.className = "receiving-method-option__input";
  inputRetirada.checked = state.receivingMethod === "retirada";

  const retiradaTextWrap = el("div", "receiving-method-option__text-wrap");
  const retiradaLabel = el("strong", "receiving-method-option__title", "Retirada na empresa");
  const retiradaBadge = el("span", "receiving-method-option__badge receiving-method-option__badge--free", "Disponível para qualquer quantidade");
  retiradaTextWrap.append(retiradaLabel, retiradaBadge);
  optRetirada.append(inputRetirada, retiradaTextWrap);

  methodsList.append(optCidade, optPorto, optRetirada);
  methodsFieldset.append(methodsLegend, methodsList);

  // Contêiner para os campos condicionais
  const conditionalContainer = el("div", "receiving-conditional-fields");

  // Renderizador dos campos condicionais com base na modalidade
  const updateConditionalView = (method) => {
    conditionalContainer.replaceChildren();

    optCidade.classList.toggle("receiving-method-option--selected", method === "cidade");
    optPorto.classList.toggle("receiving-method-option--selected", method === "porto");
    optRetirada.classList.toggle("receiving-method-option--selected", method === "retirada");

    if (method === "cidade") {
      // Aviso de Descarga (SPEC §12 RN13)
      const unloadNotice = el(
        "div",
        "unload-notice",
        "Aviso importante sobre a descarga: A equipe da Cerâmica Rio Trombetas realiza a descarga em frente ao imóvel (na calçada/rua). Não efetuamos transporte para o interior de terrenos, residências ou construções."
      );

      // Campos de Endereço Residencial (SPEC §16.1)
      const addressGrid = el("div", "address-grid");

      // Rua
      const groupStreet = el("div", "form-group");
      const labelStreet = el("label", "form-label", "Rua / Avenida");
      labelStreet.htmlFor = "delivery-street";
      const inputStreet = document.createElement("input");
      inputStreet.type = "text";
      inputStreet.id = "delivery-street";
      inputStreet.className = "form-input";
      inputStreet.placeholder = "Ex.: Rua Barão do Rio Branco";
      inputStreet.required = true;
      inputStreet.value = state.deliveryAddress.street || "";
      const errorStreet = el("span", "field-error");
      errorStreet.id = "error-street";
      errorStreet.setAttribute("role", "alert");
      errorStreet.setAttribute("aria-live", "polite");
      groupStreet.append(labelStreet, inputStreet, errorStreet);

      // Número
      const groupNumber = el("div", "form-group");
      const labelNumber = el("label", "form-label", "Número");
      labelNumber.htmlFor = "delivery-number";
      const inputNumber = document.createElement("input");
      inputNumber.type = "text";
      inputNumber.id = "delivery-number";
      inputNumber.className = "form-input";
      inputNumber.placeholder = "Ex.: 120 ou S/N";
      inputNumber.required = true;
      inputNumber.value = state.deliveryAddress.number || "";
      const errorNumber = el("span", "field-error");
      errorNumber.id = "error-number";
      errorNumber.setAttribute("role", "alert");
      errorNumber.setAttribute("aria-live", "polite");
      groupNumber.append(labelNumber, inputNumber, errorNumber);

      // Bairro
      const groupNeighborhood = el("div", "form-group");
      const labelNeighborhood = el("label", "form-label", "Bairro");
      labelNeighborhood.htmlFor = "delivery-neighborhood";
      const inputNeighborhood = document.createElement("input");
      inputNeighborhood.type = "text";
      inputNeighborhood.id = "delivery-neighborhood";
      inputNeighborhood.className = "form-input";
      inputNeighborhood.placeholder = "Ex.: Centro";
      inputNeighborhood.required = true;
      inputNeighborhood.value = state.deliveryAddress.neighborhood || "";
      const errorNeighborhood = el("span", "field-error");
      errorNeighborhood.id = "error-neighborhood";
      errorNeighborhood.setAttribute("role", "alert");
      errorNeighborhood.setAttribute("aria-live", "polite");
      groupNeighborhood.append(labelNeighborhood, inputNeighborhood, errorNeighborhood);

      // Complemento (opcional)
      const groupComplement = el("div", "form-group");
      const labelComplement = el("label", "form-label", "Complemento / Referência (opcional)");
      labelComplement.htmlFor = "delivery-complement";
      const inputComplement = document.createElement("input");
      inputComplement.type = "text";
      inputComplement.id = "delivery-complement";
      inputComplement.className = "form-input";
      inputComplement.placeholder = "Ex.: Próximo à praça central";
      inputComplement.value = state.deliveryAddress.complement || "";
      groupComplement.append(labelComplement, inputComplement);

      // Observações (opcional)
      const groupNotes = el("div", "form-group");
      const labelNotes = el("label", "form-label", "Observações sobre a entrega (opcional)");
      labelNotes.htmlFor = "delivery-notes";
      const inputNotes = document.createElement("textarea");
      inputNotes.id = "delivery-notes";
      inputNotes.className = "form-input form-textarea";
      inputNotes.rows = 3;
      inputNotes.placeholder = "Ex.: Melhores horários, condições de acesso, etc.";
      inputNotes.value = state.notes || "";
      groupNotes.append(labelNotes, inputNotes);

      addressGrid.append(groupStreet, groupNumber, groupNeighborhood, groupComplement, groupNotes);
      conditionalContainer.append(unloadNotice, addressGrid);

    } else if (method === "porto") {
      // Aviso de Descarga no Porto (SPEC §12 RN11 e RN13)
      const unloadNoticePorto = el(
        "div",
        "unload-notice",
        "Aviso importante: No porto, a descarga ocorre no ponto determinado pela empresa. O transporte posterior (barco, balsa ou veículo) até o destino final é de inteira responsabilidade do cliente."
      );

      // Comunidade de destino (opcional - SPEC §16.2)
      const groupCommunity = el("div", "form-group");
      const labelCommunity = el("label", "form-label", "Comunidade de destino (opcional)");
      labelCommunity.htmlFor = "dest-community";
      const hintCommunity = el(
        "span",
        "form-hint",
        "Indique para qual comunidade ou localidade ribeirinha a carga será transportada a partir do porto."
      );
      const inputCommunity = document.createElement("input");
      inputCommunity.type = "text";
      inputCommunity.id = "dest-community";
      inputCommunity.className = "form-input";
      inputCommunity.placeholder = "Ex.: Comunidade Boa Vista";
      inputCommunity.value = state.destinationCommunity || "";
      groupCommunity.append(labelCommunity, hintCommunity, inputCommunity);

      // Observações (opcional)
      const groupNotesPorto = el("div", "form-group");
      const labelNotesPorto = el("label", "form-label", "Observações (opcional)");
      labelNotesPorto.htmlFor = "porto-notes";
      const inputNotesPorto = document.createElement("textarea");
      inputNotesPorto.id = "porto-notes";
      inputNotesPorto.className = "form-input form-textarea";
      inputNotesPorto.rows = 3;
      inputNotesPorto.placeholder = "Ex.: Nome do barco, responsável no porto, etc.";
      inputNotesPorto.value = state.notes || "";
      groupNotesPorto.append(labelNotesPorto, inputNotesPorto);

      conditionalContainer.append(unloadNoticePorto, groupCommunity, groupNotesPorto);

    } else if (method === "retirada") {
      // Informação sobre Retirada (SPEC §16.3)
      const pickupNotice = el(
        "div",
        "unload-notice unload-notice--info",
        "Retirada na empresa: Os produtos podem ser retirados diretamente em nossa olaria sem quantidade mínima exigida. A data e horário de retirada serão alinhados pelo atendimento comercial no WhatsApp."
      );

      // Observações (opcional)
      const groupNotesPickup = el("div", "form-group");
      const labelNotesPickup = el("label", "form-label", "Observações (opcional)");
      labelNotesPickup.htmlFor = "pickup-notes";
      const inputNotesPickup = document.createElement("textarea");
      inputNotesPickup.id = "pickup-notes";
      inputNotesPickup.className = "form-input form-textarea";
      inputNotesPickup.rows = 3;
      inputNotesPickup.placeholder = "Ex.: Veículo que fará o transporte, responsável, etc.";
      inputNotesPickup.value = state.notes || "";
      groupNotesPickup.append(labelNotesPickup, inputNotesPickup);

      conditionalContainer.append(pickupNotice, groupNotesPickup);
    }
  };

  // Eventos de troca de modalidade
  inputCidade.addEventListener("change", () => {
    state.receivingMethod = "cidade";
    errorMethod.textContent = "";
    updateConditionalView("cidade");
  });

  inputPorto.addEventListener("change", () => {
    state.receivingMethod = "porto";
    errorMethod.textContent = "";
    updateConditionalView("porto");
  });

  inputRetirada.addEventListener("change", () => {
    state.receivingMethod = "retirada";
    errorMethod.textContent = "";
    updateConditionalView("retirada");
  });

  // Erro de seleção de modalidade
  const errorMethod = el("p", "field-error field-error--global");
  errorMethod.id = "error-receiving-method";
  errorMethod.setAttribute("role", "alert");
  errorMethod.setAttribute("aria-live", "polite");
  errorMethod.tabIndex = -1;

  // Ações de navegação da etapa
  const navActions = el("div", "quotation-form__actions");

  const backBtn = el("button", "btn btn--secondary", "Voltar para produtos");
  backBtn.type = "button";
  backBtn.addEventListener("click", () => {
    // Salva o que puder antes de voltar
    onBack();
  });

  const nextBtn = el("button", "btn btn--primary", "Avançar para revisão");
  nextBtn.type = "button";
  nextBtn.addEventListener("click", () => {
    if (!state.receivingMethod) {
      errorMethod.textContent = "Selecione uma opção de recebimento para continuar.";
      errorMethod.focus();
      return;
    }

    if (state.receivingMethod === "cidade") {
      const inputStreet = document.querySelector("#delivery-street");
      const inputNumber = document.querySelector("#delivery-number");
      const inputNeighborhood = document.querySelector("#delivery-neighborhood");
      const inputComplement = document.querySelector("#delivery-complement");
      const inputNotes = document.querySelector("#delivery-notes");

      const addressData = {
        street: inputStreet?.value || "",
        number: inputNumber?.value || "",
        neighborhood: inputNeighborhood?.value || "",
        complement: inputComplement?.value || ""
      };

      const valAddress = validateDeliveryAddress(addressData);

      const errStreet = document.querySelector("#error-street");
      const errNumber = document.querySelector("#error-number");
      const errNeighborhood = document.querySelector("#error-neighborhood");

      if (errStreet) errStreet.textContent = valAddress.errors.street || "";
      if (errNumber) errNumber.textContent = valAddress.errors.number || "";
      if (errNeighborhood) errNeighborhood.textContent = valAddress.errors.neighborhood || "";

      inputStreet?.classList.toggle("form-input--error", !!valAddress.errors.street);
      inputNumber?.classList.toggle("form-input--error", !!valAddress.errors.number);
      inputNeighborhood?.classList.toggle("form-input--error", !!valAddress.errors.neighborhood);

      // [Requisito 3.3] Alterar a aparência de elementos via JavaScript com .style
      if (inputStreet) {
        inputStreet.style.borderColor = valAddress.errors.street ? "var(--color-terracotta)" : "";
        inputStreet.style.backgroundColor = valAddress.errors.street ? "#FDF2F0" : "";
      }
      if (inputNumber) {
        inputNumber.style.borderColor = valAddress.errors.number ? "var(--color-terracotta)" : "";
        inputNumber.style.backgroundColor = valAddress.errors.number ? "#FDF2F0" : "";
      }
      if (inputNeighborhood) {
        inputNeighborhood.style.borderColor = valAddress.errors.neighborhood ? "var(--color-terracotta)" : "";
        inputNeighborhood.style.backgroundColor = valAddress.errors.neighborhood ? "#FDF2F0" : "";
      }

      if (!valAddress.isValid) {
        if (valAddress.errors.street) inputStreet?.focus();
        else if (valAddress.errors.number) inputNumber?.focus();
        else if (valAddress.errors.neighborhood) inputNeighborhood?.focus();
        return;
      }

      state.deliveryAddress = addressData;
      state.notes = inputNotes?.value.trim() || "";
      state.destinationCommunity = "";

    } else if (state.receivingMethod === "porto") {
      const inputComm = document.querySelector("#dest-community");
      const inputNotes = document.querySelector("#porto-notes");
      state.destinationCommunity = inputComm?.value.trim() || "";
      state.notes = inputNotes?.value.trim() || "";
      state.deliveryAddress = { street: "", number: "", neighborhood: "", complement: "" };

    } else if (state.receivingMethod === "retirada") {
      const inputNotes = document.querySelector("#pickup-notes");
      state.notes = inputNotes?.value.trim() || "";
      state.destinationCommunity = "";
      state.deliveryAddress = { street: "", number: "", neighborhood: "", complement: "" };
    }

    onAdvance();
  });

  navActions.append(backBtn, nextBtn);

  stepWrapper.append(header, eligibilityBox, methodsFieldset, conditionalContainer, errorMethod, navActions);
  container.append(stepWrapper);

  // Inicializa a visualização condicional se já houver método salvo
  if (state.receivingMethod) {
    updateConditionalView(state.receivingMethod);
  }
}

/**
 * Renderiza a Etapa 4: Revisão Completa e Termo de Consentimento (SPEC §17 e RN14–RN15/RN18).
 */
function renderPfStep4(container, onBack, onAdvance) {
  container.replaceChildren();

  const stepWrapper = el("div", "quotation-step quotation-step--active");

  const header = el("div", "quotation-step__header");
  const title = el("h3", "quotation-step__title", "Etapa 4: Revisão da Solicitação");
  const intro = el(
    "p",
    "quotation-step__intro",
    "Confira as informações da sua solicitação antes de enviar para o nosso atendimento pelo WhatsApp."
  );
  header.append(title, intro);

  const reviewGrid = el("div", "review-grid");

  // 1. Resumo do Cliente
  const cardCustomer = el("div", "review-card");
  const customerHeader = el("div", "review-card__header");
  customerHeader.append(el("h4", "review-card__title", "1. Identificação"));
  const btnEditCustomer = el("button", "review-card__edit-btn", "Alterar");
  btnEditCustomer.type = "button";
  btnEditCustomer.setAttribute("aria-label", "Alterar dados de identificação");
  btnEditCustomer.addEventListener("click", () => {
    state.acceptedTerms = false;
    state.step = 1;
    renderPfViewGlobal();
  });
  customerHeader.append(btnEditCustomer);

  const customerList = el("dl", "review-list");
  const dtName = el("dt", "review-list__term", "Nome:");
  const ddName = el("dd", "review-list__desc", state.customer.name);
  const dtPhone = el("dt", "review-list__term", "Telefone:");
  const ddPhone = el("dd", "review-list__desc", state.customer.phone);
  customerList.append(dtName, ddName, dtPhone, ddPhone);
  cardCustomer.append(customerHeader, customerList);

  // 2. Resumo dos Itens e Total
  const cardItems = el("div", "review-card");
  const itemsHeader = el("div", "review-card__header");
  itemsHeader.append(el("h4", "review-card__title", "2. Produtos"));
  const btnEditItems = el("button", "review-card__edit-btn", "Alterar");
  btnEditItems.type = "button";
  btnEditItems.setAttribute("aria-label", "Alterar itens do orçamento");
  btnEditItems.addEventListener("click", () => {
    state.acceptedTerms = false;
    state.step = 2;
    renderPfViewGlobal();
  });
  itemsHeader.append(btnEditItems);

  const itemsTable = el("div", "review-items-table");
  state.items.forEach((item) => {
    const prod = products.find((p) => p.id === item.productId);
    if (!prod) return;
    const subtotal = calculateItemSubtotalCents(prod.unitPriceCents, item.quantity);

    const row = el("div", "review-item-row");
    const nameCol = el("div", "review-item-row__info");
    const itemName = el("strong", "review-item-row__name", prod.name);
    const itemDetail = el(
      "span",
      "review-item-row__detail",
      `${item.quantity} un. × ${formatCurrency(prod.unitPriceCents)}`
    );
    nameCol.append(itemName, itemDetail);

    const subtotalCol = el("strong", "review-item-row__subtotal", formatCurrency(subtotal));
    row.append(nameCol, subtotalCol);
    itemsTable.append(row);
  });

  const totalCents = calculateTotalCents(state.items, products);
  const totalRow = el("div", "review-total-row");
  totalRow.append(
    el("span", "review-total-row__label", "Total estimado:"),
    el("strong", "review-total-row__value", formatCurrency(totalCents))
  );

  cardItems.append(itemsHeader, itemsTable, totalRow);

  // 3. Resumo do Recebimento
  const cardDelivery = el("div", "review-card");
  const deliveryHeader = el("div", "review-card__header");
  deliveryHeader.append(el("h4", "review-card__title", "3. Recebimento"));
  const btnEditDelivery = el("button", "review-card__edit-btn", "Alterar");
  btnEditDelivery.type = "button";
  btnEditDelivery.setAttribute("aria-label", "Alterar forma de recebimento");
  btnEditDelivery.addEventListener("click", () => {
    state.acceptedTerms = false;
    state.step = 3;
    renderPfViewGlobal();
  });
  deliveryHeader.append(btnEditDelivery);

  const deliveryList = el("dl", "review-list");
  const methodLabel =
    state.receivingMethod === "cidade"
      ? "Entrega na cidade"
      : state.receivingMethod === "porto"
        ? "Entrega no porto"
        : "Retirada na empresa";

  deliveryList.append(el("dt", "review-list__term", "Modalidade:"), el("dd", "review-list__desc", methodLabel));

  if (state.receivingMethod === "cidade") {
    if (state.deliveryAddress.street) {
      deliveryList.append(el("dt", "review-list__term", "Rua:"), el("dd", "review-list__desc", state.deliveryAddress.street));
    }
    if (state.deliveryAddress.number) {
      deliveryList.append(el("dt", "review-list__term", "Número:"), el("dd", "review-list__desc", state.deliveryAddress.number));
    }
    if (state.deliveryAddress.neighborhood) {
      deliveryList.append(el("dt", "review-list__term", "Bairro:"), el("dd", "review-list__desc", state.deliveryAddress.neighborhood));
    }
    if (state.deliveryAddress.complement) {
      deliveryList.append(el("dt", "review-list__term", "Complemento:"), el("dd", "review-list__desc", state.deliveryAddress.complement));
    }
  } else if (state.receivingMethod === "porto") {
    if (state.destinationCommunity) {
      deliveryList.append(
        el("dt", "review-list__term", "Comunidade de destino:"),
        el("dd", "review-list__desc", state.destinationCommunity)
      );
    }
  }

  if (state.notes) {
    deliveryList.append(el("dt", "review-list__term", "Observações:"), el("dd", "review-list__desc", state.notes));
  }

  cardDelivery.append(deliveryHeader, deliveryList);
  reviewGrid.append(cardCustomer, cardItems, cardDelivery);

  // 4. Avisos Comerciais Obrigatórios (SPEC §17)
  const noticesBox = el("div", "commercial-notices");
  const noticesTitle = el("h4", "commercial-notices__title", "Avisos importantes sobre seu orçamento");
  const noticesList = el("ul", "commercial-notices__list");

  const notices = [
    "Este orçamento é apenas uma estimativa.",
    "O envio pelo WhatsApp não confirma o pedido.",
    "A disponibilidade, prazo, pagamento e demais condições serão confirmados pela equipe.",
    "Nas entregas, a equipe realiza somente a descarga no ponto combinado."
  ];

  notices.forEach((noticeText) => {
    noticesList.append(el("li", "commercial-notices__item", noticeText));
  });

  noticesBox.append(noticesTitle, noticesList);

  // 5. Termo de Consentimento Obrigatório (SPEC §17 e §35.23)
  const termsGroup = el("div", "terms-consent-group");

  const termsLabel = el("label", "terms-consent-label");
  termsLabel.htmlFor = "checkbox-accepted-terms";

  const termsCheckbox = document.createElement("input");
  termsCheckbox.type = "checkbox";
  termsCheckbox.id = "checkbox-accepted-terms";
  termsCheckbox.className = "terms-consent-checkbox";
  termsCheckbox.checked = state.acceptedTerms === true;

  const termsText = el(
    "span",
    "terms-consent-text",
    "Li e entendi que esta solicitação não representa a confirmação do pedido."
  );

  termsLabel.append(termsCheckbox, termsText);

  const errorTerms = el("p", "field-error");
  errorTerms.id = "error-terms";
  errorTerms.setAttribute("role", "alert");
  errorTerms.setAttribute("aria-live", "polite");
  termsCheckbox.setAttribute("aria-describedby", "error-terms");

  termsGroup.append(termsLabel, errorTerms);

  // Ações de navegação da etapa
  const navActions = el("div", "quotation-form__actions");

  const backBtn = el("button", "btn btn--secondary", "Voltar para recebimento");
  backBtn.type = "button";
  backBtn.addEventListener("click", onBack);

  const advanceBtn = el("button", "btn btn--primary", "Avançar para envio");
  advanceBtn.type = "button";
  advanceBtn.addEventListener("click", () => {
    const valTerms = validateTermsAccepted(termsCheckbox.checked);
    if (!valTerms.isValid) {
      errorTerms.textContent = valTerms.error;
      termsCheckbox.classList.add("terms-consent-checkbox--error");
      termsCheckbox.focus();
      return;
    }

    errorTerms.textContent = "";
    termsCheckbox.classList.remove("terms-consent-checkbox--error");
    state.acceptedTerms = true;
    onAdvance();
  });

  navActions.append(backBtn, advanceBtn);

  stepWrapper.append(header, reviewGrid, noticesBox, termsGroup, navActions);
  container.append(stepWrapper);
}

/**
 * Renderiza a Etapa 5: Enviar Solicitação pelo WhatsApp (SPEC §18 e RN14–RN17).
 */
function renderPfStep5(container, onBack, onReset) {
  container.replaceChildren();

  // Revalidação estrita de segurança e integridade (SPEC §17 e §35.23)
  if (!state.acceptedTerms || !Array.isArray(state.items) || state.items.length === 0) {
    onBack();
    return;
  }

  const stepWrapper = el("div", "quotation-step quotation-step--active");

  const header = el("div", "quotation-step__header");
  const title = el("h3", "quotation-step__title", "Etapa 5: Enviar Solicitação pelo WhatsApp");
  const intro = el(
    "p",
    "quotation-step__intro",
    "Sua solicitação de orçamento foi gerada! Ao clicar no botão abaixo, o WhatsApp abrirá com o texto estruturado pronto para a equipe comercial."
  );
  header.append(title, intro);

  // Pré-visualização transparente da mensagem (SPEC §18.2)
  const messageText = formatQuotationMessage(state, products);
  const previewBox = el("div", "quotation-message-preview");
  const previewTitle = el("h4", "quotation-message-preview__title", "Prévia da mensagem que será enviada:");
  const previewPre = el("pre", "quotation-message-preview__text");
  previewPre.textContent = messageText; // Proteção contra XSS
  const previewHelp = el(
    "p",
    "quotation-message-preview__help",
    "Esta mensagem será enviada pelo seu aplicativo de WhatsApp. Você poderá conferir todo o texto antes de enviar para nossa equipe."
  );
  previewBox.append(previewTitle, previewPre, previewHelp);

  // Link/Botão do WhatsApp
  const actions = el("div", "quotation-form__actions");
  const whatsappUrl = buildWhatsAppUrl(company.whatsappE164, messageText);

  if (whatsappUrl) {
    const sendBtn = el("a", "btn btn--primary btn--whatsapp", "Enviar solicitação no WhatsApp");
    sendBtn.href = whatsappUrl;
    sendBtn.target = "_blank";
    sendBtn.rel = "noopener noreferrer";
    actions.append(sendBtn);
  } else {
    const pendingNotice = el(
      "p",
      "field-error",
      `O link direto para o WhatsApp está em atualização técnica com a empresa. Você pode copiar a mensagem acima e enviar diretamente para o telefone: ${company.whatsappDisplay}`
    );
    actions.append(pendingNotice);
  }

  const backBtn = el("button", "btn btn--secondary", "Voltar e revisar");
  backBtn.type = "button";
  backBtn.addEventListener("click", onBack);

  const resetBtn = el("button", "btn btn--secondary", "Iniciar nova solicitação");
  resetBtn.type = "button";
  resetBtn.addEventListener("click", () => {
    onReset();
  });

  actions.append(backBtn, resetBtn);

  stepWrapper.append(header, previewBox, actions);
  container.append(stepWrapper);
}

let renderPfViewGlobal = () => {};

/**
 * Inicializa o fluxo de orçamento na seção `#orcamento`.
 */
export function initQuotation() {
  const root = document.querySelector("#orcamento");
  if (!root) return;

  // Container dinâmico da aplicação de orçamento
  const appContainer = el("div", "quotation-app");

  // Pergunta inicial obrigatória (SPEC §13.1)
  const selectorFieldset = el("fieldset", "customer-type-selector");
  const selectorLegend = el("legend", "customer-type-selector__legend", "Como deseja atendimento?");

  const optionsContainer = el("div", "customer-type-selector__options");

  // Opção Pessoa Física
  const optPf = el("label", "customer-type-option");
  const inputPf = document.createElement("input");
  inputPf.type = "radio";
  inputPf.name = "customer-type";
  inputPf.value = "PF";
  inputPf.className = "customer-type-option__input";
  const labelPfText = el("span", "customer-type-option__text", "Pessoa Física");
  optPf.append(inputPf, labelPfText);

  // Opção Pessoa Jurídica
  const optPj = el("label", "customer-type-option");
  const inputPj = document.createElement("input");
  inputPj.type = "radio";
  inputPj.name = "customer-type";
  inputPj.value = "PJ";
  inputPj.className = "customer-type-option__input";
  const labelPjText = el("span", "customer-type-option__text", "Pessoa Jurídica");
  optPj.append(inputPj, labelPjText);

  optionsContainer.append(optPf, optPj);
  selectorFieldset.append(selectorLegend, optionsContainer);

  // Containers para os fluxos
  const pjContainer = el("div", "quotation-pj-container");
  pjContainer.hidden = true;

  const pfContainer = el("div", "quotation-pf-container");
  pfContainer.hidden = true;

  const stepsNav = el("div", "quotation-steps-nav");
  const stepContent = el("div", "quotation-step-content");
  pfContainer.append(stepsNav, stepContent);

  // Alternância de atendimento
  const updateCustomerType = (type) => {
    state.customerType = type;

    optPf.classList.toggle("customer-type-option--selected", type === "PF");
    optPj.classList.toggle("customer-type-option--selected", type === "PJ");

    if (type === "PJ") {
      pfContainer.hidden = true;
      pjContainer.hidden = false;
      renderPjPanel(pjContainer);
    } else if (type === "PF") {
      pjContainer.hidden = true;
      pfContainer.hidden = false;
      renderPfView();
    }
  };

  const renderPfView = () => {
    renderStepsIndicator(stepsNav, state.step);
    if (state.step === 1) {
      renderPfStep1(stepContent, () => {
        state.step = 2;
        renderPfView();
      });
    } else if (state.step === 2) {
      renderPfStep2(
        stepContent,
        () => {
          state.step = 1;
          renderPfView();
        },
        () => {
          state.step = 3;
          renderPfView();
        }
      );
    } else if (state.step === 3) {
      renderPfStep3(
        stepContent,
        () => {
          state.step = 2;
          renderPfView();
        },
        () => {
          state.step = 4;
          renderPfView();
        }
      );
    } else if (state.step === 4) {
      renderPfStep4(
        stepContent,
        () => {
          state.step = 3;
          renderPfView();
        },
        () => {
          state.step = 5;
          renderPfView();
        }
      );
    } else if (state.step === 5) {
      renderPfStep5(
        stepContent,
        () => {
          state.step = 4;
          renderPfView();
        },
        () => {
          resetQuotationState();
          state.step = 1;
          renderPfView();
        }
      );
    }
  };

  renderPfViewGlobal = renderPfView;

  inputPf.addEventListener("change", () => updateCustomerType("PF"));
  inputPj.addEventListener("change", () => updateCustomerType("PJ"));

  appContainer.append(selectorFieldset, pjContainer, pfContainer);
  root.append(appContainer);
}

/**
 * Permite leitura do estado atual (para testes).
 */
export function getQuotationState() {
  return state;
}
