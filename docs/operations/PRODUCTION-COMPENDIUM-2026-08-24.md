# Compendium de producao MEDIFY

Snapshot operacional capturado em `2026-08-24T18:53:11Z` no servidor
`64.181.178.125`.

Este documento descreve o estado real do MEDIFY em producao. Ele nao armazena
senhas, JWTs, service role keys, tokens de IA, credenciais WAHA, credenciais
SMTP, chaves Supabase ou dados de paciente. Valores sensiveis permanecem apenas
no servidor ou no cofre operacional.

## Resumo executivo

- Produto em producao: `MEDIFY 0.9.0-beta.0`.
- Host: `januria-mg-oficial---saas-server`.
- Kernel: `Linux 6.12.0-203.76.7.3.el9uek.aarch64`.
- Arquitetura: Oracle Linux ARM64, Nginx no host, Docker Compose, Next.js,
  Supabase self-host, Postgres, Redis, WAHA e workers.
- Estado do health publico: `healthy`.
- Checks internos do health: Supabase `ok`, Redis `ok`, WAHA `ok`.
- App publico: `https://medify.64.181.178.125.nip.io`.
- API publica Supabase/Kong: `https://api-medify.64.181.178.125.nip.io`.

## Links e superficies

| Superficie | URL | Status observado | Observacao |
|---|---|---:|---|
| Aplicacao | `https://medify.64.181.178.125.nip.io/` | `307` | Redireciona para fluxo autenticado |
| App autenticado | `https://medify.64.181.178.125.nip.io/app` | `307` | Redireciona conforme sessao |
| Admin | `https://medify.64.181.178.125.nip.io/admin` | `307` | Exige usuario privilegiado |
| Health | `https://medify.64.181.178.125.nip.io/api/v1/health` | `200` | Endpoint publico sem segredo |
| Supabase/Auth/Kong | `https://api-medify.64.181.178.125.nip.io` | `401` sem API key | Esperado: API protegida |

URLs publicas configuradas:

```text
NEXT_PUBLIC_APP_URL=https://medify.64.181.178.125.nip.io
NEXT_PUBLIC_ADMIN_URL=https://medify.64.181.178.125.nip.io/admin
NEXT_PUBLIC_SUPABASE_URL=https://api-medify.64.181.178.125.nip.io
SUPABASE_PUBLIC_URL=https://api-medify.64.181.178.125.nip.io
API_EXTERNAL_URL=https://api-medify.64.181.178.125.nip.io/auth/v1
SITE_URL=https://medify.64.181.178.125.nip.io
ADDITIONAL_REDIRECT_URLS=https://medify.64.181.178.125.nip.io/**
KONG_HTTP_PORT=54451
KONG_HTTPS_PORT=54444
```

WAHA esta isolado na rede Docker e nao possui painel publico exposto. A URL
interna usada por app/worker e `http://waha:3000`.

## Acessos

Credenciais nao devem ser versionadas neste repositorio.

Usuarios bootstrap conhecidos do app:

| Usuario | Finalidade | Onde recuperar senha |
|---|---|---|
| `root@medify.local` | Administracao inicial/root | `/opt/medify/secrets/bootstrap-credentials.txt` |
| `beta_test@medify.local` | Homologacao beta | `/opt/medify/secrets/bootstrap-credentials.txt` |
| `user@medify.local` | Usuario comum de teste | `/opt/medify/secrets/bootstrap-credentials.txt` |

Outros segredos por arquivo:

| Arquivo | Conteudo | Regra |
|---|---|---|
| `/opt/medify/secrets/app.env` | Segredos do app, IA, WAHA, Supabase service role, cron, Redis HTTP | Nunca copiar para Git |
| `/opt/medify/secrets/bootstrap-credentials.txt` | Senhas bootstrap temporarias | Ler apenas por operador autorizado |
| `/opt/medify/infra/supabase/docker/.env` | Chaves Supabase, dashboard, Postgres, SMTP, JWT, storage | Nunca copiar para Git |

Recomendacao obrigatoria antes de piloto real: rotacionar senhas bootstrap,
registrar o destino no cofre e manter no Git apenas usuarios, roles e processo.

## Containers de producao

