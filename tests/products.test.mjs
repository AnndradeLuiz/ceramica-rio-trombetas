import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { company, commercialTerms, deliveryMinimumWholeBricks } from "../src/js/config.js";
import { products } from "../src/js/products.js";

const expected = [
  ["tijolo-6f-1", "Tijolo 6 Furos", 6, 1, "9 × 13 × 23 cm", 90, 90000, true, false, true, "tijolo-6f-primeira.png"],
  ["tijolo-6f-2", "Tijolo 6 Furos", 6, 2, "9 × 13 × 23 cm", 85, 85000, true, false, true, "tijolo-6f-segunda.png"],
  ["tijolo-6f-3", "Tijolo 6 Furos", 6, 3, "9 × 13 × 23 cm", 80, 80000, false, true, true, null],
  ["cabeca-6f", "Cabeça 6 Furos", 6, null, "metade do tijolo 6F, corte no eixo vertical", 50, null, true, false, false, "cabeca-6f.png"],
  ["tijolo-8f-1", "Tijolo 8 Furos", 8, 1, "9 × 19 × 19 cm", 100, 100000, true, false, true, "tijolo-8f-primeira.png"],
  ["tijolo-8f-2", "Tijolo 8 Furos", 8, 2, "9 × 19 × 19 cm", 95, 95000, true, false, true, "tijolo-8f-segunda.png"],
  ["tijolo-8f-3", "Tijolo 8 Furos", 8, 3, "9 × 19 × 19 cm", 90, 90000, false, true, true, null],
  ["cabeca-8f", "Cabeça 8 Furos", 8, null, "metade do tijolo 8F, corte no eixo vertical", 60, null, true, false, false, "cabeca-8f.png"],
  ["tijolo-macico", "Tijolo Maciço", null, null, null, 200, null, true, false, false, "macico.png"],
  ["capote", "Capote", null, null, null, 1000, null, true, false, false, "capote.png"],
  ["cobogo", "Cobogó", null, null, null, 800, null, true, false, false, "cobogo.png"],
  ["tijolo-laje", "Tijolo para Laje", null, null, null, 200, null, true, false, false, "tijolo-laje.png"]
];

test("catálogo tem exatamente os 12 IDs da SPEC, sem duplicação", () => {
  assert.deepEqual(products.map(({ id }) => id), expected.map(([id]) => id));
  assert.equal(new Set(products.map(({ id }) => id)).size, 12);
});

test("dados, preços em centavos e sinalizadores seguem cada linha da SPEC §10.1", () => {
  for (const [index, row] of expected.entries()) {
    const [id, name, holes, quality, dimensions, unitPriceCents, thousandPriceCents, quoteEnabled, directContact, countsTowardDeliveryMinimum, imageName] = row;
    const product = products[index];
    assert.deepEqual(
      [product.id, product.name, product.holes, product.quality, product.dimensions, product.unitPriceCents, product.thousandPriceCents, product.quoteEnabled, product.directContact, product.countsTowardDeliveryMinimum],
      [id, name, holes, quality, dimensions, unitPriceCents, thousandPriceCents, quoteEnabled, directContact, countsTowardDeliveryMinimum],
      id
    );
    assert.equal(product.category, id.startsWith("tijolo-6f-") || id.startsWith("tijolo-8f-") ? "tijolo" : "complementar", id);
    assert.equal(product.image, imageName === null ? null : `./assets/products/${imageName}`, id);
    if (product.image !== null) {
      assert.ok(existsSync(fileURLToPath(new URL(`../src/${product.image.slice(2)}`, import.meta.url))), `${id}: imagem ausente`);
    }
  }
});

test("3ª qualidade fica fora do orçamento; laje com preço entra sem contar para entrega", () => {
  for (const product of products) {
    if (product.quality === 3) {
      assert.equal(product.quoteEnabled, false, product.id);
      assert.equal(product.directContact, true, product.id);
    }
    if (product.countsTowardDeliveryMinimum) {
      assert.equal(product.category, "tijolo", product.id);
      assert.ok([6, 8].includes(product.holes), product.id);
    }
    if (product.quoteEnabled) {
      assert.ok(Number.isInteger(product.unitPriceCents) && product.unitPriceCents > 0, product.id);
    }
  }
  const slabBrick = products.find(({ id }) => id === "tijolo-laje");
  assert.equal(slabBrick.unitPriceCents, 200);
  assert.equal(slabBrick.quoteEnabled, true);
  assert.equal(slabBrick.directContact, false);
  assert.equal(slabBrick.countsTowardDeliveryMinimum, false);
  assert.equal(deliveryMinimumWholeBricks, 500);
});

test("configuração usa o contato, endereço e horários confirmados e mantém e-mail pendente", () => {
  assert.equal(company.name, "Cerâmica Rio Trombetas");
  assert.equal(company.whatsappDisplay, "93 9165-4576");
  assert.equal(company.whatsappE164, "+559391654576");
  assert.ok(typeof company.address === "string" && company.address.includes("Oriximiná"));
  assert.ok(typeof company.openingHours === "string" && company.openingHours.includes("08h às 12h"));
  assert.equal(company.email, null);
  assert.equal(company.institutionalText, null);
  assert.equal(commercialTerms.thousandPriceNote, "O valor do milheiro contempla a entrega quando as condições de entrega forem atendidas.");
  assert.equal(commercialTerms.thirdQualityAvailability, "Disponibilidade sob consulta");
  assert.equal(commercialTerms.pricePendingLabel, "Preço sob consulta");
});
