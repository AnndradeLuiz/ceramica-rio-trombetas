# Plano de implementação — Landing Page Cerâmica Rio Trombetas

## Objetivo do projeto

Entregar uma página institucional e comercial estática, prioritariamente para smartphones, que apresente a empresa e os produtos, mostre preços de referência, permita à Pessoa Física preparar uma solicitação com total estimado e a encaminhe ao atendimento pelo WhatsApp. Pessoa Jurídica segue diretamente ao setor comercial. O site não confirma venda, pagamento, estoque, disponibilidade ou prazo.

**Fonte oficial única:** `docs/SPEC.md` (versão 1.0, seções 1–40). Antes de cada fase, reler esse arquivo e o plano. Não editar a SPEC por iniciativa da implementação.

## Restrições técnicas

- Somente HTML5, CSS3 e JavaScript ES6+ puro em `src/`; uma página com âncoras, sem roteamento SPA, framework, backend, banco de dados ou dependência de execução de Node.js.
- Manter HTML, CSS e JavaScript separados. Ferramentas de teste e servidor local servem apenas ao desenvolvimento; a entrega continua estática e sem build obrigatório.
- Não inventar produtos, preços, dimensões, história, localização, horários, e-mail, número internacional, certificações ou promessas comerciais. Preservar forma e cores da logo e as características físicas das imagens dos produtos.
- Não persistir dados pessoais, nem usar `innerHTML` com entradas do usuário. Validar entradas, inserir texto com `textContent` ou nós explícitos e codificar a mensagem com `encodeURIComponent`.
- Cada fase exige leitura prévia da SPEC e deste plano, teste do fluxo alterado, console sem erros, ao menos uma viewport mobile e uma desktop, teclado quando aplicável e relato dos arquivos, requisitos, testes e pendências. Não avançar de fase automaticamente.

## Arquitetura proposta

`src/index.html` fornece estrutura semântica e conteúdo institucional legível sem JavaScript. CSS mobile-first cuida de tokens, base, layout e componentes. Módulos JavaScript nativos concentram configuração comercial, produtos, cálculo e regras puras, com um controlador de interface para o orçamento. O DOM representa o estado; não é uma segunda fonte de verdade. O catálogo interativo é renderizado a partir de dados centrais. Sem JavaScript, âncoras, Quem Somos e contato legível continuam disponíveis; a área de orçamento exibe a mensagem exigida na seção 34. O catálogo básico sem JavaScript será oferecido se puder ser feito sem duplicar preços e dados comerciais; essa possibilidade será verificada na fase 7.

## Estrutura de arquivos proposta

Os caminhos abaixo são uma proposta, não arquivos a criar nesta etapa. Criar cada arquivo somente na fase em que adquirir responsabilidade real. `src/` é a raiz de publicação, coerente com `README.md`, `AGENTS.md` e o padrão equivalente da SPEC §28.

| Caminho | Responsabilidade |
|---|---|
| `src/index.html` | Estrutura, navegação, conteúdo institucional e fallback sem JavaScript. |
| `src/css/tokens.css` | Tokens exatos da SPEC §5. |
| `src/css/base.css` | Reset mínimo, tipografia, elementos, foco e preferências de movimento. |
| `src/css/layout.css` | Container, espaçamento, grids e estrutura mobile-first. |
| `src/css/components.css` | Botões, cards, campos, estados e mensagens reutilizados. |
| `src/css/sections.css` | Aparência própria das seções, quando necessária. |
| `src/css/responsive.css` | Ajustes progressivos para telas maiores, somente se justificarem arquivo separado. |
| `src/js/config.js` | Empresa, telefone exibido, `whatsappE164: null` até confirmação, textos comerciais e dados pendentes. |
| `src/js/products.js` | Doze produtos da SPEC §10.1, preços em centavos, imagem real quando identificada, sinalizadores de orçamento e entrega. |
| `src/js/catalog.js` | Renderização segura dos cards a partir de `products.js`. |
| `src/js/quotation.js` | Estado único em memória, etapas, itens, subtotal, total e atualização da interface PF/PJ. |
| `src/js/delivery.js` | Funções puras de elegibilidade e modalidades; campos condicionais podem permanecer no controlador se não justificarem módulo próprio. |
| `src/js/validation.js` | Validação de nome, telefone, quantidade, endereço e aceite. |
| `src/js/whatsapp.js` | Montagem de mensagens PF/PJ/consulta e URL somente com E.164 confirmado. |
| `src/js/navigation.js` | Menu acessível e header fixo/compacto. |
| `src/js/animations.js` | Revelações discretas via `IntersectionObserver`, apenas na fase 17. |
| `src/js/app.js` | Inicialização e ligação dos módulos, sem regras comerciais duplicadas. |
| `src/assets/products/` | PNGs originais existentes e, se aprovadas, versões WebP fiéis. |
| `src/assets/logo/`, `src/assets/hero/` | Somente mídia oficial fornecida; não criar arquivo substituto fictício. |
| `tests/` | Testes de regras puras e cenários de fluxo; ferramentas de teste fora do site publicado. |

Se um módulo proposto permanecer trivial, incorporá-lo ao módulo responsável mais próximo. A estrutura da SPEC §28 é equivalente, não uma ordem para criar arquivos vazios. `package.json` pode ser criado na fase 3 apenas com `type: module` e script para o executor nativo `node --test`, permitindo importar os módulos ES nos testes sem dependências ou build. Ele não faz parte do site publicado.

## Estratégia de estado

