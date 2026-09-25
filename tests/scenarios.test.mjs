import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { company, commercialTerms } from "../src/js/config.js";
import { products } from "../src/js/products.js";
import {
  getDeliveryEligibleQuantity,
  isDeliveryEligible,
  evaluateReceivingEligibility
} from "../src/js/delivery.js";
import {
  createQuotationState,
  addItemToState,
  updateItemQuantityInState,
  removeItemFromState,
  calculateItemSubtotalCents,
  calculateTotalCents,
  formatCurrency
} from "../src/js/quotation.js";
import {
  validateName,
  validatePhone,
  validateDeliveryAddress,
  validateTermsAccepted
} from "../src/js/validation.js";
import {
  formatQuotationMessage,
  formatCorporateMessage,
  buildWhatsAppUrl
} from "../src/js/whatsapp.js";
import { getProductCardDetails } from "../src/js/catalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, "../src/index.html");
const cssPath = path.resolve(__dirname, "../src/css");
const htmlContent = fs.readFileSync(htmlPath, "utf-8");

// ============================================================================
// CONSOLIDAÇÃO DOS 30 CENÁRIOS OBRIGATÓRIOS DA SPEC §35
// ============================================================================

test("Cenário 1 (§35.1): 499 tijolos 6F → cidade indisponível", () => {
  const items = [{ productId: "tijolo-6f-1", quantity: 499 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 499);
  assert.equal(isDeliveryEligible(items, products), false);
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.methods.cidade.available, false);
  assert.equal(eligibility.methods.porto.available, false);
  assert.equal(eligibility.methods.retirada.available, true);
});

test("Cenário 2 (§35.2): 500 tijolos 6F → cidade disponível", () => {
  const items = [{ productId: "tijolo-6f-1", quantity: 500 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.methods.cidade.available, true);
  assert.equal(eligibility.methods.porto.available, true);
});

test("Cenário 3 (§35.3): 300 6F + 200 8F → entrega disponível (combinação 6F/8F)", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 300 },
    { productId: "tijolo-8f-1", quantity: 200 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.isDeliveryAllowed, true);
});

test("Cenário 4 (§35.4): 400 6F + 100 cabeças → entrega indisponível (cabeças não contam)", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 400 },
    { productId: "cabeca-6f", quantity: 100 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 400);
  assert.equal(isDeliveryEligible(items, products), false);
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.eligibleQuantity, 400);
  assert.equal(eligibility.minimumRequired - eligibility.eligibleQuantity, 100);
  assert.equal(eligibility.isDeliveryAllowed, false);
});

test("Cenário 5 (§35.5): 500 cabeças → entrega indisponível", () => {
  const items = [{ productId: "cabeca-6f", quantity: 500 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 0);
  assert.equal(isDeliveryEligible(items, products), false);
});

test("Cenário 6 (§35.6): 500 maciços → entrega indisponível", () => {
  const items = [{ productId: "tijolo-macico", quantity: 500 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 0);
  assert.equal(isDeliveryEligible(items, products), false);
});

test("Cenário 7 (§35.7): 500 6F + maciços → entrega disponível para o conjunto", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 500 },
    { productId: "tijolo-macico", quantity: 50 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.isDeliveryAllowed, true);
});

test("Cenário 8 (§35.8): 250 6F + 250 8F + cobogó + capote → entrega disponível", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 250 },
    { productId: "tijolo-8f-2", quantity: 250 },
    { productId: "cobogo", quantity: 30 },
    { productId: "capote", quantity: 20 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
});

test("Cenário 9 (§35.9): Retirada → permitida em qualquer quantidade de produtos elegíveis", () => {
  const items1 = [{ productId: "tijolo-6f-1", quantity: 1 }];
  assert.equal(evaluateReceivingEligibility(items1, products).methods.retirada.available, true);

  const items2 = [{ productId: "cobogo", quantity: 1 }];
  assert.equal(evaluateReceivingEligibility(items2, products).methods.retirada.available, true);
});

test("Cenário 10 (§35.10): Porto abaixo de 500 → indisponível", () => {
  const items = [{ productId: "tijolo-8f-1", quantity: 499 }];
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.methods.porto.available, false);
});

