# Atividade Individual: Landing Page Interativa

**Disciplina:** Programação Web  
**Modalidade:** Individual  
**Tema do Projeto:** Cerâmica Rio Trombetas — Apresentação Institucional e Orçamento Interativo  
**Stack Utilizada:** HTML5, CSS3 e JavaScript Puro (ES6+)  

> **Nota Educacional:** Este projeto foi desenvolvido exclusivamente para fins acadêmicos como parte da avaliação da disciplina de Programação Web. Todos os dados de contato, preços e localização são utilizados em caráter de demonstração e estudo de caso.

---

## 1. Visão Geral do Projeto

A **Cerâmica Rio Trombetas** é uma landing page interativa desenvolvida para apresentação de uma olaria regional produtora de materiais cerâmicos (tijolos de 6 e 8 furos, cabeças, capotes, cobogós e lajes).

O sistema conta com:
- **Apresentação institucional:** História, proposta e diferenciais da empresa;
- **Catálogo dinâmico de produtos:** Listagem completa com preços de referência por milheiro e unidade;
- **Simulador de Orçamento Interativo em 5 Etapas:**
  1. Identificação do cliente (Pessoa Física ou Jurídica) e dados de contato;
  2. Seleção de produtos e cálculo de subtotais/total em tempo real;
  3. Modalidade de entrega (cidade, porto ou retirada) com validação de regras de quantidade mínima (500 tijolos inteiros);
  4. Revisão detalhada do pedido;
  5. Formatação automática e envio do pedido via WhatsApp com `encodeURIComponent`.
- **Localização e Contato:** Endereço da olaria com botão para o Google Maps e canais rápidos de atendimento.
- **Rodapé completo:** Atalhos de navegação, contatos e horário de funcionamento.

---

## 2. Gabarito de Atendimento aos Requisitos do Edital

O projeto foi construído cobrindo rigorosamente **todos os quatro blocos obrigatórios** da folha de requisitos da atividade:

| Requisito do Edital | Onde Encontrar no Projeto | Como Foi Implementado |
| :--- | :--- | :--- |
| **3.1 HTML: Estrutura Completa** | [`src/index.html`](src/index.html) | `<!DOCTYPE html>`, `<html lang="pt-BR">`, `<head>` com metatags (responsividade, SEO, OpenGraph) e `<body>` semântico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). |
| **3.1 HTML: Conteúdo Coerente** | [`src/index.html`](src/index.html) | Textos, imagens reais de produtos cerâmicos, especificações, tabelas de preço e botões integrados ao tema. |
| **3.1 HTML: `<input>` e `<button>`** | [`src/index.html`](src/index.html) e [`src/js/quotation.js`](src/js/quotation.js) | Múltiplos `<input>` (texto, telefone com máscara, números, rádio) e botões `<button>` de navegação e ação. |
| **3.2 CSS: Arquivos Externos** | [`src/css/`](src/css/) | Todos os estilos em arquivos `.css` externos vinculados por `<link rel="stylesheet">` (`base.css`, `layout.css`, `components.css`, `sections.css`). Zero CSS inline. |
| **3.2 CSS: Layout e Design** | [`src/css/`](src/css/) | Design responsivo mobile-first, paleta temática harmoniosa (tons terracota e verdes), variáveis CSS (`tokens`), flexbox e grid. |
| **3.2 CSS: Seletores Diversos** | [`src/css/`](src/css/) | Uso expressivo de seletores por tag (`h1`, `p`, `a`), por classe (`.btn`, `.location-card`, `.form-input`) e por ID (`#localizacao`, `#contato`, `#current-year`). |
| **3.3 DOM: `getElementById()` e `querySelector()`** | [`src/js/navigation.js`](src/js/navigation.js) e [`src/js/location.js`](src/js/location.js) | Seleção via `document.getElementById()` (ex.: âncoras) e `document.querySelector()` / `querySelectorAll()` em todos os módulos. |
| **3.3 DOM: `textContent`** | [`src/js/quotation.js`](src/js/quotation.js) e [`src/js/location.js`](src/js/location.js) | Atualização dinâmica e segura de textos, mensagens de erro, subtotais e totais usando `textContent` (sem risco de injeção). |
| **3.3 DOM: Leitura com `.value`** | [`src/js/quotation.js`](src/js/quotation.js) | Leitura dos campos de nome (`inputName.value`), telefone (`inputPhone.value`), quantidades e endereços. |
| **3.3 DOM: Estilização com `.style`** | [`src/js/quotation.js`](src/js/quotation.js) | Destaque visual direto de borda e fundo em terracota nos campos com erro (`input.style.borderColor`, `input.style.backgroundColor`) e destaque do valor total (`totalValue.style.color`). |
| **3.4 Eventos: `addEventListener()`** | [`src/js/`](src/js/) | Dezenas de ouvintes para gerenciar navegação, formulários, catálogo e etapas do orçamento. |
| **3.4 Eventos: Múltiplos Tipos** | [`src/js/quotation.js`](src/js/quotation.js) | `click` (botões de ação), `input` (máscara de telefone e quantidades), `change` (seleção PF/PJ e frete), `submit` (envio de dados) e `keydown` (acessibilidade). |
| **3.4 Eventos: `event.preventDefault()`** | [`src/js/quotation.js`](src/js/quotation.js) | Impede o recarregamento indesejado da página na submissão dos formulários do fluxo de cotação. |
| **6.2 Formato: Duplo Clique (`file://`)** | [`src/js/app.bundle.js`](src/js/app.bundle.js) | Scripts unificados carregados com `defer`, permitindo execução offline imediata por duplo clique sem bloqueio de CORS. |
| **8. Regras: Zero Frameworks / Backend** | Todo o repositório | Sem React, Vue, jQuery, Bootstrap, Tailwind, APIs externas ou banco de dados. Apenas tecnologias web nativas. |

