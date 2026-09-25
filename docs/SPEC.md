# SPEC DE IMPLEMENTAÇÃO — LANDING PAGE CERÂMICA RIO TROMBETAS

**Versão:** 1.0  
**Status:** Pronta para implementação  
**Tipo de projeto:** Landing Page institucional e comercial estática  
**Stack obrigatória:** HTML5 + CSS3 + JavaScript puro  
**Empresa:** Cerâmica Rio Trombetas

---

# 1. CONVENÇÕES NORMATIVAS

Esta especificação é mandatória.

Os termos abaixo deverão ser interpretados da seguinte forma:

- **DEVE / DEVEM:** requisito obrigatório.
- **NÃO DEVE / NÃO DEVEM:** comportamento proibido.
- **DEVE SER:** característica obrigatória.
- **DEVE PERMANECER:** comportamento obrigatório durante alterações futuras.
- **PENDENTE:** dado comercial ou institucional ainda não fornecido e que deverá permanecer centralizado para substituição posterior.

A implementação não deverá tomar decisões de produto, regra de negócio ou identidade visual que contrariem esta especificação.

---

# 2. OBJETIVO DO PROJETO

O sistema DEVE implementar uma Landing Page institucional para a Cerâmica Rio Trombetas.

A Landing Page DEVE:

1. apresentar a empresa;
2. apresentar os produtos comercializados;
3. exibir preços e condições comerciais;
4. permitir que Pessoa Física monte uma solicitação de orçamento;
5. calcular um valor estimado;
6. validar as modalidades de recebimento;
7. gerar uma mensagem estruturada;
8. encaminhar a solicitação para o WhatsApp da empresa;
9. direcionar Pessoa Jurídica diretamente ao atendimento comercial;
10. apresentar localização, horário e canais de contato;
11. funcionar prioritariamente em smartphones, sem prejudicar desktop e tablet.

O sistema NÃO DEVE:

- confirmar pedidos;
- processar pagamentos;
- gerenciar estoque;
- reservar produtos;
- garantir disponibilidade;
- definir prazo de entrega;
- armazenar dados pessoais em banco de dados;
- possuir login;
- possuir painel administrativo;
- possuir backend;
- utilizar frameworks.

A confirmação da venda DEVE ocorrer exclusivamente durante o atendimento da equipe da Cerâmica Rio Trombetas.

---

# 3. RESTRIÇÕES TÉCNICAS OBRIGATÓRIAS

## 3.1 Stack

O projeto DEVE utilizar exclusivamente:

- HTML5;
- CSS3;
- JavaScript ES6+ puro.

O projeto NÃO DEVE utilizar:

- React;
- Vue;
- Angular;
- Svelte;
- Next.js;
- Nuxt;
- TypeScript;
- Bootstrap;
- Tailwind;
- jQuery;
- bibliotecas de componentes;
- frameworks CSS;
- frameworks JavaScript;
- backend;
- Node.js como dependência de execução;
- bancos de dados.

O site DEVE funcionar como aplicação estática.

Ferramentas locais de desenvolvimento poderão ser utilizadas apenas para servir arquivos durante o desenvolvimento. O resultado final NÃO DEVE depender delas.

## 3.2 Arquitetura

A aplicação DEVE ser uma única página com navegação por âncoras.

A aplicação NÃO DEVE implementar roteamento SPA.

HTML, CSS e JavaScript DEVEM permanecer separados.

Os dados comerciais DEVEM ficar centralizados em arquivos JavaScript de configuração.

Valores, telefones, produtos, regras e textos comerciais NÃO DEVEM ser duplicados em vários arquivos.

---

# 4. ESTRUTURA OBRIGATÓRIA DA PÁGINA

A página DEVE utilizar a seguinte ordem:

1. Header;
2. Hero;
3. Quem Somos;
4. Produtos e Preços;
5. Aviso sobre produtos de 3ª qualidade;
6. Solicitar Orçamento;
7. Informações de Entrega e Retirada;
8. Localização;
9. Contato;
10. Footer.

A navegação principal DEVE possuir as âncoras:

- Início;
- Quem Somos;
- Produtos;
- Orçamento;
- Localização;
- Contato.

---

# 5. IDENTIDADE VISUAL E DESIGN SYSTEM

## 5.1 Diretriz de marca

A logo existente da Cerâmica Rio Trombetas DEVE ser preservada.

A implementação NÃO DEVE:

- redesenhar a logo;
- modificar suas formas;
- distorcer sua proporção;
- trocar suas cores;
- criar uma nova marca;
- aplicar efeitos que prejudiquem sua leitura.

Enquanto não existir uma versão definitiva em alta resolução, a interface DEVE aceitar a substituição do arquivo da logo sem exigir alteração no layout.

A identidade visual do site DEVE ser inspirada nas cores já existentes da marca, porém DEVE utilizar uma paleta refinada para garantir legibilidade, contraste e aparência contemporânea.

## 5.2 Tokens de cor

Os seguintes tokens DEVEM ser utilizados como base:

