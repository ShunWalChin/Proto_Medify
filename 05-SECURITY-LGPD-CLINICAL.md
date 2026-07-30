# Segurança, LGPD e governança clínica

Este documento é requisito de engenharia, não parecer jurídico. Políticas de
tratamento, retenção, assinatura e uso assistencial precisam de validação de
assessoria jurídica, encarregado/DPO, responsável técnico e especialistas de
segurança da informação em saúde.

## Base normativa consultada

- A [Lei nº 13.709/2018 — LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
  classifica dado referente à saúde como dado pessoal sensível.
- A [ANPD mantém guias oficiais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes)
  sobre agentes de tratamento e segurança da informação.
- A [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-aprova-o-regulamento-de-comunicacao-de-incidente-de-seguranca)
  regulamenta comunicação de incidentes; a página operacional da ANPD informa
  prazo geral de três dias úteis nos casos comunicáveis.
- A [Resolução CFM nº 2.314/2022](https://sistemas.cfm.org.br/normas/visualizar/resolucoes/BR/2022/2314)
  regulamenta telemedicina.
- A [Resolução CFM nº 2.381/2024](https://sistemas.cfm.org.br/normas/visualizar/resolucoes/BR/2024/2381)
  disciplina documentos médicos e requisitos mínimos, inclusive assinatura
  qualificada para documento eletrônico.
- A [Resolução CFM nº 1.821/2007](https://sistemas.cfm.org.br/normas/visualizar/resolucoes/BR/2007/1821)
  trata de digitalização, guarda e manuseio de prontuários.

Normas mudam. Antes de cada release regulatório, confirmar vigência, alterações,
regras do conselho regional aplicável e requisitos SBIS/CFM/e-RES.

## Papéis de tratamento

Configuração SaaS gerenciada prevista:

- clínica/serviço de saúde: normalmente controlador das finalidades assistenciais;
- Medify: operador nos limites contratuais;
- cloud, e-mail, WhatsApp, observabilidade e LLM: suboperadores conforme uso;
- DPO/encarregado e canais de titulares: definidos em contrato e produto.

Self-host/BYO pode alterar a divisão. O sistema deve registrar modalidade,
responsáveis, suboperadores, região, DPA e versão de termos por tenant.

## Classificação

| Classe | Exemplos | Controles mínimos |
|---|---|---|
| Pública | conteúdo institucional | integridade e disponibilidade |
| Interna | configuração não sensível | auth e least privilege |
| Pessoal | nome, telefone, e-mail | RLS, auditoria, minimização |
| Sensível | saúde, biometria, genética | fronteira clínica, cifragem, finalidade |
| Segredo | tokens, chaves, senhas | vault, rotação, nunca logar |
| Prontuário assinado | evolução/documento | imutabilidade, assinatura, retenção, export |

## Controles obrigatórios

### Identidade

- `getUser()`/validação no servidor.
- MFA para admin, super-admin e perfis de risco.
- Sessões curtas/reautenticação para export, assinatura e break-glass.
- Convites expiram, uso único e escopo de organização.
- Revogação encerra sessões e invalida tokens.

### Autorização

- RLS em toda tabela tenant-aware.
- Organização resolvida de fonte confiável.
- Papel operacional não concede permissão clínica.
- Assignment clínico ativo para prontuário.
- Service role só no servidor e com filtro manual obrigatório.
- Super-admin não ignora a fronteira clínica.

### Criptografia e segredos

- TLS em trânsito.
- Criptografia de disco/storage e campos de alto risco.
- CPF cifrado + hash de busca.
- Credenciais externas com AEAD e chave fora do banco.
- Chaves distintas por finalidade e rotação documentada.
- Secret scanning no pre-commit e CI.
- Nunca colocar API key em query string.

### Auditoria

- Append-only, relógio confiável e request/correlation ID.
- Actor user/token/agent, tenant, ação, recurso e resultado.
- Leitura clínica registra finalidade.
- Não armazenar prompt integral, segredo ou conteúdo clínico desnecessário no audit.
- Alertar falha sistêmica de auditoria; não silenciar.
- Export auditável e retenção definida.

### Prontuário

- Draft separado de registro assinado.
- Hash, assinante, método e timestamp.
- Assinado é imutável; adendo referencia original.
- Documento exportado preserva autenticidade verificável.
- Anexo informa origem/formato/classificação.
- Política de guarda e descarte validada juridicamente; não codificar prazo arbitrário.

### IA

- Zero data retention quando contratualmente disponível e necessário.
- Não usar dados de tenant para treino sem base/contrato/opt-in específico.
- RAG sempre filtra organização antes da similaridade.
- Conteúdo recuperado não altera instruções do sistema.
- Redação/minimização antes de enviar ao provedor.
- Tool allowlist, escopo, rate limit, timeout e orçamento.
- Prescrição, diagnóstico, documento e encerramento assistencial exigem humano.
- Logs mostram fonte e incerteza, sem esconder falha.

## Incident response

1. Detectar e preservar evidência.
2. Conter sem apagar rastros.
3. Classificar dados, titulares, sistemas, duração e impacto.
4. Identificar controlador e DPO.
5. Avaliar risco/dano relevante.
6. Comunicar ANPD/titulares quando aplicável, dentro do prazo vigente.
7. Erradicar, restaurar e validar.
8. Registrar decisão, timeline e medidas.
9. Postmortem sem culpabilização e ações verificáveis.
10. Manter registro pelo prazo normativo aplicável.

## Threat model inicial

| Ameaça | Mitigação |
|---|---|
| Cross-tenant por query sem filtro | RLS + teste com dois tenants + filtro explícito no service role |
| Recepção lê prontuário | assignment clínico + policy específica |
| Support impersonation lê saúde | sem bypass clínico; break-glass separado |
| Webhook falso/replay | HMAC, timestamp, nonce/external ID e idempotência |
| Prompt injection em documento | separação instrução/conteúdo, tool gate e citações |
| Broadcast acidental | feature opt-in, escopo, preview e confirmação |
| CPF/segredo em log | logger estruturado/redaction e testes |
| Registro clínico alterado | imutabilidade, adendo e cadeia de hash |
| Agenda dupla | constraint transacional futura + conflito na API |
| Backup irrecuperável | restore periódico e evidência |
| Worker duplicado | claim/lock, consumer único e idempotency key |
| Ex-funcionário mantém acesso | revogação imediata e revisão periódica |

## Gates de produção

- RLS testada em todas as tabelas, incluindo service role.
- Rate limit em login, webhooks, APIs, IA, exports e buscas.
- SAST, dependency audit, secret scan e SBOM.
- Pentest independente.
- Backup + restore e DR testados.
- DPIA/RIPD quando indicado.
- Contratos/suboperadores e política de retenção aprovados.
- Assinatura/documentos validados.
- E2E clínico e acessibilidade.
- Exercício de incidente e canal DPO.

## Segredo exposto nos materiais de entrada

Um dos textos fornecidos continha uma connection string de banco com credencial em
claro. Ela deve ser tratada como comprometida: rotacionar a senha/chave no
provedor, invalidar conexões antigas, revisar logs de acesso e nunca reutilizar o
valor. O segredo não foi copiado para o Medify nem reproduzido nesta documentação.

