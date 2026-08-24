# Incidente 2026-08-24: 502 Bad Gateway no Medify

## Resumo

Em `2026-08-24`, acessos autenticados em `/app` e `/admin` exibiam
`502 Bad Gateway` pelo Nginx. Containers do MEDIFY estavam saudaveis e o
endpoint `/api/v1/health` respondia `200`.

## Impacto

- Sintoma visivel: pagina `502 Bad Gateway nginx`.
- Superficies afetadas: `/app`, `/admin` e rotas autenticadas com headers
  grandes.
- Superficies nao afetadas: health publico e containers Docker.
- Dados: sem evidencia de perda de dados ou parada de Postgres/Supabase.

## Evidencia

Erro no Nginx:

```text
upstream sent too big header while reading response header from upstream
```

Upstream envolvido:

```text
http://127.0.0.1:4195/app
http://127.0.0.1:4195/admin
```

Esse padrao indica resposta do app com headers maiores do que o buffer padrao
do Nginx, geralmente por cookies/session/auth.

## Causa raiz

Configuracao de buffer do Nginx insuficiente para headers gerados pelo fluxo
autenticado do app Next.js/Supabase.

## Correcao aplicada

Arquivo:

```text
/etc/nginx/conf.d/medify.conf
```

Backups:

```text
/etc/nginx/conf.d/medify.conf.bak-20260824-184425
/etc/nginx/conf.d/medify.conf.bak-large-client-20260824-184526
```

Diretivas adicionadas nos blocos HTTPS do Medify:

```nginx
large_client_header_buffers 8 64k;
proxy_buffer_size 128k;
proxy_buffers 8 256k;
proxy_busy_buffers_size 256k;
proxy_temp_file_write_size 256k;
```

Validacao:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -k -s -o /dev/null -w "%{http_code}" https://medify.64.181.178.125.nip.io/api/v1/health
```

Resultado observado:

| Rota | Resultado |
|---|---:|
| `/` | `307` |
| `/app` | `307` |
| `/admin` | `307` |
| `/api/v1/health` | `200` |

## Como diagnosticar se voltar

1. Confirmar status externo:

   ```bash
   for path in / /app /admin /api/v1/health; do
     curl -k -s -o /dev/null -w "%{http_code} $path\n" \
       "https://medify.64.181.178.125.nip.io$path"
   done
   ```

2. Verificar upstream local:

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4195/api/v1/health
   ```

3. Procurar erro especifico:

   ```bash
   sudo tail -100 /var/log/nginx/error.log | grep -i "medify\|4195\|upstream"
   ```

4. Se aparecer `upstream sent too big header`, conferir se as diretivas de
   buffer ainda existem no vhost.

5. Se aparecer `connect() failed`, investigar container `medify-app-app-1`.

## Acoes preventivas

- Manter buffers versionados tambem no template `deploy/oracle/nginx-medify.conf`.
- Adicionar smoke test autenticado com cookie real antes de releases.
- Monitorar `502`, `431` e erros `upstream` por vhost.
- Evitar inflar cookies com payloads grandes; cookies devem guardar apenas
  identificadores/sessao.

