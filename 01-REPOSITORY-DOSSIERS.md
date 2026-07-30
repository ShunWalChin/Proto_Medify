# Dossiê técnico dos repositórios de referência

Análise estática realizada sobre clones fixados em 30 de julho de 2026. A
classificação “adotar” não significa copiar cegamente: todo item passa por licença,
adequação clínica, threat model, teste de isolamento e compatibilidade arquitetural.

## Resumo comparativo

| Repositório | Commit analisado | Licença | Natureza | Valor principal |
|---|---:|---|---|---|
| ShunWalChin/fat-tech-impulse-crm | `ea4d4a8455c6` | Sem licença detectada | Site institucional estático | Conversão, marca e LGPD no front |
| ShunWalChin/WalChat | `e2f8486300a2` | MIT | CRM/automação Instagram | Compliance e relacionamento social |
| ArnasDon/wacrm | `d94bea243bcb` | MIT | Template CRM WhatsApp | Automação visual, API e MCP |
| nextlevelbuilder/ui-ux-pro-max-skill | `4857a2c5ef98` | MIT | Base de inteligência UI/UX | Design system orientado por dados |
| DietrichGebert/ponytail | `16f29800fd26` | MIT | Skill/MCP de engenharia | Simplicidade e controle de dívida |
| melgarafael/DeskcommCRM | `4e208078f372` | MIT | CRM/AI Sales OS | Fundação operacional mais completa |

## 1. fat-tech-impulse-crm

### O que é

Apesar do nome, o conteúdo analisado é um site institucional da FAT Tech, sem
backend, banco ou domínio de CRM. São 73 arquivos de HTML, CSS, JavaScript, ativos
e validações.

### Funcionamento e capacidades

- Navegação institucional e seções de oferta.
- Identidade visual tecnológica/cyberpunk.
- Formulários e CTAs que convertem para WhatsApp.
- Partículas, reveal, contadores, glitch, cards e exit intent.
- Smooth scroll e interações de cursor.
- Consent manager e página/política de privacidade.
- Headers/CSP e scripts de validação.
- Conteúdo de serviços, cases, diferenciais e prova social.

### Boas práticas extraídas

- Conversão com baixa fricção e contexto já preenchido no WhatsApp.
- Consentimento e privacidade visíveis na experiência pública.
- Validação do build estático e hardening por headers.
- Narrativa centrada em resultado, não em tecnologia.

### Limites e riscos

- Não há CRM para reutilizar.
- Efeitos visuais intensos são inadequados para uma operação clínica diária.
- O repositório não declara licença; código/ativos não serão copiados sem
  autorização inequívoca do titular.
- Exit intent e telemetria exigem revisão de consentimento.

### Decisão Medify

Adotar apenas conceitos: site de conversão, CTA contextual ao WhatsApp, gestão de
consentimento, prova social e segurança do front. Não transportar estética neon
para o produto clínico.

## 2. WalChat

### O que é

CRM multi-tenant para contas profissionais do Instagram, implementado com React
19, TanStack Start/Router, Vite, Supabase, Redis/BullMQ, webhooks Meta e AI SDK
com Gemini. Possui 83 arquivos, 44 TS/TSX, duas migrations/SQL, dez documentos e
dois testes no clone analisado.

### Módulos

- Dashboard e insights diários.
- Inbox unificado de mensagens e interações.
- Contatos, tags, elegibilidade e blocklist.
- Gatilhos por comentário, DM, story e palavra-chave.
- Sequências, enrollments, cooldowns e jobs agendados.
- Campanhas e destinatários.
- Agentes de IA e documentos de conhecimento.
- Reengajamento.
- Calendário editorial e publicação de conteúdo.
- Auto-like.
- Cache de posts e insights sociais.
- Exclusão de dados, privacidade e termos.

### Fluxo técnico

1. Webhook recebe corpo bruto e valida `X-Hub-Signature-256`.
2. Evento é persistido/idempotente e enfileirado.
3. Worker normaliza e atualiza contato, conversa e mensagem.
4. Scheduler dispara sequências e campanhas elegíveis.
5. Compliance revalida janela e bloqueios antes do envio.

### Regras importantes

- Janela comum de 24 horas.
- Tag `HUMAN_AGENT` com janela distinta e uso somente humano.
- STOP/PARAR e blocklist.
- Rodapé de opt-out em mensagens aplicáveis.
- Cooldown e limite de uma resposta privada por comentário.
- Auditoria de decisões e revalidação no momento de envio.
- Workspace como boundary de tenant; owner/admin/agent/viewer.

