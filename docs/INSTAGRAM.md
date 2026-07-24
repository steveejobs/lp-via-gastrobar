# `/instagram` — direção e contexto

Documento específico da página mobile de links do Via Gastrobar.

## Objetivo

Transformar o acesso vindo do Instagram em três ações, nesta ordem:

1. reservar mesa pelo WhatsApp;
2. traçar rota;
3. continuar no Instagram ou conhecer o site completo.

A página não substitui a home. Ela reduz decisão, carregamento e scroll para
quem provavelmente está com uma mão no celular e pretende sair hoje.

## Referências analisadas

### Ótica Moderna

https://lp-otica-moderna.vercel.app/instagram

- boa abertura com identidade, mídia e ações próximas;
- campanhas organizadas em capítulos;
- excesso de conteúdo comercial para o contexto do Via.

### Hanzaki

https://lp-hanzaki.vercel.app/instagram

- melhor hierarquia de botões entre as referências;
- boa repetição do CTA no fechamento;
- página longa, com grande vazio entre ações e prova social.

### SOS Ótica

https://www.sosotica.com.br/instagram

- bom equilíbrio entre atalhos, mídia e dados locais;
- CTA persistente útil;
- muitos cards e categorias, inadequados para uma noite no Via.

Decisão: absorver a objetividade e a hierarquia, sem copiar estética, reviews,
cards comerciais ou estrutura de catálogo.

## Arquitetura implementada

### Primeira dobra

1. logo completo;
2. `@viagastrobar`;
3. “A noite começa à mesa.”;
4. funcionamento;
5. composição em movimento com vídeo de serviço, drinks e pratos alternados;
6. Reservar mesa;
7. Traçar rota;
8. Instagram e site completo como ações terciárias.

### A noite em movimento

- abertura: vídeo de serviço de vinho em 720×1280;
- apoios: ciclos suaves de drinks e pratos;
- transição: faixa editorial contínua com ambiente, bar e cozinha;
- segundo capítulo: vídeo de preparo com imagens alternadas de salão e pratos;
- fechamento: vídeo de chegada/localização sob o CTA final.

Somente o vídeo visível permanece rodando. Os demais carregam por proximidade e
pausam fora da viewport, em aba oculta, com economia de dados ou quando a pessoa
prefere movimento reduzido.

### Informação operacional

- funcionamento;
- endereço;
- referência;
- telefone;
- botão de rota.

### Fechamento

`ambiente (5)` ocupa o fundo e conduz novamente para a reserva. O dock inferior
aparece somente após 560 px de scroll e respeita safe area.

## Arquivos

```text
instagram.html
src/pages/instagramPage.js
src/pages/pages.css
src/interactions/instagram.js
vite.config.js
vercel.json
tools/audit-instagram.cjs
```

`instagram.html` é uma entrada estática própria. O Vercel reescreve
`/instagram` para esse arquivo, evitando exibir a home antes da hidratação.

## Validação

Viewports:

- 360×800;
- 375×812;
- 390×844;
- 412×915;
- 430×932.

Resultados:

- zero overflow horizontal;
- um H1;
- reserva e rota na primeira dobra em todos os tamanhos;
- alvos clicáveis com pelo menos 44 px;
- WhatsApp, Maps e Instagram abrem os destinos corretos;
- transferência inicial local em 390×844: entre 0,9 e 2,8 MB conforme o buffer
  de vídeo solicitado pelo navegador;
- Axe: zero violações automáticas A/AA;
- 13 contrastes em gradientes ficaram inconclusivos e permanecem na revisão
  visual manual;
- build gera `dist/instagram.html` com 12,87 kB, 2,73 kB gzip.

Evidências locais são regeneradas por:

```bash
AUDIT_URL=http://127.0.0.1:4173/instagram.html \
AUDIT_OUTPUT=artifacts/audit/instagram \
npm run audit:instagram
```

## Regras para futuras alterações

- não adicionar avaliações sem fonte confirmada;
- não transformar em catálogo;
- não esconder reserva abaixo da primeira dobra;
- manter apenas um vídeo reproduzindo por vez e preservar poster, lazy loading,
  pausa fora da viewport e `prefers-reduced-motion`;
- não adicionar mais de quatro ações iniciais;
- preservar reserva > rota > Instagram;
- manter largura máxima de 520 px;
- validar primeiro em 390×844;
- repetir os cinco viewports antes de publicar.
