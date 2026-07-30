# Backend, eventos e workers

## Camadas

| Camada | Responsabilidade |
|---|---|
| `app/api` | Adaptar HTTP, autenticar, validar entrada e responder |
| `lib/auth` | Sessão, tenant, papel, MFA e autorização |
| `lib/schemas` | Contratos e validação |
| `lib/*` | Casos de uso e domínio |
| `lib/supabase` | Adapters de persistência |
| `workers` | Consumo assíncrono e efeitos externos |
| `supabase/migrations` | Schema, funções, triggers, RLS e grants |

## Anatomia de uma rota

1. Resolver request ID e sessão.
2. Resolver organização ativa.
3. Exigir papel/escopo e, quando clínico, vínculo/finalidade.
4. Validar `params`, query e body.
5. Chamar caso de uso ou transação.
6. Auditar evento relevante sem segredo/PII desnecessária.
7. Responder envelope consistente e código HTTP apropriado.

## Contrato de erros

- `400`: contrato inválido;
- `401`: sessão/token ausente ou inválido;
- `403`: autenticado sem permissão;
- `404`: recurso inexistente ou invisível ao tenant;
- `409`: concorrência, duplicidade ou transição inválida;
- `422`: regra de negócio;
- `429`: limite;
- `500/503`: falha interna/dependência, com request ID e sem detalhe sensível.

## Eventos

O event log desacopla efeitos secundários. Um evento carrega:

- tipo e versão;
- organização;
- agregado e identificador;
- ator/origem;
- instante do banco;
- correlation/request ID;
- payload mínimo.

Consumidores registram tentativa, resultado e erro. Reprocessamento usa chave de
idempotência; evento confirmado não é descartado silenciosamente.

## Workers e jobs

- dispatcher de agentes;
- processamento de resposta de IA;
- indexação RAG e transcrição;
- follow-up flows;
- campanhas em lote;
- roteamento e heartbeat de atendentes;
- drain do event log;
- watchers de risco, snooze e SLA LGPD;
- redação/retention de storage;
- atualização e tarefas de sistema.

Jobs cron entram por rotas autenticadas com segredo exclusivo, não reutilizam
sessão de usuário e devem poder rodar novamente sem duplicar efeitos.

## Concorrência

- migrations usam advisory lock e checksum;
- operações externas têm idempotency key;
- movimentos de estado validam versão/estado atual;
- claim de conversa e processamento de fila precisam ser atômicos;
- tempo persistido vem do banco;
- retry aplica backoff e limite.

## Observabilidade

Cada fluxo crítico deve permitir responder:

1. qual request/evento iniciou;
2. qual tenant e ator executaram;
3. qual estado foi alterado;
4. qual dependência falhou;
5. se retry é seguro;
6. qual usuário foi impactado.

O inventário completo das rotas está em
[`../reference/generated/API-ROUTES.md`](../reference/generated/API-ROUTES.md).