```css
:root {
  --color-brand-green: #0A7D3E;
  --color-brand-green-hover: #086A35;

  --color-brand-yellow: #F4C400;
  --color-brand-yellow-hover: #DDB200;

  --color-terracotta: #B85C38;
  --color-terracotta-dark: #8A452B;

  --color-bg: #F8F4EC;
  --color-surface: #FFFFFF;
  --color-surface-alt: #EFE5D5;

  --color-text: #2B2723;
  --color-text-muted: #6D655E;
  --color-border: #D8CCBC;

  --color-success: #167A45;
  --color-warning: #9A6500;
  --color-error: #B42318;

  --color-whatsapp: #128C7E;
}
```

Regras obrigatórias:

- Verde DEVE representar a identidade institucional e ações principais.
- Amarelo DEVE ser utilizado como destaque e NÃO DEVE receber texto branco.
- Terracota DEVE ser utilizado como apoio e conexão visual com o material cerâmico.
- O fundo principal DEVE ser claro e quente.
- O site NÃO DEVE utilizar grandes áreas saturadas de verde e amarelo simultaneamente.
- As cores da logo NÃO DEVEM ser alteradas para combinar com esses tokens.
- Estados de erro, sucesso ou indisponibilidade NÃO DEVEM depender somente de cor.

## 5.3 Tipografia

A interface DEVE utilizar no máximo duas famílias tipográficas.

Configuração recomendada e obrigatória para esta implementação:

- **Títulos:** Montserrat, pesos 600 e 700.
- **Texto e interface:** Inter, pesos 400, 500 e 600.
- Fallback obrigatório: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

A tipografia DEVE ser carregada de maneira otimizada.

O site DEVE continuar legível caso as fontes externas falhem.

Escala recomendada:

```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 2rem;
--font-size-4xl: clamp(2.25rem, 5vw, 4.5rem);
```

## 5.4 Espaçamentos

O projeto DEVE utilizar escala consistente:

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-7: 3rem;
--space-8: 4rem;
--space-9: 6rem;
```

## 5.5 Bordas e sombras

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-pill: 999px;
```

Cards DEVEM possuir sombras discretas.

A interface NÃO DEVE utilizar sombras pesadas, glassmorphism excessivo ou efeitos neon.

## 5.6 Container e grid

O conteúdo DEVE possuir:

- largura máxima entre 1180px e 1240px;
- padding lateral mínimo de 16px em smartphones;
- padding lateral progressivo em telas maiores.

Seções DEVEM utilizar espaçamento vertical consistente.

---

# 6. RESPONSIVIDADE

A implementação DEVE ser mobile-first.

Os seguintes pontos DEVEM ser validados:

- 360px;
- 390px;
- 480px;
- 768px;
- 1024px;
- 1280px;
- 1440px ou superior.

Breakpoints recomendados:

```css
@media (min-width: 640px) {}
@media (min-width: 768px) {}
@media (min-width: 1024px) {}
@media (min-width: 1280px) {}
```

O layout NÃO DEVE depender de uma largura fixa.

Não DEVE existir scroll horizontal.

Botões e campos interativos DEVEM ter área de toque mínima de aproximadamente 44x44px.

---

# 7. HEADER

O Header DEVE:

- permanecer fixo no topo;
- conter a logo;
- conter links de navegação;
- conter CTA de orçamento ou WhatsApp;
- possuir fundo legível sobre qualquer conteúdo;
- reduzir discretamente sua altura após o usuário iniciar a rolagem.

Em smartphones:

- o menu DEVE ser recolhido;
- o botão de menu DEVE possuir rótulo acessível;
- o menu DEVE ser navegável por teclado;
- o foco DEVE permanecer visível;
- o menu DEVE fechar ao selecionar uma seção.

O Header NÃO DEVE cobrir o título das seções ao navegar por âncoras.

Deve-se usar `scroll-margin-top`.

---

# 8. HERO SECTION

## 8.1 Versão 1

A versão inicial do site DEVE utilizar imagem estática ou composição visual estática de alta qualidade.

A versão inicial NÃO DEVE depender de vídeo.

A estrutura da Hero DEVE ficar preparada para receber futuramente um vídeo controlado por scroll sem exigir reconstrução da seção.

A Hero DEVE conter:

- nome Cerâmica Rio Trombetas;
- uma frase institucional curta;
- CTA primário “Solicitar orçamento”;
- CTA secundário “Ver produtos”;
- elemento visual relacionado à cerâmica, construção ou produto real.

Texto inicial recomendado:

**Título:**  
`Materiais cerâmicos para construir com confiança.`

**Texto de apoio:**  
`Conheça nossos produtos, consulte preços e envie sua solicitação de orçamento diretamente pelo WhatsApp.`

O texto NÃO DEVE fazer alegações de tempo de mercado, certificações, prêmios ou capacidade produtiva sem dados fornecidos pela empresa.

## 8.2 Futuro vídeo

Quando existir um vídeo aprovado:

- o vídeo DEVE usar `muted`;
- DEVE usar `playsinline`;
- DEVE possuir `poster`;
- DEVE possuir fallback estático;
- DEVE respeitar `prefers-reduced-motion`;
- NÃO DEVE bloquear o conteúdo;
- NÃO DEVE impedir navegação caso falhe;
- DEVE ser otimizado para web.

Nenhum comportamento de scroll-jacking DEVE ser implementado.

---

# 9. QUEM SOMOS

A seção DEVE explicar a atividade da Cerâmica Rio Trombetas sem inventar dados históricos.