| Container | Imagem | Estado observado | Responsabilidade | Exposicao |
|---|---|---|---|---|
| `medify-app-app-1` | `medify-app:0.9.0-beta.0` | `healthy` | Next.js App Router, UI e APIs BFF | `127.0.0.1:4195->3000` |
| `medify-app-worker-1` | `medify-worker:0.9.0-beta.0` | `healthy` | Agent worker e processamento assincrono | `8787/tcp` interno |
| `medify-app-scheduler-1` | `alpine:3.20` | up | Cron autenticado contra endpoints internos | Docker interno |
| `medify-app-waha-1` | `devlikeapro/waha:noweb-arm-2026.7.1` | up | WhatsApp NOWEB, webhooks e sessao | Docker interno |
| `medify-app-redis-1` | `redis:7.4-alpine` | `healthy` | Cache, rate limit e coordenacao volatil | Docker interno |
| `medify-app-srh-1` | `hiett/serverless-redis-http:latest` | up | API HTTP interna para Redis | Docker interno |
| `medify-supabase-kong` | `kong/kong:3.9.1` | `healthy` | Gateway Supabase | `127.0.0.1:54451->8000`, `127.0.0.1:54444->8443` |
| `medify-supabase-auth` | `supabase/gotrue:v2.189.0` | `healthy` | Supabase Auth | Via Kong |
| `medify-supabase-db` | `supabase/postgres:17.6.1.136` | `healthy` | Postgres transacional | Docker interno |
| `medify-supabase-rest` | `postgrest/postgrest:v14.12` | `healthy` | REST API PostgREST | Via Kong |
| `medify-supabase-realtime` | `supabase/realtime:v2.102.3` | `healthy` | Realtime | Via Kong |
| `medify-supabase-storage` | `supabase/storage-api:v1.60.4` | `healthy` | Storage de anexos e arquivos | Via Kong |
| `medify-supabase-meta` | `supabase/postgres-meta:v0.96.6` | `healthy` | Metadados de banco | Docker interno |
| `medify-supabase-studio` | `supabase/studio:2026.07.07-sha-a6a04f2` | `healthy` | Studio administrativo | Nao publicado diretamente |
| `medify-supabase-edge-functions` | `supabase/edge-runtime:v1.74.0` | `healthy` | Runtime de edge functions | Via Supabase |
| `medify-supabase-pooler` | `supabase/supavisor:2.9.5` | `healthy` | Pooler Postgres | `127.0.0.1:54452`, `127.0.0.1:54453` |
| `medify-supabase-imgproxy` | `darthsim/imgproxy:v3.30.1` | `healthy` | Transformacao de imagens | Docker interno |

## Redes, volumes e portas

Redes Docker:

```text
medify-app_internal
medify-supabase_default
```

Volumes Docker:

```text
medify-app_waha-data
medify-app_waha-media
medify-supabase_db-config
medify-supabase_deno-cache
```

Portas locais do host relacionadas ao Medify:

| Porta | Bind | Uso |
|---:|---|---|
| `4195` | `127.0.0.1` | App Next.js por tras do Nginx |
| `54451` | `127.0.0.1` | Kong HTTP/Supabase API por tras do Nginx |
| `54444` | `127.0.0.1` | Kong HTTPS interno |
| `54452` | `127.0.0.1` | Supavisor/Postgres session pool |
| `54453` | `127.0.0.1` | Supavisor/Postgres transaction pool |

Nenhuma dessas portas deve escutar em `0.0.0.0`.

## Nginx

Arquivo ativo:

```text
/etc/nginx/conf.d/medify.conf
```

Responsabilidades:

- redirecionar HTTP 80 para HTTPS;
- terminar TLS para `medify.64.181.178.125.nip.io`;
- terminar TLS para `api-medify.64.181.178.125.nip.io`;
- aplicar headers de seguranca;
- enviar o app para `http://127.0.0.1:4195`;
- enviar a API Supabase/Kong para `http://127.0.0.1:54451`.

Ajustes de buffer aplicados em `2026-08-24` para corrigir `502 Bad Gateway` por
headers grandes do upstream:

```nginx
large_client_header_buffers 8 64k;
proxy_buffer_size 128k;
proxy_buffers 8 256k;
proxy_busy_buffers_size 256k;
proxy_temp_file_write_size 256k;
```

Backups criados durante o incidente:

```text
/etc/nginx/conf.d/medify.conf.bak-20260824-184425
/etc/nginx/conf.d/medify.conf.bak-large-client-20260824-184526
```

O `nginx -t` esta aprovado. Ha warnings de MIME duplicado em outros vhosts
`lp-*`, sem relacao direta com o Medify.

## Filesystem de producao

