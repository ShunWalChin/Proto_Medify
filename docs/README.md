# Índice documental do MEDIFY

Esta é a porta de entrada para a documentação integral da release
`0.9.0-beta.0`. Documentos marcados como **canônicos** descrevem decisões e
estado do produto; inventários em `reference/generated` são derivados do código.

## Produto e negócio

- [Visão executiva](../00-EXECUTIVE-OVERVIEW.md) — canônico.
- [Catálogo funcional](../02-FUNCTIONAL-CATALOG.md) — canônico.
- [Core business e capacitação](../10-CORE-BUSINESS-AND-ENABLEMENT.md).
- [Produto, personas e jornadas](product/PRODUCT-PERSONAS-JOURNEYS.md).
- [Regras de negócio](product/BUSINESS-RULES.md).
- [Glossário](governance/GLOSSARY.md).

## Engenharia

- [Arquitetura](../03-ARCHITECTURE.md) — canônico.
- [Contexto, containers e fluxos](architecture/SYSTEM-AND-FLOWS.md).
- [Incorporação nativa e integral do WalChat](architecture/WALCHAT-NATIVE-ABSORPTION.md).
- [Frontend](architecture/FRONTEND.md).
- [Backend, eventos e workers](architecture/BACKEND-EVENTS-WORKERS.md).
- [Domínio e dados](../04-DOMAIN-AND-DATA.md) — canônico.
- [Módulos funcionais](reference/MODULES.md).
- [Inventário de API](reference/generated/API-ROUTES.md).
- [Inventário de páginas](reference/generated/UI-ROUTES.md).
- [Inventário de banco](reference/generated/DATABASE-OBJECTS.md).
- [Métricas do snapshot de código](reference/generated/SOURCE-METRICS.md).

## Segurança e conformidade

- [Segurança, LGPD e clínica](../05-SECURITY-LGPD-CLINICAL.md) — canônico.
- [Matriz de acesso](security/RBAC-MATRIX.md).
- [Threat model](security/THREAT-MODEL.md).
- [Checklist de segurança](security/SECURITY-CHECKLIST.md).

## Integrações

- [WhatsApp e WAHA](integrations/WHATSAPP-WAHA.md).
- [IA, RAG e memória](integrations/AI-RAG.md).
- [Webhooks e provedores externos](integrations/WEBHOOKS-AND-PROVIDERS.md).

## Desenvolvimento e qualidade

- [Guia de desenvolvimento](development/DEVELOPMENT-GUIDE.md).
- [Mapa do código](development/SOURCE-MAP.md).
- [Estratégia de testes](development/TESTING.md).
- [Inventário de testes](reference/generated/TEST-INVENTORY.md).
- [Variáveis de ambiente](reference/generated/ENVIRONMENT-VARIABLES.md).

## Operação e entrega

- [Runbook](../08-OPERATIONS-RUNBOOK.md) — canônico.
- [Deploy, observabilidade e continuidade](operations/DEPLOY-OBSERVABILITY-DR.md).
- [Troubleshooting e resposta a incidentes](operations/TROUBLESHOOTING-INCIDENTS.md).
- [Processo de release](operations/RELEASE-PROCESS.md).
- [Release 0.9 Beta-Final](../09-RELEASE-0.9-BETA-FINAL.md).
- [Roadmap](../06-ROADMAP.md).

## Governança e rastreabilidade

- [Dossiê dos repositórios](../01-REPOSITORY-DOSSIERS.md).
- [Atribuição das fontes](../07-SOURCE-ATTRIBUTION.md).
- [Decisões arquiteturais](governance/ARCHITECTURE-DECISIONS.md).
- [Rastreabilidade](governance/TRACEABILITY.md).
- [Política de manutenção documental](governance/DOCUMENTATION-POLICY.md).

## Regra de atualização

Toda mudança de comportamento deve atualizar, na mesma entrega:

1. documento canônico afetado;
2. inventário gerado, quando aplicável;
3. testes e evidências;
4. release notes e roadmap;
5. decisão arquitetural, se a mudança alterar uma fronteira.