Manter uma única estrutura em memória conforme SPEC §30: tipo PF/PJ, dados do cliente, itens por ID e quantidade, modalidade, endereço, comunidade, observações, aceite e etapa atual. Eventos atualizam o estado; renderizações derivam dele. Subtotal e total são calculados em centavos inteiros, nunca salvos em duplicidade; `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` formata a exibição. Ao mudar itens, recalcular elegibilidade; se uma entrega selecionada deixar de ser válida, invalidar a modalidade e pedir nova escolha. Voltar etapas conserva dados apenas enquanto a página estiver aberta. Não usar localStorage, sessionStorage, IndexedDB, cookies ou envio silencioso.

## Estratégia de renderização do catálogo

Cadastrar somente os doze IDs e valores da SPEC §10.1. Usar os PNGs existentes quando corresponderem de modo verificável ao produto; não atribuir fotos de 1ª/2ª à 3ª qualidade como se fossem imagens específicas. Para imagens faltantes, usar apresentação sem foto identificada, sem alterar produto real. Cards exibem apenas dados existentes; milheiro é referência, quantidade do orçamento é sempre em unidades. 3ª qualidade exibe preço, disponibilidade sob consulta e contato direto, sem entrar no fluxo automático. A laje exibe sua imagem e preço de R$ 2,00, entra no orçamento automático e não conta para o mínimo de entrega. Usar `object-fit: contain`, `alt` descritivo, dimensões de mídia e lazy loading abaixo da dobra. A fonte única de preços permanece em `products.js`; uma solução sem JavaScript não pode criar tabela de preços paralela.

## Estratégia do fluxo de orçamento

Entrada “Como deseja atendimento?” com seleção persistente visualmente. PJ oculta o formulário e oferece contato comercial direto, sem cálculo. PF segue Dados → Produtos → Recebimento → Revisão → WhatsApp, com indicador de progresso, avanço validado e retorno sem perda de dados. O carrinho aceita somente produtos elegíveis, quantidades inteiras positivas em unidades, edição e remoção; total estimado não inclui taxas. Cidade e porto exigem pelo menos 500 tijolos inteiros 6F/8F somados; complementares não contam, mas acompanham pedido elegível. Retirada vale para qualquer quantidade positiva de produtos elegíveis. Campos de endereço só existem para cidade; comunidade opcional só aparece no porto. Revisão exige aceite explícito. Mensagens PF, PJ e consulta omitem campos vazios; links de WhatsApp só são habilitados com E.164 confirmado.

## Estratégia de validação

Criar funções puras para nome (mínimo de dois caracteres significativos), telefone (normalizar para dígitos antes da validação, sem inventar regra local não especificada), quantidade (inteiro positivo), itens, modalidade, endereço da cidade e aceite. Erros próximos do campo explicam correção, são anunciados por `aria-live` e conduzem foco ao primeiro erro no avanço, sem apagar valores. A validação final reavalia estado, elegibilidade e consentimento antes de criar a URL. Nunca pedir CPF. Dados pendentes são valores ausentes explícitos, com interface apropriada em vez de dados fictícios.

## Estratégia de responsividade

Começar em 360px, com conteúdo flexível, mínimo lateral de 16px, áreas interativas de cerca de 44×44px e container de 1180–1240px. Adaptar sem largura fixa e verificar 360, 390, 480, 768, 1024, 1280 e pelo menos 1440px. Cada componente é validado em mobile e desktop na própria fase; a fase 15 consolida todos os tamanhos, menu, catálogo, formulários e ausência de scroll horizontal.

## Estratégia de acessibilidade

Implementar em cada fase: HTML semântico, um `h1`, headings ordenados, link “Pular para o conteúdo”, links para navegação e botões para ações, labels reais, foco visível, contraste WCAG 2.2 AA como referência, texto alternativo, erros próximos e `aria-live` para erros e totais. Menu, etapas e seleção PF/PJ funcionam por teclado. `prefers-reduced-motion` vale desde a base CSS; a fase 16 audita e corrige o conjunto, sem adiar a acessibilidade dos componentes.

## Estratégia de testes

Testes de regras puras começam nas fases que introduzem os módulos: catálogo/dados, cálculo em centavos, elegibilidade, validação e mensagens. Testes de interface cobrem etapas, condicionais, foco, seleção PF/PJ, teclado e sem JavaScript. A fase 19 executa os 30 cenários da SPEC §35, mais navegadores atuais Chrome, Edge, Firefox e Safari, viewports especificadas, console, mídia ausente, privacidade e metas LCP/CLS/INP quando o ambiente permitir medição. Automatização pode usar o executor nativo do Node e uma ferramenta de navegador somente em desenvolvimento. Cada fase termina com verificação manual do trecho alterado e testes relacionados; não adiar as regras críticas para o fim.

## Inventário e pendências verificadas

O repositório contém `AGENTS.md`, `README.md`, `docs/SPEC.md` e 11 PNGs em `src/assets/products/`: `cabeca-6f.png`, `cabeca-8f.png`, `capote.png`, `cobogo.png`, `combogo-desenho.png`, `macico.png`, `tijolo-6f-primeira.png`, `tijolo-6f-segunda.png`, `tijolo-8f-primeira.png`, `tijolo-8f-segunda.png`, `tijolo-laje.png`. `combogo-desenho.png` é uma referência de conjunto. `macico.png` mostra cavidades e não identifica com segurança um tijolo maciço, sendo mantido com fallback. Não há arquivo específico de 3ª qualidade. A SPEC §36 registra como pendentes: endereço, horário, e-mail se existir, texto institucional definitivo, logo definitiva em melhor qualidade, WhatsApp E.164 confirmado e imagens definitivas de todos os produtos. O tijolo para laje possui imagem e preço de referência de R$ 2,00, podendo entrar no orçamento automático sem contar para o mínimo de entrega. Enquanto não houver arquivo oficial da logo, usar o nome textual “Cerâmica Rio Trombetas” e registrar a finalização visual da marca como pendente.

