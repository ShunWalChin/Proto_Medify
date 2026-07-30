# Arquitetura do frontend

## Stack e organização

- Next.js App Router e React;
- TypeScript estrito;
- Tailwind CSS e componentes reutilizáveis;
- React Hook Form/Zod nos formulários aplicáveis;
- Supabase client apenas nas fronteiras autorizadas;
- Sentry preparado para captura de falhas.

As rotas públicas ficam em `app/(public)`, a aplicação do tenant em `app/app`,
administração da plataforma em `app/admin` e onboarding em `app/onboarding`.

## Shell

O shell combina:

- navegação lateral em desktop;
- drawer/menu em mobile;
- cabeçalho com tema, alertas e usuário;
- breadcrumb/título contextual;
- área rolável independente;
- estados de carregamento, vazio, erro e acesso negado.

Alvos interativos principais usam no mínimo 44×44 px. Tabelas possuem overflow
horizontal e conteúdo denso não depende somente de cor.

## Design system

Direção aplicada a partir do `ui-ux-pro-max-skill`:

- tipografia de produto: Figtree;
- leitura longa: Noto Sans;
- dados técnicos: IBM Plex Mono;
- tokens semânticos para fundo, superfície, texto, borda, foco e estados;
- motion discreto e respeitando `prefers-reduced-motion`;
- ícones centralizados no barrel `lib/ui/icons.ts`.

## Estado e dados

1. Server Components carregam dados quando possível.
2. Client Components cuidam de interação, formulários e realtime.
3. Toda mutação usa rota/handler server-side; o cliente não decide autorização.
4. Cache é invalidado pela chave do recurso e tenant.
5. Respostas tratam `loading`, `empty`, `error`, `forbidden` e `success`.

## Formulários

- label associada a cada controle;
- validação equivalente no cliente e servidor;
- mensagem de erro próxima ao campo;
- submit idempotente/bloqueado durante envio;
- confirmação para ação destrutiva;
- valor sensível nunca volta preenchido.

## Acessibilidade

- foco visível;
- ordem de tabulação coerente;
- componentes acionáveis por teclado;
- `aria-label` em ícones sem texto;
- contraste e estados não dependentes apenas de cor;
- títulos hierárquicos e landmarks;
- modal com foco contido e retorno ao acionador.

WCAG 2.2 AA, axe e leitor de tela continuam como gate de GA, mesmo com as
fundações já aplicadas.

## Segurança no frontend

- nenhum segredo de servidor usa prefixo público;
- HTML arbitrário não é renderizado sem sanitização;
- sessão é armazenada em cookie com nome único da aplicação;
- rotas protegidas também validam servidor/RLS;
- mensagens de erro não revelam existência de tenant, usuário ou segredo;
- dados clínicos não aparecem em notificações de tela bloqueada.

## Referência de páginas

O inventário completo é gerado em
[`../reference/generated/UI-ROUTES.md`](../reference/generated/UI-ROUTES.md).