Enquanto a empresa não fornecer texto institucional definitivo, DEVE ser utilizado um texto provisório factual e genérico:

> A Cerâmica Rio Trombetas trabalha com a produção e comercialização de materiais cerâmicos para diferentes necessidades da construção. Por meio deste site, clientes podem conhecer os produtos disponíveis, consultar preços de referência e encaminhar solicitações diretamente para a equipe comercial.

A seção DEVE priorizar:

- clareza;
- proximidade;
- qualidade de atendimento;
- apresentação dos produtos.

A seção NÃO DEVE inventar:

- ano de fundação;
- número de funcionários;
- capacidade de produção;
- certificações;
- premiações;
- clientes atendidos;
- cobertura geográfica;
- promessas de qualidade não documentadas.

---

# 10. CATÁLOGO DE PRODUTOS

## 10.1 Dados atuais

O catálogo DEVE conter os seguintes produtos:

| ID | Produto | Qualidade | Dimensão | Preço unitário | Milheiro | Orçamento automático | Conta para mínimo de entrega |
|---|---|---|---|---:|---:|---|---|
| `tijolo-6f-1` | Tijolo 6 Furos | 1ª | 9 × 13 × 23 cm | R$ 0,90 | R$ 900,00 | Sim | Sim |
| `tijolo-6f-2` | Tijolo 6 Furos | 2ª | 9 × 13 × 23 cm | R$ 0,85 | R$ 850,00 | Sim | Sim |
| `tijolo-6f-3` | Tijolo 6 Furos | 3ª | 9 × 13 × 23 cm | R$ 0,80 | R$ 800,00 | Não | Sim, apenas se futuramente entrar no fluxo automático |
| `cabeca-6f` | Cabeça 6 Furos | — | metade do tijolo 6F, corte no eixo vertical | R$ 0,50 | — | Sim | Não |
| `tijolo-8f-1` | Tijolo 8 Furos | 1ª | 9 × 19 × 19 cm | R$ 1,00 | R$ 1.000,00 | Sim | Sim |
| `tijolo-8f-2` | Tijolo 8 Furos | 2ª | 9 × 19 × 19 cm | R$ 0,95 | R$ 950,00 | Sim | Sim |
| `tijolo-8f-3` | Tijolo 8 Furos | 3ª | 9 × 19 × 19 cm | R$ 0,90 | R$ 900,00 | Não | Sim, apenas se futuramente entrar no fluxo automático |
| `cabeca-8f` | Cabeça 8 Furos | — | metade do tijolo 8F, corte no eixo vertical | R$ 0,60 | — | Sim | Não |
| `tijolo-macico` | Tijolo Maciço | — | não informar | R$ 2,00 | — | Sim | Não |
| `capote` | Capote | — | não informar | R$ 10,00 | — | Sim | Não |
| `cobogo` | Cobogó | — | não informar | R$ 8,00 | — | Sim | Não |
| `tijolo-laje` | Tijolo para Laje | — | não informar | R$ 2,00 | — | Sim | Não |

## 10.2 Regras de apresentação

Cada card DEVE exibir, quando aplicável:

- imagem;
- nome;
- qualidade;
- dimensão;
- preço unitário;
- preço do milheiro;
- condição comercial;
- CTA.

Dimensões NÃO DEVEM ser exibidas quando não houver dado.

O site NÃO DEVE exibir “dimensão não informada”.

Para 6F e 8F, o preço do milheiro DEVE ser exibido com destaque secundário.

Quando aplicável, DEVE existir a observação:

`O valor do milheiro contempla a entrega quando as condições de entrega forem atendidas.`

O orçamento final continua sujeito à confirmação comercial.

## 10.3 3ª qualidade

Os tijolos de 3ª qualidade:

- DEVEM aparecer no catálogo;
- DEVEM mostrar preço de referência;
- NÃO DEVEM entrar no orçamento automático;
- DEVEM possuir CTA “Consultar pelo WhatsApp”;
- DEVEM informar que a disponibilidade varia conforme a produção;
- DEVEM direcionar para atendimento direto.

## 10.4 Tijolo para laje

Com o preço unitário cadastrado em R$ 2,00:

- DEVE aparecer no catálogo com a imagem disponível;
- DEVE exibir o preço unitário de referência;
- DEVE entrar no orçamento automático;
- DEVE possuir CTA “Solicitar orçamento”;
- NÃO DEVE contar para o mínimo de entrega.

Se o preço deixar de estar confirmado e voltar a ficar pendente:

- DEVE aparecer no catálogo;
- NÃO DEVE possuir preço inventado;
- NÃO DEVE entrar no orçamento automático;
- DEVE exibir “Preço sob consulta”;
- DEVE possuir CTA para WhatsApp.

---

# 11. IMAGENS DOS PRODUTOS

As imagens reais dos produtos DEVEM ser priorizadas.

Os recortes dos produtos DEVEM:

- manter formato;
- manter quantidade de furos;
- manter disposição dos furos;
- manter textura;
- manter cor original;
- manter marcas naturais;
- manter aparência de queima;
- evitar reconstrução artificial do produto.

Tijolos queimados NÃO DEVEM ter sua coloração corrigida para tons mais claros.

A interface NÃO DEVE alterar a cor do produto por filtros CSS.

Cards DEVEM utilizar `object-fit: contain`.