## Fases de implementação

### Fase 1 — Fundação estática
**Objetivo:** estabelecer uma página única mínima, servível a partir de `src/`, com âncoras e fallback institucional sem JavaScript.  
**Requisitos relacionados:** SPEC §§2, 3, 4, 28, 34, 38.1, 40.  
**Arquivos envolvidos:** criar `src/index.html`; utilizar `AGENTS.md`, `README.md` e SPEC oficial confirmada; não modificar outros arquivos.  
**Tarefas:**  
- [x] Reler `docs/SPEC.md` e verificar que `src/` será a raiz estática publicada.  
- [x] Criar HTML5 com `lang="pt-BR"`, viewport, `main`, seções na ordem da §4 e IDs das seis âncoras; conteúdo ainda não implementado deve ser marcado estruturalmente sem informação inventada.  
- [x] Incluir link de salto, navegação por âncoras e mensagem `noscript` literal da §34 na área do orçamento.  
- [x] Servir localmente `src/` e testar abertura, âncoras e leitura sem JavaScript.  
**Regras de negócio relevantes:** nenhuma ação deve sugerir compra confirmada; dados pendentes não aparecem como fatos.  
**Validação:** abrir em 360px e desktop com JS ligado/desligado, percorrer âncoras por teclado, verificar console e ausência de referências quebradas.  
**Critérios de conclusão:** HTML semântico único, ordem e âncoras corretas, conteúdo básico legível sem JS e nenhum dado comercial inventado.

### Fase 2 — Tokens e base visual
**Objetivo:** fixar a fundação do Design System mobile-first antes de componentes.  
**Requisitos relacionados:** SPEC §§5, 6, 24, 28, 33, 37, 38.2.  
**Arquivos envolvidos:** criar `src/css/tokens.css`, `src/css/base.css`, `src/css/layout.css`; modificar `src/index.html`; utilizar tokens literais da SPEC.  
**Tarefas:**  
- [x] Transcrever tokens de cor, tipografia, espaçamento e raio da §5 sem modificar cores da logo.  
- [x] Estabelecer tipografia Montserrat/Inter com fallback indicado, carregamento otimizado e legibilidade sem fontes externas.  
- [x] Definir fundo claro, container 1180–1240px, padding mobile mínimo 16px e espaçamento das seções.  
- [x] Definir foco visível, alvos de toque e regra base de `prefers-reduced-motion`.  
- [x] Verificar contraste das combinações efetivamente usadas, especialmente amarelo sem texto branco.  
**Regras de negócio relevantes:** textos e preços não são embutidos no CSS; identidade da marca permanece íntegra.  
**Validação:** conferir tokens na folha computada, 360px e 1280px, zoom de texto, falha de fonte externa, foco por Tab e console.  
**Critérios de conclusão:** tokens exatos disponíveis, layout sem largura fixa nem overflow, legibilidade e foco verificáveis.

### Fase 3 — Dados centrais e modelo de produto
**Objetivo:** cadastrar os dados comerciais conhecidos e representar pendências explicitamente.  
**Requisitos relacionados:** SPEC §§3.2, 10.1, 12 RN01–RN02, 18.1, 29, 31, 36, 38.3.  
**Arquivos envolvidos:** criar `src/js/config.js`, `src/js/products.js`, `tests/products.test.mjs` e `package.json` mínimo para testes ES; utilizar SPEC §10.1 e PNGs existentes; modificar `src/index.html` apenas se necessário para carregar módulos em fase posterior.  
**Tarefas:**  
- [x] Registrar nome, telefone exibido `93 9165-4576`, endereço/horário/e-mail pendentes e textos comerciais centralizados.  
- [x] Registrar os 12 IDs da tabela §10.1, qualidade, dimensão quando fornecida, preço unitário e milheiro em centavos, categoria, `quoteEnabled`, `directContact` e `countsTowardDeliveryMinimum`.  
- [x] Mapear PNG somente após conferir correspondência; manter imagem ausente para 3ª qualidade e anotar finalidade de `combogo-desenho.png` antes de associá-lo.  
- [x] Configurar `package.json` apenas com `type: module` e script `test` que execute `node --test`; não incluir dependências de execução.  
- [x] Testar IDs únicos, valores e sinalizadores exatos, inclusive 3ª qualidade fora do orçamento, laje com preço no orçamento e cabeças fora do mínimo.  
**Regras de negócio relevantes:** não inventar dados; 3ª qualidade tem preço de referência e contato direto, mas não entra no carrinho; laje com preço de referência entra no orçamento e não conta para o mínimo de entrega; somente 6F/8F inteiros elegíveis contam para esse mínimo.  
**Validação:** comparar cada registro com as 12 linhas da §10.1 e rodar testes de integridade; inspecionar URLs de mídia e console.  
**Critérios de conclusão:** fonte central única, 12 registros corretos, pendências explícitas e testes de integridade aprovados.

