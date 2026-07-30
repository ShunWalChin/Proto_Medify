# Produto, personas e jornadas

## Visão do produto

O MEDIFY é o sistema operacional de relacionamento de uma clínica. Ele acompanha
uma pessoa desde o primeiro contato até o retorno assistencial, sem misturar
permissões comerciais, administrativas e clínicas.

O produto resolve cinco fragmentações:

1. conversas espalhadas entre aparelhos e atendentes;
2. contatos e oportunidades sem próxima ação;
3. agenda desconectada do atendimento;
4. dados clínicos tratados como observação comum de CRM;
5. automações e IA sem evidência, supervisão ou limite de custo.

## Personas primárias

| Persona | Objetivo | Superfícies principais | Restrições |
|---|---|---|---|
| Recepção/atendimento | Responder, identificar, agendar e acompanhar | Inbox, contatos, agenda, Kanban | Não lê prontuário |
| Gestor da clínica | Configurar operação e acompanhar resultado | Métricas, equipe, funis, campanhas, configurações | Não recebe acesso clínico por ser gestor |
| Profissional clínico | Consultar paciente e registrar atendimento | Pacientes, agenda, prontuário | Requer vínculo clínico e MFA para assinatura |
| Marketing/relacionamento | Segmentar e comunicar com consentimento | Contatos, tags, templates, campanhas | Respeita opt-out e finalidade |
| Administrador da plataforma | Operar tenants e incidentes | `/admin`, auditoria, saúde e uso | Não acessa conteúdo clínico implicitamente |
| DPO/auditor | Investigar acesso e atender titular | LGPD, auditoria, exportações | Acesso mínimo, justificado e rastreável |

## Jornadas ponta a ponta

### Aquisição até agendamento

1. Mensagem entra pelo WhatsApp ou contato é criado/importado.
2. O sistema resolve organização, canal, conversa e identidade do contato.
3. Recepção assume ou recebe a conversa por roteamento.
4. Consentimentos, tags e dados mínimos são registrados.
5. Uma oportunidade é criada/movida no funil com próxima ação.
6. Um horário é reservado e confirmações são programadas.
7. Toda mudança relevante produz auditoria ou atividade de timeline.

### Atendimento clínico

1. Profissional autenticado abre agenda/paciente.
2. O backend confirma tenant, vínculo clínico ativo e finalidade.
3. A leitura justificada é registrada antes de devolver conteúdo sensível.
4. A evolução nasce como rascunho.
5. Assinatura exige MFA válido, calcula hash e torna o registro imutável.
6. Correções posteriores são adendos, nunca edição silenciosa do assinado.

### Campanha

1. Gestor escolhe template, tags e janela de envio.
2. Backend filtra contatos do tenant com consentimento válido e sem opt-out.
3. Campanha é persistida como rascunho ou agendada.
4. Scheduler cria lotes idempotentes.
5. Worker envia respeitando limite, registra resultado e não duplica destinatário.
6. Falhas permanecem observáveis e podem ser reprocessadas com segurança.

### Administração da plataforma

1. Administrador entra com MFA.
2. Consulta saúde, uso, tenants, incidentes e auditoria.
3. Ações destrutivas ou impersonação exigem motivo e geram evidência.
4. A sessão privilegiada tem escopo e duração limitados.
5. Conteúdo clínico não é liberado apenas pelo papel de plataforma.

## Jobs to be done

- “Quando uma mensagem chegar, quero saber quem responde e qual é a próxima ação.”
- “Quando um paciente marcar, quero reduzir ausência sem comunicação manual.”
- “Quando um profissional registrar uma evolução, quero integridade e autoria.”
- “Quando uma automação falhar, quero reprocessar sem duplicar efeito.”
- “Quando a IA sugerir algo, quero entender fonte, custo e responsabilidade.”
- “Quando houver solicitação LGPD, quero localizar, aprovar e comprovar a execução.”

## Métricas de produto

- tempo até primeira resposta e resolução;
- taxa de contato → agendamento → comparecimento;
- leads sem próxima ação e oportunidades paradas;
- ocupação, cancelamento, no-show e retorno;
- campanhas entregues, falhas e opt-outs;
- handoffs de IA, aceitação de sugestões e custo por resultado;
- incidentes, acessos clínicos anômalos e violações de tenant;
- retenção, ativação e expansão de organizações.

## Fora do escopo da beta

- diagnóstico ou decisão clínica autônoma;
- marketplace e prontuário nacional interoperável;
- faturamento TISS completo;
- garantia regulatória obtida apenas por software;
- disponibilidade/SLA comercial sem operação e contrato correspondentes.
