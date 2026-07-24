# Via Gastrobar

Site institucional mobile-first do Via Gastrobar, com home completa e rota curta
`/instagram`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`.

## Publicação no Vercel

1. Envie esta pasta para um repositório Git.
2. Importe o repositório no Vercel.
3. Se a configuração não for detectada automaticamente, use:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js: `22` ou superior
4. Publique.

O arquivo `vercel.json` mantém a rota `/instagram` e adiciona cache longo para
as mídias versionadas.

## Estrutura

```text
public/media/     imagens WebP e vídeos curados
src/components/   layout, seções e UI
src/data/         fonte única de dados e inventário publicado
src/interactions/ navegação, motion, vídeo e pointer
src/pages/        home e rota /instagram
src/theme/        tokens e tema visual centralizado
tools/            auditoria, inventário e otimização de mídia
vercel.json       rotas e cache no Vercel
```

Os arquivos originais da galeria continuam preservados na raiz, mas são
ignorados no upload pelo `.vercelignore`.

## Auditoria e contexto

- `PROJECT_CONTEXT.md`: decisões, arquitetura e estado do projeto.
- `docs/AUDITORIA_PROFISSIONAL.md`: auditoria visual, estratégica, técnica e
  plano de implementação.

```bash
npm run audit:media
npm run audit:visual
python tools/optimize_images.py --help
```
