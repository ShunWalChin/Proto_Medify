# Catálogo funcional do Medify

Legenda: **F** fundação herdada, **I** implementado nesta entrega, **P** planejado,
**G** gate obrigatório antes de produção.

## 1. Plataforma SaaS e white-label

- **F** Organizações/tenants isolados, memberships e quatro papéis.
- **F** Super-admin, tenants, usuários, incidentes, saúde e consumo.
- **F** MFA para perfis privilegiados.
- **F** Marca por runtime (`APP_NAME`, `APP_LOGO_URL`).
- **P** Domínios, e-mail, cores, termos e templates por marca.
- **P** Planos, limites, trial, assinatura, cobrança recorrente e suspensão.
- **P** Rede → unidades → salas → equipes, mantendo tenant único quando apropriado.
- **G** Matriz controlador/operador/suboperador e contratos por modalidade.

## 2. Pacientes e Customer 360

- **I** Paciente como extensão 1:1 do contato, com número de prontuário por clínica.
- **I** Nome civil/preferido, contato, nascimento, convênio e emergência.
- **F** CPF protegido, deduplicação, tags, origem, timeline e anonimização.
- **P** Responsáveis, dependentes, documentos, preferências e acessibilidade.
- **P** Unificação probabilística entre canais com revisão humana.
- **P** Portal do paciente para dados, consentimentos, documentos e solicitações.
- **G** Minimização por finalidade e separação de campos operacionais/clínicos.

## 3. Agenda

- **I** Consultas presenciais, telemedicina e domiciliares.
- **I** Intervalo, tipo, status, observação operacional e detecção inicial de conflito.
- **P** Agendas por profissional/unidade/sala/equipamento.
- **P** Recorrência, bloqueios, feriados, encaixe e lista de espera.
- **P** Confirmação, reagendamento, cancelamento e no-show pelo canal.
- **P** Formulários pré-consulta e check-in.
- **P** Google/Outlook Calendar via adapter.
- **G** Constraint transacional contra conflito e regras de fuso por unidade.

## 4. Atendimento omnichannel

- **F** Inbox WhatsApp compartilhado, realtime, atribuição e fila.
- **F** Texto, imagem, documento, áudio, notas e templates.
- **F** Múltiplas conexões WAHA, QR, health e reconnect.
- **P** Adapter para Meta Cloud API oficial.
- **P** Instagram DM/comentários/story por incorporação nativa integral do WalChat.
- **P** E-mail, chat web, telefone/voz e SMS.
- **P** Histórico único por pessoa, canal e contexto.
- **G** HMAC, idempotência, opt-out, janela e política por provedor.

## 5. CRM e funis clínicos

- **F** Pipelines/estágios configuráveis, Kanban e fractional indexing.
- **F** Responsável humano/IA, score com evidência, risco e próxima ação.
- **P** Templates: captação, confirmação, procedimento, pós-consulta e retorno.
- **P** Vocabulário clínico por especialidade.
- **P** Lead sem contato e pessoa com múltiplas oportunidades tratados explicitamente.
- **P** SLA, tarefas, motivo de perda, metas e forecast.

## 6. Prontuário eletrônico

- **I** Encontros assistenciais e entradas estruturadas por tipo.
- **I** Separação de acesso por credenciamento clínico.
- **I** Entrada assinada imutável; correção por adendo.
- **I** Método, hash e autor da assinatura modelados.
- **P** Anamnese, evolução, diagnóstico, procedimentos e sinais vitais.
- **P** Prescrição, solicitação/resultado de exames, atestados e encaminhamentos.
- **P** Anexos nato-digitais/digitalizados com classificação.
- **P** Templates por especialidade e versionamento.
- **P** Timeline clínica e resumo longitudinal.
- **G** Assinatura avançada/qualificada, export verificável e certificação aplicável.

## 7. Agentes de IA

- **F** Agentes, versões, publicação, pausa, testes e runs.
- **F** Providers/BYOK, roteadores, orçamento e custo.
- **F** Handoff humano, casos, pacing, memória e skills.
- **F** RAG tenant-aware, fontes, chunks, citações e revisão.
- **F** Flywheel de melhoria com aplicação humana.
- **P** Personas clínicas/administrativas por finalidade.
- **P** Sumário de conversa e pré-consulta com citação de fonte.
- **P** Sugestão de resposta, classificação de intenção e roteamento.
- **P** Transcrição e extração estruturada com confirmação.
- **G** Proibir ação clínica autônoma; avaliações por cenário e red-team de prompt injection.

## 8. Automações, webhooks e n8n

- **F** Webhook sources, regras simples, runs, retries e dead inbox.
- **F** Follow-up versionado, publicação, rollback e enrollments.
- **P** Builder visual inspirado no wacrm: gatilho → condição → ação → espera.
- **P** Nodes clínicos: agendar, confirmar, solicitar formulário, criar tarefa e alertar.
- **P** Webhooks de saída assinados e subscriptions por evento.
- **P** Credencial n8n por escopo, callback assinado e correlation ID.
- **G** Idempotência ponta a ponta, limites, replay seguro e nenhuma chamada HTTP em trigger.

## 9. Campanhas e relacionamento

- **I** Segmentos por tags e consentimento explícito de marketing.
- **I** Campanhas com rascunho, agendamento, lote, idempotência e tracking operacional.
- **P** Reengajamento e retorno preventivo sem inferência clínica indevida.
- **P** Conteúdo editorial e social portado integralmente do WalChat.
- **G** Opt-out imediato, finalidade compatível e bloqueio por canal.

