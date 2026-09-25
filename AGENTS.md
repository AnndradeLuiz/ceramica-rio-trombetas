# AGENTS.md

## 1. Projeto

Este repositório contém a Landing Page institucional e comercial da
Cerâmica Rio Trombetas.

O sistema apresenta a empresa, seus produtos, preços, condições comerciais
e permite que clientes Pessoa Física montem uma solicitação de orçamento
para envio via WhatsApp.

Clientes Pessoa Jurídica devem ser direcionados diretamente ao atendimento
comercial.

---

## 2. Fonte oficial de requisitos

Antes de planejar, implementar ou modificar qualquer funcionalidade,
leia integralmente:

`docs/SPEC.md`

A SPEC é a fonte oficial e mandatória para:

- regras de negócio;
- requisitos funcionais;
- requisitos não funcionais;
- arquitetura;
- fluxo de orçamento;
- catálogo;
- preços;
- regras de entrega;
- design system;
- responsividade;
- acessibilidade;
- segurança;
- SEO;
- critérios de aceitação.

Em caso de conflito entre este arquivo e a SPEC,
`docs/SPEC.md` prevalece.

Não altere a SPEC sem solicitação explícita do usuário.

---

## 3. Stack obrigatória

A aplicação deve utilizar exclusivamente:

- HTML5;
- CSS3;
- JavaScript ES6+ puro.

Não utilizar:

- React;
- Vue;
- Angular;
- Svelte;
- Next.js;
- Nuxt;
- TypeScript;
- jQuery;
- Bootstrap;
- Tailwind;
- frameworks CSS;
- bibliotecas de componentes;
- backend;
- banco de dados.

Não introduza ferramentas de build sem necessidade.

A aplicação final deve continuar sendo um site estático.

Ferramentas externas podem ser utilizadas somente para desenvolvimento,
testes e validação e não devem se tornar dependências de execução do site.

---

## 4. Organização do projeto

Código da aplicação:

`src/`

Documentação:

`docs/`

Testes:

`tests/`

Assets utilizados pelo site:

`src/assets/`

Fotos e referências que não fazem parte da aplicação final podem permanecer
em documentação ou pastas de referência.

Não reorganize a estrutura principal do projeto sem necessidade técnica
justificada.

---

## 5. Regras obrigatórias

### Dados

Produtos, preços, telefone, informações comerciais e demais dados reutilizados
devem possuir fonte centralizada.

Não duplique preços ou regras de negócio diretamente em vários arquivos HTML
ou JavaScript.

### Produtos

Não invente produtos.

Não invente preços.

Não invente dimensões.

Não altere cores, proporções, quantidade de furos ou características físicas
dos produtos presentes nas imagens reais.

Tijolos queimados devem preservar sua coloração real.

### Logo

A logo existente deve ser utilizada.

Não redesenhe a logo.

Não modifique sua geometria.

Não altere suas cores.

### Dados pendentes

Informações ainda não fornecidas pela empresa devem permanecer explicitamente
pendentes.

Não invente:

- endereço;
- horário de funcionamento;
- e-mail;
- preço do tijolo para laje;
- história da empresa;
- certificações;
- capacidade de produção;
- tempo de mercado.

### Dados pessoais

Não persista dados do cliente.

Não utilize para os dados do orçamento:

- localStorage;
- sessionStorage;
- IndexedDB;
- cookies;
- banco de dados.

Os dados devem permanecer somente em memória até o redirecionamento para
o WhatsApp.

---

## 6. Regras de negócio críticas

Estas regras nunca devem ser simplificadas.

### Entrega

Entrega na cidade ou no porto somente pode ser habilitada quando o pedido
possuir pelo menos 500 tijolos inteiros de 6 e/ou 8 furos.

Os modelos de 6 e 8 furos podem ser combinados para atingir 500 unidades.

Exemplo:

300 tijolos 6F + 200 tijolos 8F = entrega permitida.

Não contam para atingir as 500 unidades:

- cabeças;
- tijolo maciço;
- capote;
- cobogó;
- tijolo para laje.

