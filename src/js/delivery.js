// Módulo de Elegibilidade de Entrega e Modalidades de Recebimento
// Regras obrigatórias: SPEC §12 (RN04–RN13), §16 e §35 (cenários 1–14).
import { deliveryMinimumWholeBricks } from "./config.js";
import { products } from "./products.js";

/**
 * Totaliza a quantidade de tijolos inteiros elegíveis para entrega (6F e 8F).
 * Cabeças, maciços, capotes, cobogós e lajes retornam false para countsTowardDeliveryMinimum.
 * @param {Array<{ productId: string, quantity: number }>} items
 * @param {Array<any>} productsList
 * @returns {number}
 */
export function getDeliveryEligibleQuantity(items, productsList = products) {
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
export function isDeliveryEligible(items, productsList = products) {
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
export function evaluateReceivingEligibility(items, productsList = products) {
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