## 9A. WalChat nativo

- **F** Tenant, contatos, tags, inbox, agentes, campanhas, follow-ups e event log
  canônicos já fornecem a fundação.
- **P** Dashboard social com alcance, DMs, comentários, contatos e atividade.
- **P** Inbox Instagram com Principal, Geral, Pedidos, janela Meta e IA off.
- **P** Gatilhos por comentário, DM, story, palavra-chave e modo de match.
- **P** Sequências com texto, mídia, typing, delays, enrollments e cooldowns.
- **P** Reengajamento com elegibilidade, preview e limite de taxa.
- **P** Calendário editorial mensal/semanal.
- **P** Criação e publicação de Feed, Reel, Story e Carrossel.
- **P** Auto-like por regra, sentimento e palavra-chave.
- **P** Insights, crescimento, heatmap, top posts e leitura por IA.
- **P** Conta Instagram por tenant, OAuth/token cifrado e permissões.
- **P** Webhook Meta challenge/HMAC, eventos e data deletion signed request.
- **P** Compliance 24h, `HUMAN_AGENT` 7d, STOP/PARAR, blocklist e Private Reply.
- **G** Tudo opera dentro do MEDIFY: mesmo código, login, tenant, banco, UI,
  eventos, workers, observabilidade e deploy.
- **G** Nenhum iframe, segunda aplicação, API WalChat em runtime ou banco externo.
- **G** Paridade funcional e testes WalChat 100% antes de declarar concluído.

## 10. Financeiro

- **P** Produtos, procedimentos, pacotes, convênios e tabelas de preço.
- **P** Orçamentos, cobranças, parcelas, recibos e notas.
- **P** Repasse profissional e centro de custo.
- **P** Contas a receber/pagar e conciliação.
- **P** Dashboard de caixa, competência, inadimplência e receita por unidade.
- **P** Gateways Pix/cartão/boleto por adapter.
- **G** Centavos + ISO currency, idempotência financeira e trilha de estorno.

## 11. Equipe e governança

- **F** Convites, papéis, revogação, disponibilidade e métricas.
- **I** Credenciamento clínico separado do papel operacional.
- **P** Escalas, especialidades, unidades e salas.
- **P** Permissões compostas por função e contexto, não só hierarquia.
- **P** Break-glass com justificativa forte, alerta e revisão.
- **G** Revogação imediata em banco, cache, tokens, realtime e workers.

## 12. Busca, notificações e produtividade

- **F** Alertas operacionais e central de incidentes.
- **P** Busca global com escopo e autorização por resultado.
- **P** Command palette e atalhos de teclado.
- **I** Preferências persistidas para in-app, e-mail e WhatsApp.
- **P** Entrega e push por provedor externo.
- **P** Tarefas, lembretes, menções e comentários internos.
- **G** Notificação não pode revelar dado clínico na tela bloqueada.

## 13. Analytics

- **F** Métricas de atendimento, uso de IA e operação.
- **P** Funil contato → agendamento → comparecimento → retorno.
- **P** Ocupação, no-show, tempo de espera e produtividade.
- **P** Receita, ticket, LTV e cohort por unidade/origem.
- **P** Qualidade do agente: aceitação, edição, handoff, erro e custo.
- **G** Analytics com minimização, agregação e controle de export.

## 14. Integrações e interoperabilidade

- **P** API REST pública `/api/v1` com chaves escopadas.
- **P** MCP externo read-only por padrão; writes opt-in.
- **P** n8n, calendários, pagamentos, contabilidade e BI.
- **P** WhatsApp Meta/WAHA, Instagram e e-mail.
- **P** Padrões de interoperabilidade em saúde quando o caso exigir (ex.: FHIR/RNDS).
- **G** Contratos versionados, circuit breaker, rate limit e inventário de suboperadores.

## 15. LGPD e direitos

- **F** Solicitações, export, redaction worker, consentimento e SLA.
- **I** Consentimentos clínicos separados e log de acesso.
- **P** Portal de direitos e workflow DPO.
- **P** Registro de operações, bases legais e retenção por classe.
- **P** Incidente, avaliação de risco e comunicação.
- **G** Política jurídica aprovada e testes de export/retificação/eliminação aplicável.

## 16. Segurança e observabilidade

- **F** RLS, auditoria, Sentry, health, request ID e incidentes.
- **P** Rate limit local/distribuído por ator, tenant, rota e IP.
- **P** Secret scanning, SAST, dependency review e SBOM.
- **P** Logs estruturados sem PII; métricas e tracing.
- **P** Backups criptografados e restauração testada.
- **G** pentest, threat model atualizado, DR e exercício de incidente.

## 17. Experiência e acessibilidade

- **I** Design system persistente com densidade de operação e motion sutil.
- **I** Foco visível, labels, tipos de input e tabelas com overflow.
- **I** Shell responsivo mobile/tablet/desktop, menu em drawer e alvos de toque.
- **P** Modo essencial e dark theme.
- **P** Preferências de acessibilidade por usuário.
- **G** WCAG 2.2 AA, teclado completo, axe e teste com leitores de tela.

## 18. Operação e entrega

- **F** Docker, self-host, baseline, workers e atualização assistida.
- **P** SaaS gerenciado com ambientes dev/staging/prod.
- **P** Feature flags, rollout por tenant e migração reversível de aplicação.
- **I** Runbook de deploy, backup, restore, rotação e incidente.
- **P** SLOs, on-call e status page pública.
- **G** CI único: typecheck, lint, unit, DB install/update, RLS, E2E e visual.

