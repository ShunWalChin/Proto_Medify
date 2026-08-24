# Troubleshooting e incidentes

## Triagem rápida

1. Confirmar horário, tenant, usuário e request ID.
2. Consultar health.
3. Ver status dos containers.
4. Inspecionar logs desde o início do impacto.
5. Conferir fila/event log e dependência externa.
6. Reproduzir com menor privilégio e sem dado real quando possível.

## Sintomas comuns

| Sintoma | Verificar | Ação segura |
|---|---|---|
| Login falha | Auth, email provider, cookie/domain, relógio | Smoke de password grant e headers |
| Loop de login | nome do cookie, proxy, URL pública | Alinhar cookie browser/server/proxy |
| 502 no Nginx | upstream, buffers, app local, logs Nginx | Ver incidente 2026-08-24 e buffers do vhost |
| 431 no Nginx | cookie/header muito grande | Limpar cookie, reduzir payload de cookie, revisar `large_client_header_buffers` |
| 403 inesperado | tenant ativo, role, assignment, MFA | Auditar gate; não elevar usuário ad hoc |
| Dados vazios | RLS, `org_id`, contexto ativo | Testar tenant correto e policy |
| Health WAHA ok sem mensagem | sessão/QR, webhook, fila | Ver sessão e último evento |
| Mensagem duplicada | external ID/idempotência | Bloquear retry e reconciliar |
| Worker parado | health, lock, fila, Redis, DB | Reiniciar após preservar logs |
| Migration falha | extensão, checksum, versão | Corrigir preflight/nova migration |
| Campanha parada | status/janela/consentimento/worker | Inspecionar lote; retry idempotente |
| IA indisponível | credencial/modelo/orçamento | Handoff humano; não inventar chave |
| Disco alto | logs, imagens, backups locais | Aplicar retenção sem apagar evidência ativa |

## Incidente de segurança

1. Declare incidente e nomeie responsável.
2. Contenha a credencial, tenant, sessão ou integração.
3. Preserve logs, hashes, requests e horário UTC.
4. Classifique confidencialidade, integridade, disponibilidade e dado clínico.
5. Determine titulares, período, sistemas e suboperadores.
6. Acione DPO/jurídico e avalie comunicação aplicável.
7. Erradique causa e restaure de fonte confiável.
8. Valide isolamento, senha/chave rotacionada e ausência de persistência.
9. Monitore recorrência.
10. Faça post-mortem com ações, dono, prazo e teste.

## Credencial exposta

- revogar/rotacionar primeiro;
- encerrar sessões/tokens derivados;
- revisar logs desde criação;
- procurar reutilização;
- atualizar secret store;
- redeployar dependentes;
- nunca reproduzir o valor no ticket ou post-mortem.

## Evidência

Registre fatos, não suposições: timestamps, request IDs, versões, hashes, ações e
decisões. Screenshots com PII devem ser redigidos e guardados em local autorizado,
não neste repositório público.

## 502 Bad Gateway no Medify

Se `/app` ou `/admin` retornarem `502` e `/api/v1/health` continuar `200`, a causa
provavel e o proxy Nginx, nao o banco. O incidente de `2026-08-24` foi causado por
headers grandes do upstream Next.js/Supabase.

Checklist rapido:

```bash
curl -k -s -o /dev/null -w "%{http_code}\n" https://medify.64.181.178.125.nip.io/api/v1/health
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4195/api/v1/health
sudo tail -100 /var/log/nginx/error.log | grep -i "medify\|4195\|upstream"
```

Diretivas que devem existir no vhost:

```nginx
large_client_header_buffers 8 64k;
proxy_buffer_size 128k;
proxy_buffers 8 256k;
proxy_busy_buffers_size 256k;
proxy_temp_file_write_size 256k;
```

Referencia: [incidente 2026-08-24](INCIDENT-2026-08-24-NGINX-502.md).
