# Rastreabilidade

## Fontes para capacidades MEDIFY

| Fonte | Conhecimento aproveitado | Evidência MEDIFY |
|---|---|---|
| `fat-tech-impulse-crm` | base operacional, CRM e estrutura SaaS | contatos, pipelines, app shell |
| `WalChat` | WhatsApp, comunicação, conteúdo e evolução | inbox, sessões, WAHA, templates |
| `wacrm` | API v1, RBAC, webhooks, broadcasts | auth, tokens, rotas e campanhas |
| `ui-ux-pro-max-skill` | tokens, UX, acessibilidade e responsividade | design system e shell mobile |
| `ponytail` | padrões de organização e experiência | referências de produto/estrutura |
| `DeskcommCRM` | agentes, eventos, follow-ups, LGPD e operação | engine IA, RAG, workers e auditoria |

Detalhes de licença e commit de referência estão em
[dossiês](../../01-REPOSITORY-DOSSIERS.md) e
[atribuição](../../07-SOURCE-ATTRIBUTION.md).

## Requisito → implementação → prova

| Requisito | Implementação | Prova |
|---|---|---|
| Multi-tenancy | `org_id`, contexto ativo, RLS | testes de auth/RLS e smoke por perfil |
| Painel admin | rotas/páginas `/admin` | root com MFA; demais perfis negados |
| CRM | contatos, leads, pipelines, stages | rotas, páginas e testes de timeline |
| WhatsApp | channel sessions, WAHA, webhooks | health WAHA e fluxo de conexão |
| Campanhas | broadcasts + worker/lotes | migration 0098 e testes |
| Prontuário | clinical tables/APIs/RLS | migration 0096 e testes clínicos |
| Notificações | preferências persistidas | migration 0097 e UI |
| Segurança | MFA, RBAC, audit, secrets | suíte, audit de dependências, headers |
| Deploy | Compose/Nginx/scripts | health e containers saudáveis |
| Documentação | documentos canônicos + inventários | este repositório e Graphify |

## Status

Use a legenda do catálogo funcional:

- **F:** fundação herdada e reconciliada;
- **I:** implementado/integrado;
- **P:** planejado;
- **G:** gate obrigatório.

Nenhum item `P` deve ser apresentado como entregue. Integração pronta mas sem
credencial deve ser descrita como “requer provedor”.

## Rastreabilidade de release

Release notes registram:

- versão do app;
- versão de schema/migrations;
- resultado de build/test/audit;
- dependências externas pendentes;
- gates regulatórios/operacionais;
- checksum do pacote fora deste repositório quando necessário.
