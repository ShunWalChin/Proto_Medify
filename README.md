# MEDIFY

Documentação oficial do **MEDIFY 0.9 Beta-Final**, uma plataforma SaaS
multi-tenant para clínicas brasileiras que integra CRM, atendimento WhatsApp,
agenda, pacientes, prontuário segregado, campanhas, automações e agentes de IA
governados.

> Status: **pré-lançamento / piloto fechado**. O software está implantado e
> homologável, mas uso assistencial e venda ampla dependem dos gates jurídicos,
> clínicos e operacionais descritos na [release 0.9](09-RELEASE-0.9-BETA-FINAL.md).

## Acesso

- Aplicação: <https://medify.64.181.178.125.nip.io>
- Health público: <https://medify.64.181.178.125.nip.io/api/v1/health>
- Código-fonte da aplicação: mantido separadamente deste repositório documental.

Credenciais, tokens, chaves e segredos operacionais **não pertencem a este
repositório público**. Os acessos de homologação são entregues por canal seguro.

## Comece por aqui

| Objetivo | Documento |
|---|---|
| Entender produto e limites | [Visão executiva](00-EXECUTIVE-OVERVIEW.md) |
| Conhecer todas as capacidades | [Catálogo funcional](02-FUNCTIONAL-CATALOG.md) |
| Entender a solução técnica | [Arquitetura](03-ARCHITECTURE.md) |
| Entender dados e domínio | [Domínio e dados](04-DOMAIN-AND-DATA.md) |
| Avaliar segurança e LGPD | [Segurança clínica](05-SECURITY-LGPD-CLINICAL.md) |
| Planejar evolução | [Roadmap](06-ROADMAP.md) |
| Operar produção | [Runbook](08-OPERATIONS-RUNBOOK.md) |
| Auditar a release | [Release 0.9 Beta-Final](09-RELEASE-0.9-BETA-FINAL.md) |
| Treinar equipe | [Core business e capacitação](10-CORE-BUSINESS-AND-ENABLEMENT.md) |
| Navegar toda a base | [Índice documental](docs/README.md) |

## Escopo documentado

- produto, personas, jornadas, regras e modelo comercial;
- frontend, backend, APIs, workers, eventos e integrações;
- banco, migrations, RLS, tenancy e domínio clínico;
- RBAC, MFA, LGPD, threat model e resposta a incidentes;
- deploy Oracle, Docker, Nginx, Supabase, Redis e WAHA;
- setup, padrões de código, testes, releases e troubleshooting;
- inventários gerados de rotas, páginas, banco, ambiente e testes;
- rastreabilidade dos seis repositórios de referência.

## Números da release documentada

- 181 arquivos de rotas HTTP;
- 89 páginas da aplicação;
- 89 migrations SQL;
- 1.458 testes aprovados em 177 arquivos executados;
- build e TypeScript aprovados;
- zero vulnerabilidades conhecidas em dependências de produção na data de corte.

## Princípios

1. Tenant e autorização são validados no servidor e novamente no banco.
2. Administração de plataforma não concede acesso clínico implícito.
3. IA propõe e assiste; decisões clínicas permanecem humanas.
4. Eventos, auditoria e idempotência fazem parte do domínio.
5. Documentação distingue claramente entregue, dependente de provedor e roadmap.

## Licença e atribuição

Consulte [LICENSE](LICENSE) e
[atribuição das fontes](07-SOURCE-ATTRIBUTION.md). A documentação preserva a
proveniência de `fat-tech-impulse-crm`, `WalChat`, `wacrm`,
`ui-ux-pro-max-skill`, `ponytail` e `DeskcommCRM`.
