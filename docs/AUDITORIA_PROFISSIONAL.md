# Auditoria profissional — Via Gastrobar

Data: 24 de julho de 2026  
Deploy auditado: https://lp-via-gastrobar.vercel.app/  
Escopo: direção criativa, produto, UX mobile, landing page local, conversão,
performance, acessibilidade e curadoria visual.

Esta auditoria separa o **deploy original observado** do **build local corrigido**.
As notas abaixo avaliam o deploy original; o plano e os critérios registram as
mudanças já aplicadas no repositório.

## A. Veredito direto

O deploy original está acima de um template barato, mas ainda abaixo do nível de
acabamento necessário para divulgação profissional. Seu maior acerto é a
fotografia, especialmente ambiente, vinho e as séries coerentes de pratos. O
maior problema é a prioridade dada ao espetáculo de entrada: no primeiro quadro
real o conteúdo e o CTA desaparecem, e o mesmo padrão pode deixar seções inteiras
vazias. A identidade começa autoral na hero, mas volta a convenções de “luxo
escuro” e fade-up no restante. Não estava pronto para campanha sem corrigir
carregamento, menu, progressividade do motion, HTML inicial e curadoria.

## B. Notas

| Critério | Nota | Justificativa |
| --- | ---: | --- |
| Identidade | 7,0 | Verde e fotografia criam território próprio, mas serifada, dourado e fundos escuros ainda poderiam pertencer a outros restaurantes. |
| Primeira dobra | 6,0 | O estado estabilizado é forte; o primeiro quadro real fica quase vazio e esconde marca, H1 e CTA. |
| Mobile | 7,0 | O layout foi realmente adaptado, porém o menu inexiste e a hero depende de uma abertura que atrasa a decisão. |
| Desktop | 6,5 | A assimetria funciona, mas a página alterna composições próprias com vazios excessivos e blocos editoriais repetidos. |
| Fotografia | 8,5 | Há luz, ambiente e séries consistentes; algumas imagens sociais com texto embutido não suportam posição nobre. |
| Galeria | 6,5 | Existe seleção, mas faltava inventário explícito e algumas famílias eram tratadas como pratos isolados. |
| Copy | 6,0 | O tom é curto, mas usa abstrações intercambiáveis como “presença e calor” e “detalhe e textura”. |
| Motion | 4,0 | A transformação da hero tem conceito, mas o estado inicial vazio e o fade-up sistêmico prejudicam compreensão e robustez. |
| Conversão | 7,0 | Reserva e rota aparecem cedo e no fechamento, mas não havia navegação e o CTA persistente só surgia depois do scroll. |
| Performance | 5,5 | Lazy loading existe, porém vídeo e posters pesados entram cedo e o HTML dependia do JavaScript para conteúdo. |
| Acessibilidade | 6,0 | Há foco, reduced motion, labels e semântica parcial; faltavam fallback estático, menu e garantia progressiva de visibilidade. |
| Acabamento | 6,0 | As partes boas são visivelmente dirigidas, mas carregamento, menu, repetição de motion e estados intermediários denunciavam incompletude. |

## C. Problemas P0

1. **Primeiro quadro vazio.** Em 390×844, imediatamente após
   `DOMContentLoaded`, só aparecem fundo, ponto de status e acessos inferiores;
   marca, H1, mídia e CTAs entram depois. O usuário não deve esperar para
   descobrir o que é o lugar ou reservar.
2. **Conteúdo invisível por dependência de motion.** `.reveal` iniciava com
   `opacity: 0`; capturas full-page e scroll rápido deixaram grandes seções
   vazias. Falha de `IntersectionObserver`, JavaScript ou timing eliminava
   conteúdo real.
3. **Sem navegação/menu.** O roteiro exigia abertura de menu, mas o deploy não
   tinha menu principal. No mobile, o usuário precisava percorrer quase nove mil
   pixels ou usar apenas a barra tardia.
4. **HTML inicial insuficiente.** A aplicação renderizava a página inteira pelo
   cliente. Isso enfraquecia SEO local, conteúdo sem JavaScript e estabilidade de
   carregamento.
5. **Vídeo da hero sem recorte editorial.** O arquivo inclui vinho, prato e
   cartela de marca. Reproduzir o arquivo inteiro muda o protagonista e cria um
   loop que não repousa.

## D. Problemas P1

1. A action bar com quatro itens dá o mesmo peso para reserva, rota, Instagram e
   funcionamento, reduzindo a hierarquia comercial.