### Fase 4 — Header e navegação
**Objetivo:** entregar Header, navegação fixa e menu mobile acessíveis, com identificação textual provisória enquanto a logo definitiva não estiver disponível.  
**Requisitos relacionados:** SPEC §§4, 5.1, 7, 24, 33, 38.4.  
**Arquivos envolvidos:** criar `src/js/navigation.js`, `src/css/components.css` se houver componentes reais; modificar `src/index.html`, `src/css/layout.css`, `src/js/app.js`; utilizar `src/assets/logo/` somente quando a logo oficial for fornecida.  
**Tarefas:**  
- [x] Identificar provisoriamente a marca somente pelo texto “Cerâmica Rio Trombetas” e reservar local claramente preparado para substituição pela logo oficial, sem criar, redesenhar ou gerar uma logo.  
- [x] Implementar seis links de âncora, CTA e menu recolhido no smartphone com botão rotulado, `aria-expanded`, foco e fechamento ao selecionar seção.  
- [x] Aplicar fundo legível, `scroll-margin-top` nas seções e redução discreta da altura após rolagem.  
- [x] Testar ida e volta por teclado, foco e âncora sem JavaScript; registrar apenas a finalização visual da marca como pendente se a logo não estiver disponível.  
**Regras de negócio relevantes:** CTA de WhatsApp não cria link `wa.me` com E.164 presumido; não alterar nem substituir a identidade da marca por uma logo criada.  
**Validação:** teclado e leitor de atributos do menu em 360px/desktop, clique em todas as âncoras, título não coberto, console limpo.  
**Critérios de conclusão:** Header fixo, navegação, menu mobile e acessibilidade validados; na ausência da logo oficial, nome textual exibido e espaço de substituição preparado.

### Fase 5 — Hero estática
**Objetivo:** apresentar marca, proposta institucional e dois CTAs com mídia estática fiel.  
**Requisitos relacionados:** SPEC §§8, 11, 24, 27, 37, 38.5.  
**Arquivos envolvidos:** modificar `src/index.html`, `src/css/sections.css`, `src/css/layout.css`; utilizar `src/assets/products/` ou mídia oficial em `src/assets/hero/`.  
**Tarefas:**  
- [x] Usar nome da empresa, texto factual aprovado pela §8 e CTAs “Solicitar orçamento” e “Ver produtos”.  
- [x] Selecionar imagem real disponível ou composição estática que não atribua contexto falso ao produto; prever contêiner de mídia substituível no futuro.  
- [x] Definir dimensões da mídia, texto alternativo apropriado e prioridade de carregamento só para a mídia principal.  
- [x] Não incluir vídeo, controle por scroll, scroll-jacking ou animação necessária à leitura.  
**Regras de negócio relevantes:** nenhuma alegação sobre tempo, certificação, capacidade ou qualidade não documentada; cores do produto preservadas.  
**Validação:** 360px/desktop, imagem ausente e falha de carregamento, CTAs por teclado, sem JS, console e deslocamento de layout.  
**Critérios de conclusão:** Hero estática legível e navegável, com mídia verídica e estrutura apta à troca futura sem implementar vídeo.

### Fase 6 — Quem Somos
**Objetivo:** publicar apresentação institucional factual e provisória.  
**Requisitos relacionados:** SPEC §§4, 9, 24, 34, 38.6.  
**Arquivos envolvidos:** modificar `src/index.html`, `src/css/sections.css`; utilizar texto literal provisório da SPEC §9.  
**Tarefas:**  
- [x] Inserir texto provisório factual da §9 e heading adequado na ordem da página.  
- [x] Verificar leitura em mobile, desktop, sem JS e por teclado.  
- [x] Conferir ausência de afirmações institucionais não fornecidas.  
**Regras de negócio relevantes:** história, cobertura, premiações, certificações e promessas não podem ser inventadas.  
**Validação:** comparação textual com §9, inspeção visual e semântica, console.  
**Critérios de conclusão:** seção clara, legível sem JS e sem alegações não comprovadas.

### Fase 7 — Catálogo e aviso de 3ª qualidade
**Objetivo:** renderizar produtos e preços a partir da fonte central e publicar o aviso comercial.  
**Requisitos relacionados:** SPEC §§4, 10, 11, 12 RN01–RN02/RN18, 24, 31, 33–34, 35.15–16/29, 38.7.  
**Arquivos envolvidos:** criar `src/js/catalog.js`, `tests/catalog.test.mjs`; modificar `src/index.html`, `src/css/components.css`, `src/css/sections.css`, `src/js/app.js`; utilizar `src/js/products.js`, `src/js/config.js`, `src/assets/products/`, `tests/products.test.mjs`.  
**Tarefas:**  
- [x] Renderizar cards com nome, qualidade, dimensão apenas quando informada, preço unitário, milheiro 6F/8F e observação de entrega apenas quando aplicável.  
- [x] Mostrar a 3ª qualidade com preço de referência, “Disponibilidade sob consulta”, aviso próprio após o catálogo e CTA “Consultar pelo WhatsApp”; mostrar laje com imagem disponível, preço unitário de R$ 2,00 e CTA “Solicitar orçamento”.  
- [x] Não exibir “Adicionar” em card fora do orçamento; enquanto E.164 faltar, mostrar contato sem fabricar URL acionável.  
- [x] Usar elementos e `textContent`, `object-fit: contain`, `alt`, `loading="lazy"` abaixo da dobra e estado visual para imagem indisponível.  
- [x] Verificar se catálogo básico sem JS pode permanecer acessível sem duplicar dados comerciais; registrar decisão técnica e preservar fallback institucional exigido.  
- [x] Testar 12 cards, preços, ausência de dimensões inexistentes e falha de imagem.  
**Regras de negócio relevantes:** preços são referência; milheiro não altera unidade de compra; 3ª qualidade não entra no automático; laje com preço entra no automático, mas não conta para o mínimo de entrega; imagem de qualidade distinta não representa produto ausente.  
**Validação:** comparar cards com §10.1, 360px/desktop, console, teclado, imagens falhas e JS desligado.  
**Critérios de conclusão:** catálogo fiel e orientado por dados, CTAs corretos e aviso de 3ª qualidade visível.

