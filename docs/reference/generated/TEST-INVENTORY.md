# Inventário de testes

> Gerado por `scripts/generate-inventory.mjs` a partir do snapshot de código
> MEDIFY `0.9.0-beta.0`. Não editar manualmente.

Arquivos de teste/sonda encontrados: **328**.

## app

- `app/api/v1/ai/agents/[id]/versions/[vid]/test/route.test.ts`
- `app/api/v1/ai/evolution/route.test.ts`
- `app/api/v1/ai/memory/entries/[id]/route.test.ts`
- `app/api/v1/ai/memory/entries/route.test.ts`
- `app/api/v1/ai/memory/route.test.ts`
- `app/api/v1/ai/memory/versions/[id]/route.test.ts`
- `app/api/v1/ai/routers/[id]/test/route.test.ts`
- `app/api/v1/ai/routers/route.test.ts`
- `app/api/v1/ai/skills/[name]/install/route.test.ts`
- `app/api/v1/ai/skills/[name]/route.test.ts`
- `app/api/v1/ai/skills/import/route.test.ts`
- `app/api/v1/ai/skills/route.test.ts`
- `app/api/v1/cron/agent-dispatcher/route.test.ts`
- `app/api/v1/pipelines/[id]/agent-mapping/route.test.ts`
- `app/api/v1/pipelines/[id]/stages/[stageId]/route.test.ts`
- `app/api/v1/pipelines/[id]/stages/route.test.ts`
- `app/api/v1/system/agent/route.test.ts`
- `app/api/v1/system/version/route.test.ts`
- `app/app/ai/agents/_components/AgentStatusBadge.test.ts`
- `app/app/settings/tenant/pipelines/_mapping.test.tsx`
- `app/app/settings/tenant/pipelines/_stages.test.tsx`
- `app/app/team/_components/TeamMembersClient.test.tsx`

## components

- `components/feedback/ApiErrorToast.test.tsx`
- `components/kanban/OwnerBadge.test.tsx`

## lib

- `lib/agent-engine/agent/agent-config.test.ts`
- `lib/agent-engine/agent/draft-reply.test.ts`
- `lib/agent-engine/agent/followup-flow-classify.test.ts`
- `lib/agent-engine/agent/intent-classifier.test.ts`
- `lib/agent-engine/agent/media-parts.test.ts`
- `lib/agent-engine/agent/org-memory.test.ts`
- `lib/agent-engine/agent/resolve-turn-agent.test.ts`
- `lib/agent-engine/agent/router-config.test.ts`
- `lib/agent-engine/agent/schedule-followup.test.ts`
- `lib/agent-engine/agent/search-knowledge.test.ts`
- `lib/agent-engine/agent/skill-references.test.ts`
- `lib/agent-engine/agent/skills.test.ts`
- `lib/agent-engine/agent/tool-breaker.test.ts`
- `lib/agent-engine/edge/crm/drain.test.ts`
- `lib/agent-engine/edge/crm/move-lead-stage.test.ts`
- `lib/agent-engine/env.test.ts`
- `lib/ai/agent-inbox-copy.test.ts`
- `lib/ai/apply-proposal.test.ts`
- `lib/ai/embed.test.ts`
- `lib/ai/evolution/aggregate.test.ts`
- `lib/ai/pacing-knobs.test.ts`
- `lib/ai/skills/install.test.ts`
- `lib/ai/skills/package.test.ts`
- `lib/api/client.test.ts`
- `lib/audit/service-role-configured.test.ts`
- `lib/auth/invite-token.test.ts`
- `lib/auth/public-paths.test.ts`
- `lib/auth/require-role.test.ts`
- `lib/automation/actions/call-webhook.test.ts`
- `lib/automation/conditions.test.ts`
- `lib/automation/outbound-url.test.ts`
- `lib/automation/template.test.ts`
- `lib/automation/throttle.test.ts`
- `lib/clipboard.test.ts`
- `lib/followup/agent-followup-gate.test.ts`
- `lib/followup/edge-condition-options.test.ts`
- `lib/followup/graph-mappers.test.ts`
- `lib/followup/graph-schema.test.ts`
- `lib/followup/node-handlers.test.ts`
- `lib/followup/turn-bridge.test.ts`
- `lib/followup/validate-publish.test.ts`
- `lib/inbox/retention-copy.test.ts`
- `lib/kanban/card-state.test.ts`
- `lib/kanban/owner.test.ts`
- `lib/leads/active-lead.test.ts`
- `lib/leads/activity-emitter.test.ts`
- `lib/leads/agent-mapping.test.ts`
- `lib/leads/checkpoint-diff.test.ts`
- `lib/leads/owner-patch.test.ts`
- `lib/leads/stage-editing.test.ts`
- `lib/mcp/audit.test.ts`
- `lib/money.test.ts`
- `lib/query/client.test.ts`
- `lib/random-id.test.ts`
- `lib/routing/config-worker.test.ts`
- `lib/routing/decide.test.ts`
- `lib/routing/eligibility.test.ts`
- `lib/schemas/_validate.test.ts`
- `lib/schemas/contacts.test.ts`
- `lib/schemas/leads.test.ts`
- `lib/schemas/messaging.test.ts`
- `lib/schemas/settings.test.ts`
- `lib/schemas/webhooks.test.ts`
- `lib/supabase/cookie-secure.test.ts`
- `lib/system/changelog.test.ts`
- `lib/system/update-run.test.ts`
- `lib/ui/icons.test.ts`
- `lib/utils.test.ts`
- `lib/waha/message-id.test.ts`
- `lib/waha/webhook-auth.test.ts`
- `lib/webhooks/inbound.test.ts`