As imagens DEVEM possuir `alt` descritivo.

Imagens abaixo da dobra DEVEM utilizar `loading="lazy"`.

Quando possível, os recortes DEVEM ser exportados como WebP transparente otimizado, mantendo PNG como fonte original.

---

# 12. REGRAS DE NEGÓCIO

## RN01 — Catálogo

O sistema DEVE apresentar apenas produtos comercializados pela empresa.

## RN02 — 3ª qualidade

Tijolos de 3ª qualidade NÃO DEVEM ser adicionados ao orçamento automático.

A compra DEVE ser tratada via WhatsApp.

## RN03 — Cálculo

O cálculo DEVE utilizar:

`valor do item = preço unitário × quantidade`

O total DEVE ser:

`total estimado = soma de todos os itens elegíveis`

O sistema NÃO DEVE adicionar taxas automaticamente.

O total DEVE ser apresentado como estimativa.

## RN04 — Mínimo para entrega

Entrega na cidade e entrega no porto DEVEM ser habilitadas somente quando o pedido possuir pelo menos 500 tijolos inteiros dos modelos 6F e/ou 8F.

6F e 8F DEVEM ser somados.

Exemplo válido:

- 300 unidades de 6F;
- 200 unidades de 8F;
- total elegível = 500;
- entrega habilitada.

## RN05 — Itens que não contam para o mínimo

Os seguintes itens NÃO DEVEM contar para os 500:

- cabeças;
- tijolo maciço;
- capote;
- cobogó;
- tijolo para laje.

## RN06 — Produtos complementares na entrega

Cabeças, maciços, capotes, cobogós e tijolos para laje DEVEM poder acompanhar uma entrega quando o pedido já possuir pelo menos 500 tijolos inteiros 6F/8F.

Exemplo:

- 500 tijolos 6F;
- 50 maciços;
- 20 cabeças;
- entrega permitida para o conjunto.

## RN07 — Produtos complementares isolados

Se o pedido não possuir 500 tijolos inteiros 6F/8F:

- maciço;
- capote;
- cobogó;
- laje;
- cabeças;

NÃO DEVEM habilitar entrega, independentemente da quantidade.

A modalidade disponível DEVE ser retirada na empresa.

## RN08 — Cabeças

A cabeça DEVE ser tratada como metade do tijolo correspondente, resultante de corte no eixo vertical.

Cabeças NÃO DEVEM contar para a quantidade mínima de entrega.

## RN09 — Modalidades

As modalidades DEVEM ser:

1. Entrega na cidade;
2. Entrega no porto;
3. Retirada na empresa.

## RN10 — Entrega na cidade

A modalidade DEVE depender da regra de 500 tijolos inteiros.

O endereço DEVE ser coletado quando esta modalidade for selecionada.

## RN11 — Entrega no porto

A modalidade DEVE seguir a mesma quantidade mínima da entrega na cidade.

Após a descarga no porto, o transporte posterior DEVE ser responsabilidade do cliente.

A interface DEVE disponibilizar o campo opcional:

`Comunidade de destino`

## RN12 — Retirada

Retirada na empresa DEVE ser permitida para qualquer quantidade de produtos elegíveis.

## RN13 — Descarga

A equipe da olaria DEVE ser descrita como responsável apenas pela descarga.

O site DEVE informar que:

- na cidade, a descarga ocorre em frente ao imóvel;
- no porto, a descarga ocorre no ponto definido pela empresa;
- transporte posterior é responsabilidade do cliente;
- a equipe não transporta os produtos para o interior de residência, terreno ou construção.

## RN14 — Caráter do orçamento

O orçamento DEVE ser identificado como estimativo e consultivo.

O envio pelo WhatsApp NÃO DEVE ser tratado como pedido confirmado.

## RN15 — Confirmação

A confirmação DEVE ocorrer durante atendimento humano.

A equipe DEVE confirmar:

- disponibilidade;
- prazo;
- modalidade;
- pagamento;
- demais condições.

## RN16 — Pessoa Física

Pessoa Física DEVE acessar o fluxo completo de orçamento.

## RN17 — Pessoa Jurídica

Pessoa Jurídica NÃO DEVE utilizar o fluxo automático.

DEVE receber CTA direto para o setor comercial via WhatsApp.

## RN18 — Preço final

O preço exibido pelo site DEVE ser descrito como estimativo e sujeito a confirmação comercial.

---

# 13. FLUXO DE ORÇAMENTO

## 13.1 Entrada

A seção DEVE iniciar perguntando:

`Como deseja atendimento?`

Opções:

- Pessoa Física;
- Pessoa Jurídica.

A opção selecionada DEVE permanecer claramente identificada.

## 13.2 Pessoa Jurídica

Ao escolher Pessoa Jurídica:

- o formulário automático DEVE ser ocultado;
- DEVE ser apresentado um texto explicativo;
- DEVE existir botão “Falar com o setor comercial”;
- o botão DEVE abrir o WhatsApp com mensagem pré-preenchida;
- NÃO DEVE ser calculado orçamento automático.

Mensagem sugerida:

`Olá! Gostaria de falar com o setor comercial da Cerâmica Rio Trombetas sobre uma compra para Pessoa Jurídica.`

## 13.3 Pessoa Física