| Caminho | Funcao |
|---|---|
| `/opt/medify` | Raiz do deploy Medify |
| `/opt/medify/app` | Codigo da aplicacao e Compose do app |
| `/opt/medify/app/deploy/oracle/docker-compose.yml` | Compose do app, worker, WAHA, Redis, SRH e scheduler |
| `/opt/medify/app/Dockerfile` | Imagem standalone Next.js |
| `/opt/medify/app/Dockerfile.worker` | Imagem do worker long-running |
| `/opt/medify/app/supabase/migrations` | Migrations canonicas do produto |
| `/opt/medify/infra/supabase/docker` | Stack Supabase self-host |
| `/opt/medify/releases` | Releases empacotadas |
| `/opt/medify/secrets` | Secret store local do Medify |
| `/etc/nginx/conf.d/medify.conf` | Reverse proxy publico |

## Compose do app

Arquivo:

```bash
cd /opt/medify/app
docker compose -f deploy/oracle/docker-compose.yml --env-file /opt/medify/secrets/app.env ps
```

Servicos do Compose:

- `app`: Next.js em imagem `medify-app:0.9.0-beta.0`;
- `worker`: worker em imagem `medify-worker:0.9.0-beta.0`;
- `waha`: WhatsApp NOWEB ARM64;
- `redis`: Redis volatil sem AOF;
- `srh`: serverless-redis-http para acesso HTTP interno;
- `scheduler`: Alpine com crontab interno.

Hardening no Compose:

- `restart: unless-stopped`;
- logging `json-file` com `max-size=10m` e `max-file=5`;
- `no-new-privileges:true`;
- `cap_drop: ALL` nos servicos proprios;
- portas publicas bindadas somente em loopback;
- WAHA dashboard desabilitado publicamente.

## Scheduler interno

O scheduler chama endpoints internos do app com `Authorization: Bearer
$INTERNAL_SECRET`.

| Frequencia | Endpoint | Finalidade |
|---|---|---|
| `* * * * *` | `/api/v1/cron/agent-dispatcher` | Drenar turnos de agentes |
| `* * * * *` | `/api/v1/cron/followup-flow-worker` | Executar follow-ups |
| `* * * * *` | `/api/v1/cron/event-log-drain` | Drenar event log |
| `* * * * *` | `/api/v1/cron/broadcast-dispatcher` | Disparar campanhas |
| `*/5 * * * *` | `/api/v1/cron/storage-redaction?limit=50` | Redacao/limpeza de storage |
| `*/5 * * * *` | `/api/v1/cron/snooze-watcher` | Reativar conversas adiadas |
| `0 12 * * *` | `/api/v1/cron/lgpd-sla-watcher` | Monitorar SLA LGPD |
| `30 3 * * *` | `/api/v1/cron/kb-conversations-batch` | Batch de conhecimento/conversas |

## Variaveis de ambiente

Somente nomes sao documentados. Valores ficam fora do Git.

### App

Principais grupos em `/opt/medify/secrets/app.env`:

