# Webhooks e provedores externos

## Webhooks inbound genéricos

`webhook-sources` cadastra fonte, pipeline/estágio de destino, segredo e regras.
O endpoint público usa token opaco na URL e deve:

1. localizar fonte por hash/token;
2. validar status, limite e schema;
3. calcular idempotência;
4. persistir evento e resultado;
5. criar/atualizar contato e oportunidade;
6. responder sem revelar configuração interna.

Eventos ficam consultáveis por source e podem ser reprocessados quando seguro.

## WAHA

Coberto em [WhatsApp e WAHA](WHATSAPP-WAHA.md). Há endpoint atual e rota
tokenizada para compatibilidade/isolamento.

## Meta/Instagram nativo

A API da Meta continua sendo um provedor externo, mas o produto WalChat não é
uma dependência, serviço ou aplicação externa. Todas as capacidades de
Instagram do WalChat são portadas para módulos nativos do MEDIFY e usam o mesmo
login, tenant, banco, RLS, auditoria, workers, design system e deploy.

O adapter Meta/Instagram deve:

- executar OAuth e armazenar tokens cifrados por organização;
- validar o challenge de configuração e a assinatura HMAC SHA-256 sobre o corpo
  bruto do webhook;
- deduplicar mensagens, postbacks, comentários, menções e reações;
- normalizar eventos no domínio canônico de contatos, conversas e interações;
- aplicar, no momento do envio, janela de 24 horas, tag `HUMAN_AGENT`, opt-out,
  blocklist, cooldown e limite de resposta privada;
- registrar a decisão de elegibilidade e sua justificativa na auditoria;
- publicar Feed, Reel, Story e Carrossel apenas por jobs idempotentes;
- isolar credenciais, quotas, conteúdo e métricas por organização.

Não é permitido introduzir iframe, proxy para outra aplicação, segundo login,
segundo banco de negócio, runtime WalChat ou deploy independente.

## Nuvemshop

O código herdado contém OAuth/callback, webhooks de negócio e endpoints LGPD do
ecossistema Nuvemshop. No MEDIFY, essa integração é opcional e não participa do
core clínico. Ativação exige credenciais próprias, revisão de finalidade e
mapeamento explícito para contato/oportunidade.

## API tokens

- exibidos uma única vez;
- persistidos por hash;
- vinculados a tenant;
- scopes normalizados;
- expiração e revogação;
- `last_used` para auditoria;
- rate limit separado da sessão web.

## MCP

O servidor MCP expõe apenas ferramentas allowlisted. Escrita combina escopo MCP,
papel mínimo e filtro de tenant. A service role usada internamente não autoriza
consulta cross-tenant.

## Provedores planejados

| Adapter | Estado | Requisitos |
|---|---|---|
| Meta/Instagram Graph API | Incorporação nativa obrigatória | App Meta, OAuth, permissões, revisão, webhook/HMAC e jobs |
| E-mail transacional | Planejado | domínio, SPF/DKIM/DMARC, DPA |
| SMS | Planejado | provedor, opt-in e custo |
| Calendar | Planejado | OAuth, fuso e conflito |
| Pagamentos/billing | Planejado | PSP, fiscal e conciliação |
| Assinatura qualificada | Planejado | ICP-Brasil/provedor e validação jurídica |
| Observabilidade externa | Preparado | DSN/token e política de PII |

## Contrato de um novo adapter

- configuração por tenant;
- segredo cifrado;
- teste/revalidação;
- timeout, retry e circuit breaker;
- idempotência;
- normalização para o domínio;
- audit/request ID;
- health sem vazar segredo;
- documentação de dados, região, retenção e suboperador.