2. A hero estabilizada usa três mídias competindo com H1, CTA e duas linhas de
   metadados; em 1366×768 o vídeo central domina mais do que a reserva.
3. “Presença e calor”, “Detalhe e textura” e “Do mar à mesa” são títulos
   genéricos, pouco próprios do Via.
4. A galeria original publica apenas parte das famílias sem documentar por que
   outras foram descartadas.
5. Polvo e lagosta foram apresentados como protagonistas embora arquivos
   alternativos tenham copy social embutida e enquadramento menos consistente.
6. O capítulo do bar reúne vídeo, drink, vinho e texto em uma grade bonita, mas o
   CTA chega tarde e o vídeo possui poster pesado carregado cedo.
7. O desktop original apresentou grandes áreas vazias quando o scroll avançou
   mais rápido que as transições.
8. O rodapé informativo é correto, mas pequeno depois de um fechamento visual
   grande; a prioridade de reserva perde força no último instante.

## E. Problemas P2

1. Reduzir legendas em caixa alta sobre fotografia; algumas competem com marcas
   já gravadas nas imagens.
2. Aumentar contraste de microtexto sobre o bloco creme.
3. Evitar dois logos visíveis quando a mídia já traz a marca gravada.
4. Padronizar a nomenclatura interna de mídia e registrar a origem.
5. Substituir pequenos deslocamentos contínuos por estados estáveis.
6. Usar dourado como informação ou luz, não como contorno recorrente.
7. Reservar espaço de safe area no menu e no dock inferior.
8. Abrir links externos em nova aba para preservar o retorno à página.

## F. Auditoria seção por seção

| Seção | Função atual | Problema | Impacto | Mudança recomendada | Decisão |
| --- | --- | --- | --- | --- | --- |
| Hero | Apresentar nível, atmosfera, reserva e rota | Primeiro quadro vazio; vídeo muda de assunto; três mídias competem | Atrasa entendimento e CTA | Conteúdo visível no HTML; poster real do vinho; loop limitado; navegação mínima | **Substituir o comportamento**, manter a tese |
| Action bar | Atalhos operacionais | Quatro itens com peso semelhante | Dilui reserva | Manter reserva primeiro, rota segundo, dados e Instagram como apoio | **Reduzir** |
| Manifesto | Explicar a noite | Texto abstrato e largo | Acrescenta scroll sem nova prova | Copy curta: “Chegue para jantar. Fique pela noite.” e uma explicação concreta | **Substituir** |
| Ambiente | Vender o lugar antes do cardápio | Boa base; três imagens com pouca função declarada | Funciona, mas parece montagem | Uma mesa protagonista, parede e adega como apoios; transição por luz | **Manter e refinar** |
| Gastronomia | Mostrar pratos como ensaios | Títulos genéricos e famílias parcialmente misturadas | Perde narrativa e autoria | Três séries fortes, cada uma com protagonista + detalhe | **Reorganizar** |
| Mar | Diferenciar polvo/lagosta | Imagens sociais com texto embutido e força desigual | Baixa qualidade percebida | Usar apenas `prato polvo (1)`; descartar apoios fracos | **Reduzir** |
| Bar | Alterar o ritmo | Grade boa, mas poster e vídeo carregam cedo | Custo sem ganho imediato | Carregar perto da viewport, pausar fora, CTA no próprio capítulo | **Manter e otimizar** |
| Nota emocional | Preparar fechamento | Mais uma frase editorial isolada | Alongamento | Converter em ponte curta e direta para reserva | **Reduzir** |
| Reserva/localização | Converter | Boa informação, CTA poderia ser ainda mais dominante | Conversão razoável | Reserva como clímax, rota secundária e Instagram terciário | **Manter e reforçar** |
| Instagram | Saída social | Compete com reserva se tratado como seção nobre | Desvio de intenção | Link dentro do fechamento, com menor peso | **Reduzir** |
| Rodapé | Repetir dados finais | Informações muito pequenas | Baixa legibilidade | Aumentar área de toque, contraste e ordem | **Refinar** |

### Motion — decisão por comportamento