## tests/api

- `tests/api/followup-cron-worker.test.ts`
- `tests/api/followup-enrollments.test.ts`
- `tests/api/followup-flows.test.ts`
- `tests/api/followup-queue.test.ts`

## tests/ataque-sonda-ambiguo.ts

- `tests/ataque-sonda-ambiguo.ts`

## tests/capture-cenario-23-ciclo.ts

- `tests/capture-cenario-23-ciclo.ts`

## tests/capture-lgpd-ensaio-tenant-b.ts

- `tests/capture-lgpd-ensaio-tenant-b.ts`

## tests/capture-lgpd-redact.ts

- `tests/capture-lgpd-redact.ts`

## tests/capture-wave-0.ts

- `tests/capture-wave-0.ts`

## tests/capture-wave-1-bulk.ts

- `tests/capture-wave-1-bulk.ts`

## tests/capture-wave-1.ts

- `tests/capture-wave-1.ts`

## tests/capture-wave-2.ts

- `tests/capture-wave-2.ts`

## tests/capture-wave-3-cenarios.ts

- `tests/capture-wave-3-cenarios.ts`

## tests/capture-wave-3-realtime.ts

- `tests/capture-wave-3-realtime.ts`

## tests/capture-wave-4-cenarios.ts

- `tests/capture-wave-4-cenarios.ts`

## tests/capture-wave-5-cenarios.ts

- `tests/capture-wave-5-cenarios.ts`

## tests/capture-wave-5-tela.ts

- `tests/capture-wave-5-tela.ts`

## tests/capture-wave-6-cenarios.ts

- `tests/capture-wave-6-cenarios.ts`

## tests/capture-wave-7-cenarios.ts

- `tests/capture-wave-7-cenarios.ts`

## tests/compose-antes-depois.ts

- `tests/compose-antes-depois.ts`

## tests/e2e

- `tests/e2e/README.md`
- `tests/e2e/auth.spec.ts`
- `tests/e2e/degradacao-silenciosa.spec.ts`
- `tests/e2e/error-pages.spec.ts`
- `tests/e2e/followup-builder.spec.ts`
- `tests/e2e/followup-journey.spec.ts`
- `tests/e2e/followup-queue.spec.ts`
- `tests/e2e/helpers/auth.ts`
- `tests/e2e/inbox-scope.spec.ts`
- `tests/e2e/invite-lifecycle.spec.ts`
- `tests/e2e/kanban-owner-filter.spec.ts`
- `tests/e2e/password-recovery.spec.ts`
- `tests/e2e/queue-assign.spec.ts`
- `tests/e2e/rbac-roles.spec.ts`
- `tests/e2e/reset-password-mfa.spec.ts`
- `tests/e2e/risk-radar.spec.ts`
- `tests/e2e/signup-journey.spec.ts`
- `tests/e2e/smoke.spec.ts`
- `tests/e2e/system-update.spec.ts`
- `tests/e2e/utils/totp.ts`
- `tests/e2e/vps-fresh-onboarding.spec.ts`
- `tests/e2e/vps-webhook-outbound-ssrf.spec.ts`
- `tests/e2e/webhooks.spec.ts`