O fluxo DEVE ser dividido visualmente em etapas.

Etapas:

1. Dados;
2. Produtos;
3. Recebimento;
4. Revisão;
5. WhatsApp.

A interface DEVE possuir indicador de progresso.

O usuário DEVE poder voltar para qualquer etapa anterior sem perder os dados durante a sessão atual.

Os dados DEVEM existir somente em memória.

Não utilizar `localStorage`, `sessionStorage`, IndexedDB ou cookies para armazenar dados pessoais.

---

# 14. ETAPA 1 — DADOS DO CLIENTE

Campos obrigatórios:

- Nome;
- Telefone.

Campos adicionais DEVEM ser solicitados de forma condicional conforme modalidade de recebimento.

O telefone DEVE aceitar formatação amigável, mas a lógica DEVE trabalhar apenas com dígitos ao validar.

O nome DEVE:

- possuir pelo menos 2 caracteres significativos;
- não aceitar somente espaços.

O sistema NÃO DEVE solicitar CPF.

---

# 15. ETAPA 2 — PRODUTOS

A interface DEVE permitir adicionar múltiplos produtos.

Cada item elegível DEVE possuir:

- seletor de quantidade;
- botão adicionar;
- possibilidade de editar quantidade;
- possibilidade de remover.

Quantidade:

- DEVE ser número inteiro;
- DEVE ser maior que zero;
- NÃO DEVE aceitar valor decimal;
- DEVE possuir `inputmode="numeric"`.

O usuário DEVE informar quantidades em unidades.

O usuário NÃO DEVE precisar escolher entre “unidade” e “milheiro”.

O milheiro DEVE ser apenas referência de preço no catálogo.

O subtotal de cada item DEVE atualizar automaticamente.

O total DEVE atualizar automaticamente.

Produtos de 3ª qualidade e produtos sem preço confirmado NÃO DEVEM ser adicionáveis nesta etapa. O tijolo para laje possui preço cadastrado e pode ser adicionado ao orçamento automático.

---

# 16. ETAPA 3 — RECEBIMENTO

O sistema DEVE calcular:

```js
deliveryEligibleQuantity =
  soma das quantidades de produtos com countsTowardDeliveryMinimum === true;
```

As opções DEVEM reagir à quantidade:

### Se `deliveryEligibleQuantity < 500`

- Entrega na cidade: desabilitada;
- Entrega no porto: desabilitada;
- Retirada na empresa: habilitada.

A interface DEVE explicar:

`Para entrega, o pedido precisa conter pelo menos 500 tijolos inteiros de 6 e/ou 8 furos. Os demais produtos não contam para esse mínimo.`

### Se `deliveryEligibleQuantity >= 500`

As três modalidades DEVEM ficar disponíveis.

## 16.1 Entrega na cidade

Ao selecionar:

Campos obrigatórios:

- Rua;
- Número;
- Bairro.

Campos opcionais:

- Complemento;
- Observações.

## 16.2 Entrega no porto

Ao selecionar:

- NÃO exigir endereço residencial;
- exibir campo `Comunidade de destino`;
- o campo DEVE ser opcional;
- exibir explicação de que a informação indica o destino posterior da carga;
- manter Observações opcional.

## 16.3 Retirada na empresa

Ao selecionar:

- endereço do cliente NÃO DEVE ser exigido;
- comunidade NÃO DEVE ser exibida;
- Observações DEVE permanecer opcional.

---

# 17. ETAPA 4 — REVISÃO

A tela DEVE exibir:

- nome;
- telefone;
- itens;
- quantidade por item;
- subtotal por item;
- total estimado;
- modalidade;
- endereço, quando aplicável;
- comunidade de destino, quando preenchida;
- observações, quando preenchidas.

A revisão DEVE exibir avisos comerciais antes do envio.

Avisos obrigatórios:

1. `Este orçamento é apenas uma estimativa.`
2. `O envio pelo WhatsApp não confirma o pedido.`
3. `A disponibilidade, prazo, pagamento e demais condições serão confirmados pela equipe.`
4. `Nas entregas, a equipe realiza somente a descarga no ponto combinado.`

Deve existir checkbox obrigatório:

`Li e entendi que esta solicitação não representa a confirmação do pedido.`

O envio NÃO DEVE ser liberado antes da confirmação.

---

# 18. ETAPA 5 — WHATSAPP

## 18.1 Número

Número informado atualmente:

`93 9165-4576`

O número DEVE ficar centralizado em configuração.

O formato internacional E.164 utilizado no link `wa.me` DEVE ser validado com a empresa antes da publicação.

A implementação NÃO DEVE inventar dígitos ou alterar o número fornecido.

Exemplo de configuração:

```js
export const company = {
  name: "Cerâmica Rio Trombetas",
  whatsappDisplay: "+55 (93) 9165-4576",
  whatsappE164: "+559391654576",
  whatsappWaMe: "559391654576"
};
```

## 18.2 Mensagem PF

A mensagem DEVE seguir estrutura semelhante:

