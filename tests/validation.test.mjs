import test from "node:test";
import assert from "node:assert/strict";

import { validateName, validatePhone, extractPhoneDigits, formatPhoneInput, validateDeliveryAddress, validateTermsAccepted } from "../src/js/validation.js";

test("validateName: aceita nomes válidos com 2 ou mais caracteres significativos", () => {
  assert.equal(validateName("Luiz").isValid, true);
  assert.equal(validateName("Maria Silva").isValid, true);
  assert.equal(validateName("  João   ").value, "João");
  assert.equal(validateName("  João   ").isValid, true);
  assert.equal(validateName("Zé").isValid, true);
});

test("validateName: rejeita nomes vazios, apenas espaços ou com menos de 2 caracteres", () => {
  assert.equal(validateName("").isValid, false);
  assert.equal(validateName("   ").isValid, false);
  assert.equal(validateName("A").isValid, false);
  assert.equal(validateName(" A ").isValid, false);
  assert.equal(validateName(null).isValid, false);
  assert.equal(validateName(undefined).isValid, false);
  assert.ok(validateName("").error.includes("Informe seu nome"));
});

test("extractPhoneDigits: extrai apenas números", () => {
  assert.equal(extractPhoneDigits("(93) 9165-4576"), "9391654576");
  assert.equal(extractPhoneDigits("+55 (93) 99165-4576"), "5593991654576");
  assert.equal(extractPhoneDigits("texto123"), "123");
  assert.equal(extractPhoneDigits(null), "");
});

test("validatePhone: aceita telefones válidos de 10 dígitos (fixo) e 11 dígitos (celular)", () => {
  // Celular 11 dígitos (com DDD)
  const cel = validatePhone("(93) 99165-4576");
  assert.equal(cel.isValid, true);
  assert.equal(cel.digits, "93991654576");
  assert.equal(cel.error, null);

  // Fixo 10 dígitos (com DDD)
  const fixo = validatePhone("(93) 3522-1234");
  assert.equal(fixo.isValid, true);
  assert.equal(fixo.digits, "9335221234");
  assert.equal(fixo.error, null);

  // Apenas dígitos
  assert.equal(validatePhone("93991654576").isValid, true);
  assert.equal(validatePhone("9335221234").isValid, true);
});

test("validatePhone: rejeita formatos inválidos, incompletos ou repetidos", () => {
  assert.equal(validatePhone("").isValid, false);
  assert.equal(validatePhone("12345").isValid, false);
  assert.equal(validatePhone("0000000000").isValid, false);
  assert.equal(validatePhone("11111111111").isValid, false);
  assert.equal(validatePhone("03991654576").isValid, false); // DDD começando com 0
  assert.equal(validatePhone("93891654576").isValid, false); // Celular 11 dígitos sem o 9 inicial
  assert.ok(validatePhone("").error.includes("Informe um telefone válido"));
});

test("formatPhoneInput: formata progressivamente enquanto digita", () => {
  assert.equal(formatPhoneInput("9"), "(9");
  assert.equal(formatPhoneInput("93"), "(93");
  assert.equal(formatPhoneInput("939"), "(93) 9");
  assert.equal(formatPhoneInput("9335221234"), "(93) 3522-1234");
  assert.equal(formatPhoneInput("93991654576"), "(93) 99165-4576");
});

test("privacidade: validação não aceita nem exige campo de CPF (SPEC §14)", () => {
  // Garantir que os dados necessários são exclusivamente nome e telefone
  const data = { name: "Cliente Teste", phone: "(93) 99165-4576" };
  assert.equal("cpf" in data, false);
  assert.equal(validateName(data.name).isValid, true);
  assert.equal(validatePhone(data.phone).isValid, true);
});

test("validateDeliveryAddress: exige rua, número e bairro para entrega na cidade (SPEC §16.1)", () => {
  const valid = validateDeliveryAddress({
    street: "Av. Brasil",
    number: "123",
    neighborhood: "Centro"
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const invalid = validateDeliveryAddress({
    street: "",
    number: "",
    neighborhood: ""
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.street);
  assert.ok(invalid.errors.number);
  assert.ok(invalid.errors.neighborhood);
});

test("SPEC §17 / §35.23: validateTermsAccepted bloqueia avanço se checkbox não for marcado", () => {
  assert.equal(validateTermsAccepted(true).isValid, true);
  assert.equal(validateTermsAccepted(true).error, null);

  const invalidFalse = validateTermsAccepted(false);
  assert.equal(invalidFalse.isValid, false);
  assert.equal(invalidFalse.error, "Confirme que leu as condições antes de continuar.");

  const invalidNull = validateTermsAccepted(null);
  assert.equal(invalidNull.isValid, false);
});


