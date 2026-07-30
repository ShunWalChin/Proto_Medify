# Checklist de segurança

## Antes de cada merge

- [ ] Entrada validada no servidor.
- [ ] Tenant obtido de fonte confiável.
- [ ] Papel/escopo e ownership testados.
- [ ] RLS/grants atualizados quando há tabela nova.
- [ ] Service role filtra `organization_id` explicitamente.
- [ ] Logs não contêm segredo, token ou corpo clínico.
- [ ] Efeito externo tem idempotência, timeout e retry limitado.
- [ ] Teste negativo cobre outro tenant e menor papel.
- [ ] Dependência nova tem licença e risco avaliados.
- [ ] Documento e inventário afetados foram atualizados.

## Antes de deploy

- [ ] Typecheck, build, lint e testes aprovados.
- [ ] Audit de dependências e secret scan aprovados.
- [ ] Migration instalada e reaplicada em banco descartável.
- [ ] Backup executado e checksum registrado.
- [ ] Imagem/tag é imutável.
- [ ] Segredos estão fora da imagem e do repositório.
- [ ] Health, login, MFA, RBAC e smoke de tenant aprovados.
- [ ] Rollback de aplicação conhecido.
- [ ] Mudança destrutiva de dados possui plano específico.

## Periodicamente

- [ ] Restaurar backup em ambiente isolado.
- [ ] Revisar admins, assignments clínicos, tokens e sessões.
- [ ] Rotacionar segredos conforme política.
- [ ] Conferir expiração TLS e espaço em disco.
- [ ] Revisar alertas, dead-letter e falhas de auditoria.
- [ ] Atualizar SBOM e vulnerabilidades.
- [ ] Revalidar provedores/suboperadores e região.
- [ ] Executar exercício de incidente e acesso indevido.
- [ ] Remover dados expirados conforme retenção aprovada.

## Nunca

- commitar `.env`, senha, chave privada, QR ou token;
- usar service role no browser;
- confiar em `org_id` enviado pelo cliente;
- abrir prontuário apenas porque o usuário é admin;
- editar registro clínico assinado;
- testar restore sobre produção;
- usar dado de saúde em campanha sem finalidade/base compatível;
- ocultar falha de auditoria ou consumidor.
