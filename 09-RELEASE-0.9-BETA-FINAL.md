# MEDIFY 0.9 Beta-Final

Data de corte: 30 de julho de 2026.

## Escopo entregue

- autenticação, recuperação, MFA, RBAC, multi-tenancy e painel de plataforma;
- CRM, contatos, importação CSV, funis, Kanban, timeline e equipe;
- inbox WhatsApp/WAHA, mídia, templates, roteamento e múltiplas sessões;
- pacientes, agenda e prontuário com leitura justificada, rascunho e assinatura;
- campanhas por tags/consentimento, lote, agendamento e idempotência;
- automações, follow-ups, webhooks, dead-letter/replay e scheduler;
- agentes de IA governados, RAG, skills, orçamento, testes e handoff;
- LGPD, auditoria, incidentes, notificações e health;
- interface responsiva e topologia self-host isolada.

## Perfis de homologação

- `root`: administração da plataforma; MFA obrigatório; sem acesso clínico implícito.
- `beta_test`: gestor da clínica e profissional clínico de demonstração.
- `user`: atendimento operacional; sem acesso a prontuário.

Senhas são temporárias, geradas no servidor e não pertencem ao repositório.

## Evidência técnica

- build de produção Next.js: aprovado;
- TypeScript `--noEmit`: aprovado;
- auditoria de dependências de produção: zero vulnerabilidades conhecidas;
- suíte completa: 177 arquivos e 1.458/1.458 testes aprovados;
- harness de evidências, relógio, import puro e ícones validado em Windows/Linux
  e em árvore de release ainda não rastreada pelo Git;
- login real por senha, RBAC dos três perfis e exigência de MFA do root aprovados;
- health de produção aprovado para Supabase, Redis e WAHA;
- lint: zero erros; 163 avisos herdados catalogados como dívida técnica.

## Limites honestos da beta

- WhatsApp real exige pareamento por QR e telefone autorizado.
- IA/RAG/transcrição exigem credenciais dos respectivos provedores.
- E-mail, Meta Cloud API, calendários, pagamentos e assinatura qualificada
  dependem de contratação/configuração externa.
- Pentest independente, restore ensaiado e homologação clínica/jurídica são gates
  de venda ampla e de uso assistencial.

## Gate para 1.0 GA

Piloto fechado, correção dos achados, E2E de jornadas críticas, DR ensaiado,
SLO/alertas, termos/contratos, billing e aceite formal de segurança e LGPD.