Esses produtos podem acompanhar uma entrega quando os 500 tijolos inteiros
de 6F/8F já estiverem presentes no pedido.

### Retirada

Retirada na empresa deve estar disponível independentemente da quantidade.

### Porto

Ao escolher entrega no porto, deve existir o campo opcional:

`Comunidade de destino`

O endereço residencial do cliente não deve ser obrigatório nessa modalidade.

### Terceira qualidade

Produtos de 3ª qualidade:

- aparecem no catálogo;
- apresentam preço de referência;
- não entram no orçamento automático;
- direcionam para atendimento pelo WhatsApp.

---

## 7. Desenvolvimento

O desenvolvimento deve ser realizado em fases.

Antes de implementar uma fase:

1. leia `docs/SPEC.md`;
2. leia `docs/IMPLEMENTATION-PLAN.md`, quando existir;
3. identifique exatamente o escopo da fase;
4. identifique os requisitos relacionados;
5. implemente somente esse escopo.

Não avance automaticamente para fases posteriores.

Não faça refatorações fora do escopo sem necessidade concreta.

---

## 8. Design

A interface deve ser:

- mobile-first;
- moderna;
- limpa;
- acessível;
- relacionada visualmente à cerâmica e construção;
- coerente com a identidade atual da empresa.

A marca atual utiliza principalmente:

- verde;
- amarelo;
- tons relacionados à cerâmica/terracota.

Utilize os tokens definidos pela SPEC.

Evite:

- excesso de verde e amarelo;
- aparência de panfleto;
- template genérico de construção;
- glassmorphism excessivo;
- efeitos neon;
- animações exageradas;
- excesso de sombras.

Os produtos devem ser protagonistas visuais.

---

## 9. Hero

Na primeira versão:

- utilize imagem estática;
- não implemente vídeo;
- não dependa de animações complexas;
- mantenha a estrutura preparada para futura substituição por vídeo.

Não busque imagens aleatórias na internet para representar produtos reais.

---

## 10. Acessibilidade

A acessibilidade deve ser implementada junto com cada componente.

Não deixe acessibilidade apenas para a etapa final.

Obrigatório:

- HTML semântico;
- foco visível;
- navegação por teclado;
- labels;
- alt text;
- contraste adequado;
- headings hierárquicos;
- suporte a prefers-reduced-motion;
- mensagens de erro acessíveis.

---

## 11. Segurança

Nunca insira conteúdo do usuário por meio de `innerHTML`.

Prefira:

- `textContent`;
- criação explícita de elementos;
- validação de entradas;
- encodeURIComponent para mensagem do WhatsApp.

Não exponha segredos ou chaves no frontend.

---

## 12. Qualidade

Antes de considerar uma tarefa concluída:

1. verifique erros no console;
2. teste o fluxo alterado;
3. teste pelo menos uma viewport mobile;
4. teste pelo menos uma viewport desktop;
5. verifique navegação por teclado quando aplicável;
6. valide as regras de negócio relacionadas;
7. confirme que nenhum dado foi inventado;
8. confirme que a implementação respeita a SPEC.

Não declare uma funcionalidade concluída sem validá-la.

---

## 13. Testes

As regras de negócio descritas na SPEC devem possuir testes.

Playwright ou outra ferramenta de teste pode ser utilizada como ferramenta
de desenvolvimento, mas não deve se tornar parte da aplicação entregue ao
navegador.

Os cenários obrigatórios da seção de testes da SPEC devem ser verificados.

---

## 14. Commits e alterações

Faça alterações pequenas e coerentes.

Não misture funcionalidades diferentes na mesma etapa sem necessidade.

Ao finalizar uma fase, informe:

- arquivos criados;
- arquivos modificados;
- requisitos atendidos;
- testes realizados;
- problemas ou dados pendentes.

---

## 15. Regra final

Quando houver dúvida entre:

- fazer algo visualmente mais elaborado; ou
- preservar uma regra da SPEC;

preserve a SPEC.

Quando um dado estiver ausente, mantenha-o pendente.

Nunca invente informações da Cerâmica Rio Trombetas.