| Movimento original | Decisão | Motivo |
| --- | --- | --- |
| Filete que expande a mídia da hero | **Manter, revisado** | É o gesto mais específico do projeto, mas deve partir de conteúdo já compreensível. |
| Loop completo do vídeo da hero | **Substituir** | O arquivo muda de vinho para prato e cartela; o novo loop usa somente 0,15–6,4 s. |
| Fade-up em todas as seções | **Remover como dependência** | Conteúdo fica visível por padrão; reveal é progressivo e ocorre uma vez. |
| Zoom leve em imagens | **Reduzir** | Limite de escala em 1.018, sem salto. |
| Movimento contínuo da composição | **Remover** | Ao parar o scroll, a mídia deve repousar. |
| Dock mobile entrando após hero | **Manter** | Ajuda conversão sem cobrir a primeira dobra. |
| Menu mobile | **Adicionar** | Entrada e saída curtas, plano próprio, foco e Escape. |
| Interação com mouse | **Adicionar, discreta** | Tilt máximo de 1,2° em mídia e magnetismo máximo de 3 px por eixo. |
| Transição de saída da página | **Adicionar, curta** | 160 ms apenas para navegação interna; links externos preservam a página em nova aba. |

## G. Auditoria específica mobile

### Evidências do deploy original

- [390×844 — primeiro quadro vazio](../artifacts/audit/live-scrolled/mobile-390x844-initial.png)
- [390×844 — estado estabilizado](../artifacts/audit/live-scrolled/mobile-390x844-settled.png)
- [390×844 — página completa após scroll](../artifacts/audit/live-scrolled/mobile-390x844-full.png)
- [375×812 — página completa](../artifacts/audit/live-scrolled/mobile-375x812-full.png)
- [430×932 — página completa](../artifacts/audit/live-scrolled/mobile-430x932-full.png)

O mobile original não é apenas desktop empilhado: a hero reposiciona mídia,
transforma os ensaios em duplas e usa dock inferior. Porém, isso não resolve o
maior problema: durante o carregamento inicial o usuário não vê marca, promessa
ou ação. No estado estabilizado, 390×844 mostra H1, texto, dois CTAs, horário e
mídia; a hierarquia é boa, mas o CTA só existe depois da animação.

O scroll original mede aproximadamente 8.889–9.035 px nos três viewports. Há
informação suficiente, porém manifesto, três ensaios, nota emocional, Instagram
e fechamento criam mais rolagem do que decisão. A fotografia permanece grande,
o que é correto; o problema não é tamanho de mídia, e sim repetição de ritmo.

No build corrigido:

- o conteúdo da hero existe no primeiro quadro;
- o menu tem plano próprio e fecha por botão, link ou `Escape`;
- os CTAs têm pelo menos 44 px;
- não existe overflow horizontal em 375, 390 ou 430 px;
- o vídeo da hero não é baixado até 560 px: o poster de 44 KiB preserva a cena;
- o dock aparece só depois de 72% da hero;
- reduced motion apresentou zero vídeo reproduzindo e zero item oculto.

Evidências:

- [390×844 — primeiro quadro corrigido](../artifacts/audit/final-v2/mobile-390x844-initial.png)
- [390×844 — menu](../artifacts/audit/local-v2/menu-fixed.png)
- [390×844 — scroll completo corrigido](../artifacts/audit/final-v2/mobile-390x844-full.png)
- [390×844 — reduced motion](../artifacts/audit/final-v2/mobile-390x844-reduced-motion.png)

## H. Auditoria específica desktop

### Evidências do deploy original

- [1440×900 — página completa](../artifacts/audit/live-scrolled/desktop-1440x900-full.png)
- [1366×768 — hero estabilizada](../artifacts/audit/live-scrolled/desktop-1366x768-settled.png)

Em 1366×768, a hero original compõe bem texto à esquerda e mídia à direita, mas
o vídeo vertical domina 43% do palco e carrega marca gravada, enquanto o CTA
primário ocupa área pequena. A largura é aproveitada; não é ampliação preguiçosa
do mobile. O problema aparece no scroll: os elementos invisíveis antes da
interseção produzem vazios extensos em captura e scroll rápido.

No build corrigido, 1440 e 1366 usam navegação completa, H1 direto, fatos
operacionais e composição assimétrica. O inventário local não detectou overflow.
Axe registrou zero violações WCAG A/AA após a correção de contraste; 37 nós em
fundos com gradiente ficaram inconclusivos e permanecem no checklist manual.

Evidências:

- [1440×900 — scroll completo corrigido](../artifacts/audit/final-v2/desktop-1440x900-full.png)
- [1366×768 — primeiro quadro corrigido](../artifacts/audit/final-v2/desktop-1366x768-initial.png)

## I. Nova arquitetura da galeria

### 1. O lugar

1. **Protagonista:** `ambiente (4)` (`ambient-table.webp`) — mesa redonda, luz e
   cadeiras verdes; vende ocasião, não apenas arquitetura.
