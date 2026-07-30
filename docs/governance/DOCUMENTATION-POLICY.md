# Política de manutenção documental

## Fontes de verdade

| Assunto | Fonte primária |
|---|---|
| Estado do produto | `02-FUNCTIONAL-CATALOG.md` |
| Arquitetura | `03-ARCHITECTURE.md` + ADRs |
| Dados | `04-DOMAIN-AND-DATA.md` + migrations |
| Segurança | `05-SECURITY-LGPD-CLINICAL.md` |
| Próximos passos | `06-ROADMAP.md` |
| Operação | `08-OPERATIONS-RUNBOOK.md` |
| Release | `09-RELEASE-*.md` |
| Rotas/objetos | inventários gerados |

Código e migration prevalecem quando inventário gerado estiver atrasado; o atraso
é defeito documental e deve ser corrigido na mesma entrega.

## Padrão

- Markdown compatível com GitHub;
- português claro; termos técnicos mantêm nome de código quando necessário;
- links relativos dentro do repositório;
- Mermaid para relações complexas;
- comandos sem valores secretos;
- estado explícito: entregue, beta, requer provedor ou planejado;
- data de corte em evidência mutável.

## Revisão

Uma mudança deve responder:

1. O comportamento mudou?
2. O contrato/API/schema mudou?
3. Um papel ou risco mudou?
4. Operação/rollback mudou?
5. Métrica ou gate mudou?
6. Atribuição/licença mudou?

Qualquer “sim” exige atualização correspondente.

## Segurança editorial

Antes de publicar:

- procurar senhas, tokens, private keys, connection strings e cookies;
- remover PII e dados clínicos;
- não publicar QR ou screenshot sem redaction;
- preferir nomes de variáveis;
- revisar URL que contenha token;
- tratar repositório como público mesmo se sua visibilidade mudar.

## Inventários

Execute:

```bash
node scripts/generate-inventory.mjs --source /caminho/para/medify
```

O script lê apenas nomes/estrutura e não copia valores de `.env`.

## Lifecycle

- documento substituído recebe link para o novo ou é removido;
- decisão arquitetural não é reescrita: recebe nova ADR que a substitui;
- release publicada é imutável, salvo correção editorial explícita;
- backlog fica no roadmap, não misturado ao estado entregue.
