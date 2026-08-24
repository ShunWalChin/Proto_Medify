# Acesso, credenciais e segredos

Este documento define como acessar o MEDIFY e como tratar segredos. Ele
deliberadamente nao contem senhas.

## Links de acesso

| Area | Link |
|---|---|
| Aplicacao | `https://medify.64.181.178.125.nip.io` |
| App autenticado | `https://medify.64.181.178.125.nip.io/app` |
| Admin | `https://medify.64.181.178.125.nip.io/admin` |
| Health | `https://medify.64.181.178.125.nip.io/api/v1/health` |
| API Supabase/Kong | `https://api-medify.64.181.178.125.nip.io` |

## Usuarios bootstrap

| Usuario | Uso pretendido |
|---|---|
| `root@medify.local` | Administracao inicial |
| `beta_test@medify.local` | Conta beta de homologacao |
| `user@medify.local` | Conta operacional comum de teste |

As senhas dessas contas ficam no servidor em:

```text
/opt/medify/secrets/bootstrap-credentials.txt
```

Operadores autorizados podem consultar as credenciais diretamente no servidor,
mas nao devem copiar valores para GitHub, issues, docs, chats publicos ou logs de
automacao. Antes de entregar o sistema a uma clinica, as senhas bootstrap devem
ser trocadas e guardadas em cofre.

## Secret store local

| Arquivo | Responsabilidade |
|---|---|
| `/opt/medify/secrets/app.env` | Segredos do app, WAHA, IA, Supabase service role, Redis HTTP, cron e LGPD |
| `/opt/medify/secrets/bootstrap-credentials.txt` | Credenciais bootstrap de usuario |
| `/opt/medify/infra/supabase/docker/.env` | Chaves e senhas da stack Supabase |

Permissoes desejadas:

```bash
sudo chown -R opc:opc /opt/medify/secrets
sudo chmod 700 /opt/medify/secrets
sudo chmod 600 /opt/medify/secrets/*
```

## O que nunca versionar

- `SUPABASE_SERVICE_ROLE_KEY`;
- `ANON_KEY` ou publishable keys quando o repositorio for publico;
- `JWT_SECRET`, `JWT_KEYS`, `JWT_JWKS`;
- `POSTGRES_PASSWORD` ou URLs contendo senha;
- `DASHBOARD_PASSWORD`;
- `WAHA_API_KEY`, `WAHA_HMAC_SECRET`, senhas WAHA dashboard/swagger;
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `AI_GATEWAY_API_KEY`;
- tokens Redis HTTP;
- chaves de criptografia LGPD, CPF, impersonacao ou OAuth;
- dumps de banco e exports LGPD;
- logs brutos com payload de paciente ou conversa.

## Rotacao recomendada

1. Rotacionar usuario bootstrap do app.
2. Revogar sessoes ativas quando aplicavel.
3. Atualizar cofre operacional.
4. Rotacionar chaves WAHA/API se houve exposicao.
5. Rotacionar service role e JWT apenas com janela planejada.
6. Recarregar containers dependentes.
7. Validar login, health, inbox, WAHA, worker e admin.
8. Registrar data, escopo e responsavel sem registrar o valor do segredo.

## Recuperacao de acesso

Fluxo seguro:

1. Confirmar que o solicitante e dono/operador autorizado.
2. Acessar o servidor por SSH com chave autorizada.
3. Ler apenas a credencial especifica necessaria.
4. Preferir reset controlado em vez de redistribuir senha antiga.
5. Guardar a nova senha em cofre e registrar apenas o evento de rotacao.

Reset de senha deve ser tratado como mudanca operacional, com horario e
responsavel, porque pode invalidar uma conta usada em teste ou demo.

