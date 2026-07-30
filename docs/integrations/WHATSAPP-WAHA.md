# WhatsApp e WAHA

## Papel na arquitetura

WAHA é o adapter do canal WhatsApp. O domínio MEDIFY conhece sessões, conversas,
mensagens e eventos; detalhes de QR, sessão e payload pertencem ao adapter.

## Ciclo da sessão

1. Admin do tenant cria/configura sessão.
2. Backend solicita QR ao WAHA.
3. Operador autorizado escaneia com o aparelho.
4. Heartbeat acompanha estado.
5. Webhook inbound é configurado com token exclusivo.
6. Reconexão e encerramento são auditados.

Estados externos são normalizados antes de chegar à UI.

## Inbound

- validar token/assinatura antes de ler payload;
- responder rápido e processar efeitos pesados de forma assíncrona;
- deduplicar por mensagem/evento externo;
- normalizar telefone/JID;
- vincular contato, canal, conversa e mensagem no mesmo tenant;
- baixar/servir mídia com autorização;
- registrar payload mínimo e manter redaction.

## Outbound

- confirmar consentimento/finalidade quando aplicável;
- validar template e variáveis;
- aplicar pacing/rate limit e anti-ban;
- persistir tentativa antes/depois do efeito;
- usar idempotency key;
- atualizar status por callback;
- retry apenas em falha transitória.

## Segurança

- WAHA não publica porta na Internet;
- credenciais do dashboard/API ficam em arquivo de segredo;
- webhook usa token distinto por finalidade;
- QR não entra em log, screenshot ou documentação;
- operador não recebe segredo de infraestrutura;
- sessão removida exige revogação do lado WAHA e MEDIFY.

## Operação

Verificar diariamente:

- container ativo;
- sessão `WORKING`/equivalente;
- idade do último heartbeat;
- fila outbound;
- erros 401/403/429/5xx;
- webhooks duplicados;
- espaço de mídia.

## Limite da beta

O container está implantado, mas um número real só opera depois do pareamento por
QR e das políticas aplicáveis ao canal. A Meta Cloud API permanece adapter futuro
para clientes que exigirem canal oficial.
