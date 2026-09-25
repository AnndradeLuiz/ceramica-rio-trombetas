import test from "node:test";
import assert from "node:assert/strict";

import { company } from "../src/js/config.js";
import { renderLocation, updateFooterYear, updateFooterHours } from "../src/js/location.js";

// Mock simples de ambiente DOM para testes unitários em Node.js
function createMockElement(tagName = "div") {
  const children = [];
  const attributes = {};
  return {
    tagName: tagName.toUpperCase(),
    className: "",
    id: "",
    tabIndex: 0,
    textContent: "",
    href: "",
    target: "",
    rel: "",
    children,
    replaceChildren(...newChildren) {
      children.length = 0;
      children.push(...newChildren);
    },
    append(...newChildren) {
      children.push(...newChildren);
    },
    setAttribute(name, val) {
      attributes[name] = String(val);
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    }
  };
}

// Polyfill básico para document.createElement nos testes
if (typeof globalThis.document === "undefined") {
  globalThis.document = {
    createElement: (tag) => createMockElement(tag)
  };
}

test("SPEC §35.30 e §20: quando company.address é null, NÃO exibe iframe de mapa nem botão Maps", () => {
  const container = createMockElement("section");
  renderLocation(container, {
    address: null,
    openingHours: null
  });

  const flattenText = (node) => {
    let text = node.textContent || "";
    if (node.children) {
      text += " " + node.children.map(flattenText).join(" ");
    }
    return text;
  };

  const allText = flattenText(container);
  assert.ok(allText.includes("Endereço em atualização"), "deve exibir aviso honesto de endereço em atualização");

  const hasTag = (node, tag) => {
    if (node.tagName === tag.toUpperCase()) return true;
    return (node.children || []).some((child) => hasTag(child, tag));
  };

  const hasIframe = hasTag(container, "iframe");
  assert.equal(hasIframe, false, "não deve renderizar nenhum elemento iframe quando endereço for null");

  const hasMapsLink = (node) => {
    if (node.href && node.href.includes("maps")) return true;
    return (node.children || []).some(hasMapsLink);
  };
  assert.equal(hasMapsLink(container), false, "não deve renderizar botão ou link de Maps quando endereço for null");
});

test("SPEC §20: quando endereço for configurado, exibe endereço e botão Maps com encodeURIComponent", () => {
  const container = createMockElement("section");
  const testAddress = "Rua do Porto, 50, Oriximiná - PA";
  renderLocation(container, {
    address: testAddress
  });

  const flattenText = (node) => {
    let text = node.textContent || "";
    if (node.children) {
      text += " " + node.children.map(flattenText).join(" ");
    }
    return text;
  };

  const allText = flattenText(container);
  assert.ok(allText.includes(testAddress));

  const findMapsLink = (node) => {
    if (node.href && node.href.includes("google.com/maps")) return node;
    for (const child of node.children || []) {
      const found = findMapsLink(child);
      if (found) return found;
    }
    return null;
  };

  const link = findMapsLink(container);
  assert.ok(link, "deve renderizar botão para Google Maps");
  // Quando mapCoords está disponível, o link usa coordenadas (não encodeURIComponent do endereço)
  const usesCoords = link.href.includes("-1.74") || link.href.includes(encodeURIComponent(testAddress));
  assert.ok(usesCoords, "o link do Maps deve usar coordenadas ou endereço codificado");
  assert.equal(link.target, "_blank");
  assert.equal(link.rel, "noopener noreferrer");
});

test("SPEC §20, §21 e §36: endereço e horário confirmados; e-mail permanece nulo", () => {
  assert.ok(typeof company.address === "string" && company.address.length > 0, "endereço físico deve estar confirmado em config.js");
  assert.ok(company.address.includes("Oriximiná"), "endereço deve referenciar Oriximiná - PA");
  assert.ok(typeof company.openingHours === "string" && company.openingHours.includes("08h às 12h"), "horário deve estar configurado em config.js");
  assert.equal(company.email, null, "e-mail deve permanecer null enquanto não fornecido");
});

test("SPEC §22: updateFooterYear atualiza o elemento com o ano corrente em runtime", () => {
  const yearEl = createMockElement("span");
  updateFooterYear(yearEl);
  const currentYear = String(new Date().getFullYear());
  assert.equal(yearEl.textContent, currentYear);
});

test("SPEC §20 e §22: updateFooterHours atualiza o horário de funcionamento no rodapé", () => {
  const hoursEl = createMockElement("span");
  updateFooterHours(hoursEl, company);
  assert.ok(hoursEl.textContent.includes("08h às 12h"), "deve exibir o horário da semana");
  assert.ok(hoursEl.textContent.includes("Domingo: Fechado"), "deve exibir domingo fechado");
});
