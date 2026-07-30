# Medify — visão executiva

**Documento vivo · 30 de julho de 2026**

## Tese de produto

Medify é o sistema operacional de relacionamento e operação para médicos,
consultórios, clínicas e redes ambulatoriais brasileiras. Une CRM, agenda,
atendimento omnichannel, prontuário, financeiro, automações e agentes de IA sem
misturar as permissões da recepção com as do cuidado clínico.

O diferencial não é “ter IA”. É coordenar a jornada inteira do paciente com IA
governada, evidência, trilha de auditoria e transferência clara para pessoas.

## Quem atendemos

- Clínica independente com uma ou mais especialidades.
- Rede de clínicas com unidades, profissionais e operação central.
- Médico proprietário que precisa reduzir faltas e trabalho administrativo.
- Recepção/atendimento que opera WhatsApp, agenda e cobrança.
- Profissional assistencial que precisa de contexto confiável e prontuário seguro.
- Gestor que acompanha capacidade, conversão, qualidade e resultado financeiro.
- Paciente que espera comunicação clara, acesso aos próprios dados e continuidade.

## Problemas centrais

1. Conversas, agenda, prontuário e financeiro vivem em sistemas desconectados.
2. O histórico do paciente se perde entre canais, pessoas e unidades.
3. Faltas, retornos vencidos e leads abandonados reduzem acesso e receita.
4. A recepção gasta tempo copiando dados e respondendo questões repetitivas.
5. IA sem limites cria risco clínico, reputacional e regulatório.
6. Sistemas genéricos de vendas não protegem dados de saúde com granularidade clínica.
7. Proprietários não enxergam o caminho “primeiro contato → atendimento → retorno”.

## Princípios

- **Paciente, não lead:** o funil é uma visão operacional; a pessoa é a entidade central.
- **Separação clínica:** relacionamento e prontuário têm fronteiras de autorização diferentes.
- **Humano responsável:** IA assiste, propõe e automatiza rotinas; atos clínicos exigem profissional.
- **Eventos, não acoplamento:** módulos publicam fatos; automações e integrações consomem.
- **Multi-tenant real:** isolamento no banco, na API, nos workers, nos logs, nos caches e na IA.
- **Evidência antes de ação:** toda ação sensível deve explicar origem, finalidade e ator.
- **Configuração sem fork:** marca, vocabulário, funis, formulários e agentes por organização.
- **Operação brasileira:** pt-BR, telefone E.164, BRL, CPF protegido, fusos e LGPD.

## Estratégia de composição

| Fonte | Papel no Medify |
|---|---|
| DeskcommCRM | Fundação operacional: multi-tenancy, RLS, auditoria, WhatsApp, IA, RAG, workers, webhooks e self-host |
| wacrm | Referência para automações visuais, broadcasts oficiais, API pública e MCP seguro |
| WalChat | Compliance conversacional, filas, sequências, reengajamento e conteúdo social |
| ui-ux-pro-max-skill | Método e fonte persistente do design system |
| ponytail | Doutrina de simplicidade, causa raiz e menor mudança suficiente |
| fat-tech-impulse-crm | Marca/conversão, CTA WhatsApp, consentimento e presença institucional |
| Materiais Futura IA/Tomik | Escopo de SaaS white-label, agenda, financeiro, omnichannel, agentes e base RAG |

## Escopo de produto

### Núcleo

- Identidade, autenticação, organizações, unidades, equipe, RBAC e MFA.
- Pacientes/contatos, deduplicação e Customer 360.
- Agenda multiunidade/multiprofissional, recorrência, encaixe e lista de espera.
- Inbox omnichannel e histórico unificado.
- Funis de aquisição, confirmação, tratamento, retorno e reativação.
- Prontuário eletrônico, anexos, documentos e assinatura.
- Agentes de IA, RAG, memória, orçamento, handoff e avaliação.
- Automações visuais, webhooks, API pública, n8n e MCP.
- Financeiro, planos, procedimentos, cobranças, repasses e relatórios.
- LGPD: consentimentos, acesso, exportação, correção, anonimização quando aplicável e incidentes.
- Administração da plataforma SaaS e white-label.

### Deliberadamente fora da primeira onda

- Diagnóstico ou prescrição autônoma por IA.
- Sistema hospitalar, internação, centro cirúrgico ou estoque farmacêutico complexo.
- Faturamento TISS completo antes de validar o segmento inicial.
- Marketplace clínico aberto.
- Microserviços por módulo.

## Estado atual

Esta entrega cria a fundação, não declara o SaaS concluído:

- seis repositórios clonados e indexados;
- grafo consolidado com 77.209 entidades e 199.509 relações;
- dossiê comparativo e catálogo funcional;
- base Medify derivada de código MIT;
- design system persistente;
- schema clínico inicial e APIs de pacientes/agenda;
- telas iniciais navegáveis;
- gates regulatórios e roadmap definidos.

## Métricas norte

- Tempo até primeira resposta e até resolução.
- Taxa de agendamento por origem.
- Confirmação, cancelamento, no-show e ocupação por agenda.
- Conversão contato → consulta → retorno.
- Tempo administrativo poupado por automação.
- Percentual de respostas de IA aceitas/editadas e handoffs corretos.
- Incidentes, acessos clínicos anômalos e violações de isolamento: meta zero.
- Retenção de clínicas, expansão de unidades e receita recorrente líquida.