## tests/helpers

- `tests/helpers/stages-db-double.ts`

## tests/invariants

- `tests/invariants/README.md`
- `tests/invariants/agent-config-cases.test.ts`
- `tests/invariants/agent-dispatch-single-consumer.test.ts`
- `tests/invariants/agent-no-credential.test.ts`
- `tests/invariants/agent-stage-hint.test.ts`
- `tests/invariants/agent-watchdog.test.ts`
- `tests/invariants/automation-actions-crud.test.ts`
- `tests/invariants/automation-engine.test.ts`
- `tests/invariants/automation-send-whatsapp.test.ts`
- `tests/invariants/case-guardrail.test.ts`
- `tests/invariants/case-promise-detector.test.ts`
- `tests/invariants/case-reply-turn.test.ts`
- `tests/invariants/dispatcher-event-status.test.ts`
- `tests/invariants/event-log-drain.test.ts`
- `tests/invariants/evidencia-jsonb-chaves.test.ts`
- `tests/invariants/followup-engine.test.ts`
- `tests/invariants/followup-outcome-stats.test.ts`
- `tests/invariants/followup-reactivity.test.ts`
- `tests/invariants/followup-schema.test.ts`
- `tests/invariants/followup-silence-sweep.test.ts`
- `tests/invariants/followup-turn-bridge.test.ts`
- `tests/invariants/gov-1-rbac-config-write.test.ts`
- `tests/invariants/gov-1-rbac.test.ts`
- `tests/invariants/gov-1b-team-manager-read.test.ts`
- `tests/invariants/gov-2-assignment.test.ts`
- `tests/invariants/gov-3-assignment-events.test.ts`
- `tests/invariants/gov-3-transfer.test.ts`
- `tests/invariants/gov-4-routing.test.ts`
- `tests/invariants/gov-4b-routing-worker.test.ts`
- `tests/invariants/gov-5-visibility-scope.test.ts`
- `tests/invariants/gov-5b-inbox-scope-counts.test.ts`
- `tests/invariants/gov-5c-lead-scope.test.ts`
- `tests/invariants/gov-5d-queue-assign-unread.test.ts`
- `tests/invariants/gov-5e-lead-children-scope.test.ts`
- `tests/invariants/gov-6-ai-handoff.test.ts`
- `tests/invariants/gov-6-assignee-kind.test.ts`
- `tests/invariants/gov-7-tags.test.ts`
- `tests/invariants/gov-8-metrics.test.ts`
- `tests/invariants/gov-hardening-anon-definer.test.ts`
- `tests/invariants/gov-helpers.ts`
- `tests/invariants/human-cases.test.ts`
- `tests/invariants/lead-activities-barramento.test.ts`
- `tests/invariants/lead-owner-kind.test.ts`
- `tests/invariants/next-action-identity.test.ts`
- `tests/invariants/playbook-seed.test.ts`
- `tests/invariants/reactivation-schema.test.ts`
- `tests/invariants/relogio-do-silencio.test.ts`
- `tests/invariants/risk-state-schema.test.ts`
- `tests/invariants/rls-isolation.test.ts`
- `tests/invariants/score-band-coerencia.test.ts`
- `tests/invariants/system-self-update.test.ts`
- `tests/invariants/veto-activity.test.ts`
- `tests/invariants/vocabulario-banco-x-typescript.test.ts`
- `tests/invariants/webhooks-bulk-events.test.ts`
- `tests/invariants/webhooks-inbound-idempotency.test.ts`
- `tests/invariants/webhooks-inbound.test.ts`
- `tests/invariants/webhooks-rls.test.ts`
- `tests/invariants/webhooks-secret-encryption.test.ts`
- `tests/invariants/webhooks-trigger-events.test.ts`

## tests/prova-assinado-vs-nao.ts

- `tests/prova-assinado-vs-nao.ts`

## tests/prova-caminho-de-leads.ts

- `tests/prova-caminho-de-leads.ts`

## tests/prova-canal-agent-runs.ts

- `tests/prova-canal-agent-runs.ts`

## tests/prova-canal-board.ts

- `tests/prova-canal-board.ts`

## tests/prova-canal-timeline.ts

- `tests/prova-canal-timeline.ts`

## tests/prova-ciclo-funil.ts

- `tests/prova-ciclo-funil.ts`

## tests/prova-discriminador.ts

- `tests/prova-discriminador.ts`