```text
Olá! Gostaria de solicitar um orçamento na Cerâmica Rio Trombetas.

DADOS DO CLIENTE
Nome: [nome]
Telefone: [telefone]

PRODUTOS
- [produto] — [quantidade] un. — R$ [subtotal]
- [produto] — [quantidade] un. — R$ [subtotal]

Total estimado: R$ [total]

RECEBIMENTO
Modalidade: [modalidade]

[se cidade]
Rua: [...]
Número: [...]
Bairro: [...]
Complemento: [...]

[se porto e informado]
Comunidade de destino: [...]

Observações: [...]

Estou ciente de que este valor é estimativo e que o pedido será confirmado pela equipe durante o atendimento.
```

Campos vazios NÃO DEVEM aparecer.

A mensagem DEVE ser codificada com `encodeURIComponent`.

---

# 19. SEÇÃO DE INFORMAÇÕES DE ENTREGA

A seção DEVE resumir visualmente:

- mínimo de 500 tijolos 6F/8F;
- 6F e 8F podem ser combinados;
- cabeças não contam para o mínimo;
- maciço, capote, cobogó e laje não contam para o mínimo;
- esses itens podem acompanhar pedido elegível;
- retirada aceita qualquer quantidade;
- descarga possui limitações.

A apresentação DEVE utilizar cards ou lista visual simples.

A seção NÃO DEVE utilizar linguagem jurídica complexa.

---

# 20. LOCALIZAÇÃO

A seção DEVE suportar:

- endereço;
- mapa;
- botão “Abrir no Google Maps”;
- horário.

Dados atualmente pendentes:

- endereço físico;
- horário de funcionamento.

Enquanto o endereço não estiver configurado:

- o mapa NÃO DEVE ser exibido;
- o botão Google Maps NÃO DEVE ser exibido;
- a interface DEVE exibir `Endereço em atualização`.

Quando o endereço for informado:

- o mapa DEVE ser carregado somente quando próximo da viewport;
- o iframe DEVE usar `loading="lazy"`;
- NÃO DEVE ser necessária chave privada exposta no frontend.

---

# 21. CONTATO

A seção DEVE apresentar:

- WhatsApp;
- telefone;
- e-mail somente se futuramente fornecido.

O site NÃO DEVE inventar e-mail.

Botões externos DEVEM utilizar atributos de segurança apropriados quando abrirem nova aba.

---

# 22. FOOTER

O footer DEVE conter:

- logo;
- nome da empresa;
- atalhos de navegação;
- WhatsApp;
- copyright;
- ano calculado automaticamente em JavaScript.

O footer NÃO DEVE conter informações comerciais ainda não confirmadas.

---

# 23. ANIMAÇÕES E INTERAÇÕES

As animações DEVEM ser discretas.

Permitido:

- fade-up;
- fade-in;
- leve deslocamento;
- hover de cards;
- leve zoom em imagens;
- header reduzido ao rolar;
- transições de formulário;
- entrada suave de campos condicionais.

Utilizar `IntersectionObserver` para reveals.

Não utilizar bibliotecas externas de animação.

NÃO DEVE existir:

- scroll-jacking;
- parallax agressivo;
- elementos piscando;
- animação contínua sem função;
- delays longos;
- transições que bloqueiem interação.

Com `prefers-reduced-motion: reduce`:

- animações DEVEM ser removidas ou reduzidas;
- conteúdo DEVE permanecer integralmente acessível.

---

# 24. ACESSIBILIDADE

A implementação DEVE seguir WCAG 2.2 AA como referência.

Obrigatório:

- HTML semântico;
- um único `h1`;
- hierarquia correta de headings;
- `label` associado a cada campo;
- foco visível;
- navegação por teclado;
- `aria-live` para erros, total e atualizações relevantes;
- contraste suficiente;
- botões reais para ações;
- links reais para navegação;
- `alt` adequado;
- link “Pular para o conteúdo”;
- mensagens de erro próximas aos campos;
- não depender de placeholder como label;
- não depender somente de cor;
- menu mobile acessível.

---

# 25. SEO

O documento DEVE possuir:

- `<html lang="pt-BR">`;
- `<title>`;
- meta description;
- viewport;
- Open Graph;
- favicon quando disponível;
- canonical em produção;
- headings semânticos.

Título recomendado:

`Cerâmica Rio Trombetas | Tijolos e Materiais Cerâmicos`

Descrição recomendada:

`Conheça os produtos da Cerâmica Rio Trombetas, consulte preços de referência e envie sua solicitação de orçamento diretamente pelo WhatsApp.`

Quando endereço e dados completos forem fornecidos, DEVE ser adicionado JSON-LD do tipo `LocalBusiness`.

Dados desconhecidos NÃO DEVEM ser inventados no JSON-LD.

---

# 26. PRIVACIDADE E SEGURANÇA

Os dados do cliente DEVEM existir somente na memória da página até o redirecionamento ao WhatsApp.

NÃO utilizar:

- localStorage;
- sessionStorage;
- IndexedDB;
- cookies para o orçamento;
- banco de dados;
- envio silencioso a servidores.

Entradas do usuário NÃO DEVEM ser inseridas com `innerHTML`.

Preferir:

- `textContent`;
- criação explícita de elementos;
- validação por funções;
- `encodeURIComponent`.

Links com `target="_blank"` DEVEM possuir:

`rel="noopener noreferrer"`

Nenhuma chave secreta DEVE existir no JavaScript.

---

# 27. DESEMPENHO

Objetivos:

