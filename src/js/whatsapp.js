// Módulo de Integração com WhatsApp (SPEC §§10.3, 13.2, 18, 21, 26 e §35.24)
import { company } from "./config.js";
import { products } from "./products.js";
import { calculateItemSubtotalCents, calculateTotalCents, formatCurrency } from "./quotation.js";

/**
 * Valida se um número de telefone está estritamente no padrão internacional E.164.
 * Formato: + seguido de 1 a 15 dígitos (ex.: +559391654576).
 * @param {string} phoneE164
 * @returns {boolean}
 */
export function isValidE164(phoneE164) {
  return typeof phoneE164 === "string" && /^\+[1-9]\d{1,14}$/.test(phoneE164);
}

/**
 * Constrói a URL segura do WhatsApp (wa.me) codificada com encodeURIComponent.
 * Retorna null se o número E.164 não for confirmado/válido (não fabrica URL presumida).
 * @param {string} phoneE164
 * @param {string} messageText
 * @returns {string | null}
 */
export function buildWhatsAppUrl(phoneE164 = company.whatsappE164, messageText = "") {
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
export function formatQuotationMessage(state, productsList = products) {
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
export function formatCorporateMessage() {
  return "Olá! Gostaria de falar com o setor comercial da Cerâmica Rio Trombetas sobre uma compra para Pessoa Jurídica.";
}

/**
 * Gera a mensagem de consulta direta para produtos de 3ª qualidade (SPEC §10.3).
 * @param {object} product
 * @returns {string}
 */
export function formatProductInquiryMessage(product) {
  const quality = product?.quality ? ` de ${product.quality}ª qualidade` : "";
  const name = product?.name || "produto";
  return `Olá! Gostaria de consultar a disponibilidade e valores para o ${name}${quality} na Cerâmica Rio Trombetas.`;
}