### Fase 8 — Seleção PF/PJ e dados PF
**Objetivo:** abrir o fluxo de atendimento correto e validar a primeira etapa da PF.  
**Requisitos relacionados:** SPEC §§12 RN16–RN17, 13–14, 24, 26, 30, 32–34, 35.17–18/22, 38.8.  
**Arquivos envolvidos:** criar `src/js/quotation.js`, `src/js/validation.js`, `tests/validation.test.mjs`; modificar `src/index.html`, `src/css/components.css`, `src/js/app.js`; utilizar `src/js/config.js`.  
**Tarefas:**  
- [x] Criar estado único em memória e seletor “Como deseja atendimento?” com opção identificada por texto e estado acessível.  
- [x] Em PJ, ocultar etapas automáticas, exibir explicação e CTA comercial preparado para receber link validado na fase 12; nenhum cálculo.  
- [x] Em PF, apresentar indicador Dados → Produtos → Recebimento → Revisão → WhatsApp e retorno às etapas anteriores sem perda de estado.  
- [x] Capturar nome e telefone, aceitar formatação amigável, validar dígitos e mínimo de dois caracteres significativos; não pedir CPF.  
- [x] Exibir erro próximo ao campo, `aria-live` e foco no primeiro inválido; testar alternância PF/PJ e dados conservados apenas na sessão da página.  
**Regras de negócio relevantes:** PJ nunca usa orçamento automático; dados PF não são persistidos; CPF não é solicitado.  
**Validação:** testes de validação, caminho PF/PJ em 360px/desktop, teclado, erros e console; inspecionar ausência de armazenamento.  
**Critérios de conclusão:** escolha inequívoca, PJ isolada do formulário, primeira etapa PF validada e estado somente em memória.

### Fase 9 — Itens e cálculo do orçamento
**Objetivo:** permitir carrinho PF com múltiplos itens e total estimado correto.  
**Requisitos relacionados:** SPEC §§12 RN02–RN03/RN18, 15, 24, 29–32, 35.15–16/19–22, 38.9.  
**Arquivos envolvidos:** modificar `src/js/quotation.js`, `src/js/validation.js`, `src/index.html`, `src/css/components.css`; criar `tests/quotation.test.mjs`; utilizar `src/js/products.js`.  
**Tarefas:**  
- [x] Testar primeiro adição, edição, remoção, quantidade zero/decimal/inválida, subtotal e total em centavos.  
- [x] Implementar seletor de quantidade `inputmode="numeric"`, unidade como única medida de entrada e botão de adição somente para elegíveis.  
- [x] Recalcular subtotal/total ao editar ou remover, sem taxa adicional, e anunciar total atualizado por `aria-live`.  
- [x] Exigir ao menos um item para avançar; impedir por função e pela interface IDs com `quoteEnabled: false`, incluindo 3ª qualidade e produtos sem preço.  
**Regras de negócio relevantes:** preço unitário × quantidade, soma de itens elegíveis, sem taxas; 3ª qualidade fica fora do carrinho; laje com preço pode entrar, mas não conta para o mínimo de entrega.  
**Validação:** testes puros e fluxo no navegador com itens múltiplos, 360px/desktop, teclado, console e formatação pt-BR.  
**Critérios de conclusão:** edição e remoção confiáveis, cálculo em centavos exato e avanço bloqueado para carrinho vazio/inválido.

### Fase 10 — Elegibilidade e recebimento
**Objetivo:** aplicar o mínimo de entrega e exibir apenas campos da modalidade selecionada.  
**Requisitos relacionados:** SPEC §§12 RN04–RN13, 16, 19, 24, 30, 32–33, 35.1–14, 38.10.  
**Arquivos envolvidos:** criar `src/js/delivery.js`, `tests/delivery.test.mjs`; modificar `src/js/quotation.js`, `src/js/validation.js`, `src/index.html`, `src/css/components.css`; utilizar `src/js/products.js`, `src/js/config.js`.  
**Tarefas:**  
- [x] Testar os cenários §35.1–11: 499/500 6F, 300+200, 400+100 cabeças, 500 cabeças, 500 maciços, 500 6F+maciços, 250+250+complementares, retirada, porto 499/500.  
- [x] Somar somente quantidades dos tijolos inteiros 6F/8F elegíveis; cidade e porto desabilitados abaixo de 500, retirada habilitada com qualquer pedido elegível.  
- [x] Explicar em texto o motivo da indisponibilidade e desmarcar entrega previamente selecionada quando edição de itens derrubar o mínimo.  
- [x] Cidade: Rua, Número e Bairro obrigatórios; Complemento e Observações opcionais. Porto: Comunidade de destino opcional e explicada, sem endereço residencial obrigatório. Retirada: nenhum campo de endereço/comunidade, Observações opcionais.  
- [x] Testar §35.12–14, inclusive troca repetida de modalidade e validação apenas dos campos ativos.  
**Regras de negócio relevantes:** cabeças e demais complementares não contam; podem acompanhar entrega elegível; porto tem a mesma regra de 500; retirada independe da quantidade.  
**Validação:** testes puros e interface em 360px/desktop, teclado, mensagens de erro, console e casos limítrofes.  
**Critérios de conclusão:** todos os cenários 1–14 da §35 passam, campos condicionais corretos e nenhuma entrega inválida persiste no estado.

