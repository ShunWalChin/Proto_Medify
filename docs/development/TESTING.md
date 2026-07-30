# Estratégia de testes

## Pirâmide orientada a risco

| Nível | Prova |
|---|---|
| Unitário | regra, schema, estado e erro |
| Invariante | propriedade que nunca pode quebrar |
| Rota | auth, contrato, código HTTP e efeito |
| Banco real | migration, RLS, trigger, função e concorrência |
| Integração | adapter, retry, webhook e idempotência |
| E2E | jornada por persona |
| Operacional | build, deploy, health, backup e restore |
| Segurança | cross-tenant, menor papel, segredo e abuso |

## Resultado da release 0.9

- 177 arquivos executados;
- 1.458 testes aprovados;
- TypeScript aprovado;
- build de produção aprovado;
- lint sem erros;
- audit de produção sem vulnerabilidades conhecidas na data de corte.

O inventário contém mais arquivos `*.test.*` que o número executado porque inclui
testes de rota próximos ao código e categorias com configuração/comando próprio.

## Casos obrigatórios

### Multi-tenancy

- tenant A não lê/altera tenant B;
- ID de outro tenant não revela existência;
- service role aplica filtro manual;
- token/MCP está preso à organização.

### Clínica

- recepção não lê prontuário;
- gestor sem assignment não lê;
- clínico ativo lê com finalidade;
- assinatura sem MFA falha;
- assinado não é alterado;
- acesso produz auditoria.

### Integrações

- assinatura/token inválido falha;
- evento repetido não duplica;
- timeout é controlado;
- retry mantém idempotência;
- falha fica observável/dead-letter.

### UI

- loading, vazio, erro e forbidden;
- teclado/foco;
- viewport mobile sem overflow indevido;
- alvo de toque;
- console sem erro;
- papel sem permissão não encontra ação nem rota.

## Teste de migration

1. Postgres/Supabase vazio.
2. Aplicar baseline.
3. Aplicar todas as migrations.
4. Reexecutar migrator.
5. Comparar checksum/histórico.
6. Executar testes RLS com dois tenants.
7. Testar upgrade a partir da versão anterior.

## Falha de teste

Não se aumenta timeout antes de medir causa. Diferencie:

- defeito do produto;
- defeito do teste;
- ferramenta não portátil;
- ambiente/dependência ausente;
- flakiness/concor­rência.

Uma guarda que encontra zero arquivos deve falhar explicitamente para evitar
“verde por vacuidade”.
