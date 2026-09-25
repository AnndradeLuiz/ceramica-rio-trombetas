# Cerâmica Rio Trombetas

Landing Page institucional e comercial da Cerâmica Rio Trombetas.

O projeto permite que clientes conheçam a empresa, consultem produtos e
preços e encaminhem solicitações de orçamento diretamente pelo WhatsApp.

---

## Objetivo

A aplicação deve disponibilizar:

- apresentação institucional;
- catálogo de produtos;
- preços de referência;
- orçamento para Pessoa Física;
- contato comercial para Pessoa Jurídica;
- regras de entrega e retirada;
- localização;
- informações de contato.

O sistema não confirma pedidos, não realiza pagamentos e não controla estoque.

---

## Stack

O projeto utiliza exclusivamente:

- HTML5;
- CSS3;
- JavaScript ES6+.

Não há framework frontend.

Não há backend.

Não há banco de dados.

A aplicação final é totalmente estática.

---

## Documentação

A especificação completa está em:

`docs/SPEC.md`

As instruções para agentes de desenvolvimento estão em:

`AGENTS.md`

Após a etapa de planejamento, o plano de implementação deverá existir em:

`docs/IMPLEMENTATION-PLAN.md`

A SPEC representa a fonte oficial das regras do sistema.

---

## Estrutura

```text
.
├── AGENTS.md
├── README.md
├── docs/
│   ├── SPEC.md
│   └── IMPLEMENTATION-PLAN.md
│
├── src/
│   ├── index.html
│   ├── assets/
│   │   ├── logo/
│   │   ├── products/
│   │   ├── hero/
│   │   └── icons/
│   │
│   ├── css/
│   └── js/
│
└── tests/