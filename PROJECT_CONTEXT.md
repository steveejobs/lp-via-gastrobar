# Via Gastrobar — contexto vivo do projeto

> Documento operacional para futuros contextos. Atualizar sempre que uma decisão,
> dependência, risco, validação ou mudança estrutural relevante ocorrer.

## 1. Objetivo

Criar uma landing page autoral, mobile-first e orientada à conversão para o Via
Gastrobar. A experiência deve vender a progressão da noite — ambiente, mesa,
pratos, bar e reserva — sem virar catálogo, template de luxo ou demonstração de
efeitos.

Hierarquia comercial:

1. Reservar mesa pelo WhatsApp.
2. Traçar rota.
3. Acessar o Instagram.

## 2. Fonte única da verdade

| Campo | Valor confirmado |
| --- | --- |
| Marca | Via Gastrobar |
| Instagram | [@viagastrobar](https://www.instagram.com/viagastrobar/) |
| Endereço | Rua Ipameri, loteamento Dona Nelcia, 3287 |
| Referência | Ao lado do Via Filadélfia |
| Funcionamento | Todos os dias, a partir das 18h |
| Reservas | (63) 99139-4000 |
| WhatsApp | https://api.whatsapp.com/send?phone=5563991394000 |
| Google Maps | https://maps.app.goo.gl/jis5grnFQH36mhWs7 |

Não inventar preços, ingredientes, nomes de pratos, promoções, avaliações,
eventos, delivery, música ao vivo, história, prêmios ou especialidades.

## 3. Tese criativa

**A noite é servida.**

A composição deve avançar como uma noite real:

1. a luz situa o lugar;
2. o serviço aproxima a mesa;
3. os pratos ganham protagonismo;
4. o líquido muda o ritmo;
5. a interface desacelera e termina em reserva.

Linguagens de movimento permitidas:

- **luz:** máscara e contraste para orientar o olhar;
- **serviço:** entrada curta, estável e com desaceleração;
- **líquido:** refração ou deslocamento muito discreto no capítulo do bar.

O movimento nunca pode bloquear conteúdo ou ação.

## 4. Direção da hero — estado aprovado

Fase final da skill `premium-hero-art-direction`: **polir**.  
Resultado da crítica visual: **aprovado**.

1. **Tese da marca:** a mesa é o centro de uma noite que combina ambiente,
   serviço, gastronomia e bebida.
2. **Função da hero:** comunicar nível, atmosfera, horário e os dois caminhos
   principais (reserva e rota) em até três segundos.
3. **Ativos fortes:** vídeo vertical de serviço de vinho, salão com mesas
   verdes, mesa posta e identidade em verde/dourado.
4. **Clichês a evitar:** split hero genérico, dourado em toda borda, serifada
   ornamental, glow, fade-up repetido, slideshow e vídeo decorativo.
5. **Riscos criativos:** primeira composição excessivamente fragmentada, texto
   pequeno em 1366×768, abertura dependente de autoplay e excesso de imagens
   competindo com o CTA.

Assinatura conceitual atual:

- **Tese:** o serviço abre a cena e revela o lugar.
- **Regra espacial:** um filete vertical de mídia se expande e organiza duas
  imagens secundárias como uma mesa abstrata.
- **Relação texto/mídia:** copy fixa à esquerda; tríptico assimétrico à direita.
- **Protagonista:** vídeo de vinho sendo servido.
- **Motion:** transformação de filete para composição de três mídias.
- **Mobile:** copy acima e composição própria de mídias abaixo.
- **Ação principal:** reservar no WhatsApp.
- **Dependência dos assets:** alta no vídeo vertical de serviço; moderada nas
  duas imagens de ambiente.

Comparação estrutural: sem histórico confiável de outro projeto. Contra o clichê
de restaurante premium, a transformação do filete em mesa visual é específica;
o estado final poderia se aproximar de um split hero comum, por isso a versão
integrada preserva a transformação do filete, usa três planos assimétricos e
mantém fatos/ações no mesmo campo visual. O primeiro quadro, o estado
intermediário, o menu e a adaptação mobile foram verificados em screenshot.

## 5. Arquitetura

### Estado encontrado em 2026-07-24

```text
index.html
src/
  main.js        # conteúdo, renderização e todas as interações
  styles.css     # tokens, layout e responsividade no mesmo arquivo
public/media/    # seleção parcial e renomeada de assets
hero-prototype/  # prova isolada já existente
```

Problema estrutural original: `src/main.js` e `src/styles.css` concentravam
praticamente todo o sistema.

Estrutura integrada:

```text
src/
  app/
  components/
    layout/
    sections/
    ui/
  data/
  interactions/
  pages/
  theme/
    tokens.css
    reset.css
    typography.css
    motion.css
    global.css
  main.js
tools/
  visual-audit.cjs
  media-inventory.cjs
  extract-video-poster.cjs
  optimize_images.py
docs/
  AUDITORIA_PROFISSIONAL.md
  INSTAGRAM.md
```

## 6. Inventário resumido de assets

Os originais permanecem na raiz; a seleção publicada está em `public/media`.
Os nomes não são evidência suficiente: a curadoria final deve usar contato
visual/folhas de contato e dimensões reais.

| Família | Originais | Uso atual |
| --- | --- | --- |
| Identidade | `logo completo.jpg`, `video para animação.mp4` | logo e hero |
| Ambiente | `ambiente (1..5).jpg` | cinco imagens renomeadas; três em destaque |
| Prato 1 | `prato 1 (1..4).jpg` | duas imagens selecionadas |
| Prato 2 | `prato 2 (1..4).jpg` | mantido no acervo, fora da publicação |
| Prato 3 | `prato 3 (1..5).jpg`, `prato 3.mp4` | duas imagens; vídeo fora |
| Prato 4 | `prato 4 (1..3).jpg` | uma imagem |
| Mar/assinatura | `prato polvo*`, `prato lagosta.jpg` | somente `prato polvo (1)` publicado |
| Drinks | fotos e quatro vídeos | duas fotos e um vídeo |
| Vinhos | `vinho*` | três imagens |
| Fechamento | `video local para rodape.mp4` | vídeo na seção de visita |

## 7. Auditoria

Deploy auditado: https://lp-via-gastrobar.vercel.app/

Viewports obrigatórios:

- desktop: 1440×900 e 1366×768;
- mobile: 390×844, 375×812 e 430×932.

Evidência original em `artifacts/audit/live-scrolled/`.  
Evidência corrigida em `artifacts/audit/final-v2/`.

`artifacts/` é local e ignorado pelo Git para não inflar o repositório; pode ser
regenerado com `npm run audit:visual`.

Achados já confirmados:

- **P0:** elementos `.reveal` começam invisíveis e dependem totalmente de
  JavaScript + `IntersectionObserver`; uma captura full-page sem scroll mostra
  grandes blocos vazios. O conteúdo precisa ser visível por padrão e a animação
  deve ser melhoria progressiva.
- A hero possui CTA de reserva e rota na primeira dobra.
- Não existe navegação/menu principal apesar de o briefing exigir abertura de
  menu e acesso rápido por capítulos.
- O deploy usa uma seleção curta da mídia, mas ainda não documenta a inspeção
  visual de todas as famílias.
- O deploy original já possuía `prefers-reduced-motion`, mas a validação
  automatizada ainda não fazia parte do repositório.

Estado após correção:

- conteúdo completo pré-renderizado no HTML;
- primeiro quadro útil nos cinco viewports;
- menu desktop/mobile e dock persistente;
- links reais validados: WhatsApp, Google Maps e Instagram;
- retorno à página preservado por abertura em nova aba;
- vídeo do bar reproduz em viewport e pausa no retorno ao topo;
- reduced motion: zero vídeo tocando e zero conteúdo oculto;
- zero overflow nos cinco viewports;
- Axe: zero violações WCAG A/AA; 37 nós em gradientes permanecem como
  verificação manual;
- imagens publicadas em WebP, com economia total de 61,1%;
- transferência inicial local mobile: aproximadamente 1,21 MB;
- auditoria completa: `docs/AUDITORIA_PROFISSIONAL.md`.

### Rota `/instagram`

- entrada estática própria em `instagram.html`;
- composição 100% mobile, com largura máxima de 520 px;
- reserva e rota visíveis na primeira dobra;
- sem vídeo ou autoplay;
- aproximadamente 913 kB de transferência inicial local;
- zero overflow em 360, 375, 390, 412 e 430 px;
- detalhes e regras em `docs/INSTAGRAM.md`.

## 8. Critérios de aceite

- Sem overflow horizontal nos viewports definidos.
- CTA primário útil antes de qualquer animação e na primeira dobra mobile.
- Touch targets de pelo menos 44 px.
- Conteúdo completo e utilizável sem JavaScript ou sem `IntersectionObserver`.
- Um único H1, headings ordenados, foco visível e navegação por teclado.
- Nenhum vídeo fora da viewport reproduzindo.
- No máximo uma mídia protagonista e duas de apoio por composição.
- Nenhum hover obrigatório no mobile.
- `prefers-reduced-motion` produz página estática completa.
- Build sem erro e auditoria visual repetível por `tools/visual-audit.cjs`.
- Validação nos cinco viewports obrigatórios após toda mudança visual ampla.

## 9. Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run audit:visual
python tools/optimize_images.py --help
```

## 10. Log de decisões

### 2026-07-24

- Criado este documento como fonte viva para futuros contextos.
- A pasta pedida como “tous” será implementada como `tools/`, convenção mais
  clara para scripts de manutenção.
- O site será modularizado sem apagar os assets originais.
- A hero não será declarada aprovada antes de capturas estáticas e validação de
  motion em desktop e mobile.
- Refactor concluído em dados, componentes, páginas, interações e tema.
- Home pré-renderizada no build por `vite.config.js`.
- Menu mobile corrigido para usar plano independente do header.
- Hero passou a usar poster real extraído em 2,4 s e loop útil de 0,15–6,4 s.
- Vídeo da hero fica estático em telas até 560 px.
- Galeria reorganizada em lugar, mesa, mar, bar e fechamento.
- `prato polvo (2)` e `prato lagosta` não ocupam posição nobre por copy social
  embutida; o capítulo de mar usa somente `prato polvo (1)`.
- Axe zerou violações A/AA após correção do contraste da action bar; gradientes
  continuam no checklist visual manual.
- `npm run build` aprovado.
- `/instagram` redesenhado a partir da análise de Ótica Moderna, Hanzaki e SOS
  Ótica, preservando identidade própria e sem copiar catálogo ou avaliações.
- Criado `tools/audit-instagram.cjs` para QA específico mobile.
