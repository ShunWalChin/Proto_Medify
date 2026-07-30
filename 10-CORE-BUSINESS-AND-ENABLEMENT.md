# Core business e capacitação

## Proposta de valor

O Medify coordena o caminho completo entre primeiro contato, agendamento,
atendimento e retorno. A clínica ganha uma única fila operacional, reduz perda de
oportunidades e faltas, mantém contexto e usa IA sob supervisão. O paciente ganha
comunicação contínua e tratamento responsável dos próprios dados.

## Entidades que orientam o produto

- Paciente/contato: identidade central, não apenas um lead.
- Conversa: histórico por canal e responsabilidade de atendimento.
- Jornada/oportunidade: estado operacional no funil.
- Agendamento: compromisso de capacidade da clínica.
- Encontro/prontuário: domínio assistencial segregado.
- Consentimento/finalidade: autorização contextual, não checkbox decorativo.
- Evento/auditoria: evidência de mudança, ator e correlação.
- Organização: fronteira de tenant, cobrança e configuração.

## Fluxo mínimo de negócio

1. Uma pessoa entra por WhatsApp, cadastro ou importação.
2. Atendimento identifica, deduplica, registra consentimento e qualifica.
3. A jornada avança no funil e gera próxima ação.
4. A agenda reserva profissional/horário; automações confirmam e lembram.
5. O profissional autorizado registra o encontro e assina a evolução.
6. O sistema agenda retorno, acompanha risco e mede resultado.
7. Administração acompanha operação sem receber acesso clínico implícito.

## Arquitetura para manutenção

O domínio não conhece WhatsApp, banco ou UI. Rotas e workers adaptam entradas,
aplicam autorização server-side e chamam handlers. Postgres/RLS é a última
barreira de tenant e clínica. Eventos desacoplam campanhas, automações, auditoria
e IA. Comentários explicam invariantes e decisões; nomes e tipos explicam o fluxo
comum, evitando comentário redundante em cada linha.

## Trilha de aprendizado

1. Ler visão executiva, catálogo e arquitetura.
2. Subir ambiente local e percorrer login → inbox → contato → funil → agenda.
3. Estudar `requireRole`, policies RLS, `emit_event` e handlers.
4. Executar testes unitários e migrations em banco descartável.
5. Implementar uma mudança pequena com autorização, auditoria e teste.
6. Ler runbook e simular incidente/restore em ambiente não produtivo.

## Checklist de uma funcionalidade nova

- finalidade e critérios de aceitação;
- fronteira de tenant e autorização clínica;
- schema/migration/RLS/idempotência;
- handler de domínio e adapter de integração;
- auditoria sem PII e tratamento de falhas;
- UI responsiva, teclado, loading, vazio e erro;
- testes unitário, banco real e E2E proporcional ao risco;
- métricas, runbook, documentação e plano de rollout.

## Modelo comercial sugerido

Piloto fechado por clínica, onboarding assistido e cobrança por organização mais
faixa de usuários/canais/IA. Recursos clínicos avançados entram apenas após gates
regulatórios. Serviços de implantação, migração e treinamento são separados da
assinatura; consumo de provedores externos deve ser transparente.
