# Decisões arquiteturais

## ADR-001 — Monólito modular

**Decisão:** Next.js/API e domínio em um deploy principal, com workers separados.

**Motivo:** menor custo operacional na beta, transações simples e evolução rápida.

**Consequência:** fronteiras de módulos precisam ser disciplinares; microserviços
só surgem quando escala, isolamento ou equipe justificarem.

## ADR-002 — Supabase/Postgres self-host

**Decisão:** Auth, Postgres, Storage, Realtime e APIs Supabase em stack isolada.

**Motivo:** fundação herdada, RLS, operação self-host e controle regional.

**Consequência:** equipe responde por patching, backup, restore e observabilidade.

## ADR-003 — Tenant no servidor e no banco

**Decisão:** resolver organização no backend e aplicar RLS como segunda barreira.

**Motivo:** impedir que payload/URL determine tenant.

**Consequência:** service role é exceção perigosa e exige filtro manual/teste.

## ADR-004 — Fronteira clínica ortogonal

**Decisão:** prontuário usa assignments/policies próprios; papel operacional ou
platform admin não basta.

**Motivo:** menor privilégio e separação entre gestão, suporte e assistência.

**Consequência:** usuários podem combinar papel operacional e clínico.

## ADR-005 — WAHA como adapter

**Decisão:** domínio depende de abstração de sessão/mensagem, não do payload WAHA.

**Motivo:** preservar migração futura para Meta Cloud API ou outro provedor.

**Consequência:** normalização e idempotência pertencem ao adapter.

## ADR-006 — Event log e workers

**Decisão:** efeitos externos e automações partem de eventos persistidos.

**Motivo:** observabilidade, retry e desacoplamento.

**Consequência:** consumidores precisam de idempotência, claim/lock e dead-letter.

## ADR-007 — Baseline + migrations checksumadas

**Decisão:** instalação vazia recebe snapshot canônico; evolução posterior é
ordenada, checksumada e protegida por advisory lock.

**Motivo:** migrations históricas upstream não reconstroem sozinhas todo o schema.

**Consequência:** baseline tem versão explícita; migration aplicada não é editada.

## ADR-008 — IA governada e degradável

**Decisão:** agentes são versionados, limitados por tools/orçamento e nunca
substituem operação humana.

**Motivo:** risco clínico, custo e dependência de provedor.

**Consequência:** sistema principal funciona sem chave de IA.

## ADR-009 — Design system único

**Decisão:** tokens, tipografia, componentes e barrel de ícones são centralizados.

**Motivo:** consistência, acessibilidade e troca evolutiva.

**Consequência:** feature não cria cor/spacing/componente paralelo sem decisão.

## ADR-010 — Documentação pública sem segredos

**Decisão:** arquitetura e operação são documentadas neste repositório, enquanto
credenciais e detalhes secretos permanecem em secret store/canal controlado.

**Motivo:** transparência e onboarding sem ampliar superfície de ataque.

**Consequência:** comandos usam nomes de variáveis e caminhos, nunca valores reais.
