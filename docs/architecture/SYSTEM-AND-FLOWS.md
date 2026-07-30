# Contexto, containers e fluxos

## Contexto

```mermaid
flowchart LR
  Patient["Paciente"] -->|"WhatsApp e portal"| Medify["MEDIFY"]
  Reception["Recepção"] -->|"CRM, inbox e agenda"| Medify
  Clinician["Profissional clínico"] -->|"Agenda e prontuário"| Medify
  Manager["Gestor"] -->|"Operação e métricas"| Medify
  Platform["Admin da plataforma"] -->|"Saúde e tenants"| Medify
  Medify --> WAHA["WAHA / WhatsApp"]
  Medify --> AI["Provedores de IA"]
  Medify --> External["Webhooks e provedores externos"]
```

## Containers

```mermaid
flowchart TB
  Browser["Browser"] --> Nginx["Nginx + TLS"]
  Nginx --> App["Next.js App/API"]
  App --> Auth["Supabase Auth"]
  App --> DB["PostgreSQL + RLS"]
  App --> Storage["Supabase Storage"]
  App --> Realtime["Supabase Realtime"]
  App --> Redis["Redis / rate limit"]
  App --> WAHA["WAHA"]
  App --> EventLog["Event log / filas"]
  Worker["Worker assíncrono"] --> EventLog
  Worker --> DB
  Worker --> WAHA
  Worker --> AI["IA / embeddings / transcrição"]
  Scheduler["Scheduler autenticado"] --> App
```

Somente Nginx publica `80/443`. App, banco, Kong/Supabase, Redis, WAHA e workers
permanecem em redes Docker ou listeners de loopback.

## Fronteiras

- **Driver adapters:** páginas, rotas HTTP, webhooks, cron e MCP.
- **Aplicação:** casos de uso, autorização, validação, idempotência e auditoria.
- **Domínio:** contatos, jornadas, agenda, prontuário, consentimentos e eventos.
- **Driven adapters:** Postgres/Supabase, WAHA, Redis, storage e provedores de IA.

## Fluxo inbound do WhatsApp

```mermaid
sequenceDiagram
  participant W as WAHA
  participant H as Webhook MEDIFY
  participant D as Postgres
  participant E as Event log
  participant A as Agente/roteador
  participant U as Atendente

  W->>H: evento assinado + id do provedor
  H->>H: valida token, tenant e schema
  H->>D: upsert contato, conversa e mensagem
  D-->>H: resultado idempotente
  H->>E: mensagem.recebida
  E->>A: decisão assíncrona
  alt IA autorizada
    A->>D: grava run, fonte e proposta
  else handoff humano
    A->>U: fila/atribuição
  end
  H-->>W: 2xx rápido
```

## Fluxo clínico

```mermaid
sequenceDiagram
  participant C as Profissional
  participant API as API clínica
  participant P as Policies/RLS
  participant DB as Postgres
  participant AU as Auditoria

  C->>API: abrir registro + finalidade
  API->>P: tenant, papel e vínculo clínico
  P->>DB: consulta autorizada
  DB->>AU: acesso clínico
  DB-->>C: conteúdo mínimo necessário
  C->>API: assinar rascunho + MFA
  API->>API: verifica AAL/MFA e hash
  API->>DB: assinatura transacional
  DB->>AU: registro.assinado
```

## Fluxo de campanha

```mermaid
flowchart LR
  Draft["Rascunho"] --> Validate["Validação"]
  Validate --> Audience["Audiência: tags + opt-in"]
  Audience --> Schedule["Agendada"]
  Schedule --> Batch["Lotes idempotentes"]
  Batch --> Send["Worker / WAHA"]
  Send --> Delivered["Enviada"]
  Send --> Failed["Falha observável"]
  Failed --> Retry["Retry controlado"]
```

## Disponibilidade e degradação

- Sem IA: atendimento humano continua.
- Sem WAHA: CRM, agenda e prontuário continuam; fila de envio não é descartada.
- Sem Realtime: telas podem recarregar/pollar sem perder verdade persistida.
- Sem worker: operações síncronas continuam e backlog permanece observável.
- Sem banco/Auth: aplicação retorna indisponibilidade; não tenta operar em cache.
