import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initAnimations } from "../src/js/animations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseCss = fs.readFileSync(path.join(__dirname, "../src/css/base.css"), "utf-8");
const componentsCss = fs.readFileSync(path.join(__dirname, "../src/css/components.css"), "utf-8");
const sectionsCss = fs.readFileSync(path.join(__dirname, "../src/css/sections.css"), "utf-8");

test("SPEC §23: initAnimations executa com segurança mesmo quando IntersectionObserver ou window estão indisponíveis", () => {
  // Em ambiente de teste puro do Node.js, não deve disparar exceção
  assert.doesNotThrow(() => {
    initAnimations();
  });
});

test("SPEC §23 e §35.26: prefers-reduced-motion desativa transições e garante elementos visíveis sem transform", () => {
  assert.ok(baseCss.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(baseCss.includes("transform: none !important;"));
  assert.ok(baseCss.includes(".reveal-element {"));
  assert.ok(baseCss.includes("opacity: 1 !important;"));
});

test("SPEC §23: transições e animações são discretas, com durações não intrusivas (<= 0.5s)", () => {
  const allCss = baseCss + componentsCss + sectionsCss;

  // Procura durações de transição/animação em segundos (ex: 0.6s, 1s, 2s) que violem "transições curtas e discretas"
  const longDurations = allCss.match(/\b(transition|animation)(?:-duration)?:\s*([1-9]|\d+\.\d+)s/g) || [];
  const excessive = longDurations.filter((d) => {
    const secMatch = d.match(/(\d+(?:\.\d+)?)s/);
    return secMatch && Number(secMatch[1]) > 0.5;
  });

  assert.equal(excessive.length, 0, `nenhuma animação/transição deve ter delay/duração excessiva (> 0.5s): ${excessive.join(", ")}`);
});

test("SPEC §23: não utiliza bibliotecas externas de animação nem efeitos contínuos/piscantes", () => {
  const allCss = baseCss + componentsCss + sectionsCss;
  assert.ok(!allCss.includes("animation-iteration-count: infinite"), "não deve haver animações infinitas/contínuas sem função");
  assert.ok(!allCss.includes("keyframes blink"), "não deve haver elementos piscando");
});