2. **Apoio:** `ambiente (1)` (`ambient-wall.webp`) — frase e madeira.
3. **Detalhe:** `ambiente (2)` (`ambient-wine-wall.webp`) — adega e profundidade.
4. **Hero:** `ambiente (3)` apoia a cena; não repetir como protagonista no
   capítulo.
5. **Fechamento/poster:** `ambiente (5)` funciona como bar/encerramento.

Transição: luz concentra da composição ampla para a mesa. No mobile, uma dupla
vertical e uma faixa de detalhe; sem sticky longo.

### 2. A mesa

**Série prato 1**

- protagonista: `prato 1 (2)`;
- apoio: `prato 1 (4)`;
- descartar da página: `(1)` e `(3)`, por repetição de enquadramento.

**Série prato 3**

- protagonista: `prato 3 (3)`;
- apoio: `prato 3 (5)`;
- manter `prato 3.mp4` fora do carregamento inicial: 17,5 MB e edição longa;
- descartar da página: `(1)`, `(2)` e `(4)` por redundância.

**Série prato 4**

- protagonista: `prato 4 (2)`;
- apoio: `prato 4 (3)`;
- descartar da página: `(1)`, enquadramento menos forte.

**Série prato 2**

- manter no acervo, não publicar nesta versão: as quatro imagens são coerentes,
  mas acrescentariam um quarto ensaio e mais scroll sem mudar a decisão.

Transição: entrada curta de “serviço”, escala 1.018→1 e repouso imediato.

### 3. Mar & assinatura

- usar somente `prato polvo (1)` como recorte;
- descartar `prato polvo (2)` e `prato lagosta` da página por copy social
  embutida e enquadramento mais fraco;
- não inventar nome, preparação ou ingrediente adicional.

### 4. O bar

1. protagonista em movimento: `drink 1 (1).mp4`;
2. poster: `drink 1 (1).jpg`;
3. apoio âmbar: `drink 1 (5).jpg`;
4. apoio de serviço: `vinho 1 (2).jpg`;
5. `champanhie.mp4`, `drink (2).mp4`, `drink (3).mp4` e `drink.mp4` ficam no
   acervo; usar simultaneamente criaria competição e carregamento desnecessário.

Transição: contraste e reflexo discretos. Um vídeo por vez, sem som, pausa fora
da viewport e poster estático em reduced motion.

### 5. A noite continua

- protagonista: `video local para rodape.mp4`;
- função: conectar vista/local ao bloco funcional;
- poster: `ambiente (5)`;
- terminar com reserva, rota e Instagram, nessa ordem.

## J. Plano de correção

1. **Correções de fundação — concluído**
   - HTML pré-renderizado no build;
   - conteúdo visível por padrão;
   - dados confirmados centralizados;
   - tema unificado em `src/theme/`;
   - componentes, páginas e interações separados.
2. **Hero — concluído**
   - primeiro quadro útil;
   - poster extraído do vídeo;
   - trecho limitado a 0,15–6,4 s;
   - CTA, rota, horário e referência na dobra;
   - vídeo estático no mobile estreito.
3. **Navegação e CTA — concluído**
   - menu desktop/mobile;
   - CTA de reserva no header;
   - dock mobile após a hero;
   - links externos em nova aba;
   - clique real em WhatsApp, Maps e Instagram validado.
4. **Galeria — concluído**
   - ambiente antes de pratos;
   - séries 1, 3 e 4 agrupadas;
   - capítulo de mar reduzido a uma imagem;
   - bar com um vídeo;
   - encerramento conduzindo à reserva.
5. **Copy — concluído**
   - clichês removidos;
   - frases mais curtas;
   - sem nomes de pratos, ingredientes ou promessas não confirmadas.
6. **Motion — concluído**
   - reveal progressivo sem esconder conteúdo;
   - entrada e saída de menu;
   - transição interna curta;
   - magnetismo e luz de ponteiro discretos;
   - reduced motion completo.
7. **Performance — concluído, monitorar em produção**
   - WebP com economia total de 61,1% nos arquivos convertidos;
   - transferência inicial local mobile caiu de cerca de 3,67 MB para 1,21 MB;
   - vídeos pausam fora da viewport;
   - vídeo da hero não baixa em mobile ≤560 px;
   - build JS 6,42 kB gzip e CSS 6,37 kB gzip.
8. **Acabamento — concluído localmente**
   - sem overflow nos cinco viewports;
   - Axe: zero violações A/AA; contraste em gradientes exige revisão manual;
   - menu, reduced motion, scroll e links validados;
   - próxima etapa externa: publicar e repetir a auditoria contra a URL final.

