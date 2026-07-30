# Guia de desenvolvimento

## Pré-requisitos

- Node.js 22;
- pnpm 11;
- Docker Engine + Compose;
- Git;
- projeto Supabase local/self-host;
- ambiente descartável para migrations e E2E.

## Instalação

No repositório de código da aplicação:

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm db:migrate
pnpm dev
```

Preencha somente variáveis do ambiente local. Nunca reutilize segredo de produção
e nunca versione `.env.local`.

## Comandos

| Comando | Uso |
|---|---|
| `pnpm dev` | servidor de desenvolvimento |
| `pnpm build` | build de produção |
| `pnpm typecheck` | TypeScript sem emissão |
| `pnpm lint` | ESLint |
| `pnpm test:unit` | suíte Vitest |
| `pnpm test:e2e` | Playwright |
| `pnpm db:migrate` | baseline + migrations pós-baseline |
| `pnpm audit --prod` | vulnerabilidades de produção |
| `pnpm worker` | worker principal local |

## Banco

Uma instalação vazia recebe `supabase/baseline.sql`, snapshot canônico até a
migration clínica 0096. Depois, `scripts/db-migrate.ts` aplica migrations
posteriores em ordem, registra checksum e usa advisory lock.

Regras:

- migration aplicada nunca é editada;
- correção nasce em nova migration;
- DDL e backfill consideram lock/volume;
- RLS, grants e testes acompanham tabela nova;
- migration destrutiva tem rollout/rollback próprio.

## Implementando uma feature

1. Defina finalidade, atores, estados e critérios.
2. Modele schema/contrato sem acoplar provedor ao domínio.
3. Escreva migration, RLS e teste de isolamento.
4. Implemente caso de uso e adapter.
5. Exponha rota com auth, validação e auditoria.
6. Construa UI responsiva com estados completos.
7. Cubra sucesso, erro, retry, papel menor e outro tenant.
8. Atualize inventários, módulo, regra de negócio e release notes.

## Comentários

Comente:

- por que um invariante existe;
- risco de service role, concorrência ou tempo;
- compatibilidade incomum;
- decisão de segurança;
- comportamento não óbvio de integração.

Não comente sintaxe evidente. Nome, tipo e função curta explicam o caminho comum.

## Definition of Done

- comportamento e limites documentados;
- TypeScript/build/testes verdes;
- lint sem erro novo;
- segurança e tenant revisados;
- observabilidade/erro úteis;
- migração reproduzível;
- UI acessível/responsiva;
- operação, rollback e provider dependency conhecidos.
