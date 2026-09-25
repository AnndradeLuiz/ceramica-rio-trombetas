import test from "node:test";
import assert from "node:assert/strict";

import { products } from "../src/js/products.js";
import { commercialTerms } from "../src/js/config.js";

let getProductCardDetails;
try {
  ({ getProductCardDetails } = await import("../src/js/catalog.js"));
} catch {
  // A falha esperada no ciclo RED é a ausência do módulo da Fase 7.
}

function detailsFor(id, contactE164) {
  assert.equal(typeof getProductCardDetails, "function", "o catálogo precisa apresentar os dados dos produtos");
  const product = products.find((item) => item.id === id);
  return contactE164 === undefined
    ? getProductCardDetails(product)
    : getProductCardDetails(product, contactE164);
}

test("tijolo elegível exibe preço unitário e milheiro como referência, com CTA para orçamento", () => {
  const details = detailsFor("tijolo-6f-1");
  assert.equal(details.quality, "1ª qualidade");
  assert.equal(details.dimensions, "9 × 13 × 23 cm");
  assert.equal(details.unitPrice, "R$ 0,90");
  assert.equal(details.thousandPrice, "R$ 900,00");
  assert.equal(details.commercialNote, commercialTerms.thousandPriceNote);
  assert.deepEqual(details.action, { label: "Solicitar orçamento", href: "#orcamento", external: false });
});

test("3ª qualidade tem preço de referência e consulta direta, sem ação de orçamento automático", () => {
  const details = detailsFor("tijolo-8f-3");
  assert.equal(details.quality, "3ª qualidade");
  assert.equal(details.unitPrice, "R$ 0,90");
  assert.equal(details.thousandPrice, "R$ 900,00");
  assert.equal(details.availability, "Disponibilidade sob consulta");
  assert.equal(details.commercialNote, null);
  assert.deepEqual(details.action, { label: "Consultar pelo WhatsApp", href: "https://wa.me/5593987654321", external: true });
});

test("laje mostra o preço informado; produto sem dimensão não ganha texto fictício", () => {
  const slab = detailsFor("tijolo-laje");
  const solidBrick = detailsFor("tijolo-macico");
  assert.equal(slab.unitPrice, "R$ 2,00");
  assert.equal(slab.thousandPrice, null);
  assert.equal(slab.dimensions, null);
  assert.deepEqual(slab.action, { label: "Solicitar orçamento", href: "#orcamento", external: false });
  assert.equal(solidBrick.dimensions, null);
  assert.equal(solidBrick.unitPrice, "R$ 2,00");
});

test("sem contato internacional confirmado não fabrica link externo", () => {
  const details = detailsFor("tijolo-6f-3", null);
  assert.deepEqual(details.action, { label: "Consultar pelo WhatsApp", href: null, external: false });
});
