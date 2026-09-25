// Funções puras de validação de dados de cliente para o fluxo de orçamento.
// Regras obrigatórias: SPEC §14, §26 e §32. Nunca solicita CPF.

/**
 * Valida o nome do cliente.
 * Regra: pelo menos 2 caracteres significativos (não aceita apenas espaços).
 * @param {string} name
 * @returns {{ isValid: boolean, error: string | null, value: string }}
 */
export function validateName(name) {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Informe seu nome (mínimo de 2 caracteres).",
      value: trimmed
    };
  }
  return {
    isValid: true,
    error: null,
    value: trimmed
  };
}

/**
 * Normaliza o telefone para conter apenas dígitos.
 * @param {string} phone
 * @returns {string}
 */
export function extractPhoneDigits(phone) {
  return typeof phone === "string" ? phone.replace(/\D/g, "") : "";
}

/**
 * Valida o telefone do cliente com base nos dígitos.
 * Aceita telefones brasileiros válidos com DDD (10 ou 11 dígitos).
 * Rejeita dígitos repetidos inválidos (ex.: 0000000000).
 * @param {string} phone
 * @returns {{ isValid: boolean, error: string | null, digits: string }}
 */
export function validatePhone(phone) {
  const digits = extractPhoneDigits(phone);

  if (digits.length < 10 || digits.length > 11) {
    return {
      isValid: false,
      error: "Informe um telefone válido com DDD (10 ou 11 dígitos).",
      digits
    };
  }

  // DDDs brasileiros válidos começam com dígitos de 1 a 9
  const dddFirstDigit = Number(digits[0]);
  if (dddFirstDigit < 1 || dddFirstDigit > 9) {
    return {
      isValid: false,
      error: "Informe um DDD válido (ex.: 93).",
      digits
    };
  }

  // Celular de 11 dígitos no Brasil começa com 9 no terceiro dígito
  if (digits.length === 11 && digits[2] !== "9") {
    return {
      isValid: false,
      error: "Celular com 11 dígitos deve iniciar com o dígito 9 após o DDD.",
      digits
    };
  }

  // Rejeita sequências onde todos os dígitos são iguais
  if (/^(\d)\1+$/.test(digits)) {
    return {
      isValid: false,
      error: "Informe um telefone válido.",
      digits
    };
  }

  return {
    isValid: true,
    error: null,
    digits
  };
}

/**
 * Aplica máscara amigável ao telefone enquanto o usuário digita.
 * Formatos: (XX) XXXX-XXXX (10 dígitos) ou (XX) XXXXX-XXXX (11 dígitos).
 * @param {string} value
 * @returns {string}
 */
export function formatPhoneInput(value) {
  const digits = extractPhoneDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Valida a quantidade de produtos para o carrinho (SPEC §15).
 * Regras: número inteiro, maior que zero, sem decimais.
 * @param {any} quantity
 * @returns {{ isValid: boolean, error: string | null, value: number }}
 */
export function validateQuantity(quantity) {
  const num = Number(quantity);

  if (!Number.isInteger(num) || num <= 0) {
    return {
      isValid: false,
      error: "Informe uma quantidade válida em unidades (número inteiro maior que zero).",
      value: 0
    };
  }

  return {
    isValid: true,
    error: null,
    value: num
  };
}

/**
 * Valida o endereço para entrega na cidade (SPEC §16.1).
 * Campos obrigatórios: Rua, Número e Bairro.
 * @param {{ street: string, number: string, neighborhood: string }} address
 * @returns {{ isValid: boolean, errors: { street?: string, number?: string, neighborhood?: string } }}
 */
export function validateDeliveryAddress(address = {}) {
  const errors = {};
  const street = typeof address.street === "string" ? address.street.trim() : "";
  const number = typeof address.number === "string" ? address.number.trim() : "";
  const neighborhood = typeof address.neighborhood === "string" ? address.neighborhood.trim() : "";

  if (street.length < 2) {
    errors.street = "Informe o nome da rua ou avenida.";
  }

  if (number.length < 1) {
    errors.number = "Informe o número do imóvel.";
  }

  if (neighborhood.length < 2) {
    errors.neighborhood = "Informe o bairro.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Valida o aceite obrigatório do aviso comercial (SPEC §17 e §32).
 * @param {boolean} acceptedTerms
 * @returns {{ isValid: boolean, error: string | null }}
 */
export function validateTermsAccepted(acceptedTerms) {
  if (acceptedTerms !== true) {
    return {
      isValid: false,
      error: "Confirme que leu as condições antes de continuar."
    };
  }
  return {
    isValid: true,
    error: null
  };
}