### Fase 11 — Revisão e consentimento
**Objetivo:** mostrar dados completos da solicitação e exigir aceite antes do envio.  
**Requisitos relacionados:** SPEC §§12 RN14–RN15/RN18, 17, 24, 30, 32, 35.22–23, 38.11.  
**Arquivos envolvidos:** modificar `src/js/quotation.js`, `src/js/validation.js`, `src/index.html`, `src/css/components.css`; ampliar `tests/quotation.test.mjs`.  
**Tarefas:**  
- [x] Exibir nome, telefone, itens, quantidade e subtotal de cada item, total estimado, modalidade e só os campos condicionais preenchidos.  
- [x] Exibir literalmente os quatro avisos comerciais da §17 e o checkbox de aceite obrigatório.  
- [x] Bloquear avanço sem aceite, anunciar erro e focar controle; invalidar aceite quando mudança posterior alterar itens ou modalidade de forma relevante.  
- [x] Permitir retorno às etapas sem perder dados e revalidar ao regressar à revisão.  
**Regras de negócio relevantes:** valor consultivo, pedido não confirmado, equipe confirma disponibilidade, prazo, pagamento e demais condições; somente descarga na entrega.  
**Validação:** teste de revisão completa e de campos vazios, checkbox ausente, edição após aceite, teclado, 360px/desktop e console.  
**Critérios de conclusão:** revisão corresponde ao estado atual, avisos presentes e envio impossível sem aceite válido.

### Fase 12 — Integração WhatsApp
**Objetivo:** gerar mensagens corretas e abrir atendimento somente com número internacional confirmado.  
**Requisitos relacionados:** SPEC §§10.3–10.4, 12 RN02/RN14–RN17, 13.2, 18, 21, 26, 35.23–24, 36, 38.12.  
**Arquivos envolvidos:** criar `src/js/whatsapp.js`, `tests/whatsapp.test.mjs`; modificar `src/js/quotation.js`, `src/js/catalog.js`, `src/js/config.js`, `src/index.html` e `src/js/app.js`.  
**Tarefas:**  
- [x] Testar mensagens PF, PJ e consulta com campos opcionais ausentes, acentos e caracteres reservados, além de bloqueio com `whatsappE164: null`.  
- [x] Montar mensagem PF na estrutura §18.2 com itens, total, modalidade, campos aplicáveis e aviso final; omitir campos vazios.  
- [x] Montar texto PJ sugerido pela §13.2 e mensagem de consulta de produto sem simular carrinho; aplicar `encodeURIComponent` uma vez ao texto completo.  
- [x] Validar E.164 com a empresa antes de configurar `wa.me`; sem confirmação, exibir telefone conhecido e informar indisponibilidade do link, sem montar URL presumida.  
- [x] Aplicar `rel="noopener noreferrer"` a links em nova aba e revalidar estado e aceite antes de abrir o link PF.  
**Regras de negócio relevantes:** o envio não confirma pedido; PJ e 3ª qualidade não calculam orçamento automático; número fornecido não pode receber dígitos inferidos.  
**Validação:** comparar mensagem decodificada com §18.2, testar dados condicionais, URI, foco, 360px/desktop e console; validar destino real somente após E.164 confirmado.  
**Critérios de conclusão:** mensagens corretas e seguras; integração publicável apenas com E.164 confirmado.

### Fase 13 — Informações de entrega e retirada
**Objetivo:** explicar as condições comerciais em seção própria, de leitura simples.  
**Requisitos relacionados:** SPEC §§4, 12 RN04–RN13, 19, 24, 38.13.  
**Arquivos envolvidos:** modificar `src/index.html`, `src/css/sections.css`; utilizar `src/js/config.js` como fonte de textos comerciais reutilizados.  
**Tarefas:**  
- [x] Resumir mínimo 500 6F/8F, combinação, exclusões, acompanhamento de complementares e retirada em qualquer quantidade.  
- [x] Explicar descarga na cidade em frente ao imóvel, no porto no ponto definido pela empresa, transporte posterior a cargo do cliente e ausência de transporte para dentro do imóvel/terreno/obra.  
- [x] Conferir concordância da seção com as regras reais de `delivery.js`, sem criar texto comercial divergente.  
**Regras de negócio relevantes:** todas RN04–RN13, especialmente complementares e limites da descarga.  
**Validação:** comparação linha a linha com §19 e RN04–RN13, 360px/desktop, teclado, sem JS e console.  
**Critérios de conclusão:** seção compreensível, correta e coerente com elegibilidade implementada.

### Fase 14 — Localização, contato e Footer
**Objetivo:** completar as seções institucionais finais sem preencher dados ausentes.  
**Requisitos relacionados:** SPEC §§4, 20–22, 24–26, 34, 35.30, 36, 38.14–15.  
**Arquivos envolvidos:** modificar `src/index.html`, `src/css/sections.css`, `src/js/app.js`, `src/js/config.js`; utilizar `src/assets/logo/` e `src/js/whatsapp.js`.  
**Tarefas:**  
- [x] Mostrar “Endereço em atualização” enquanto endereço faltar; não mostrar iframe nem botão Maps nesse estado. Exibir horário/e-mail somente se fornecidos.  
- [x] Preparar ramo configurável para endereço futuro: mapa apenas próximo da viewport, iframe `loading="lazy"`, botão Maps válido e sem chave privada.  
- [x] Mostrar telefone informado e WhatsApp somente com URL validada; links externos em nova aba com `rel="noopener noreferrer"`.  
- [x] Completar Footer com nome textual “Cerâmica Rio Trombetas” enquanto a logo oficial faltar, espaço preparado para ela, âncoras, WhatsApp quando válido e ano calculado em JavaScript; não publicar dados não confirmados.  
- [x] Manter localização e contato legíveis sem JS, inclusive aviso de endereço pendente.  
**Regras de negócio relevantes:** endereço, horário e e-mail não são inventados; ausência de E.164 impede CTA funcional; logo original preservada.  
**Validação:** §35.30, cenários com configuração ausente e presente por teste controlado, sem JS, 360px/desktop, teclado, console e URLs externas.  
**Critérios de conclusão:** estado pendente honesto, contato conhecido visível, Footer íntegro e nenhum mapa inválido.

