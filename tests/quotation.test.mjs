import test from "node:test";
import assert from "node:assert/strict";

import { products } from "../src/js/products.js";
import {
  createQuotationState,
  calculateItemSubtotalCents,
  calculateTotalCents,
  formatCurrency,
  addItemToState,
  updateItemQuantityInState,
  removeItemFromState
} from "../src/js/quotation.js";
import { validateQuantity } from "../src/js/validation.js";

test("validateQuantity: aceita apenas inteiros positivos em unidades", () => {
  assert.equal(validateQuantity(1).isValid, true);
  assert.equal(validateQuantity(500).isValid, true);
  assert.equal(validateQuantity("100").isValid, true);
  assert.equal(validateQuantity("100").value, 100);

  // Rejeita zero, negativo, decimal e strings não numéricas (SPEC §15)
  assert.equal(validateQuantity(0).isValid, false);
  assert.equal(validateQuantity(-10).isValid, false);
  assert.equal(validateQuantity(1.5).isValid, false);
  assert.equal(validateQuantity("2.5").isValid, false);
  assert.equal(validateQuantity("abc").isValid, false);
});

test("calculateItemSubtotalCents: calcula unitPriceCents * quantity em centavos inteiros", () => {
  assert.equal(calculateItemSubtotalCents(90, 500), 45000); // R$ 450,00
  assert.equal(calculateItemSubtotalCents(100, 1000), 100000); // R$ 1.000,00
  assert.equal(calculateItemSubtotalCents(200, 50), 10000); // R$ 100,00
});

test("calculateTotalCents: calcula a soma correta dos itens sem taxas adicionais (RN03)", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 500 }, // 500 * 90 = 45000
    { productId: "tijolo-laje", quantity: 100 }  // 100 * 200 = 20000
  ];
  assert.equal(calculateTotalCents(items, products), 65000); // R$ 650,00
  assert.equal(calculateTotalCents([], products), 0);
});

test("formatCurrency: formata centavos para a moeda brasileira BRL", () => {
  assert.match(formatCurrency(45000), /R\$\s*450,00/);
  assert.match(formatCurrency(100000), /R\$\s*1\.000,00/);
  assert.match(formatCurrency(90), /R\$\s*0,90/);
});

test("addItemToState: adiciona item elegível com sucesso", () => {
  const state = createQuotationState();
  const result = addItemToState(state, "tijolo-6f-1", 500, products);

  assert.equal(result.success, true);
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].productId, "tijolo-6f-1");
  assert.equal(state.items[0].quantity, 500);

  // Adicionar novamente o mesmo item acumula a quantidade
  addItemToState(state, "tijolo-6f-1", 200, products);
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].quantity, 700);
});

test("RN02 / SPEC §35.15: 3ª qualidade NÃO entra no carrinho", () => {
  const state = createQuotationState();
  const res6f = addItemToState(state, "tijolo-6f-3", 500, products);
  const res8f = addItemToState(state, "tijolo-8f-3", 500, products);

  assert.equal(res6f.success, false);
  assert.equal(res8f.success, false);
  assert.ok(res6f.error.includes("3ª qualidade"));
  assert.equal(state.items.length, 0);
});

test("SPEC §10.4 / §35.16: Tijolo para laje com preço cadastrado entra no carrinho", () => {
  const state = createQuotationState();
  const res = addItemToState(state, "tijolo-laje", 100, products);

  assert.equal(res.success, true);
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].productId, "tijolo-laje");
  assert.equal(state.items[0].quantity, 100);
  assert.equal(calculateTotalCents(state.items, products), 20000); // 100 * R$ 2,00 = R$ 200,00
});

test("SPEC §35.19: alterar quantidade recalcula subtotal e total", () => {
  const state = createQuotationState();
  addItemToState(state, "tijolo-8f-1", 500, products); // 500 * 100 = 50000 centavos
  assert.equal(calculateTotalCents(state.items, products), 50000);

  // Alterar quantidade para 700
  updateItemQuantityInState(state, "tijolo-8f-1", 700);
  assert.equal(state.items[0].quantity, 700);
  assert.equal(calculateTotalCents(state.items, products), 70000); // 700 * 100 = 70000 centavos
});

test("SPEC §35.20: remover item recalcula total", () => {
  const state = createQuotationState();
  addItemToState(state, "tijolo-6f-1", 500, products); // 45000
  addItemToState(state, "capote", 10, products);       // 10 * 1000 = 10000
  assert.equal(calculateTotalCents(state.items, products), 55000);

  // Remover capote
  removeItemFromState(state, "capote");
  assert.equal(state.items.length, 1);
  assert.equal(calculateTotalCents(state.items, products), 45000);
});