### Limites

- OAuth por workspace, rotação/criptografia de tokens, SMTP e exclusão assíncrona
  aparecem como lacunas declaradas.
- Cobertura de testes pequena.
- TanStack Start diverge da fundação Next.js escolhida.
- Regras Meta/Instagram mudam; precisam de adapter e testes contratuais.

### Decisão Medify

Portar o modelo conceitual de compliance, cooldown, blocklist, sequências,
reengajamento e conteúdo. Implementar como adapters/event consumers, sem adotar
outro framework web.

## 3. wacrm

### O que é

Template self-host de CRM para a API oficial do WhatsApp. Usa Next.js 16,
React 19, TypeScript, Tailwind v4 e Supabase. O clone contém 431 arquivos,
360 TS/TSX, 36 migrations SQL e 68 testes.

### Módulos

- Inbox compartilhado, atribuição, status e notas.
- Contatos, tags, campos personalizados, importação CSV e deduplicação.
- Pipelines e deals em Kanban.
- Broadcasts com templates aprovados e tracking por destinatário.
- Automações no-code com gatilhos, condições, waits, tags e webhooks.
- Builder visual de flows com execução e logs.
- Quick replies, mídia, reação e templates interativos.
- Assistente de resposta e auto-reply com handoff.
- Base de conhecimento híbrida: FTS e pgvector.
- Dashboard real-time, métricas e activity feed.
- Contas compartilhadas, convites, presença e quatro papéis.
- API REST `/api/v1` com chaves escopadas e revogáveis.
- Webhooks de saída.
- MCP externo read-only por padrão, writes opt-in e confirmação de broadcast.

### Segurança

- AES-256-GCM para credenciais.
- RLS em todas as tabelas.
- Webhooks HMAC.
- CSP e rate limiting.
- API keys por escopo.
- MCP com três camadas: ferramenta não exposta, escopo no servidor e confirmação.

### Pontos fortes

- Motor de automações e flow builder mais direto entre as bases.
- Uso da API oficial Meta reduz dependência de sessão não oficial.
- API pública e MCP são claros e reaproveitáveis.
- Estrutura menor e mais legível que DeskcommCRM.

### Limites

- Foco comercial genérico e não clínico.
- Não inclui prontuário, agenda clínica ou financeiro de saúde.
- Deploy promocionaliza um provedor específico.
- Algumas garantias descritas em README devem ser revalidadas por teste.

### Decisão Medify

Adotar o modelo de automações/flows, broadcasts oficiais, API pública com escopos
e MCP seguro. Manter WhatsApp atrás de adapter para suportar Meta Cloud API e
WAHA por instalação.

## 4. ui-ux-pro-max-skill

### O que é

Sistema de inteligência de UI/UX com base local pesquisável: estilos, paletas,
tipografia, produtos, UX, ícones, motion, charts e recomendações por stack. O
clone possui 281 arquivos e 75 documentos.

### Funcionamento

- `search.py` consulta CSVs especializados por domínio/stack.
- Modo `--design-system` sintetiza padrão, estilo, cores, tipografia, motion,
  anti-patterns e checklist.
- `--persist` cria uma fonte hierárquica `MASTER.md` e overrides por página.
- Dials de variância, motion e densidade tornam decisões explícitas.
- Catálogo inclui Next.js, React, shadcn e outras stacks.

### Saída aplicada ao Medify

- Variância 4/10, motion 3/10, densidade 7/10.
- Soft UI Evolution com contraste WCAG AA+.
- Ciano calmo + verde de saúde; sem neon nem gradiente “IA roxo/rosa”.
- Figtree para títulos e Noto Sans para texto como recomendação futura.
- Foco visível, navegação por teclado, tabelas responsivas e reduced motion.
- Server Components por padrão; Client Components nas folhas interativas.

A fonte persistida está em `design-system/medify/MASTER.md`.

### Limites

- Resultado é recomendação, não validação automática.
- A primeira consulta específica de stack não encontrou correspondência; foi
  repetida com termos amplos e retornou as regras Next.js usadas.
- Fontes externas e nova paleta exigem avaliação de performance e regressão visual.

### Decisão Medify

Adotar como processo obrigatório para novas telas, junto de testes axe, teclado,
viewport e revisão humana.

## 5. ponytail

### O que é

Conjunto de skills, extensão e MCP para reduzir overengineering de agentes. Possui
123 arquivos, 43 JavaScript, 38 documentos e 19 testes.