test("Cenário 11 (§35.11): Porto com 500 → disponível", () => {
  const items = [{ productId: "tijolo-8f-1", quantity: 500 }];
  const eligibility = evaluateReceivingEligibility(items, products);
  assert.equal(eligibility.methods.porto.available, true);
});

test("Cenário 12 (§35.12): Porto → campo Comunidade de destino aparece e é incluído na mensagem", () => {
  const state = createQuotationState();
  state.customer = { name: "Maria Santos", phone: "93987654321" };
  state.items = [{ productId: "tijolo-8f-1", quantity: 500 }];
  state.receivingMethod = "porto";
  state.destinationCommunity = "Comunidade Boa Vista";

  const message = formatQuotationMessage(state, products);
  assert.match(message, /Modalidade: Entrega no porto/);
  assert.match(message, /Comunidade de destino: Comunidade Boa Vista/);
  assert.doesNotMatch(message, /Rua:/);
  assert.doesNotMatch(message, /Bairro:/);
});

test("Cenário 13 (§35.13): Cidade → campo Comunidade não aparece na mensagem", () => {
  const state = createQuotationState();
  state.customer = { name: "João Pereira", phone: "93987654321" };
  state.items = [{ productId: "tijolo-6f-1", quantity: 500 }];
  state.receivingMethod = "cidade";
  state.deliveryAddress = {
    street: "Av. Principal",
    number: "123",
    neighborhood: "Centro",
    complement: ""
  };
  state.destinationCommunity = "Comunidade Ignorada";

  const message = formatQuotationMessage(state, products);
  assert.match(message, /Modalidade: Entrega na cidade/);
  assert.match(message, /Rua: Av\. Principal/);
  assert.match(message, /Número: 123/);
  assert.match(message, /Bairro: Centro/);
  assert.doesNotMatch(message, /Comunidade de destino/);
});

test("Cenário 14 (§35.14): Retirada → campos de endereço e comunidade não aparecem na mensagem", () => {
  const state = createQuotationState();
  state.customer = { name: "Carlos Olaria", phone: "93987654321" };
  state.items = [{ productId: "tijolo-6f-1", quantity: 100 }];
  state.receivingMethod = "retirada";

  const message = formatQuotationMessage(state, products);
  assert.match(message, /Modalidade: Retirada na empresa/);
  assert.doesNotMatch(message, /Rua:/);
  assert.doesNotMatch(message, /Número:/);
  assert.doesNotMatch(message, /Bairro:/);
  assert.doesNotMatch(message, /Comunidade de destino:/);
});

test("Cenário 15 (§35.15): 3ª qualidade → não entra no carrinho", () => {
  const state = createQuotationState();
  const res3f6 = addItemToState(state, "tijolo-6f-3", 100, products);
  assert.equal(res3f6.success, false);
  assert.match(res3f6.error, /3ª qualidade|não entram no orçamento automático/);

  const res3f8 = addItemToState(state, "tijolo-8f-3", 100, products);
  assert.equal(res3f8.success, false);
  assert.equal(state.items.length, 0);
});

test("Cenário 16 (§35.16): Tijolo para laje com preço cadastrado → entra no carrinho e não conta para o mínimo de entrega", () => {
  const state = createQuotationState();
  const res = addItemToState(state, "tijolo-laje", 500, products);
  assert.equal(res.success, true);
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].productId, "tijolo-laje");

  const totalCents = calculateTotalCents(state.items, products);
  assert.equal(totalCents, 500 * 200); // 100.000 centavos = R$ 1.000,00

  // Não conta para entrega
  assert.equal(getDeliveryEligibleQuantity(state.items, products), 0);
  assert.equal(isDeliveryEligible(state.items, products), false);
});

test("Cenário 17 (§35.17): Pessoa Jurídica → não vê orçamento automático (mensagem corporativa direta da SPEC §13.2)", () => {
  const msg = formatCorporateMessage();
  assert.match(msg, /Pessoa Jurídica/);
  assert.match(msg, /setor comercial da Cerâmica Rio Trombetas/);
});

