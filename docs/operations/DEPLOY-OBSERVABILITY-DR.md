# Deploy, observabilidade e continuidade

## Produção 0.9

- Oracle Linux ARM64;
- Nginx no host com TLS;
- app e worker em imagens imutáveis;
- Supabase self-host isolado;
- Redis/rate limit;
- WAHA ARM64;
- scheduler em container;
- segredos fora do código e do Compose versionado.

## Portas e redes

| Serviço | Exposição |
|---|---|
| Nginx | `0.0.0.0:80/443` |
| App Next.js | `127.0.0.1:4195->3000` |
| Kong/Supabase API | `127.0.0.1:54451->8000`, `127.0.0.1:54444->8443` |
| Pooler Postgres | `127.0.0.1:54452`, `127.0.0.1:54453` |
| Redis, WAHA, worker | rede Docker |

Redes em produção: `medify-app_internal` e `medify-supabase_default`.

## Deploy

1. Validar branch/release e checksum.
2. Backup de banco, storage e estado do canal.
3. Construir imagens com tag de versão.
4. Executar migrator.
5. Subir banco/dependências antes de app/worker.
6. Validar `docker compose ps`.
7. Validar health, login, MFA e perfis.
8. Inspecionar logs/filas.
9. Registrar release e janela.

## Health

`GET /api/v1/health` valida:

- Supabase;
- Redis;
- WAHA;
- versão e latência.

Health não deve expor segredo, DSN ou detalhes internos.

Em `2026-08-24`, o health público retornava `healthy` para Supabase, Redis e
WAHA. O compendium operacional guarda o snapshot completo em
[`PRODUCTION-COMPENDIUM-2026-08-24.md`](PRODUCTION-COMPENDIUM-2026-08-24.md).

## Sinais mínimos

- taxa/latência/error rate HTTP;
- autenticações e MFA negados;
- fila/event log e idade do item mais antigo;
- worker/cron falhos;
- inbound/outbound WhatsApp;
- runs/custo de IA;
- campanhas pendentes/falhas;
- acessos clínicos e incidentes;
- CPU, memória, disco, I/O e certificado;
- idade/sucesso do último backup.

## Backup

Cobrir:

- dump PostgreSQL em formato custom;
- volumes/storage de anexos;
- estado necessário do WAHA;
- arquivos de configuração sem segredos em texto aberto;
- inventário/checksum da release.

Backups são cifrados, copiados para destino externo, retidos conforme política e
testados. Cópia no mesmo VPS não é estratégia de recuperação.

## Restore e DR

1. Criar ambiente isolado.
2. Restaurar banco e storage.
3. Executar migrations compatíveis.
4. Subir serviços.
5. Validar contagens, Auth, RLS, anexos e hash clínico.
6. Rodar smoke e jornada crítica.
7. Medir RPO/RTO.
8. Descartar ambiente com segurança e registrar evidência.

## Rollback

Rollback de app troca imagem/tag. Banco usa estratégia roll-forward por padrão;
migration destrutiva precisa de expansão/contração, backup e plano aprovado.
Nunca executar `down` destrutivo automaticamente.

## Gates GA

- SLO/alertas e on-call;
- backup/restore/DR comprovados;
- pentest;
- runbook exercitado;
- capacidade/carga;
- contratos, retenção e incident response aprovados.
