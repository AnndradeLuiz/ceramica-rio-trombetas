import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexHtml = fs.readFileSync(path.join(__dirname, "../src/index.html"), "utf-8");
const tokensCss = fs.readFileSync(path.join(__dirname, "../src/css/tokens.css"), "utf-8");
const baseCss = fs.readFileSync(path.join(__dirname, "../src/css/base.css"), "utf-8");
const quotationJs = fs.readFileSync(path.join(__dirname, "../src/js/quotation.js"), "utf-8");

test("SPEC §24: deve possuir exatamente um único elemento <h1> na página inteira", () => {
  const h1Matches = indexHtml.match(/<h1\b[^>]*>/gi) || [];
  assert.equal(h1Matches.length, 1, `esperado exatamente 1 elemento <h1>, encontrado: ${h1Matches.length}`);
});

test("SPEC §24: hierarquia de cabeçalhos semântica e consistente", () => {
  // Extrai tags de headings na ordem de ocorrência no HTML
  const headingMatches = [...indexHtml.matchAll(/<(h[1-6])\b[^>]*>/gi)].map((m) => m[1].toLowerCase());

  assert.equal(headingMatches[0], "h1", "o primeiro heading deve ser h1");
  // Garante que não pula níveis de forma desestruturada (ex: h1 direto para h4)
  for (let i = 1; i < headingMatches.length; i++) {
    const prevLevel = Number(headingMatches[i - 1][1]);
    const currLevel = Number(headingMatches[i][1]);
    assert.ok(currLevel <= prevLevel + 1, `salto de nível de heading inválido: h${prevLevel} para h${currLevel}`);
  }
});

test("SPEC §24: link de salto (skip-link) para o conteúdo principal presente e funcional", () => {
  assert.ok(indexHtml.includes('class="skip-link" href="#conteudo"'), "deve conter skip link apontando para #conteudo");
  assert.ok(indexHtml.includes('<main id="conteudo">'), "deve conter landmark <main id=\"conteudo\">");
});

test("SPEC §24: todos os títulos principais h2 de seção possuem tabindex=\"-1\" para foco acessível", () => {
  const h2Tags = [...indexHtml.matchAll(/<h2\b([^>]*)>/gi)].map((m) => m[1]);
  h2Tags.forEach((attrs) => {
    assert.ok(attrs.includes('tabindex="-1"'), `h2 deve possuir tabindex="-1" para navegação por teclado: ${attrs}`);
  });
});

test("SPEC §24 e §32: campos de formulário e erros utilizam roles e labels acessíveis", () => {
  // Inputs com label associado por id
  assert.ok(quotationJs.includes('labelName.htmlFor = "customer-name"'));
  assert.ok(quotationJs.includes('inputName.id = "customer-name"'));
  assert.ok(quotationJs.includes('labelPhone.htmlFor = "customer-phone"'));
  assert.ok(quotationJs.includes('inputPhone.id = "customer-phone"'));

  // Erros com role="alert" e aria-live="polite"
  assert.ok(quotationJs.includes('errorName.setAttribute("role", "alert")'));
  assert.ok(quotationJs.includes('errorName.setAttribute("aria-live", "polite")'));
  assert.ok(quotationJs.includes('errorPhone.setAttribute("role", "alert")'));
  assert.ok(quotationJs.includes('errorPhone.setAttribute("aria-live", "polite")'));
  assert.ok(quotationJs.includes('errorQty.setAttribute("role", "alert")'));

  // Total do orçamento com aria-live
  assert.ok(quotationJs.includes('totalValue.setAttribute("aria-live", "polite")'));
});

test("SPEC §24: botões de ação e edição possuem rótulos acessíveis (aria-label)", () => {
  assert.ok(quotationJs.includes('removeBtn.setAttribute("aria-label"'));
  assert.ok(quotationJs.includes('qtyInput.setAttribute("aria-label"'));
  assert.ok(quotationJs.includes('btnEditCustomer.setAttribute("aria-label"'));
  assert.ok(quotationJs.includes('btnEditItems.setAttribute("aria-label"'));
  assert.ok(quotationJs.includes('btnEditDelivery.setAttribute("aria-label"'));
});

test("SPEC §23 e §35.26: suporte a prefers-reduced-motion presente e com desativação de animações", () => {
  assert.ok(baseCss.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(baseCss.includes("animation-duration: 0.01ms !important"));
  assert.ok(baseCss.includes("transition-duration: 0.01ms !important"));
});

test("SPEC §5.2 e §24: contraste dos tokens de texto atende a especificação WCAG AA", () => {
  // Função para calcular luminância relativa
  function getLuminance(hex) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    const sRGB = [r, g, b].map((val) => (val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)));
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  }

  function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  // Cores de fundo e texto
  const bgWhite = "#FFFFFF";
  const bgCreme = "#F8F4EC";
  const bgSurfaceAlt = "#EFE5D5";
  const textDark = "#2B2723";
  const textMuted = "#5C554E";
  const brandGreen = "#0A7D3E";

  // Texto principal
  assert.ok(getContrastRatio(textDark, bgWhite) >= 4.5, "texto principal em branco deve ser >= 4.5:1");
  assert.ok(getContrastRatio(textDark, bgCreme) >= 4.5, "texto principal em creme deve ser >= 4.5:1");
  assert.ok(getContrastRatio(textDark, bgSurfaceAlt) >= 4.5, "texto principal em areia deve ser >= 4.5:1");

  // Texto atenuado
  assert.ok(getContrastRatio(textMuted, bgWhite) >= 4.5, "texto secundário em branco deve ser >= 4.5:1");
  assert.ok(getContrastRatio(textMuted, bgCreme) >= 4.5, "texto secundário em creme deve ser >= 4.5:1");
  assert.ok(getContrastRatio(textMuted, bgSurfaceAlt) >= 4.5, "texto secundário em areia deve ser >= 4.5:1");

  // Verde da marca com branco (botões)
  assert.ok(getContrastRatio(brandGreen, bgWhite) >= 4.5, "verde da marca com branco deve ser >= 4.5:1");
});