### Fase 15 — Consolidação responsiva
**Objetivo:** corrigir o layout completo em todas as larguras da SPEC.  
**Requisitos relacionados:** SPEC §§5.6, 6, 7, 10–11, 13–17, 37, 38.16.  
**Arquivos envolvidos:** modificar `src/css/layout.css`, `src/css/components.css`, `src/css/sections.css`; criar `src/css/responsive.css` apenas se ajustes progressivos justificarem arquivo; utilizar `src/index.html`.  
**Tarefas:**  
- [x] Validar 360, 390, 480, 768, 1024, 1280 e ≥1440px com conteúdo real e fluxo PF completo.  
- [x] Corrigir header/menu, Hero, cards, controles de quantidade, opções de recebimento e revisão sem overflow horizontal.  
- [x] Verificar container 1180–1240px, padding lateral mínimo 16px, toque aproximadamente 44×44px e fontes sob zoom.  
- [x] Registrar capturas ou checklist de problemas e correções por viewport.  
**Regras de negócio relevantes:** controles responsivos não ocultam preço, avisos, condições ou erros.  
**Validação:** inspeção das sete larguras, rolagem horizontal igual a zero, teclado em mobile/desktop e console.  
**Critérios de conclusão:** página e fluxo completos usáveis em todas as larguras exigidas, sem conteúdo cortado.

### Fase 16 — Auditoria de acessibilidade
**Objetivo:** revisar e corrigir a experiência completa sob WCAG 2.2 AA como referência.  
**Requisitos relacionados:** SPEC §§6–7, 11, 13–17, 23–24, 32–33, 35.25–26, 38.17.  
**Arquivos envolvidos:** modificar `src/index.html`, CSS e JS responsáveis pelos problemas encontrados; utilizar todos os componentes e fluxos criados.  
**Tarefas:**  
- [x] Verificar um único `h1`, headings, landmarks, link de salto, links/botões semânticos e `alt` adequados.  
- [x] Percorrer toda a navegação, menu, catálogo, PF, PJ e revisão somente por teclado; verificar ordem e foco visível.  
- [x] Verificar labels, erros próximos e anunciados, `aria-live` para totais, estados indisponíveis explicados e foco no erro.  
- [x] Medir contraste de texto/controles, checar zoom e distinguir estados sem depender só de cor.  
- [x] Validar preferência de movimento reduzido já presente mesmo antes das animações da fase 17.  
**Regras de negócio relevantes:** tecnologia assistiva recebe mesma informação sobre 3ª qualidade, preço estimado, mínimo de entrega e aceite.  
**Validação:** roteiro teclado completo, inspeção de árvore acessível, contraste, zoom, 360px/desktop, console e §35.25–26.  
**Critérios de conclusão:** nenhum bloqueio de teclado, mensagens e estados compreensíveis, contraste e semântica conformes ao escopo da SPEC.

### Fase 17 — Animações discretas
**Objetivo:** acrescentar apenas movimento que não atrapalhe leitura ou interação.  
**Requisitos relacionados:** SPEC §§7, 8.1–8.2, 23–24, 27, 35.26, 38.18.  
**Arquivos envolvidos:** criar `src/js/animations.js` se houver reveals reais; modificar `src/js/app.js`, `src/css/sections.css`, `src/css/components.css`.  
**Tarefas:**  
- [x] Usar `IntersectionObserver` apenas para reveals discretos; fornecer apresentação visível quando JS ou observer falhar.  
- [x] Aplicar transições curtas a estados adequados sem atrasar acesso ao conteúdo ou bloquear cliques.  
- [x] Sob `prefers-reduced-motion: reduce`, remover/reduzir transições e garantir conteúdo inteiramente visível.  
- [x] Não incluir vídeo, scroll-jacking, parallax agressivo, efeitos contínuos ou biblioteca externa.  
**Regras de negócio relevantes:** mudança visual não esconde aviso, erro, preço ou opção indisponível.  
**Validação:** movimento normal/reduzido, JS desligado, navegação por teclado, 360px/desktop e console.  
**Critérios de conclusão:** movimento sutil, não obrigatório para compreender a página e reduzido conforme preferência do usuário.

### Fase 18 — SEO e metadados
**Objetivo:** concluir descoberta e compartilhamento sem fabricar informações locais.  
**Requisitos relacionados:** SPEC §§20, 25–26, 36.  
**Arquivos envolvidos:** modificar `src/index.html`; utilizar `src/js/config.js` para dados conhecidos e assets oficiais, se disponíveis.  
**Tarefas:**  
- [x] Conferir `lang="pt-BR"`, título, meta description, viewport, Open Graph e headings semânticos com textos aprovados na §25.  
- [x] Incluir favicon somente quando houver asset apropriado e canonical somente quando URL de produção estiver confirmada.  
- [x] Adicionar `LocalBusiness` somente depois de endereço e demais dados necessários confirmados; não montar JSON-LD parcial com suposições.  
- [x] Validar ausência de URL, contato ou localização inventados nos metadados.  
**Regras de negócio relevantes:** dados pendentes não entram em metadados como fatos; preço permanece estimativo.  
**Validação:** inspeção do HTML e visualização de metadados, 360px/desktop, console e comparação com §25.  
**Critérios de conclusão:** metadados conhecidos corretos e itens condicionais explicitamente aguardando dados oficiais.