---

## 3. Como Executar o Projeto

### Opção 1: Execução Offline Direta (Duplo Clique) — Recomendado para Avaliação
1. Extraia o arquivo `.zip` enviado no SIGAA ou clone este repositório do GitHub.
2. Dê um **duplo clique** no arquivo [`src/index.html`](src/index.html).
3. O projeto abrirá diretamente em seu navegador (Chrome, Edge, Firefox, Safari) com **100% das funcionalidades interativas ativas**, sem necessidade de instalar dependências nem rodar servidores locais.

### Opção 2: Servidor Web Local (Opcional)
Caso prefira rodar por um servidor de desenvolvimento:
```bash
# Utilizando qualquer servidor estático (ex.: npx serve ou Live Server do VS Code)
npx serve src
```

---

## 4. Testes Automatizados da Aplicação

O projeto conta com uma suíte abrangente de **103 testes unitários** e de cenários de negócio, desenvolvida com o test runner nativo do Node.js:

```bash
# Executa todos os testes da aplicação
npm test
```

### Resultados dos Testes:
```text
✔ 103 testes executados
✔ 103 testes aprovados (0 falhas)
```

Os testes cobrem:
- Validação de nomes e telefones com DDD;
- Regras de cálculo de milheiros e subtotais em centavos inteiros;
- Regras de entrega (mínimo de 500 tijolos inteiros de 6F/8F);
- Fluxo de orçamento para Pessoa Física e atendimento corporativo para Pessoa Jurídica;
- Renderização do catálogo, mapa de localização e rodapé.

---

## 5. Estrutura de Arquivos

```text
.
├── .gitignore               # Configurações de exclusão do Git
├── package.json             # Metadados do projeto e scripts de teste e bundle
├── README.md                # Documentação e gabarito acadêmico do projeto
│
├── docs/                    # Documentação técnica e especificações
│   ├── SPEC.md              # Especificação de requisitos funcionais
│   └── IMPLEMENTATION-PLAN.md
│
├── scripts/                 # Scripts utilitários de desenvolvimento
│   └── bundle.mjs           # Gerador do bundle consolidado para duplo clique
│
├── src/                     # Código-fonte da Landing Page
│   ├── index.html           # Estrutura HTML5 semântica da página
│   │
│   ├── assets/              # Imagens e referências visuais dos produtos
│   │   └── products/        # Fotos reais dos produtos cerâmicos
│   │
│   ├── css/                 # Folhas de estilo CSS3 puras e modulares
│   │   ├── base.css         # Variáveis (tokens), reset e tipografia
│   │   ├── layout.css       # Estrutura de containers e grid responsivo
│   │   ├── components.css   # Botões, cards, inputs e badges
│   │   ├── sections.css     # Estilos de cada seção (hero, catálogo, orçamento, rodapé)
│   │   └── main.css         # Ponto de entrada das folhas de estilo
│   │
│   └── js/                  # Lógica interativa em JavaScript puro (ES6+)
│       ├── app.bundle.js    # Bundle consolidado para execução offline/duplo clique
│       ├── config.js        # Configurações institucionais e comerciais
│       ├── products.js      # Catálogo e dados dos produtos
│       ├── validation.js    # Funções de validação de entradas
│       ├── delivery.js      # Regras de cálculo de entrega e retirada
│       ├── whatsapp.js      # Formatação da mensagem para o WhatsApp
│       ├── quotation.js     # Fluxo completo do simulador de orçamento
│       ├── catalog.js       # Renderização do catálogo de produtos
│       ├── location.js      # Renderização da localização e rodapé
│       ├── navigation.js    # Acessibilidade e navegação por âncoras
│       └── animations.js    # Micro-interações discretas
│
└── tests/                   # Suíte de testes unitários automatizados (Node.js)
    ├── catalog.test.mjs
    ├── delivery.test.mjs
    ├── location.test.mjs
    ├── products.test.mjs
    ├── quotation.test.mjs
    ├── responsive.test.mjs
    ├── scenarios.test.mjs
    ├── seo.test.mjs
    ├── validation.test.mjs
    └── whatsapp.test.mjs
```

---

## 6. Instruções para Entrega

1. **Entrega no SIGAA:**
   - Crie uma pasta com seu nome (ex.: `landing-page-luiz`).
   - Copie os arquivos do projeto para dentro dela.
   - Compacte em um arquivo `.zip` e envie na tarefa da disciplina.
2. **Entrega no GitHub:**
   - Faça o `git push` para o repositório solicitado pelo professor.