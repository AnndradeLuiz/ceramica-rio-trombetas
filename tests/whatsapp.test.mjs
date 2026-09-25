import test from "node:test";
import assert from "node:assert/strict";

import { products } from "../src/js/products.js";
import {
  isValidE164,
  buildWhatsAppUrl,
  formatQuotationMessage,
  formatCorporateMessage,
  formatProductInquiryMessage
} from "../src/js/whatsapp.js";

test("isValidE164: valida formato internacional padrão E.164", () => {
  assert.equal(isValidE164("+559391654576"), true);
  assert.equal(isValidE164("+5511999998888"), true);
  assert.equal(isValidE164("559391654576"), false); // sem +
  assert.equal(isValidE164("939165-4576"), false);
  assert.equal(isValidE164(""), false);
  assert.equal(isValidE164(null), false);
  assert.equal(isValidE164(undefined), false);
});

test("buildWhatsAppUrl: constrói URL wa.me com encodeURIComponent; retorna null se E.164 for nulo ou inválido", () => {
  const url = buildWhatsAppUrl("+559391654576", "Olá, mundo!");
  assert.equal(url, "https://wa.me/559391654576?text=Ol%C3%A1%2C%20mundo!");

  // Sem mensagem, retorna a URL base sem parâmetro ?text
  assert.equal(buildWhatsAppUrl("+559391654576"), "https://wa.me/559391654576");
  assert.equal(buildWhatsAppUrl("+559391654576", ""), "https://wa.me/559391654576");

  // Sem número internacional válido, não inventa URL presumida
  assert.equal(buildWhatsAppUrl(null, "Mensagem"), null);
  assert.equal(buildWhatsAppUrl("", "Mensagem"), null);
  assert.equal(buildWhatsAppUrl("invalido", "Mensagem"), null);
});

test("formatCorporateMessage: gera texto normativo da SPEC §13.2 para PJ", () => {
  const msg = formatCorporateMessage();
  assert.equal(
    msg,
    "Olá! Gostaria de falar com o setor comercial da Cerâmica Rio Trombetas sobre uma compra para Pessoa Jurídica."
  );
});

test("formatProductInquiryMessage: gera texto normativo para consulta de 3ª qualidade", () => {
  const p3 = products.find((p) => p.id === "tijolo-6f-3");
  const msg = formatProductInquiryMessage(p3);
  assert.ok(msg.includes("Tijolo 6 Furos de 3ª qualidade"));
});

test("SPEC §18.2 e §35.24: formatQuotationMessage omite campos vazios e formata dados completos", () => {
  const stateCidadeCompleta = {
    customer: { name: "Maria Silva", phone: "(93) 99165-4576" },
    items: [{ productId: "tijolo-6f-1", quantity: 500 }],
    receivingMethod: "cidade",
    deliveryAddress: {
      street: "Rua das Flores",
      number: "100",
      neighborhood: "Centro",
      complement: "Apto 2"
    },
    destinationCommunity: "",
    notes: "Entregar pela manhã."
  };

  const msgCidade = formatQuotationMessage(stateCidadeCompleta, products);
  assert.ok(msgCidade.includes("DADOS DO CLIENTE"));
  assert.ok(msgCidade.includes("Nome: Maria Silva"));
  assert.ok(msgCidade.includes("Telefone: (93) 99165-4576"));
  assert.ok(msgCidade.includes("PRODUTOS"));
  assert.ok(msgCidade.includes("- Tijolo 6 Furos (1ª qualidade) — 500 un."));
  assert.ok(msgCidade.includes("Total estimado:"));
  assert.ok(msgCidade.includes("RECEBIMENTO"));
  assert.ok(msgCidade.includes("Modalidade: Entrega na cidade"));
  assert.ok(msgCidade.includes("Rua: Rua das Flores"));
  assert.ok(msgCidade.includes("Número: 100"));
  assert.ok(msgCidade.includes("Bairro: Centro"));
  assert.ok(msgCidade.includes("Complemento: Apto 2"));
  assert.ok(msgCidade.includes("Observações: Entregar pela manhã."));
  assert.ok(!msgCidade.includes("Comunidade de destino")); // Omitido na cidade!
  assert.ok(
    msgCidade.includes(
      "Estou ciente de que este valor é estimativo e que o pedido será confirmado pela equipe durante o atendimento."
    )
  );
});

test("SPEC §35.24: cidade sem complemento e sem observações não inclui essas linhas", () => {
  const stateSemOpcionais = {
    customer: { name: "João Santos", phone: "(93) 99165-4576" },
    items: [{ productId: "tijolo-8f-1", quantity: 500 }],
    receivingMethod: "cidade",
    deliveryAddress: {
      street: "Av. Principal",
      number: "50",
      neighborhood: "Bela Vista",
      complement: ""
    },
    destinationCommunity: "",
    notes: ""
  };

  const msg = formatQuotationMessage(stateSemOpcionais, products);
  assert.ok(!msg.includes("Complemento:"));
  assert.ok(!msg.includes("Observações:"));
  assert.ok(!msg.includes("Comunidade de destino:"));
});

test("SPEC §35.24: entrega no porto inclui comunidade de destino e omite endereço de rua", () => {
  const statePorto = {
    customer: { name: "Ana Souza", phone: "(93) 99165-4576" },
    items: [{ productId: "tijolo-6f-1", quantity: 500 }],
    receivingMethod: "porto",
    deliveryAddress: { street: "", number: "", neighborhood: "", complement: "" },
    destinationCommunity: "Comunidade Santa Maria",
    notes: ""
  };

  const msg = formatQuotationMessage(statePorto, products);
  assert.ok(msg.includes("Modalidade: Entrega no porto"));
  assert.ok(msg.includes("Comunidade de destino: Comunidade Santa Maria"));
  assert.ok(!msg.includes("Rua:"));
  assert.ok(!msg.includes("Bairro:"));
  assert.ok(!msg.includes("Complemento:"));
});

test("SPEC §35.24: retirada na empresa omite rua, complemento e comunidade de destino", () => {
  const stateRetirada = {
    customer: { name: "Carlos Pereira", phone: "(93) 99165-4576" },
    items: [{ productId: "tijolo-macico", quantity: 50 }],
    receivingMethod: "retirada",
    deliveryAddress: { street: "", number: "", neighborhood: "", complement: "" },
    destinationCommunity: "",
    notes: "Retirada na sexta-feira."
  };

  const msg = formatQuotationMessage(stateRetirada, products);
  assert.ok(msg.includes("Modalidade: Retirada na empresa"));
  assert.ok(!msg.includes("Rua:"));
  assert.ok(!msg.includes("Comunidade de destino:"));
  assert.ok(msg.includes("Observações: Retirada na sexta-feira."));
});