- LCP alvo abaixo de 2,5 s;
- CLS alvo abaixo de 0,1;
- INP alvo abaixo de 200 ms em dispositivos adequados.

A implementação DEVE:

- otimizar imagens;
- lazy-load imagens fora da primeira dobra;
- não carregar mapa imediatamente;
- manter JavaScript reduzido;
- evitar dependências externas desnecessárias;
- definir dimensões de imagens;
- utilizar `fetchpriority="high"` apenas para mídia principal da Hero;
- evitar layout shift.

A versão inicial NÃO DEVE carregar vídeo de Hero.

---

# 28. ARQUITETURA DE ARQUIVOS

A estrutura DEVE seguir padrão equivalente:

```text
ceramica-rio-trombetas/
│
├── index.html
│
├── assets/
│   ├── logo/
│   ├── products/
│   ├── hero/
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── sections.css
│   └── responsive.css
│
└── js/
    ├── app.js
    ├── config.js
    ├── products.js
    ├── catalog.js
    ├── quotation.js
    ├── delivery.js
    ├── validation.js
    ├── whatsapp.js
    ├── navigation.js
    └── animations.js
```

Arquivos vazios ou módulos sem necessidade NÃO DEVEM ser criados apenas para seguir a estrutura.

Se uma responsabilidade for pequena, módulos DEVEM ser combinados de maneira coerente.

---

# 29. MODELO CENTRAL DE PRODUTO

Todos os produtos DEVEM seguir estrutura equivalente:

```js
{
  id: "tijolo-6f-1",
  name: "Tijolo 6 Furos",
  category: "tijolo",
  holes: 6,
  quality: 1,
  dimensions: "9 × 13 × 23 cm",
  unitPrice: 0.90,
  thousandPrice: 900.00,
  image: "./assets/products/tijolo-6f-1.webp",
  quoteEnabled: true,
  directContact: false,
  countsTowardDeliveryMinimum: true,
  description: "..."
}
```

Produto complementar:

```js
{
  id: "tijolo-macico",
  name: "Tijolo Maciço",
  category: "complementar",
  unitPrice: 2.00,
  thousandPrice: null,
  dimensions: null,
  quoteEnabled: true,
  directContact: false,
  countsTowardDeliveryMinimum: false
}
```

Produto de 3ª qualidade:

```js
{
  id: "tijolo-8f-3",
  name: "Tijolo 8 Furos",
  quality: 3,
  unitPrice: 0.90,
  thousandPrice: 900.00,
  quoteEnabled: false,
  directContact: true,
  countsTowardDeliveryMinimum: true
}
```

Modelo genérico para qualquer produto cujo preço ainda não foi informado:

```js
{
  id: "produto-pendente",
  name: "Produto com preço pendente",
  unitPrice: null,
  quoteEnabled: false,
  directContact: true,
  countsTowardDeliveryMinimum: false
}
```

---

# 30. ESTADO DA APLICAÇÃO

O orçamento DEVE possuir estado único em memória.

Exemplo:

```js
const state = {
  customerType: null,
  customer: {
    name: "",
    phone: ""
  },
  items: [],
  receivingMethod: null,
  deliveryAddress: {
    street: "",
    number: "",
    neighborhood: "",
    complement: ""
  },
  destinationCommunity: "",
  notes: "",
  acceptedTerms: false
};
```

Toda interface do orçamento DEVE refletir esse estado.

Não manter fontes de verdade duplicadas no DOM.

---

# 31. FORMATAÇÃO MONETÁRIA

Valores DEVEM ser formatados com:

```js
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
```

Cálculos monetários DEVEM evitar erros visíveis de ponto flutuante.

A implementação DEVE preferir cálculo em centavos inteiros.

Exemplo:

```js
unitPriceCents: 90
```

---

# 32. VALIDAÇÃO E ERROS

Erros DEVEM:

- ser claros;
- informar como corrigir;
- aparecer perto do campo;
- receber foco quando o usuário tenta avançar;
- não apagar os dados já preenchidos.

Exemplos:

`Informe seu nome.`

`Informe um telefone válido.`

`Adicione pelo menos um produto ao orçamento.`

`Para escolher entrega, adicione pelo menos 500 tijolos inteiros de 6 e/ou 8 furos.`

`Confirme que leu as condições antes de continuar.`

---

# 33. ESTADOS DE INTERFACE

Componentes DEVEM possuir estados:

- padrão;
- hover;
- focus;
- active;
- disabled;
- error;
- success quando aplicável.

Botões desabilitados DEVEM explicar o motivo quando houver regra de negócio envolvida.

Cards de 3ª qualidade DEVEM ter indicação visual:

`Disponibilidade sob consulta`

Cards sem orçamento automático NÃO DEVEM aparentar possuir botão “Adicionar”.

---

# 34. COMPORTAMENTO SEM JAVASCRIPT

A página institucional DEVE permanecer legível sem JavaScript.

Sem JavaScript:

- navegação por âncoras DEVE funcionar;
- Quem Somos DEVE aparecer;
- catálogo básico DEVE permanecer acessível se possível;
- contatos DEVEM permanecer acessíveis.

O orçamento interativo DEVE exibir mensagem:

`Para montar o orçamento automaticamente, ative o JavaScript. Você também pode falar diretamente conosco pelo WhatsApp.`

---