Medições locais, não dados de campo:

| Viewport | LCP observado | CLS observado | Transferência inicial |
| --- | ---: | ---: | ---: |
| 1440×900 | 2.284 ms | 0,0020 | 1,18 MB |
| 1366×768 | 1.052 ms | 0,0023 | 0,98 MB |
| 390×844 | 552 ms | 0 | 1,21 MB |
| 375×812 | 920 ms | 0 | 1,21 MB |
| 430×932 | 1.800 ms | 0 | 1,21 MB |

Os valores variam com cache e máquina. Não são Lighthouse nem Core Web Vitals
de campo; INP não foi declarado porque não houve coleta de campo.

## K. Prompt de implementação

```text
Trabalhe no repositório existente do Via Gastrobar. Não recrie o projeto do zero
e não substitua a direção visual sem evidência.

Objetivo:
preservar a tese “A noite é servida”, a paleta extraída do logo, a fotografia
forte, a composição “mesa em cena” da hero e a hierarquia comercial:
1) Reservar mesa; 2) Traçar rota; 3) Instagram.

Fonte única da verdade:
- Via Gastrobar
- @viagastrobar
- https://www.instagram.com/viagastrobar/
- Rua Ipameri, loteamento Dona Nelcia, 3287
- Ao lado do Via Filadélfia
- Todos os dias, a partir das 18h
- (63) 99139-4000
- https://api.whatsapp.com/send?phone=5563991394000
- https://maps.app.goo.gl/jis5grnFQH36mhWs7

Não invente preços, nomes de pratos, ingredientes, avaliações, eventos,
delivery, música ao vivo, história, prêmios ou especialidades.

Leia primeiro:
- PROJECT_CONTEXT.md
- docs/AUDITORIA_PROFISSIONAL.md

Arquivos e módulos afetados:
- index.html: metadados, JSON-LD e fallback;
- vite.config.js: pré-renderização da home;
- src/data/site.js: única fonte de dados e mídia;
- src/components/layout/: header, menu, footer e dock;
- src/components/sections/: hero, ações, ambiente, mesa, bar e visita;
- src/interactions/: navegação, reveal, vídeos, pointer e transição;
- src/theme/: tokens, reset, tipografia, motion e estilos globais;
- src/pages/: home e rota /instagram;
- public/media/: usar WebP e vídeos já curados;
- tools/: auditoria, inventário, poster e otimização.

Não regredir:
- conteúdo deve existir no HTML inicial;
- nenhum `.reveal` pode esconder conteúdo por padrão;
- CTA deve estar funcional no primeiro quadro;
- nenhuma biblioteca pesada de motion;
- nenhum carrossel;
- nenhum autoplay simultâneo;
- nenhuma mídia social com copy embutida em posição nobre;
- nenhuma repetição de série sem justificativa;
- nenhum hover obrigatório;
- nenhum scroll hijacking;
- não remover reduced motion, foco ou headings.

Galeria obrigatória:
1. O lugar: ambiente (4) protagonista, ambiente (1) apoio, ambiente (2) detalhe.
2. A mesa: séries prato 1, prato 3 e prato 4; uma protagonista e um detalhe por série.
3. Mar: apenas prato polvo (1).
4. Bar: drink 1 (1).mp4, drink 1 (5) e vinho 1 (2); um vídeo ativo.
5. Fechamento: video local para rodape + reserva.

Critérios de aceite:
- build `npm run build` sem erro;
- zero overflow em 1440×900, 1366×768, 390×844, 375×812 e 430×932;
- menu abre, fecha, aceita Escape e não sobrepõe a hero incorretamente;
- WhatsApp, Maps e Instagram abrem os destinos corretos e preservam retorno;
- vídeos pausam fora da viewport e na aba oculta;
- reduced motion mostra todo conteúdo e toca zero vídeo;
- Axe sem violações WCAG A/AA e revisão manual dos contrastes inconclusivos;
- um único H1, headings ordenados, links e botões reais;
- touch targets mínimos de 44 px;
- não mais de uma mídia protagonista e duas de apoio por composição;
- transferência inicial mobile próxima ou inferior ao baseline local de 1,21 MB;
- comparar capturas antes/depois e registrar resultados em PROJECT_CONTEXT.md.

Execute ao final:
npm run build
npm run audit:media
AUDIT_URL=<url> AUDIT_OUTPUT=artifacts/audit/<nome> npm run audit:visual

Se uma mudança visual ampla falhar em qualquer viewport, corrija antes de
publicar. Não trate o projeto como concluído apenas porque compila.
```
