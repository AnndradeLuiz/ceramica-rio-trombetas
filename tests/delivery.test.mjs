import test from "node:test";
import assert from "node:assert/strict";

import { products } from "../src/js/products.js";
import {
  getDeliveryEligibleQuantity,
  isDeliveryEligible,
  evaluateReceivingEligibility
} from "../src/js/delivery.js";

test("Cenário 1 (§35.1): 499 tijolos 6F → cidade indisponível", () => {
  const items = [{ productId: "tijolo-6f-1", quantity: 499 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 499);
  assert.equal(isDeliveryEligible(items, products), false);

  const evalResult = evaluateReceivingEligibility(items, products);
  assert.equal(evalResult.methods.cidade.available, false);
  assert.equal(evalResult.methods.porto.available, false);
});

test("Cenário 2 (§35.2): 500 tijolos 6F → cidade disponível", () => {
  const items = [{ productId: "tijolo-6f-1", quantity: 500 }];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);

  const evalResult = evaluateReceivingEligibility(items, products);
  assert.equal(evalResult.methods.cidade.available, true);
  assert.equal(evalResult.methods.porto.available, true);
});

test("Cenário 3 (§35.3): 300 6F + 200 8F → entrega disponível (combinação 6F/8F)", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 300 },
    { productId: "tijolo-8f-1", quantity: 200 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
  assert.equal(evaluateReceivingEligibility(items, products).isDeliveryAllowed, true);
});

test("Cenário 4 (§35.4): 400 6F + 100 cabeças → entrega indisponível (cabeças não contam)", () => {
  const items = [
    { productId: "tijolo-6f-1", quantity: 400 },
    { productId: "cabeca-6f", quantity: 100 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 400);
  assert.equal(isDeliveryEligible(items, products), false);
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
    { productId: "tijolo-6f-2", quantity: 500 },
    { productId: "tijolo-macico", quantity: 50 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 500);
  assert.equal(isDeliveryEligible(items, products), true);
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
  const items1 = [{ productId: "tijolo-6f-1", quantity: 10 }];
  assert.equal(evaluateReceivingEligibility(items1, products).methods.retirada.available, true);

  const items2 = [{ productId: "cobogo", quantity: 1 }];
  assert.equal(evaluateReceivingEligibility(items2, products).methods.retirada.available, true);
});

test("Cenário 10 (§35.10): Porto abaixo de 500 → indisponível", () => {
  const items = [{ productId: "tijolo-8f-1", quantity: 499 }];
  assert.equal(evaluateReceivingEligibility(items, products).methods.porto.available, false);
});

test("Cenário 11 (§35.11): Porto com 500 → disponível", () => {
  const items = [{ productId: "tijolo-8f-1", quantity: 500 }];
  assert.equal(evaluateReceivingEligibility(items, products).methods.porto.available, true);
});

test("Tijolo para laje não conta para entrega (RN05)", () => {
  const items = [
    { productId: "tijolo-laje", quantity: 500 }
  ];
  assert.equal(getDeliveryEligibleQuantity(items, products), 0);
  assert.equal(isDeliveryEligible(items, products), false);
});