- URLs publicas: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ADMIN_URL`,
  `NEXT_PUBLIC_SUPABASE_URL`;
- Supabase: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `SUPABASE_DB_URL`;
- seguranca interna: `INTERNAL_SECRET`, `INTERNAL_CRON_SECRET`,
  `IMPERSONATE_COOKIE_SECRET`;
- LGPD: `LGPD_DPO_EMAIL`, `LGPD_SIGNING_KEY`,
  `LGPD_EXPORT_EXPIRES_HOURS`;
- IA: `AI_GATEWAY_API_KEY`, `AI_CRED_AES_KEY`, `OPENAI_API_KEY`,
  `ANTHROPIC_API_KEY`;
- Redis HTTP: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
  `SRH_TOKEN`;
- WAHA/WhatsApp: `WAHA_API_BASE_URL`, `WAHA_API_KEY`,
  `WAHA_API_KEY_SHA512`, `WAHA_HMAC_SECRET`, `WAHA_DASHBOARD_PASSWORD`,
  `WAHA_SWAGGER_PASSWORD`, `WAHA_WEBHOOK_BASE_URL`,
  `WAHA_WEBHOOK_REQUIRE_SIGNATURE`, `WHATSAPP_DEFAULT_ENGINE`;
- Nuvemshop: `NUVEMSHOP_ENABLED`, `NUVEMSHOP_OAUTH_ENCRYPTION_KEY`;
- observabilidade: `SENTRY_DSN`.

### Supabase

Principais grupos em `/opt/medify/infra/supabase/docker/.env`:

- URLs: `SITE_URL`, `SUPABASE_PUBLIC_URL`, `API_EXTERNAL_URL`,
  `ADDITIONAL_REDIRECT_URLS`;
- gateway: `KONG_HTTP_PORT`, `KONG_HTTPS_PORT`;
- Auth/JWT: `JWT_SECRET`, `JWT_EXPIRY`, `ANON_KEY`,
  `SERVICE_ROLE_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`;
- banco/pooler: `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_PORT`,
  `POSTGRES_PASSWORD`, `POOLER_*`;
- Studio: `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD`;
- storage/S3: `GLOBAL_S3_BUCKET`, `S3_PROTOCOL_ACCESS_KEY_ID`,
  `S3_PROTOCOL_ACCESS_KEY_SECRET`, `STORAGE_TENANT_ID`;
- SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
  `SMTP_ADMIN_EMAIL`, `SMTP_SENDER_NAME`.

## Modulos do produto

O produto documentado possui 18 areas principais:

1. Plataforma SaaS e white-label;
2. Pacientes e Customer 360;
3. Agenda;
4. Atendimento omnichannel;
5. CRM e funis clinicos;
6. Prontuario eletronico;
7. Agentes de IA;
8. Automacoes, webhooks e n8n;
9. Campanhas e relacionamento;
10. WalChat nativo planejado;
11. Financeiro planejado;
12. Equipe e governanca;
13. Busca, notificacoes e produtividade;
14. Analytics;
15. Integracoes e interoperabilidade;
16. LGPD e direitos;
17. Seguranca e observabilidade;
18. Operacao e entrega.

Estado detalhado: ver
[`../../02-FUNCTIONAL-CATALOG.md`](../../02-FUNCTIONAL-CATALOG.md) e
[`../reference/MODULES.md`](../reference/MODULES.md).

## Inventario de codigo

Inventario gerado a partir do snapshot local do codigo MEDIFY
`0.9.0-beta.0`:

- rotas HTTP: `181`;
- paginas: `89`;
- migrations SQL: `89`;
- arquivos de teste/sonda: `328`.

Referencias geradas:

- [`../reference/generated/API-ROUTES.md`](../reference/generated/API-ROUTES.md);
- [`../reference/generated/UI-ROUTES.md`](../reference/generated/UI-ROUTES.md);
- [`../reference/generated/DATABASE-OBJECTS.md`](../reference/generated/DATABASE-OBJECTS.md);
- [`../reference/generated/TEST-INVENTORY.md`](../reference/generated/TEST-INVENTORY.md);
- [`../reference/generated/ENVIRONMENT-VARIABLES.md`](../reference/generated/ENVIRONMENT-VARIABLES.md);
- [`../reference/generated/SOURCE-METRICS.md`](../reference/generated/SOURCE-METRICS.md).

## Operacao diaria

Health publico:

```bash
curl -fsS https://medify.64.181.178.125.nip.io/api/v1/health
```

Containers do app:

```bash
cd /opt/medify/app
docker compose -f deploy/oracle/docker-compose.yml \
  --env-file /opt/medify/secrets/app.env ps
```

Containers Supabase:

```bash
docker ps --filter "name=medify-supabase"
```

Teste Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Restart limitado ao app:

```bash
cd /opt/medify/app
docker compose -f deploy/oracle/docker-compose.yml \
  --env-file /opt/medify/secrets/app.env restart app
```

Restart app + worker:

```bash
cd /opt/medify/app
docker compose -f deploy/oracle/docker-compose.yml \
  --env-file /opt/medify/secrets/app.env restart app worker scheduler
```

## Backup minimo

Banco:

```bash
docker exec medify-supabase-db pg_dump -U postgres -Fc postgres \
  > /opt/medify/backups/medify-$(date +%F-%H%M).dump
```

Tambem precisam de cobertura:

- Supabase Storage;
- volumes `medify-app_waha-data` e `medify-app_waha-media`;
- arquivos de configuracao sem expor segredos;
- checksums e copia cifrada externa.

Uma copia apenas no mesmo VPS nao e backup suficiente.

## Riscos e pendencias operacionais

- Senhas bootstrap devem ser rotacionadas antes de qualquer piloto com dado real.
- Supabase Studio nao deve ser publicado sem controle adicional.
- WAHA esta isolado; qualquer exposicao futura exige TLS, auth forte e allowlist.
- Backups precisam de destino externo e restore ensaiado.
- Logs de app/worker podem conter payloads sensiveis; nao devem ser copiados
  para Git nem tickets sem redacao.
- Pentest, SLOs, alertas, secret scanning e DR devem ser gates para GA.

## Comportamento esperado de status

- `200` em `/api/v1/health`: stack operacional.
- `307` em `/`, `/app` e `/admin`: redirecionamento normal para login/sessao.
- `401` em `https://api-medify.../auth/v1/health` sem API key: esperado.
- `502` em `/app` ou `/admin`: investigar Nginx upstream e buffers.
- `431` com cookie artificial muito grande: limite de seguranca do Nginx.