## tests/prova-dois-leads-um-canal.ts

- `tests/prova-dois-leads-um-canal.ts`

## tests/prova-inbox-costura.ts

- `tests/prova-inbox-costura.ts`

## tests/prova-largura-do-lote.ts

- `tests/prova-largura-do-lote.ts`

## tests/prova-lead-novo-vs-antigo.ts

- `tests/prova-lead-novo-vs-antigo.ts`

## tests/prova-lote-ou-assinatura.ts

- `tests/prova-lote-ou-assinatura.ts`

## tests/prova-org-fresca-clinica.ts

- `tests/prova-org-fresca-clinica.ts`

## tests/prova-predicados-de-quadro.ts

- `tests/prova-predicados-de-quadro.ts`

## tests/prova-quantos-canais.ts

- `tests/prova-quantos-canais.ts`

## tests/prova-raio-do-silencio.ts

- `tests/prova-raio-do-silencio.ts`

## tests/prova-taxa-de-entrega.ts

- `tests/prova-taxa-de-entrega.ts`

## tests/prova-vazamento-assinatura.ts

- `tests/prova-vazamento-assinatura.ts`

## tests/qa-helpers.ts

- `tests/qa-helpers.ts`

## tests/setup

- `tests/setup/vitest.setup.ts`

## tests/shell

- `tests/shell/update-guard.test.sh`

## tests/sonda-agente-move-card.ts

- `tests/sonda-agente-move-card.ts`

## tests/sonda-ambiguo-na-caixa.ts

- `tests/sonda-ambiguo-na-caixa.ts`

## tests/sonda-card-reativacao.ts

- `tests/sonda-card-reativacao.ts`

## tests/sonda-decisao-chega-no-agente.ts

- `tests/sonda-decisao-chega-no-agente.ts`

## tests/sonda-decisao-reativacao.ts

- `tests/sonda-decisao-reativacao.ts`

## tests/sonda-dossie-d20-d21.ts

- `tests/sonda-dossie-d20-d21.ts`

## tests/sonda-inbox-redundancia.ts

- `tests/sonda-inbox-redundancia.ts`

## tests/sonda-janela-do-worker.ts

- `tests/sonda-janela-do-worker.ts`

## tests/sonda-linha-envenenada.ts

- `tests/sonda-linha-envenenada.ts`

## tests/sonda-owner-kind-lote.ts

- `tests/sonda-owner-kind-lote.ts`

## tests/sonda-painel-inbox.ts

- `tests/sonda-painel-inbox.ts`

## tests/sonda-papel-em-aberto.ts

- `tests/sonda-papel-em-aberto.ts`

## tests/sonda-proxima-acao.ts

- `tests/sonda-proxima-acao.ts`

## tests/sonda-pulso-12c.ts

- `tests/sonda-pulso-12c.ts`

## tests/sonda-pulso-visivel.ts

- `tests/sonda-pulso-visivel.ts`

## tests/sonda-rascunho-respeita-recusa.ts

- `tests/sonda-rascunho-respeita-recusa.ts`

## tests/sonda-realtime-401.ts

- `tests/sonda-realtime-401.ts`

## tests/sonda-reativacao.ts

- `tests/sonda-reativacao.ts`

## tests/sonda-rede-de-seguranca.ts

- `tests/sonda-rede-de-seguranca.ts`

## tests/sonda-rede-dossie.ts

- `tests/sonda-rede-dossie.ts`

## tests/sonda-replica-identity.ts

- `tests/sonda-replica-identity.ts`

## tests/sonda-ri-controlada.ts

- `tests/sonda-ri-controlada.ts`

## tests/sonda-score-no-card.ts

- `tests/sonda-score-no-card.ts`

## tests/sonda-tela-agente-move.ts

- `tests/sonda-tela-agente-move.ts`

## tests/sonda-tick-cron.ts

- `tests/sonda-tick-cron.ts`

## tests/sonda-timeline-ao-vivo.ts

- `tests/sonda-timeline-ao-vivo.ts`

## tests/sonda-timeline-contato.ts

- `tests/sonda-timeline-contato.ts`

## tests/sonda-veto-na-tela.ts

- `tests/sonda-veto-na-tela.ts`

## tests/sonda-worker-travessia.ts

- `tests/sonda-worker-travessia.ts`

## tests/unit

