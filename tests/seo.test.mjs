import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexHtml = fs.readFileSync(path.join(__dirname, "../src/index.html"), "utf-8");

test("SPEC §25: lang=\"pt-BR\" presente na tag <html>", () => {
  assert.ok(indexHtml.includes('<html lang="pt-BR">'), "HTML deve declarar idioma pt-BR");
});

test("SPEC §25: título recomendado presente na íntegra", () => {
  assert.ok(
    indexHtml.includes("<title>Cerâmica Rio Trombetas | Tijolos e Materiais Cerâmicos</title>"),
    "título deve ser exatamente o recomendado pela SPEC §25"
  );
});

test("SPEC §25: meta description recomendada presente na íntegra", () => {
  assert.ok(
    indexHtml.includes(
      '<meta name="description" content="Conheça os produtos da Cerâmica Rio Trombetas, consulte preços de referência e envie sua solicitação de orçamento diretamente pelo WhatsApp.">'
    ),
    "meta description deve coincidir com a recomendação da SPEC §25"
  );
});

test("SPEC §25: metadados Open Graph e Twitter Card configurados com asset de produto real", () => {
  assert.ok(indexHtml.includes('<meta property="og:type" content="website">'));
  assert.ok(indexHtml.includes('<meta property="og:locale" content="pt_BR">'));
  assert.ok(indexHtml.includes('<meta property="og:site_name" content="Cerâmica Rio Trombetas">'));
  assert.ok(indexHtml.includes('<meta property="og:image" content="./assets/products/tijolo-8f-primeira.png">'));
  assert.ok(indexHtml.includes('<meta name="twitter:card" content="summary_large_image">'));
  assert.ok(indexHtml.includes('<meta name="twitter:image" content="./assets/products/tijolo-8f-primeira.png">'));
});

test("SPEC §25 e §36: não fabrica URL de produção nem JSON-LD com endereço fictício", () => {
  assert.ok(!indexHtml.includes('<link rel="canonical"'), "canonical deve ser adicionada apenas quando URL oficial for confirmada");
  assert.ok(!indexHtml.includes('"@type": "LocalBusiness"'), "LocalBusiness requer endereço confirmado antes da inclusão");
});
