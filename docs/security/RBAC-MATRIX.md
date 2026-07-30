# Matriz de acesso

## Hierarquia operacional do tenant

`viewer < agent < manager < admin`

O papel define o mínimo operacional. Permissões clínicas são ortogonais e
dependem de `clinical_staff_assignments`; administração de plataforma também é
uma relação separada.

| Capacidade | Viewer | Agent | Manager | Admin do tenant | Admin plataforma |
|---|:---:|:---:|:---:|:---:|:---:|
| Ler visão operacional permitida | ✓ | ✓ | ✓ | ✓ | Somente suporte autorizado |
| Responder/assumir conversa | — | ✓ | ✓ | ✓ | — |
| Criar/editar contato e paciente operacional | — | ✓ | ✓ | ✓ | — |
| Mover oportunidade e próxima ação | — | ✓ | ✓ | ✓ | — |
| Criar agendamento | — | ✓ | ✓ | ✓ | — |
| Ver métricas operacionais | — | ✓ | ✓ | ✓ | Agregadas da plataforma |
| Criar campanha | — | — | ✓ | ✓ | — |
| Configurar automações/follow-ups | — | — | ✓ | ✓ | — |
| Gerenciar pipelines/roteamento | — | — | ✓ | ✓ | — |
| Consultar auditoria do tenant | — | — | ✓ | ✓ | Escopo de plataforma |
| Gerenciar equipe e convites | — | — | Parcial | ✓ | — |
| Gerenciar tokens/credenciais | — | — | Parcial | ✓ | — |
| Executar LGPD/anonimização | — | — | — | ✓ | Fluxo supervisionado |
| Suspender tenant/incidente global | — | — | — | — | ✓ + MFA |
| Ler prontuário | Só com vínculo clínico | Só com vínculo clínico | Só com vínculo clínico | Só com vínculo clínico | Não implicitamente |
| Assinar prontuário | Vínculo clínico + MFA | Vínculo clínico + MFA | Vínculo clínico + MFA | Vínculo clínico + MFA | Não implicitamente |

“Parcial” significa que a rota específica pode exigir `admin`; a API é a fonte
final da decisão.

## Papéis clínicos

Papéis clínicos suportados na fundação:

- physician;
- nurse;
- psychologist;
- nutritionist;
- physiotherapist;
- dentist;
- other.

Um assignment registra organização, usuário, papel clínico, registro profissional
quando aplicável, status e validade. Ele não substitui a função operacional:
alguém pode ser `agent` e `nurse`, ou `admin` sem papel clínico.

## Condições adicionais

| Ação | Condição |
|---|---|
| Assinatura clínica | Sessão AAL2/MFA, vínculo ativo e rascunho elegível |
| Admin plataforma | Registro em `platform_admins` e MFA |
| Impersonação | Papel de plataforma, motivo, sessão limitada e auditoria |
| API token | Escopo explícito, tenant fixo, hash, validade e revogação |
| MCP write | Papel mínimo + scope de escrita |
| Cron | Segredo exclusivo e rota allowlisted |
| Webhook inbound | Token/assinatura + idempotência |
| Service role | Somente servidor; filtro manual obrigatório por organização |

## Regra de negação

Recurso de outro tenant deve se comportar como inexistente. A aplicação retorna
`403` quando a identidade é conhecida mas a capacidade falta, e `404` quando
revelar existência aumentaria risco. A policy RLS é o backstop; não é substituta
do gate de aplicação.