- `tests/unit/README.md`
- `tests/unit/activity-write-failure.test.ts`
- `tests/unit/agent-llm-capabilities.test.ts`
- `tests/unit/agent-media-parts.test.ts`
- `tests/unit/agent-providers-registry.test.ts`
- `tests/unit/agent-split-message.test.ts`
- `tests/unit/agent-split-send.test.ts`
- `tests/unit/agent-stage-sync.test.ts`
- `tests/unit/agent-version-columns-drift.test.ts`
- `tests/unit/ai-cases-routes.test.ts`
- `tests/unit/ai-response-bot-veto.test.ts`
- `tests/unit/auth-cookie-name.test.ts`
- `tests/unit/branding.test.ts`
- `tests/unit/campos-alterados.test.ts`
- `tests/unit/card-score.test.ts`
- `tests/unit/case-detail.test.tsx`
- `tests/unit/case-list.test.tsx`
- `tests/unit/case-reply-panel.test.tsx`
- `tests/unit/composer-attach.test.tsx`
- `tests/unit/composer-audio-recorder.test.tsx`
- `tests/unit/composer-emoji.test.tsx`
- `tests/unit/composer-note-mode.test.tsx`
- `tests/unit/composer-template-menu.test.tsx`
- `tests/unit/conversation-assignment.test.ts`
- `tests/unit/dispatcher-external-mode.test.ts`
- `tests/unit/draft-reply-button.test.tsx`
- `tests/unit/env-example-sync.test.ts`
- `tests/unit/evidencia-citada.test.ts`
- `tests/unit/evolution-gaps-copy.test.ts`
- `tests/unit/get-lead-context-decisao.test.ts`
- `tests/unit/get-lead-context-media.test.ts`
- `tests/unit/import-puro-sem-env.test.ts`
- `tests/unit/inbox-filters-scope.test.tsx`
- `tests/unit/inbox-media-audio.test.tsx`
- `tests/unit/inbox-media-docvideo.test.tsx`
- `tests/unit/inbox-media-image.test.tsx`
- `tests/unit/inbox-media-renderer.test.tsx`
- `tests/unit/inbox-media-utils.test.ts`
- `tests/unit/lead-edited-activity.test.ts`
- `tests/unit/leads-bulk-assign.test.ts`
- `tests/unit/lgpd-sla.test.ts`
- `tests/unit/local-echo.test.ts`
- `tests/unit/mcp-governance-tools.test.ts`
- `tests/unit/mcp-handoff-assignment.test.ts`
- `tests/unit/mcp-read-governance.test.ts`
- `tests/unit/media-derive-worker.test.ts`
- `tests/unit/media-derive.test.ts`
- `tests/unit/media-persist-worker.test.ts`
- `tests/unit/media-transcription.test.ts`
- `tests/unit/media-types.test.ts`
- `tests/unit/media-upload-validation.test.ts`
- `tests/unit/media-video-derive.test.ts`
- `tests/unit/media-waha-source.test.ts`
- `tests/unit/medify-clinical-migration.test.ts`
- `tests/unit/medify-clinical-schemas.test.ts`
- `tests/unit/next-action-routing.test.ts`
- `tests/unit/notes-schema.test.ts`
- `tests/unit/performed-at-um-relogio-so.test.ts`
- `tests/unit/rbac-matrix.test.ts`
- `tests/unit/realtime-auth-memo.test.ts`
- `tests/unit/risk-radar.test.ts`
- `tests/unit/risk-since.test.ts`
- `tests/unit/score-band.test.ts`
- `tests/unit/score-formula.test.ts`
- `tests/unit/snooze-button.test.tsx`
- `tests/unit/snooze-schema.test.ts`
- `tests/unit/team-list-roster.test.ts`
- `tests/unit/team-role-change.test.ts`
- `tests/unit/template-vars.test.ts`
- `tests/unit/templates-client.test.tsx`
- `tests/unit/templates-schema.test.ts`
- `tests/unit/thread-merge.test.ts`
- `tests/unit/timeline-eixo.test.ts`
- `tests/unit/timeline-grouping.test.ts`
- `tests/unit/waha-carimbo-falho.test.ts`
- `tests/unit/waha-engine-config.test.ts`
- `tests/unit/waha-ingest-media.test.ts`
- `tests/unit/waha-media-send.test.ts`
- `tests/unit/waha-message-id.test.ts`

## tests/vigia-entrega-realtime.ts

- `tests/vigia-entrega-realtime.ts`
