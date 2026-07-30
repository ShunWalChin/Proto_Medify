# Regras de negócio

Estas regras são invariantes do produto. Uma implementação que as viola está
incorreta mesmo que a interface aparente funcionar.

## Organização e identidade

1. Toda entidade operacional pertence a uma organização (`org_id`).
2. O tenant ativo é resolvido no servidor; nunca é confiado diretamente ao cliente.
3. E-mail/telefone são normalizados antes de deduplicação.
4. Uma pessoa pode ser contato, paciente e oportunidade sem duplicar identidade.
5. Desativação preserva auditoria e referências; exclusão física é excepcional.

## Conversas e atendimento

1. Mensagem inbound deve ser idempotente pelo identificador do provedor.
2. Uma conversa aberta tem estado, canal e responsabilidade explícitos.
3. Claim, transferência, liberação, snooze e fechamento são ações auditáveis.
4. Nota interna não pode ser enviada ao paciente.
5. Mídia é autorizada antes de gerar URL ou conteúdo.
6. A ativação/desativação do bot deve ser visível e reversível.

## CRM e funil

1. O estágio pertence ao mesmo pipeline e tenant da oportunidade.
2. Movimentação registra ator, origem, horário do banco e motivo quando exigido.
3. Ganho e perda são estados explícitos, não apenas mudança visual de coluna.
4. Próxima ação deve ter data coerente e não pode sumir sem evento.
5. Operação em lote valida cada item e é idempotente.

## Agenda

1. Horários são persistidos em UTC e exibidos no fuso da organização.
2. Profissional, paciente e organização precisam ser compatíveis.
3. Criação repetida com mesma chave não duplica agendamento.
4. Conflito de recurso deve ser impedido transacionalmente antes da versão 1.0.
5. Cancelamento preserva histórico; não apaga o compromisso.

## Prontuário

1. Prontuário é domínio clínico, separado de notas de CRM.
2. Leitura exige vínculo clínico ativo, finalidade e registro de acesso.
3. Gestor ou administrador não ganha acesso clínico automaticamente.
4. Rascunho pode evoluir; registro assinado é imutável.
5. Assinatura exige MFA, autoria, instante confiável e hash do conteúdo.
6. Correção de registro assinado é adendo encadeado.
7. Break-glass, quando implementado, exige justificativa, alerta e revisão.

## Consentimento e comunicação

1. Consentimento guarda finalidade, canal, origem, instante e versão do texto.
2. Opt-out prevalece sobre segmento, campanha ou automação.
3. Dado clínico não é usado para marketing sem base e finalidade compatíveis.
4. Template e variáveis são validados antes do lote.
5. Um destinatário aparece no máximo uma vez por campanha.

## Instagram e automação social

1. Evento Meta inbound é aceito somente após challenge/assinatura válida,
   deduplicação e resolução da organização proprietária da conta.
2. Mensagem automática padrão só pode sair dentro da janela de 24 horas.
3. A tag `HUMAN_AGENT` admite atendimento humano até sete dias e nunca autoriza
   automação.
4. `STOP`, `PARAR`, opt-out, blocklist e revogação de consentimento prevalecem
   sobre gatilho, sequência, campanha, IA ou reengajamento.
5. Um comentário pode originar no máximo uma resposta privada elegível.
6. Cooldown e limites da Meta são revalidados imediatamente antes de cada envio.
7. Cada decisão de envio ou bloqueio registra regra, janela, ator e correlação.
8. Publicações Feed, Reel, Story e Carrossel são idempotentes e auditáveis.
9. Copiloto exige confirmação humana; modo autônomo exige política, orçamento,
   escopo e kill switch explícitos.
10. Token, conta, conteúdo, contato, conversa e insight pertencem a uma única
    organização e não podem ser consultados entre tenants.

## IA

1. IA não recebe credencial do provedor na UI nem no prompt.
2. Toda execução tem tenant, agente/versão, modelo, custo e correlação.
3. Fonte RAG respeita tenant, classificação e autorização do solicitante.
4. Saída clínica é sugestão; assinatura e decisão permanecem humanas.
5. Falha de modelo não pode bloquear atendimento humano.
6. Orçamento e kill switch têm precedência sobre automação.

## LGPD e auditoria

1. Auditoria é append-only para eventos críticos.
2. Logs não devem guardar senha, token, segredo ou corpo clínico desnecessário.
3. Solicitação do titular segue estado, SLA, aprovação e evidência.
4. Anonimização preserva obrigações legais e referências mínimas.
5. Retenção e descarte são configuráveis por classe de dado.

## Concorrência e tempo

1. O banco é a fonte de horário para ordenação de eventos persistidos.
2. Operações externas usam chave de idempotência e política de retry.
3. Retry não transforma efeito “uma vez” em “várias vezes”.
4. Locks e transações são proporcionais ao recurso protegido.