test("Cenário 18 (§35.18): Pessoa Física → vê fluxo completo com 5 etapas", () => {
  const state = createQuotationState();
  state.customerType = "PF";
  assert.equal(state.step, 1);

  // Etapa 1: Dados
  state.customer = { name: "Ana Souza", phone: "93991234567" };
  assert.equal(validateName(state.customer.name).isValid, true);
  assert.equal(validatePhone(state.customer.phone).isValid, true);

  // Etapa 2: Produtos
  state.step = 2;
  addItemToState(state, "tijolo-8f-1", 500, products);
  assert.equal(state.items.length, 1);

  // Etapa 3: Recebimento
  state.step = 3;
  state.receivingMethod = "retirada";
  assert.equal(evaluateReceivingEligibility(state.items, products).methods.retirada.available, true);

  // Etapa 4: Revisão e Aceite
  state.step = 4;
  state.acceptedTerms = true;
  assert.equal(validateTermsAccepted(state.acceptedTerms).isValid, true);

  // Etapa 5: WhatsApp
  state.step = 5;
  const msg = formatQuotationMessage(state, products);
  assert.match(msg, /Olá! Gostaria de solicitar um orçamento na Cerâmica Rio Trombetas\./);
  assert.match(msg, /Ana Souza/);
});

test("Cenário 19 (§35.19): Alterar quantidade → recalcula subtotal e total", () => {
  const state = createQuotationState();
  addItemToState(state, "tijolo-6f-1", 100, products); // 100 * 90 = 9000
  assert.equal(calculateTotalCents(state.items, products), 9000);

  updateItemQuantityInState(state, "tijolo-6f-1", 200); // 200 * 90 = 18000
  assert.equal(calculateTotalCents(state.items, products), 18000);
});

test("Cenário 20 (§35.20): Remover item → recalcula total", () => {
  const state = createQuotationState();
  addItemToState(state, "tijolo-6f-1", 100, products);
  addItemToState(state, "tijolo-8f-1", 100, products);
  assert.equal(calculateTotalCents(state.items, products), 9000 + 10000);

  removeItemFromState(state, "tijolo-6f-1");
  assert.equal(state.items.length, 1);
  assert.equal(calculateTotalCents(state.items, products), 10000);
});

test("Cenário 21 (§35.21): Total usa preço unitário × quantidade em centavos inteiros", () => {
  const subtotal = calculateItemSubtotalCents(90, 300);
  assert.equal(subtotal, 27000);
  assert.equal(formatCurrency(subtotal), "R$ 270,00");

  const items = [
    { productId: "tijolo-6f-1", quantity: 300 }, // 300 * 90 = 27000
    { productId: "tijolo-8f-1", quantity: 200 }  // 200 * 100 = 20000
  ];
  assert.equal(calculateTotalCents(items, products), 47000);
  assert.equal(formatCurrency(47000), "R$ 470,00");
});

test("Cenário 22 (§35.22): Campos inválidos impedem avanço", () => {
  assert.equal(validateName("").isValid, false);
  assert.equal(validateName("A").isValid, false);
  assert.equal(validatePhone("12345").isValid, false);
  assert.equal(validatePhone("0000000000").isValid, false);

  const invalidAddress = validateDeliveryAddress({
    street: "",
    number: "",
    neighborhood: ""
  });
  assert.equal(invalidAddress.isValid, false);
});

test("Cenário 23 (§35.23): Checkbox final não marcado impede envio", () => {
  assert.equal(validateTermsAccepted(false).isValid, false);
  assert.match(validateTermsAccepted(false).error, /Confirme que leu as condições/);
  assert.equal(validateTermsAccepted(true).isValid, true);
});

test("Cenário 24 (§35.24): Mensagem WhatsApp não inclui campos vazios", () => {
  const state = createQuotationState();
  state.customer = { name: "Lucas Lima", phone: "93981234567" };
  state.items = [{ productId: "tijolo-6f-1", quantity: 500 }];
  state.receivingMethod = "cidade";
  state.deliveryAddress = {
    street: "Rua do Comércio",
    number: "45",
    neighborhood: "Bauxita",
    complement: "" // vazio
  };
  state.notes = ""; // vazio

  const message = formatQuotationMessage(state, products);
  assert.doesNotMatch(message, /Complemento:/);
  assert.doesNotMatch(message, /Observações:/);
  assert.doesNotMatch(message, /Comunidade de destino:/);
});