# 35. TESTES FUNCIONAIS OBRIGATÓRIOS

A implementação somente DEVE ser considerada pronta após validar:

1. 499 tijolos 6F → cidade indisponível.
2. 500 tijolos 6F → cidade disponível.
3. 300 6F + 200 8F → entrega disponível.
4. 400 6F + 100 cabeças → entrega indisponível.
5. 500 cabeças → entrega indisponível.
6. 500 maciços → entrega indisponível.
7. 500 6F + maciços → entrega disponível para o conjunto.
8. 250 6F + 250 8F + cobogó + capote → entrega disponível.
9. Retirada → permitida em qualquer quantidade.
10. Porto abaixo de 500 → indisponível.
11. Porto com 500 → disponível.
12. Porto → campo Comunidade de destino aparece.
13. Cidade → campo Comunidade não aparece.
14. Retirada → campos de endereço não aparecem.
15. 3ª qualidade → não entra no carrinho.
16. Tijolo para laje com preço cadastrado → entra no carrinho e não conta para o mínimo de entrega.
17. Pessoa Jurídica → não vê orçamento automático.
18. Pessoa Física → vê fluxo completo.
19. Alterar quantidade → recalcula subtotal e total.
20. Remover item → recalcula total.
21. Total usa preço unitário × quantidade.
22. Campos inválidos impedem avanço.
23. Checkbox final não marcado impede envio.
24. Mensagem WhatsApp não inclui campos vazios.
25. Navegação completa funciona por teclado.
26. `prefers-reduced-motion` reduz animações.
27. Página funciona em Chrome, Edge, Firefox e Safari atuais.
28. Página não apresenta overflow horizontal em 360px.
29. Falha de imagem não quebra a estrutura.
30. Endereço da empresa ausente não exibe mapa inválido.

---

# 36. CONTEÚDO AINDA PENDENTE

Os seguintes dados DEVEM permanecer centralizados e fáceis de atualizar:

- endereço da Cerâmica Rio Trombetas;
- horário de funcionamento;
- e-mail, caso exista;
- texto institucional definitivo;
- arquivo definitivo da logo em melhor qualidade;
- número WhatsApp no formato internacional E.164 confirmado;
- imagens definitivas de todos os produtos.

A ausência desses dados NÃO DEVE levar a IA desenvolvedora a inventá-los.

---

# 37. CRITÉRIOS DE ACEITAÇÃO VISUAL

A interface final DEVE transmitir:

- proximidade;
- confiança;
- simplicidade;
- construção;
- material cerâmico;
- identidade local;
- modernidade sem descaracterizar a marca.

A interface NÃO DEVE parecer:

- template genérico de construção;
- e-commerce completo;
- marketplace;
- aplicativo SaaS;
- página excessivamente tecnológica;
- página com excesso de amarelo e verde;
- arte de panfleto;
- site rústico pesado.

Os produtos DEVEM ser protagonistas visuais.

Os fundos DEVEM ser majoritariamente claros e neutros.

Verde, amarelo e terracota DEVEM atuar como identidade e destaque, não como preenchimento excessivo.

---

# 38. ORDEM OBRIGATÓRIA DE IMPLEMENTAÇÃO

A IA responsável pelo desenvolvimento DEVE executar na seguinte ordem:

1. criar estrutura de arquivos;
2. criar tokens e base CSS;
3. criar dados centralizados;
4. implementar Header;
5. implementar Hero estática;
6. implementar Quem Somos;
7. renderizar catálogo por JavaScript;
8. implementar fluxo PF/PJ;
9. implementar carrinho/orçamento;
10. implementar regras de entrega;
11. implementar revisão;
12. implementar geração de WhatsApp;
13. implementar informações de entrega;
14. implementar localização e contato;
15. implementar Footer;
16. implementar responsividade;
17. implementar acessibilidade;
18. implementar animações leves;
19. executar testes funcionais;
20. corrigir problemas;
21. otimizar performance.

A IA NÃO DEVE começar por animações ou efeitos antes do fluxo funcional estar completo.

---

# 39. DEFINIÇÃO DE PRONTO

O projeto somente DEVE ser considerado concluído quando:

- utilizar apenas HTML, CSS e JavaScript puro;
- estiver responsivo;
- catálogo estiver data-driven;
- regras de entrega estiverem corretas;
- orçamento PF funcionar;
- PJ for direcionada corretamente;
- cálculo estiver correto;
- WhatsApp gerar mensagem correta;
- dados pessoais não forem persistidos;
- navegação por teclado funcionar;
- layout funcionar em smartphone;
- produtos de 3ª qualidade seguirem fluxo direto;
- dados pendentes não forem inventados;
- identidade visual estiver coerente com a marca existente;
- todos os testes obrigatórios estiverem aprovados.

---

# 40. INSTRUÇÃO FINAL PARA A IA IMPLEMENTADORA

Implemente exatamente esta especificação.

Não introduza frameworks.

Não altere regras comerciais.

Não invente dados da empresa.

Não substitua a logo.

Não crie backend.

Não armazene dados pessoais.

Não simplifique as validações de entrega.

Priorize primeiro correção funcional, depois responsividade, acessibilidade, performance e acabamento visual.

Sempre que houver conflito entre uma escolha estética e uma regra de negócio, a regra de negócio DEVE prevalecer.
