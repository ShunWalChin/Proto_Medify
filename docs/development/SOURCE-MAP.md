# Mapa do código

O repositório de aplicação segue esta organização:

| Caminho | Responsabilidade |
|---|---|
| `app/` | páginas, layouts, loading/error e rotas HTTP |
| `components/` | UI e componentes de domínio reutilizáveis |
| `hooks/` | estado e integração client-side |
| `lib/api/` | envelopes, wrappers e contratos HTTP |
| `lib/auth/` | sessão, tenant, RBAC e autorização |
| `lib/agent-engine/` | execução de agentes, tools e guardrails |
| `lib/ai/` | providers, RAG, memória, skills e orçamento |
| `lib/audit/` | auditoria estruturada |
| `lib/event-log/` | eventos e dispatcher |
| `lib/followup/` | engine e grafos de follow-up |
| `lib/leads/` | CRM, timeline, score e reativação |
| `lib/schemas/` | validação Zod |
| `lib/supabase/` | clients e persistência |
| `lib/waha/` | adapter WhatsApp |
| `workers/` | consumidores assíncronos |
| `scripts/` | migração, bootstrap, smoke, QA e manutenção |
| `supabase/migrations/` | evolução do banco/RLS |
| `tests/` | unit, invariants, DB, shell, probes e E2E |
| `deploy/oracle/` | Compose, Nginx e preparação do VPS |
| `docs/` | documentação mantida junto ao código |

## Pontos de entrada

- `proxy.ts`: sessão/cookie e proteção de navegação;
- `instrumentation.ts`: inicialização server-side;
- `app/api/v1/health/route.ts`: health;
- `workers/agent-worker/main.ts`: consumo principal;
- `scripts/db-migrate.ts`: instalação determinística;
- `scripts/bootstrap-medify-beta.ts`: organização/perfis iniciais;
- `deploy/oracle/docker-compose.yml`: topologia da aplicação.

## Convenções de localização

- página: `app/<rota>/page.tsx`;
- endpoint: `app/api/<rota>/route.ts`;
- teste próximo: `*.test.ts(x)` ou `tests/unit`;
- contrato compartilhado: `lib/schemas`;
- regra reutilizável: `lib/<domínio>`;
- regra de banco: migration/função/RLS, nunca escondida somente na UI.

Inventários derivados do snapshot:

- [rotas API](../reference/generated/API-ROUTES.md);
- [páginas](../reference/generated/UI-ROUTES.md);
- [banco/migrations](../reference/generated/DATABASE-OBJECTS.md);
- [testes](../reference/generated/TEST-INVENTORY.md).
