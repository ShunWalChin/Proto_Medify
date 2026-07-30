# Roadmap de engenharia e produto

Roadmap orientado a gates. Datas dependem de equipe, validação com clínicas,
provedores e decisões regulatórias; “concluído” exige evidência executável.

## Onda 0 — fundação e reconciliação

Estado: **iniciada nesta entrega**

- Clonar, fixar commits, licenças e inventários.
- Criar base Medify com atribuição.
- Reconciliar documentação upstream com código real.
- Persistir design system.
- Rebrand técnico e remover vazamentos de marca na superfície.
- Criar CI que realmente cobre typecheck, lint, unit, DB e secrets.
- Fechar rate limiting mínimo.

Saída: instalação dev reproduzível, threat model e nenhum segredo conhecido.

## Onda 1 — identidade clínica, pacientes e unidades

- Organizações, unidades, salas e fuso.
- Paciente 360, dependentes/responsáveis e deduplicação.
- Credenciamento clínico e permissões compostas.
- Cadastro/importação e portal mínimo.
- Consentimentos e finalidade.

Já entregue: tabelas base, API e tela inicial de pacientes.

Gate: isolamento recepção × clínico demonstrado em teste de banco.

## Onda 2 — agenda e jornada

- Agenda por profissional, unidade, sala e recurso.
- Recorrência, bloqueios, conflitos, lista de espera e encaixe.
- Confirmação/reagendamento/cancelamento.
- Formulário pré-consulta e check-in.
- Lembretes e no-show workflows.
- Calendar adapters.

Já entregue: agendamento simples e consulta de 14 dias.

Gate: concorrência transacional, fuso, idempotência e E2E de reagendamento.

## Onda 3 — omnichannel e CRM clínico

- Consolidar inbox, atribuição, tags, mídia e templates.
- Adapter Meta Cloud API e compatibilidade WAHA.
- Instagram/e-mail/chat web.
- Funis clínicos e templates por especialidade.
- Score/risco com evidência e próxima ação.
- Campanhas com opt-out.

Gate: compliance por canal, webhook replay e carga de mensagens.

## Onda 4 — prontuário e documentos

- Editor estruturado e templates versionados.
- Encontros, evoluções, diagnósticos, procedimentos e anexos.
- Adendos, assinatura, hash e export.
- Atestados, encaminhamentos e solicitações/resultados.
- Justificativa de leitura e break-glass.

Já entregue: schema e RLS iniciais, imutabilidade de registro assinado.

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

1. Corrigir erros de typecheck introduzidos/herdados e fixar gate único.
2. Teste DB da migration 0096 em instalação e reaplicação.
3. Invariant test: recepção não lê prontuário; clínico autorizado lê.
4. Constraint de conflito de agenda e update/cancelamento.
5. Unidades, profissionais e seleção na agenda.
6. Detalhe do paciente com timeline operacional.
7. Remover/desativar Nuvemshop da navegação, onboarding e seeds Medify.
8. Reconciliar rate limiting em todas as rotas públicas.
9. Secret scanning e rotação da credencial exposta.
10. Prototipar prontuário somente depois dos gates 1–4.