### Doutrina

- Resolver a causa raiz.
- Preferir capacidades nativas e biblioteca padrão.
- Escrever a menor mudança que cumpra os invariantes.
- Não criar abstração ou dependência sem necessidade atual.
- Preservar todos os controles de segurança.
- Confirmar que a mudança roda.
- Remover dívida só com evidência e escopo.

### Ferramentas conceituais

- Review, audit, debt, gain e help.
- Benchmarks comparando diffs, custo, tempo e segurança.
- Exemplos “antes/depois” contra soluções infladas.

### Limites

- Não é componente funcional de CRM.
- Métricas próprias de benchmark não substituem medição no Medify.
- “Menos código” não pode eliminar controles exigidos em saúde.

### Decisão Medify

Usar como política de engenharia: monólito modular antes de microserviços,
adapters só nas fronteiras reais e dependência nova apenas com justificativa.

## 6. DeskcommCRM

### O que é

CRM/AI Sales OS self-host, multi-tenant e brasileiro. Usa Next.js 16, React 19,
TypeScript, Supabase/Postgres, WAHA, AI SDK, pgvector, workers, Redis opcional,
Sentry e MCP. O clone possui cerca de 1.834 arquivos, 1.382 TS/TSX, 88 SQL,
185 documentos e 255 testes.

### Capacidades entregues

- Auth, recuperação, MFA administrativa e onboarding.
- Organizações, memberships, quatro papéis e super-admin.
- RLS, auditoria append-only e impersonation controlada.
- Inbox WhatsApp em três painéis, realtime, mídia, áudio, notas e templates.
- Múltiplas conexões WAHA, QR, health, reconnect e watchdog.
- Anti-ban: throttle, jitter, janelas, caps, pacing ledger e STOP.
- Contatos, CPF criptografado/hash, tags, timeline e merge.
- Kanban configurável, fractional indexing, score, risco, próxima ação e reativação.
- Equipe, disponibilidade, atribuição, fila e métricas por atendente.
- Agentes IA versionados, providers, credenciais, orçamento, runs e handoff.
- RAG por tenant, fontes, chunks, citações e revisão de conversas.
- Memória organizacional, skills, routers, casos humanos e flywheel governado.
- Follow-ups versionados, enrollments, fila, dead inbox e rollback.
- Webhook sources, regras WHEN/IF/THEN, runs e resend.
- API tokens, MCP interno e contratos para agentes externos.
- LGPD: solicitações, export, redaction workers, consentimento e SLA.
- Admin de plataforma: tenants, usuários, incidentes, saúde e uso.
- Self-host com containers, baseline auto-curativo e atualização pela UI.

### Boas práticas

- `organization_id` em tudo e RLS como primeira barreira.
- Service role sempre com filtro manual de organização confiável.
- `getUser()` em vez de confiar em sessão local.
- API `/api/v1`, respostas uniformes e `X-Request-Id`.
- Webhook rápido → event log → workers.
- Idempotência por tenant e ID externo.
- Dinheiro em centavos, moeda ISO, tempo UTC.
- Diffs de auditoria sem PII, segredo ou prompt cru.
- Migrations versionadas + baseline + manifesto.
- Testes unitários, banco real, E2E, invariantes e evidência visual.

### Fragilidades confirmadas pelo próprio repositório

- E2E ainda não é gate integral de CI.
- `gov:verify` não cobre todos os gates que o nome sugere.
- Rate limit HTTP é insuficiente em parte relevante das rotas.
- Checkout analisado tinha `node_modules` incompleto.
- `.env.example` e documentação apresentavam divergências recentes.
- Proteção automática contra secrets ainda era uma lacuna.
- A base evoluiu muito rápido e contém handoffs/planos que não são estado real.
- O domínio original e partes do seed ainda carregam e-commerce/Nuvemshop.

### Decisão Medify

Usar como fundação, preservando licença, mas:

- remover/desativar dependências e vocabulário de e-commerce;
- elevar rate limit, secret scanning e E2E a gates;
- criar domínio clínico separado;
- não conceder ao super-admin acesso clínico implícito;
- manter documentação Medify como fonte da verdade do novo produto.

## Conclusão

Nenhum repositório isolado é o Medify. A composição escolhida evita duas armadilhas:
reescrever uma plataforma operacional já madura e, no extremo oposto, chamar um CRM
genérico de sistema clínico apenas trocando cores e rótulos.