### Fase 19 — Testes finais, correções e desempenho
**Objetivo:** fechar os cenários obrigatórios, corrigir falhas encontradas e medir o site estático pronto para publicação.  
**Requisitos relacionados:** SPEC §§2–3, 6, 11–18, 20, 23–27, 31–39.  
**Arquivos envolvidos:** ampliar `tests/products.test.mjs`, `tests/validation.test.mjs`, `tests/quotation.test.mjs`, `tests/delivery.test.mjs`, `tests/whatsapp.test.mjs` e testes de navegador quando adotados; modificar somente arquivos `src/` ligados a defeitos medidos; utilizar SPEC §35 e assets.  
**Tarefas:**  
- [x] Executar e registrar, um a um, os 30 cenários da §35, incluindo limites 499/500, complementares, PF/PJ, cálculos, campos, aceite, mensagem, teclado, motion, navegadores, imagem falha e endereço ausente.  
- [x] Verificar Chrome, Edge, Firefox e Safari atuais, sete viewports da §6, sem JS, sem fonte externa, console e ausência de scroll horizontal.  
- [x] Inspecionar tráfego/armazenamento para confirmar que dados pessoais não persistem e não são enviados silenciosamente; verificar `innerHTML` de usuário e links externos.  
- [x] Corrigir somente falhas demonstradas, reexecutar os testes afetados e então a suíte completa.  
- [x] Otimizar imagens preservando originais e cor/forma dos produtos; aplicar WebP transparente quando viável, `loading="lazy"`, dimensões e prioridade somente da Hero. Medir LCP < 2,5 s, CLS < 0,1 e INP < 200 ms em dispositivo/ambiente adequado e registrar limites da medição.  
- [x] Fazer auditoria final da matriz abaixo, pendências empresariais e definição de pronto da §39; não declarar produção concluída com E.164 não confirmado e registrar a finalização visual da marca como pendente se a logo oficial ainda faltar.  
**Regras de negócio relevantes:** todas RN01–RN18, especialmente mínimo de entrega, orçamento apenas estimativo, 3ª qualidade fora do automático e privacidade.  
**Validação:** registro reproduzível de resultados de testes automatizados e manuais, capturas/medidas das viewports e métricas, console limpo e regressões fechadas.  
**Critérios de conclusão:** 30/30 cenários aprovados, definição de pronto §39 satisfeita e dados necessários para publicação confirmados.

## Matriz SPEC → Fases

| Requisito da SPEC | Implementação | Teste/validação |
|---|---:|---:|
| §§1–3, 28, 40: fonte normativa, stack estática e arquitetura | 1–3 | 1, 19 |
| §4: ordem de seções e âncoras | 1, 4–7, 13–14 | 1, 4, 19 |
| §5 e §37: marca, tokens, tipografia e aparência | 2, 4–7, 15 | 2, 15, 19 |
| §6: mobile-first, sete viewports e toque | 1–18, 15 | cada fase, 15, 19 |
| §7: Header fixo, menu e âncoras | 4 | 4, 16, 19 |
| §8: Hero estática preparada para vídeo futuro | 5 | 5, 17, 19 |
| §9: Quem Somos factual | 6 | 6, 19 |
| §§10–11, 29: 12 produtos, imagens e preços | 3, 7 | 3, 7, 19 |
| RN01–RN02: catálogo/3ª qualidade | 3, 7, 9, 12 | 3, 7, 9, 19 (§35.15–16) |
| RN03/RN18 e §31: cálculo e preço estimativo em centavos | 3, 9, 11 | 9, 11, 19 (§35.19–21) |
| RN04–RN08: mínimo de 500, soma 6F/8F e complementares | 3, 10, 13 | 10, 19 (§35.1–8) |
| RN09–RN12 e §16: cidade, porto, retirada e campos condicionais | 10 | 10, 19 (§35.9–14) |
| RN13 e §19: limites da descarga | 10–11, 13 | 10–11, 13, 19 |
| RN14–RN15 e §17: caráter consultivo, revisão e aceite | 11–12 | 11–12, 19 (§35.23) |
| RN16–RN17 e §13: separação PF/PJ e etapas | 8, 12 | 8, 12, 19 (§35.17–18) |
| §14: nome/telefone e sem CPF | 8 | 8, 19 (§35.22) |
| §15: itens, quantidades, edição e remoção | 9 | 9, 19 (§35.19–21) |
| §18: mensagens e E.164 confirmado | 12 | 12, 19 (§35.24) |
| §§20–22: localização, contato e Footer | 14 | 14, 19 (§35.30) |
| §23: motion e preferência reduzida | 2, 17 | 16–17, 19 (§35.26) |
| §24: WCAG, teclado e erros acessíveis | todas, 16 | cada fase, 16, 19 (§35.25) |
| §25: SEO, canonical e JSON-LD condicionais | 18 | 18, 19 |
| §26 e §30: estado em memória, segurança e privacidade | 8–12, 14 | 8–12, 19 |
| §27: imagens, mapa e métricas de desempenho | 5, 7, 14, 19 | 5, 7, 14, 19 |
| §32–33: validação, foco e estados de interface | 2, 7–12 | 7–12, 16, 19 |
| §34: funcionamento institucional sem JavaScript | 1, 6–7, 14 | 1, 6–7, 14, 19 |
| §35: 30 cenários obrigatórios | fases responsáveis acima | 19 (consolidação) |
| §36: dados pendentes centralizados | 3, 4–5, 12, 14, 18 | 3, 12, 14, 18–19 |
| §§38–39: ordem de trabalho e definição de pronto | 1–19 | ao fim de cada fase, 19 |
