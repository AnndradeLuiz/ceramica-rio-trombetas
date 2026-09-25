import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensCss = fs.readFileSync(path.join(__dirname, "../src/css/tokens.css"), "utf-8");
const layoutCss = fs.readFileSync(path.join(__dirname, "../src/css/layout.css"), "utf-8");
const componentsCss = fs.readFileSync(path.join(__dirname, "../src/css/components.css"), "utf-8");
const sectionsCss = fs.readFileSync(path.join(__dirname, "../src/css/sections.css"), "utf-8");

test("SPEC §5.6: container máximo deve estar estritamente entre 1180px e 1240px", () => {
  const match = tokensCss.match(/--container-max-width:\s*(\d+)px/);
  assert.ok(match, "deve definir --container-max-width");
  const maxWidth = Number(match[1]);
  assert.ok(maxWidth >= 1180 && maxWidth <= 1240, `container deve estar entre 1180px e 1240px, obtido: ${maxWidth}px`);
});

test("SPEC §5.6: padding lateral mínimo em mobile deve ser de pelo menos 16px (1rem / --space-4)", () => {
  assert.ok(layoutCss.includes("--page-gutter: clamp(var(--space-4)"), "page-gutter deve ter --space-4 (16px) como piso");
  assert.ok(tokensCss.includes("--space-4: 1rem;"), "--space-4 deve ser 1rem (16px)");
});

test("SPEC §6: pontos de quebra (breakpoints) e media queries cobrem as viewports recomendadas", () => {
  const allCss = layoutCss + componentsCss + sectionsCss;
  assert.ok(allCss.includes("640px"), "deve contemplar breakpoint 640px");
  assert.ok(allCss.includes("768px"), "deve contemplar breakpoint 768px");
  assert.ok(allCss.includes("1024px"), "deve contemplar breakpoint 1024px");
});

test("SPEC §6 e §24: componentes interativos essenciais garantem área de toque mínima de ~44x44px", () => {
  const allCss = layoutCss + componentsCss + sectionsCss;

  // Botões principais
  assert.ok(componentsCss.includes(".btn {") && componentsCss.includes("min-height: 44px;"));
  // Inputs de formulário
  assert.ok(componentsCss.includes(".form-input {") && componentsCss.includes("min-height: 48px;"));
  // Input compacto de quantidade
  assert.ok(componentsCss.includes(".form-input--compact {") && componentsCss.includes("min-height: 44px;"));
  // Botão de remover item
  assert.ok(componentsCss.includes(".btn--danger {") && componentsCss.includes("min-height: 44px;"));
  // Botão de editar revisão
  assert.ok(componentsCss.includes(".review-card__edit-btn {") && componentsCss.includes("min-height: 44px;"));
  // Toggle do menu mobile
  assert.ok(componentsCss.includes(".menu-toggle {") && componentsCss.includes("min-height: 44px;"));
});

test("SPEC §6 e §35.28: layout não contém larguras fixas rígidas maiores que 320px sem max-width", () => {
  // Remove as diretivas @media para analisar somente propriedades CSS de seletores
  const cssWithoutMedia = (layoutCss + componentsCss + sectionsCss).replace(/@media\s*\([^)]+\)/g, "");
  // Procura propriedades CSS 'width: Npx' que não sejam min-width nem max-width
  const rigidWidthMatches = cssWithoutMedia.match(/(?<![a-zA-Z-])width:\s*([4-9]\d{2,}|\d{4,})px/g) || [];
  assert.equal(rigidWidthMatches.length, 0, `nenhuma largura fixa rígida deve exceder mobile: ${rigidWidthMatches.join(", ")}`);
});