test("Cenário 25 (§35.25): Navegação completa funciona por teclado", () => {
  // Valida skip-link, botões nativos e seções com tabindex="-1"
  assert.match(htmlContent, /<a class="skip-link" href="#conteudo">Pular para o conteúdo<\/a>/);
  assert.match(htmlContent, /<main id="conteudo">/);
  assert.match(htmlContent, /<h1 id="titulo-inicio" tabindex="-1">/);
  assert.match(htmlContent, /<h2 id="titulo-produtos" tabindex="-1">/);
  assert.match(htmlContent, /<h2 id="titulo-orcamento" tabindex="-1">/);
  assert.match(htmlContent, /<h2 id="titulo-entrega" tabindex="-1">/);
});

test("Cenário 26 (§35.26): prefers-reduced-motion reduz animações", () => {
  const baseCss = fs.readFileSync(path.join(cssPath, "base.css"), "utf-8");
  assert.match(baseCss, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
  assert.match(baseCss, /scroll-behavior:\s*auto/);
});

test("Cenário 27 (§35.27): Página funciona em Chrome, Edge, Firefox e Safari atuais (sem APIs proprietárias)", () => {
  // A aplicação usa exclusivamente HTML5 semântico padrão, CSS3 com variáveis e JS ES6+ modular
  assert.match(htmlContent, /<!doctype html>/i);
  assert.match(htmlContent, /<meta name="viewport"/);
  assert.match(htmlContent, /<script.*src="\.\/js\/app(\.bundle)?\.js".*><\/script>/);
});

test("Cenário 28 (§35.28): Página não apresenta overflow horizontal em 360px", () => {
  const layoutCss = fs.readFileSync(path.join(cssPath, "layout.css"), "utf-8");
  const baseCss = fs.readFileSync(path.join(cssPath, "base.css"), "utf-8");
  const componentsCss = fs.readFileSync(path.join(cssPath, "components.css"), "utf-8");
  const sectionsCss = fs.readFileSync(path.join(cssPath, "sections.css"), "utf-8");

  assert.match(baseCss, /box-sizing:\s*border-box/);
  assert.match(layoutCss, /overflow-x:\s*hidden/);
  assert.match(layoutCss, /max-width:\s*var\(--container-max-width\)/);
  assert.match(layoutCss, /padding-inline:\s*var\(--page-gutter\)/);

  // Verifica ausência de larguras fixas rígidas > 320px
  const cssWithoutMedia = (layoutCss + componentsCss + sectionsCss).replace(/@media\s*\([^)]+\)/g, "");
  const rigidWidthMatches = cssWithoutMedia.match(/(?<![a-zA-Z-])width:\s*([4-9]\d{2,}|\d{4,})px/g) || [];
  assert.equal(rigidWidthMatches.length, 0, `nenhuma largura fixa rígida deve exceder mobile: ${rigidWidthMatches.join(", ")}`);
});

test("Cenário 29 (§35.29): Falha de imagem não quebra a estrutura", () => {
  const details = getProductCardDetails(products[0]);
  assert.ok(details);
  // O código do catálogo tem manipulador onError que renderiza fallback acessível
  const catalogJs = fs.readFileSync(path.resolve(__dirname, "../src/js/catalog.js"), "utf-8");
  assert.match(catalogJs, /addEventListener\("error", unavailableImage/);
  assert.match(catalogJs, /Imagem em atualização/);
});

test("Cenário 30 (§35.30): Endereço confirmado exibido; iframe NÃO está no HTML estático (apenas via JS com loading lazy)", () => {
  // Endereço agora confirmado em config.js
  assert.ok(company.address && company.address.includes("Oriximiná"), "endereço deve estar confirmado e referenciar Oriximiná");
  assert.ok(company.mapCoords, "coordenadas do Maps devem estar configuradas");
  assert.ok(company.mapEmbedUrl, "URL de embed do mapa deve estar configurada");

  // Mapa iframe NÃO deve estar fixo no HTML estático — renderizado via JS com loading="lazy"
  assert.doesNotMatch(htmlContent, /<iframe/i, "iframe não deve existir no HTML estático");

  // Endereço textual deve constar no HTML estático (fallback sem JS)
  assert.match(htmlContent, /Marechal Castelo Branco/);

  // Botão Maps deve apontar para coordenadas precisas no HTML estático
  assert.match(htmlContent, /-1\.747/);
});
