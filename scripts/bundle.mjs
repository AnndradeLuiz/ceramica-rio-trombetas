import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcJsDir = path.join(rootDir, "src", "js");
const outputFile = path.join(srcJsDir, "app.bundle.js");

const fileOrder = [
  "config.js",
  "products.js",
  "validation.js",
  "delivery.js",
  "whatsapp.js",
  "quotation.js",
  "catalog.js",
  "location.js",
  "navigation.js",
  "animations.js",
  "app.js"
];

let bundleContent = `/**
 * Cerâmica Rio Trombetas — Bundle Unificado para Navegador
 * Gerado automaticamente para compatibilidade com execução offline / duplo clique (file://).
 * Preserva 100% de funcionamento sem necessidade de servidor HTTP e sem bloqueio de CORS.
 */
(function () {
  "use strict";

`;

for (const fileName of fileOrder) {
  const filePath = path.join(srcJsDir, fileName);
  let content = fs.readFileSync(filePath, "utf-8");

  content = content.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, "");

  content = content.replace(/^export\s+const\s+/gm, "const ");

  content = content.replace(/^export\s+let\s+/gm, "let ");

  content = content.replace(/^export\s+function\s+/gm, "function ");

  content = content.replace(/^export\s+default\s+.*?;?\s*$/gm, "");

  bundleContent += `  // ========================================================\n`;
  bundleContent += `  // MÓDULO: ${fileName}\n`;
  bundleContent += `  // ========================================================\n\n`;
  bundleContent += content + "\n\n";
}

bundleContent += `})();\n`;

fs.writeFileSync(outputFile, bundleContent, "utf-8");
console.log(`Bundle gerado com sucesso em: ${outputFile} (${bundleContent.length} bytes)`);
