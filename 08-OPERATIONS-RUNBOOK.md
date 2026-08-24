# Runbook de operação — MEDIFY

## Topologia e responsabilidade

- Nginx do host: TLS, headers e proxy reverso.
- `medify-app`: aplicação Next.js; `medify-worker`: consumidores assíncronos.
- Supabase isolado: Auth, Postgres, Storage, Realtime e APIs.
- WAHA isolado: sessão WhatsApp; Redis HTTP: rate limit e coordenação.
- Scheduler: dispara cron autenticado; nenhum serviço interno publica porta externa.

Produção vive em `/opt/medify`. Segredos ficam somente em
`/opt/medify/secrets`, modo `0700` no diretório e `0600` nos arquivos.

Snapshot real de produção: [Compendium 2026-08-24](docs/operations/PRODUCTION-COMPENDIUM-2026-08-24.md).
Acessos e segredos: [política operacional](docs/operations/ACCESS-AND-SECRETS.md).

## Rotina diária

```bash
cd /opt/medify/app
docker compose -f deploy/oracle/docker-compose.yml \
  --env-file /opt/medify/secrets/app.env ps
curl -fsS https://medify.64.181.178.125.nip.io/api/v1/health
docker compose -f deploy/oracle/docker-compose.yml \
  --env-file /opt/medify/secrets/app.env logs --since 24h app worker scheduler
```

Verificar: containers saudáveis, health HTTP 200, espaço em disco, expiração do
certificado, erros de worker, fila de eventos, WAHA conectado e incidentes no admin.

Status HTTP esperado em produção:

| Rota | Status esperado | Interpretação |
|---|---:|---|
| `/api/v1/health` | `200` | Stack operacional |
| `/`, `/app`, `/admin` | `307` | Redirecionamento normal para sessão/login |
| `api-medify.../auth/v1/health` sem API key | `401` | API protegida corretamente |

## Backup e restauração

Backup diário mínimo:

```bash
docker exec medify-supabase-db pg_dump -U postgres -Fc postgres \
  > /opt/medify/backups/medify-$(date +%F-%H%M).dump
```

Copiar backup criptografado para destino externo, aplicar retenção e registrar
checksum. Storage e volumes WAHA precisam de backup próprio. Uma cópia só no VPS
não é backup.

Restore deve ser ensaiado fora de produção: subir Postgres vazio, restaurar com
`pg_restore --clean --if-exists`, iniciar APIs, executar migrations, validar
contagens, Auth, RLS, prontuário e anexos. Nunca testar restore sobre produção.

## Atualização e rollback

1. Backup e health antes da janela.
2. Construir imagem com tag imutável.
3. Rodar `pnpm db:migrate`; migrations são checksumadas e usam advisory lock.
4. Subir app/worker; validar health, login e smoke tests.
5. Manter a imagem anterior. Rollback de aplicação troca a tag; migration de
   dados destrutiva exige plano próprio e não deve depender de `down`.

## Rotação de segredos

Rotacionar individualmente chaves de cron, impersonação, criptografia, WAHA,
Supabase e integrações. Troca de chave de criptografia exige recriptografia
planejada. Revogar a chave antiga só depois de verificar a nova. Nunca exibir
segredos em tickets, logs ou documentação.

## Incidente

1. Conter: suspender tenant/token/sessão afetada sem apagar evidência.
2. Preservar: audit logs, request IDs, horário UTC, imagens e hashes.
3. Classificar: disponibilidade, confidencialidade, integridade e dado clínico.
4. Corrigir causa raiz, rotacionar credenciais e validar isolamento.
5. Acionar DPO/jurídico para obrigações LGPD e comunicar com fatos confirmados.
6. Registrar post-mortem sem culpa, ações, dono e prazo.

Incidentes documentados:

- [2026-08-24: 502 Bad Gateway por header grande no Nginx](docs/operations/INCIDENT-2026-08-24-NGINX-502.md).

## Gates antes de uso assistencial

Pentest independente, restore comprovado, homologação jurídica/privacidade,
política de retenção, assinatura aplicável, treinamento dos usuários e aceite
formal da clínica.
