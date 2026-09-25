/**
 * Cerâmica Rio Trombetas — Bundle Unificado para Navegador
 * Gerado automaticamente para compatibilidade com execução offline / duplo clique (file://).
 * Preserva 100% de funcionamento sem necessidade de servidor HTTP e sem bloqueio de CORS.
 */
(function () {
  "use strict";

  // ========================================================
  // MÓDULO: config.js
  // ========================================================

// Dados comerciais reutilizados. Campos sem confirmação permanecem nulos.
const company = {
  name: "Cerâmica Rio Trombetas",
  whatsappDisplay: "93 98765-4321",
  whatsappE164: "+5593987654321",
  address: "Rua Marechal Castelo Branco, 1035 — Novo Horizonte, Oriximiná - PA, CEP 68270-000",
  mapCoords: "-1.7473210781657804,-55.87682018179472",
  mapEmbedUrl: "https://maps.google.com/maps?q=-1.7473210781657804,-55.87682018179472&z=16&output=embed",
  openingHours: "Segunda a sexta: 08h às 12h e 14h às 18h\nSábado: 08h às 12h\nDomingo: Fechado",
  email: null,
  institutionalText: null
};

const deliveryMinimumWholeBricks = 500;

const commercialTerms = {
  thousandPriceNote: "O valor do milheiro contempla a entrega quando as condições de entrega forem atendidas.",
  quoteConfirmationNote: "O orçamento final continua sujeito à confirmação comercial.",
  thirdQualityAvailability: "Disponibilidade sob consulta",
  pricePendingLabel: "Preço sob consulta"
};


  // ========================================================
  // MÓDULO: products.js
  // ========================================================

// Fonte única dos produtos e preços da SPEC §10.1. Valores monetários em centavos.
const products = [
  {
    id: "tijolo-6f-1",
    name: "Tijolo 6 Furos",
    category: "tijolo",
    holes: 6,
    quality: 1,
    dimensions: "9 × 13 × 23 cm",
    unitPriceCents: 90,
    thousandPriceCents: 90000,
    image: "./assets/products/tijolo-6f-primeira.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "tijolo-6f-2",
    name: "Tijolo 6 Furos",
    category: "tijolo",
    holes: 6,
    quality: 2,
    dimensions: "9 × 13 × 23 cm",
    unitPriceCents: 85,
    thousandPriceCents: 85000,
    image: "./assets/products/tijolo-6f-segunda.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "tijolo-6f-3",
    name: "Tijolo 6 Furos",
    category: "tijolo",
    holes: 6,
    quality: 3,
    dimensions: "9 × 13 × 23 cm",
    unitPriceCents: 80,
    thousandPriceCents: 80000,
    image: null,
    quoteEnabled: false,
    directContact: true,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "cabeca-6f",
    name: "Cabeça 6 Furos",
    category: "complementar",
    holes: 6,
    quality: null,
    dimensions: "metade do tijolo 6F, corte no eixo vertical",
    unitPriceCents: 50,
    thousandPriceCents: null,
    image: "./assets/products/cabeca-6f.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  },
  {
    id: "tijolo-8f-1",
    name: "Tijolo 8 Furos",
    category: "tijolo",
    holes: 8,
    quality: 1,
    dimensions: "9 × 19 × 19 cm",
    unitPriceCents: 100,
    thousandPriceCents: 100000,
    image: "./assets/products/tijolo-8f-primeira.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "tijolo-8f-2",
    name: "Tijolo 8 Furos",
    category: "tijolo",
    holes: 8,
    quality: 2,
    dimensions: "9 × 19 × 19 cm",
    unitPriceCents: 95,
    thousandPriceCents: 95000,
    image: "./assets/products/tijolo-8f-segunda.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "tijolo-8f-3",
    name: "Tijolo 8 Furos",
    category: "tijolo",
    holes: 8,
    quality: 3,
    dimensions: "9 × 19 × 19 cm",
    unitPriceCents: 90,
    thousandPriceCents: 90000,
    image: null,
    quoteEnabled: false,
    directContact: true,
    countsTowardDeliveryMinimum: true
  },
  {
    id: "cabeca-8f",
    name: "Cabeça 8 Furos",
    category: "complementar",
    holes: 8,
    quality: null,
    dimensions: "metade do tijolo 8F, corte no eixo vertical",
    unitPriceCents: 60,
    thousandPriceCents: null,
    image: "./assets/products/cabeca-8f.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  },
  {
    id: "tijolo-macico",
    name: "Tijolo Maciço",
    category: "complementar",
    holes: null,
    quality: null,
    dimensions: null,
    unitPriceCents: 200,
    thousandPriceCents: null,
    // Imagem oficial do tijolo maciço.
    image: "./assets/products/macico.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  },
  {
    id: "capote",
    name: "Capote",
    category: "complementar",
    holes: null,
    quality: null,
    dimensions: null,
    unitPriceCents: 1000,
    thousandPriceCents: null,
    image: "./assets/products/capote.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  },
  {
    id: "cobogo",
    name: "Cobogó",
    category: "complementar",
    holes: null,
    quality: null,
    dimensions: null,
    unitPriceCents: 800,
    thousandPriceCents: null,
    // combogo-desenho.png mostra um conjunto de peças; cobogo.png mostra uma peça.
    image: "./assets/products/cobogo.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  },
  {
    id: "tijolo-laje",
    name: "Tijolo para Laje",
    category: "complementar",
    holes: null,
    quality: null,
    dimensions: null,
    unitPriceCents: 200,
    thousandPriceCents: null,
    image: "./assets/products/tijolo-laje.png",
    quoteEnabled: true,
    directContact: false,
    countsTowardDeliveryMinimum: false
  }
];


  // ========================================================
  // MÓDULO: validation.js
  // ========================================================

// Funções puras de validação de dados de cliente para o fluxo de orçamento.
// Regras obrigatórias: SPEC §14, §26 e §32. Nunca solicita CPF.

/**
 * Valida o nome do cliente.
 * Regra: pelo menos 2 caracteres significativos (não aceita apenas espaços).
 * @param {string} name
 * @returns {{ isValid: boolean, error: string | null, value: string }}
 */
function validateName(name) {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Informe seu nome (mínimo de 2 caracteres).",
      value: trimmed
    };
  }
  return {
    isValid: true,
    error: null,
    value: trimmed
  };
}

/**
 * Normaliza o telefone para conter apenas dígitos.
 * @param {string} phone
 * @returns {string}
 */
function extractPhoneDigits(phone) {
  return typeof phone === "string" ? phone.replace(/\D/g, "") : "";
}

/**
 * Valida o telefone do cliente com base nos dígitos.
 * Aceita telefones brasileiros válidos com DDD (10 ou 11 dígitos).
 * Rejeita dígitos repetidos inválidos (ex.: 0000000000).
 * @param {string} phone
 * @returns {{ isValid: boolean, error: string | null, digits: string }}
 */
function validatePhone(phone) {
  const digits = extractPhoneDigits(phone);

  if (digits.length < 10 || digits.length > 11) {
    return {
      isValid: false,
      error: "Informe um telefone válido com DDD (10 ou 11 dígitos).",
      digits
    };
  }

  // DDDs brasileiros válidos começam com dígitos de 1 a 9
  const dddFirstDigit = Number(digits[0]);
  if (dddFirstDigit < 1 || dddFirstDigit > 9) {
    return {
      isValid: false,
      error: "Informe um DDD válido (ex.: 93).",
      digits
    };
  }

  // Celular de 11 dígitos no Brasil começa com 9 no terceiro dígito
  if (digits.length === 11 && digits[2] !== "9") {
    return {
      isValid: false,
      error: "Celular com 11 dígitos deve iniciar com o dígito 9 após o DDD.",
      digits
    };
  }

  // Rejeita sequências onde todos os dígitos são iguais
  if (/^(\d)\1+$/.test(digits)) {
    return {
      isValid: false,
      error: "Informe um telefone válido.",
      digits
    };
  }

  return {
    isValid: true,
    error: null,
    digits
  };
}

/**
 * Aplica máscara amigável ao telefone enquanto o usuário digita.
 * Formatos: (XX) XXXX-XXXX (10 dígitos) ou (XX) XXXXX-XXXX (11 dígitos).
 * @param {string} value
 * @returns {string}
 */
function formatPhoneInput(value) {
  const digits = extractPhoneDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Valida a quantidade de produtos para o carrinho (SPEC §15).
 * Regras: número inteiro, maior que zero, sem decimais.
 * @param {any} quantity
 * @returns {{ isValid: boolean, error: string | null, value: number }}
 */
function validateQuantity(quantity) {
  const num = Number(quantity);

  if (!Number.isInteger(num) || num <= 0) {
    return {
      isValid: false,
      error: "Informe uma quantidade válida em unidades (número inteiro maior que zero).",
      value: 0
    };
  }

  return {
    isValid: true,
    error: null,
    value: num
  };
}

/**
 * Valida o endereço para entrega na cidade (SPEC §16.1).
 * Campos obrigatórios: Rua, Número e Bairro.
 * @param {{ street: string, number: string, neighborhood: string }} address
 * @returns {{ isValid: boolean, errors: { street?: string, number?: string, neighborhood?: string } }}
 */
function validateDeliveryAddress(address = {}) {
  const errors = {};
  const street = typeof address.street === "string" ? address.street.trim() : "";
  const number = typeof address.number === "string" ? address.number.trim() : "";
  const neighborhood = typeof address.neighborhood === "string" ? address.neighborhood.trim() : "";

  if (street.length < 2) {
    errors.street = "Informe o nome da rua ou avenida.";
  }

  if (number.length < 1) {
    errors.number = "Informe o número do imóvel.";
  }

  if (neighborhood.length < 2) {
    errors.neighborhood = "Informe o bairro.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Valida o aceite obrigatório do aviso comercial (SPEC §17 e §32).
 * @param {boolean} acceptedTerms
 * @returns {{ isValid: boolean, error: string | null }}
 */
function validateTermsAccepted(acceptedTerms) {
  if (acceptedTerms !== true) {
    return {
      isValid: false,
      error: "Confirme que leu as condições antes de continuar."
    };
  }
  return {
    isValid: true,
    error: null
  };
}





  // ========================================================
  // MÓDULO: delivery.js
  // ========================================================

// Módulo de Elegibilidade de Entrega e Modalidades de Recebimento
// Regras obrigatórias: SPEC §12 (RN04–RN13), §16 e §35 (cenários 1–14).


/**
 * Totaliza a quantidade de tijolos inteiros elegíveis para entrega (6F e 8F).
 * Cabeças, maciços, capotes, cobogós e lajes retornam false para countsTowardDeliveryMinimum.
 * @param {Array<{ productId: string, quantity: number }>} items
 * @param {Array<any>} productsList
 * @returns {number}
 */
function getDeliveryEligibleQuantity(items, productsList = products) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    const prod = productsList.find((p) => p.id === item.productId);
    if (prod && prod.countsTowardDeliveryMinimum === true) {
      return total + Math.max(0, Math.floor(Number(item.quantity) || 0));
    }
    return total;
  }, 0);
}

/**
 * Avalia se o pedido atinge a quantidade mínima para habilitar entrega (500 tijolos inteiros).
 * @param {Array<{ productId: string, quantity: number }>} items
 * @param {Array<any>} productsList
 * @returns {boolean}
 */
function isDeliveryEligible(items, productsList = products) {
  return getDeliveryEligibleQuantity(items, productsList) >= deliveryMinimumWholeBricks;
}

/**
 * Retorna as regras e disponibilidade para cada modalidade de recebimento com base nos itens.
 * @param {Array<{ productId: string, quantity: number }>} items
 * @param {Array<any>} productsList
 * @returns {{
 *   eligibleQuantity: number,
 *   minimumRequired: number,
 *   isDeliveryAllowed: boolean,
 *   methods: {
 *     cidade: { available: boolean, label: string },
 *     porto: { available: boolean, label: string },
 *     retirada: { available: boolean, label: string }
 *   },
 *   deliveryExplanation: string
 * }}
 */
function evaluateReceivingEligibility(items, productsList = products) {
  const eligibleQuantity = getDeliveryEligibleQuantity(items, productsList);
  const isDeliveryAllowed = eligibleQuantity >= deliveryMinimumWholeBricks;
  const hasItems = Array.isArray(items) && items.length > 0;

  return {
    eligibleQuantity,
    minimumRequired: deliveryMinimumWholeBricks,
    isDeliveryAllowed,
    methods: {
      cidade: {
        available: isDeliveryAllowed,
        label: "Entrega na cidade"
      },
      porto: {
        available: isDeliveryAllowed,
        label: "Entrega no porto"
      },
      retirada: {
        available: hasItems,
        label: "Retirada na empresa"
      }
    },
    deliveryExplanation:
      "Para entrega, o pedido precisa conter pelo menos 500 tijolos inteiros de 6 e/ou 8 furos. Os demais produtos não contam para esse mínimo."
  };
}


  // ========================================================
  // MÓDULO: whatsapp.js
  // ========================================================

// Módulo de Integração com WhatsApp (SPEC §§10.3, 13.2, 18, 21, 26 e §35.24)



/**
 * Valida se um número de telefone está estritamente no padrão internacional E.164.
 * Formato: + seguido de 1 a 15 dígitos (ex.: +559391654576).
 * @param {string} phoneE164
 * @returns {boolean}
 */
function isValidE164(phoneE164) {
  return typeof phoneE164 === "string" && /^\+[1-9]\d{1,14}$/.test(phoneE164);
}

/**
 * Constrói a URL segura do WhatsApp (wa.me) codificada com encodeURIComponent.
 * Retorna null se o número E.164 não for confirmado/válido (não fabrica URL presumida).
 * @param {string} phoneE164
 * @param {string} messageText
 * @returns {string | null}
 */
function buildWhatsAppUrl(phoneE164 = company.whatsappE164, messageText = "") {
  if (!isValidE164(phoneE164)) {
    return null;
  }
  const digitsOnly = phoneE164.slice(1);
  if (!messageText) {
    return `https://wa.me/${digitsOnly}`;
  }
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Gera a mensagem textual da Pessoa Física formatada conforme o padrão normativo da SPEC §18.2.
 * Garante omissão completa de campos vazios ou opcionais não informados (SPEC §35.24).
 * @param {object} state
 * @param {Array<any>} productsList
 * @returns {string}
 */
function formatQuotationMessage(state, productsList = products) {
  const lines = [];

  // Cabeçalho da mensagem
  lines.push("Olá! Gostaria de solicitar um orçamento na Cerâmica Rio Trombetas.");
  lines.push("");

  // Dados do Cliente
  lines.push("DADOS DO CLIENTE");
  lines.push(`Nome: ${state.customer?.name || ""}`);
  lines.push(`Telefone: ${state.customer?.phone || ""}`);
  lines.push("");

  // Produtos
  lines.push("PRODUTOS");
  const items = Array.isArray(state.items) ? state.items : [];
  items.forEach((item) => {
    const prod = productsList.find((p) => p.id === item.productId);
    if (!prod) return;
    const subtotal = calculateItemSubtotalCents(prod.unitPriceCents, item.quantity);
    const qualityLabel = prod.quality ? ` (${prod.quality}ª qualidade)` : "";
    lines.push(`- ${prod.name}${qualityLabel} — ${item.quantity} un. — ${formatCurrency(subtotal)}`);
  });
  lines.push("");

  // Total Estimado
  const totalCents = calculateTotalCents(items, productsList);
  lines.push(`Total estimado: ${formatCurrency(totalCents)}`);
  lines.push("");

  // Recebimento
  lines.push("RECEBIMENTO");
  const methodLabel =
    state.receivingMethod === "cidade"
      ? "Entrega na cidade"
      : state.receivingMethod === "porto"
        ? "Entrega no porto"
        : "Retirada na empresa";
  lines.push(`Modalidade: ${methodLabel}`);

  if (state.receivingMethod === "cidade" && state.deliveryAddress) {
    if (state.deliveryAddress.street) {
      lines.push(`Rua: ${state.deliveryAddress.street}`);
    }
    if (state.deliveryAddress.number) {
      lines.push(`Número: ${state.deliveryAddress.number}`);
    }
    if (state.deliveryAddress.neighborhood) {
      lines.push(`Bairro: ${state.deliveryAddress.neighborhood}`);
    }
    if (state.deliveryAddress.complement && state.deliveryAddress.complement.trim()) {
      lines.push(`Complemento: ${state.deliveryAddress.complement.trim()}`);
    }
  } else if (state.receivingMethod === "porto") {
    if (state.destinationCommunity && state.destinationCommunity.trim()) {
      lines.push(`Comunidade de destino: ${state.destinationCommunity.trim()}`);
    }
  }

  // Observações (se preenchidas)
  if (state.notes && state.notes.trim()) {
    lines.push(`Observações: ${state.notes.trim()}`);
  }

  lines.push("");
  lines.push(
    "Estou ciente de que este valor é estimativo e que o pedido será confirmado pela equipe durante o atendimento."
  );

  return lines.join("\n");
}

/**
 * Gera a mensagem padrão para atendimento Pessoa Jurídica (SPEC §13.2).
 * @returns {string}
 */
function formatCorporateMessage() {
  return "Olá! Gostaria de falar com o setor comercial da Cerâmica Rio Trombetas sobre uma compra para Pessoa Jurídica.";
}

/**
 * Gera a mensagem de consulta direta para produtos de 3ª qualidade (SPEC §10.3).
 * @param {object} product
 * @returns {string}
 */
function formatProductInquiryMessage(product) {
  const quality = product?.quality ? ` de ${product.quality}ª qualidade` : "";
  const name = product?.name || "produto";
  return `Olá! Gostaria de consultar a disponibilidade e valores para o ${name}${quality} na Cerâmica Rio Trombetas.`;
}


  // ========================================================
  // MÓDULO: quotation.js
  // ========================================================






const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

/**
 * Formata valores em centavos para moeda BRL (SPEC §31).
 * @param {number} cents
 * @returns {string}
 */
function formatCurrency(cents) {
  return currencyFormatter.format((cents ?? 0) / 100);
}

/**
 * Calcula o subtotal em centavos de um item: preço unitário × quantidade (SPEC §12 RN03).
 * @param {number} unitPriceCents
 * @param {number} quantity
 * @returns {number}
 */
function calculateItemSubtotalCents(unitPriceCents, quantity) {
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
function calculateTotalCents(items, productsList = products) {
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
function createQuotationState() {
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
function resetQuotationState(stateObj = state) {
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
function addItemToState(stateObj, productId, quantity, productsList = products) {
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
function updateItemQuantityInState(stateObj, productId, newQuantity) {
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
function removeItemFromState(stateObj, productId) {
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
function initQuotation() {
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
function getQuotationState() {
  return state;
}


  // ========================================================
  // MÓDULO: catalog.js
  // ========================================================




const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function formatCents(cents) {
  return currency.format(cents / 100);
}

function getProductCardDetails(product, contactE164 = company.whatsappE164) {
  const whatsappUrl = buildWhatsAppUrl(contactE164);

  return {
    quality: product.quality === null ? null : `${product.quality}ª qualidade`,
    dimensions: product.dimensions,
    unitPrice: product.unitPriceCents === null
      ? commercialTerms.pricePendingLabel
      : formatCents(product.unitPriceCents),
    thousandPrice: product.thousandPriceCents === null
      ? null
      : formatCents(product.thousandPriceCents),
    commercialNote: product.quoteEnabled && product.thousandPriceCents !== null
      ? commercialTerms.thousandPriceNote
      : null,
    availability: product.quality === 3
      ? commercialTerms.thirdQualityAvailability
      : null,
    action: product.directContact
      ? {
          label: "Consultar pelo WhatsApp",
          href: whatsappUrl,
          external: whatsappUrl !== null
        }
      : { label: "Solicitar orçamento", href: "#orcamento", external: false }
  };
}

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createCard(product) {
  const details = getProductCardDetails(product);
  const card = element("article", "product-card");
  card.dataset.productId = product.id;
  if (product.quality === 3) card.classList.add("product-card--consultation");

  const media = element("div", "product-card__media");
  const unavailableImage = () => {
    media.replaceChildren(element("span", "product-card__image-fallback", "Imagem em atualização"));
  };

  if (product.image) {
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = `${product.name}${details.quality ? ` de ${details.quality}` : ""}`;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", unavailableImage, { once: true });
    media.append(image);
  } else {
    unavailableImage();
  }

  const body = element("div", "product-card__body");
  body.append(element("h3", "product-card__title", product.name));
  if (details.quality) body.append(element("p", "product-card__quality", details.quality));
  if (details.dimensions) {
    const label = product.category === "tijolo" ? "Dimensões" : "Características";
    body.append(element("p", "product-card__detail", `${label}: ${details.dimensions}`));
  }
  if (details.availability) {
    body.append(element("p", "product-card__availability", details.availability));
  }

  const pricing = element("div", "product-card__pricing");
  if (product.unitPriceCents !== null) {
    pricing.append(element("p", "product-card__price-label", "Preço unitário de referência"));
  }
  pricing.append(element("p", "product-card__price", details.unitPrice));
  if (details.thousandPrice) {
    pricing.append(element("p", "product-card__thousand-price", `Milheiro: ${details.thousandPrice}`));
  }
  if (details.commercialNote) {
    pricing.append(element("p", "product-card__commercial-note", details.commercialNote));
  }
  body.append(pricing);

  if (details.action.href) {
    const action = element("a", "product-card__action", details.action.label);
    action.href = details.action.href;
    if (details.action.external) {
      action.target = "_blank";
      action.rel = "noopener noreferrer";
    }
    body.append(action);
  } else {
    body.append(element("p", "product-card__contact-pending", "Contato pelo WhatsApp em atualização"));
  }

  card.append(media, body);
  return card;
}

function initCatalog() {
  const grid = document.querySelector("#catalog-grid");
  if (!grid) return;

  grid.replaceChildren(...products.map(createCard));
  document.querySelector("#catalog-confirmation").textContent = commercialTerms.quoteConfirmationNote;
}


  // ========================================================
  // MÓDULO: location.js
  // ========================================================

// Módulo de Apresentação de Localização, Contato e Rodapé (SPEC §§20, 21, 22, 34, 35.30 e 36)


/**
 * Utilitário seguro para criação de elementos DOM.
 */
function el(tagName, className, textContent) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (textContent !== undefined && textContent !== null) node.textContent = textContent;
  return node;
}

/**
 * Atualiza o bloco de localização com base nas configurações da empresa.
 * Se o endereço for nulo, garante que NENHUM iframe nem botão Maps seja exibido (SPEC §20 e §35.30).
 * @param {HTMLElement | null} container
 * @param {object} config
 */
function renderLocation(container, config = company) {
  if (!container) return;

  container.replaceChildren();

  const header = el("div", "location-section__header");
  const title = el("h2", "location-section__title", "Localização e Contato");
  title.id = "titulo-localizacao";
  title.tabIndex = -1;
  const intro = el(
    "p",
    "location-section__intro",
    "Saiba onde estamos situados para planejamento de retiradas diretas ou fale com nossa equipe comercial."
  );
  header.append(title, intro);

  const contentGrid = el("div", "location-section__content");

  // Card do Endereço
  const addressCard = el("div", "location-card");
  const addressTitle = el("h3", "location-card__title", "Endereço da Olaria");

  if (config.address && typeof config.address === "string" && config.address.trim()) {
    // Endereço confirmado (SPEC §20)
    const addressBadge = el("span", "location-card__badge location-card__badge--success", "Confirmado");
    const addressText = el("p", "location-card__address", config.address);
    const mapsLink = el("a", "btn btn--secondary location-card__maps-btn", "Abrir no Google Maps");
    const coordsQuery = config.mapCoords
      ? config.mapCoords
      : encodeURIComponent(config.address);
    mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${coordsQuery}`;
    mapsLink.target = "_blank";
    mapsLink.rel = "noopener noreferrer";

    addressCard.append(addressBadge, addressTitle, addressText, mapsLink);

    // Mapa iframe com loading lazy — apenas quando URL de embed disponível (SPEC §20)
    if (config.mapEmbedUrl) {
      const mapWrapper = el("div", "location-card__map-wrapper");
      const iframe = document.createElement("iframe");
      iframe.src = config.mapEmbedUrl;
      iframe.title = "Mapa de localização da Cerâmica Rio Trombetas";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      mapWrapper.append(iframe);
      addressCard.append(mapWrapper);
    }
  } else {
    // Endereço pendente (estado obrigatório atual - SPEC §20 e §35.30)
    const addressBadge = el("span", "location-card__badge location-card__badge--pending", "Em atualização");
    const pendingText = el("p", "location-card__pending-text", "Endereço em atualização");
    const pendingNote = el(
      "p",
      "location-card__note",
      "O endereço físico definitivo da olaria está em fase de confirmação cadastral. Para orientações detalhadas de acesso e rotas, consulte nosso atendimento comercial pelo WhatsApp."
    );
    addressCard.append(addressBadge, addressTitle, pendingText, pendingNote);
  }

  // Coluna de Contato (WhatsApp e Telefone)
  const contactCol = el("div", "location-contact-col");
  contactCol.id = "contato";

  // Card do WhatsApp
  const whatsappCard = el("article", "contact-card");
  const whatsappBadge = el("span", "contact-card__badge", "Atendimento Rápido");
  const whatsappTitle = el("h3", "contact-card__title", "WhatsApp Comercial");
  const whatsappDesc = el(
    "p",
    "contact-card__description",
    "Nosso canal prioritário para orçamentos, consultas de disponibilidade e alinhamento de pedidos."
  );
  const whatsappAction = el("div", "contact-card__action");
  const whatsappBtn = el("a", "btn btn--primary btn--whatsapp", "Falar pelo WhatsApp");
  whatsappBtn.id = "contact-whatsapp-link";
  whatsappAction.append(whatsappBtn);
  whatsappCard.append(whatsappBadge, whatsappTitle, whatsappDesc, whatsappAction);

  // Card do Telefone
  const phoneCard = el("article", "contact-card");
  const phoneBadge = el("span", "contact-card__badge contact-card__badge--neutral", "Ligação");
  const phoneTitle = el("h3", "contact-card__title", "Telefone de Contato");
  const phoneDesc = el(
    "p",
    "contact-card__description",
    "Para atendimento telefônico convencional durante horário comercial."
  );
  const phoneParagraph = el("p", "contact-card__phone");
  const phoneLink = el("a", "contact-phone-link", config.whatsappDisplay || "93 9165-4576");
  phoneLink.href = `tel:${config.whatsappE164 || "+559391654576"}`;
  phoneParagraph.append(phoneLink);
  phoneCard.append(phoneBadge, phoneTitle, phoneDesc, phoneParagraph);

  contactCol.append(whatsappCard, phoneCard);

  contentGrid.append(addressCard, contactCol);
  container.append(header, contentGrid);
}

/**
 * Atualiza o horário de atendimento no rodapé (SPEC §20 e §22).
 * @param {HTMLElement | null} element
 * @param {object} config
 */
function updateFooterHours(element = document.querySelector("#footer-hours"), config = company) {
  if (!element) return;
  if (config.openingHours && typeof config.openingHours === "string" && config.openingHours.trim()) {
    element.textContent = config.openingHours;
  }
}

/**
 * Atualiza o ano no elemento de copyright do rodapé (SPEC §22).
 * @param {HTMLElement | null} element
 */
function updateFooterYear(element = document.querySelector("#current-year")) {
  if (!element) return;
  element.textContent = String(new Date().getFullYear());
}

/**
 * Atualiza os links e contatos nas seções de contato e rodapé (SPEC §21 e §22).
 * @param {object} config
 */
function updateContactLinks(config = company) {
  const contactWhatsApp = document.querySelector("#contact-whatsapp-link");
  const footerWhatsApp = document.querySelector("#footer-whatsapp-link");

  const url = buildWhatsAppUrl(config.whatsappE164, "");

  if (url) {
    if (contactWhatsApp) {
      contactWhatsApp.href = url;
      contactWhatsApp.target = "_blank";
      contactWhatsApp.rel = "noopener noreferrer";
    }
    if (footerWhatsApp) {
      footerWhatsApp.href = url;
      footerWhatsApp.target = "_blank";
      footerWhatsApp.rel = "noopener noreferrer";
    }
  } else {
    if (contactWhatsApp) {
      contactWhatsApp.removeAttribute("href");
      contactWhatsApp.setAttribute("aria-disabled", "true");
      contactWhatsApp.textContent = `WhatsApp: ${config.whatsappDisplay || "Em atualização"}`;
    }
    if (footerWhatsApp) {
      footerWhatsApp.removeAttribute("href");
      footerWhatsApp.setAttribute("aria-disabled", "true");
      footerWhatsApp.textContent = config.whatsappDisplay || "Em atualização";
    }
  }
}

/**
 * Inicializa os módulos de localização, contato e rodapé.
 */
function initLocationAndFooter() {
  const locationSection = document.querySelector("#localizacao");
  if (locationSection) {
    renderLocation(locationSection, company);
  }
  updateFooterYear();
  updateContactLinks(company);
  updateFooterHours(document.querySelector("#footer-hours"), company);
}


  // ========================================================
  // MÓDULO: navigation.js
  // ========================================================

function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (!header || !menuButton || !nav) return;

  const mobile = window.matchMedia("(max-width: 1023px)");
  const syncHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };

  const setMenuOpen = (open) => {
    const expanded = open && mobile.matches;
    header.classList.toggle("menu-open", expanded);
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
    syncHeaderHeight();
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    setMenuOpen(false);
    const target = document.getElementById(link.hash.slice(1));
    const heading = target?.querySelector('[tabindex="-1"]');
    if (heading) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  mobile.addEventListener("change", () => setMenuOpen(false));
  window.addEventListener("resize", syncHeaderHeight);

  const updateScrollState = () => {
    const shouldShrink = window.scrollY > 16;
    if (header.classList.contains("is-scrolled") !== shouldShrink) {
      header.classList.toggle("is-scrolled", shouldShrink);
      syncHeaderHeight();
    }
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });

  menuButton.hidden = false;
  document.documentElement.classList.add("has-js");
  updateScrollState();
  syncHeaderHeight();
  if ("ResizeObserver" in window) new ResizeObserver(syncHeaderHeight).observe(header);
}


  // ========================================================
  // MÓDULO: animations.js
  // ========================================================

// Módulo de Animações Discretas e Revelação por Scroll (SPEC §§8.1, 23, 24, 34 e §35.26)
// Progressive enhancement: todo o conteúdo permanece 100% visível se JS ou observer falhar.

/**
 * Inicializa animações discretas via IntersectionObserver.
 * Não ativa movimento se o usuário preferir redução de movimento (prefers-reduced-motion).
 */
function initAnimations() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) {
    return;
  }

  // Elementos elegíveis para revelação suave ao rolar
  const targets = document.querySelectorAll(
    ".about, .catalog, .quality-notice, .quotation-app, .delivery-card, .location-card, .contact-card"
  );

  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  targets.forEach((target) => {
    target.classList.add("reveal-element");
    observer.observe(target);
  });
}


  // ========================================================
  // MÓDULO: app.js
  // ========================================================






initNavigation();
initCatalog();
initQuotation();
initLocationAndFooter();
initAnimations();




})();
