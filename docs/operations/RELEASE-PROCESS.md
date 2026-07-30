# Processo de release

## Versionamento

SemVer com sufixos:

- `0.9.0-beta.0`: piloto fechado;
- `0.9.x-beta.y`: estabilização;
- `1.0.0`: GA após todos os gates.

## Checklist

1. Escopo e riscos congelados.
2. Changelog e documentos atualizados.
3. Inventários regenerados.
4. Licenças/atribuições revisadas.
5. Typecheck, build, lint, unit, DB, E2E e segurança.
6. Migration install/update/replay.
7. Imagem e pacote com checksum.
8. Backup e rollback preparados.
9. Deploy em staging e smoke por persona.
10. Aprovação produto, engenharia, segurança e operação.
11. Deploy de produção.
12. Health/logs/filas e monitoramento reforçado.

## Evidência da release

- commit/tag;
- checksum do pacote/imagem;
- versão de schema;
- resultado dos testes;
- SBOM/audit;
- data e executor;
- migrations aplicadas;
- smoke de autenticação/RBAC/health;
- issues conhecidas;
- plano de rollback.

## Critérios de bloqueio

- teste crítico vermelho;
- segredo conhecido;
- migration não reproduzível;
- cross-tenant ou bypass clínico;
- backup ausente;
- dependência crítica vulnerável sem mitigação;
- provider obrigatório não configurado;
- documentação descrevendo capacidade inexistente.

## Hotfix

Hotfix segue o mesmo controle, com escopo menor. Não pula teste de regressão,
backup, versionamento ou post-mortem. Mudança emergencial vira correção permanente
e teste automatizado na sequência.
