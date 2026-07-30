# Roadmap de engenharia e produto

Roadmap orientado a gates. Datas dependem de equipe, validação com clínicas,
provedores e decisões regulatórias; “concluído” exige evidência executável.

## Marco 0.9 — Beta-Final

Estado: **entregue para homologação**

- Clonar, fixar commits, licenças e inventários.
- Criar base Medify com atribuição e versão reproduzível.
- Reconciliar documentação upstream com código real.
- Persistir design system.
- Rebrand técnico e remover vazamentos de marca na superfície.
- Criar CI que realmente cobre typecheck, lint, unit, DB e secrets.
- Fechar rate limiting mínimo e dependências conhecidas.

Saída: instalação de produção reproduzível, plataforma integrada, documentação,
threat model e nenhum segredo conhecido no código.

## Onda 1 — identidade clínica, pacientes e unidades

- Organizações, unidades, salas e fuso.
- Paciente 360, dependentes/responsáveis e deduplicação.
- Credenciamento clínico e permissões compostas.
- Cadastro/importação e portal mínimo.
- Consentimentos e finalidade.

Já entregue: tabelas base, API, tela de pacientes, importação e credenciamento.

Gate: isolamento recepção × clínico demonstrado em teste de banco.

## Onda 2 — agenda e jornada

- Agenda por profissional, unidade, sala e recurso.
- Recorrência, bloqueios, conflitos, lista de espera e encaixe.
- Confirmação/reagendamento/cancelamento.
- Formulário pré-consulta e check-in.
- Lembretes e no-show workflows.
- Calendar adapters.

Já entregue: agendamento simples, detecção inicial de conflito e consulta de 14 dias.

Gate: concorrência transacional, fuso, idempotência e E2E de reagendamento.

## Onda 3 — omnichannel e CRM clínico

- Consolidar inbox, atribuição, tags, mídia e templates.
- Adapter Meta Cloud API e compatibilidade WAHA.
- Instagram/e-mail/chat web.
- Funis clínicos e templates por especialidade.
- Score/risco com evidência e próxima ação.
- Campanhas com opt-out.

Gate: compliance por canal, webhook replay e carga de mensagens.

Já entregue: inbox WAHA, atribuição, mídia, templates, funis, campanhas por tags,
consentimento e processamento em lotes.

## Onda 3A — incorporação nativa integral do WalChat

Estado: **obrigatória; paridade ainda não concluída**

- Estender o domínio canônico para contas/canais Instagram.
- Portar webhook Meta challenge, HMAC e normalização de eventos.
- Incorporar compliance 24h/7d, STOP/PARAR, cooldown, blocklist e Private Reply.
- Portar gatilhos comentário/DM/story e sequências texto/mídia/typing/delay.
- Integrar reengajamento ao motor de campanhas/follow-ups.
- Criar dashboard social, calendário editorial e publicação
  Feed/Reel/Story/Carrossel.
- Portar auto-like, coleta de insights, heatmap, top posts e análise por IA.
- Integrar privacidade, termos e data deletion ao módulo LGPD.
- Migrar testes/smoke e oferecer importador one-shot de instalações WalChat.
- Desativar a necessidade do runtime, banco, auth e deploy WalChat separados.

Gate: matriz WalChat 100%, Meta Live Mode em piloto, RLS/HMAC/idempotência verdes
e comprovação de um único código, login, tenant, banco, UI e deploy.

## Onda 4 — prontuário e documentos

- Editor estruturado e templates versionados.
- Encontros, evoluções, diagnósticos, procedimentos e anexos.
- Adendos, assinatura, hash e export.
- Atestados, encaminhamentos e solicitações/resultados.
- Justificativa de leitura e break-glass.

Já entregue: schema, RLS, leitura justificada, criação de rascunho, assinatura
MFA com hash, imutabilidade e auditoria.

Gate: validação jurídica/CFM/SBIS, pentest clínico e restore.

## Onda 5 — agentes e conhecimento

- Personas administrativas e clínicas.
- RAG por tenant/unidade/especialidade.
- Draft de resposta, resumo e preparação de atendimento.
- Multimodal, transcrição e extração estruturada.
- Tool scopes, confirmação e budget.
- Eval suite, adversarial testing e flywheel humano.

Gate: zero ação clínica autônoma, citações, proteção contra injection e custo previsível.

## Onda 6 — automações e ecossistema

- Flow builder no-code.
- Webhooks de saída e API pública.
- n8n starter workflows.
- MCP externo read-only por padrão.
- Dead-letter UI, replay e observabilidade de flows.

Gate: idempotência E2E, confirmação de efeitos e compatibilidade versionada.

## Onda 7 — financeiro

- Catálogo, procedimentos, planos, orçamento e cobrança.
- Pix/cartão/boleto, parcelas e conciliação.
- Recibos/notas via adapter.
- Repasse, caixa e relatórios.

Gate: invariantes monetários, estorno, conciliação e segregação de função.

## Onda 8 — SaaS e white-label

- Planos, limites, billing recorrente e trial.
- Provisionamento, domínio, marca, e-mail e termos por tenant.
- Métricas de plataforma, suporte sem acesso clínico e status.
- Migração/importação assistida.

Gate: SLO, runbooks, suporte, contrato, DPA e rollout controlado.

## Onda 9 — interoperabilidade e escala

- FHIR/RNDS apenas para casos contratados/validados.
- BI, data warehouse minimizado e analytics avançado.
- Extração de serviços somente onde métricas justificarem.
- Multi-região/DR conforme mercado.

## Definition of Done transversal

- Requisito e critérios de aceitação.
- Threat model atualizado quando muda fronteira.
- Autorização server-side e RLS.
- Audit/evento/idempotência em mutação.
- Migration + baseline + manifesto + tipos.
- Unit + DB real + E2E relevante.
- Acessibilidade e responsive QA.
- Observabilidade/runbook.
- Documentação atualizada.
- Evidência de execução; não apenas código compilado.

## Próximo backlog recomendado

1. Homologar restore completo e RPO/RTO em staging.
2. Executar pentest independente e teste de isolamento RLS em banco real.
3. Constraint transacional de conflito e fluxos de reagendamento/cancelamento.
4. Unidades, profissionais, salas e recorrência na agenda.
5. Documentos clínicos, adendos e assinatura qualificada.
6. Adapter oficial Meta Cloud API e provedores de e-mail/SMS.
7. Financeiro, billing SaaS e integrações de pagamento.
8. E2E Playwright dos percursos root, gestor, recepção e clínico.
9. Homologação LGPD/CFM/SBIS e contratos de suboperadores.
10. Piloto fechado com clínicas, telemetria, correções e gate para 1.0 GA.

