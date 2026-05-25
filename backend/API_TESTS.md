# API Tests

Base local:

- `http://localhost:8080`

O banco H2 esta configurado em modo file:

- `jdbc:h2:file:./data/missiondb`

## Endpoints

- GET `/api/health`
- GET `/api/sensores`
- POST `/api/sensores`
- GET `/api/eventos`
- POST `/api/eventos`
- GET `/api/alertas`
- POST `/api/alertas`

## Exemplos JSON

POST `/api/sensores`

```json
{
  "nome": "Sensor de Oxigenio",
  "tipo": "Oxigenio",
  "modulo": "Modulo de Suporte a Vida",
  "leitura": 98.7,
  "unidade": "%",
  "status": "Ativo"
}
```

POST `/api/eventos`

```json
{
  "sistemaMonitorado": "Sistema de Comunicacao",
  "descricao": "Sinal restabelecido com a central de controle",
  "status": "Normal"
}
```

POST `/api/alertas`

```json
{
  "origem": "Modulo Termico",
  "mensagem": "Temperatura acima do limite operacional",
  "severidade": "Alta",
  "resolvido": false
}
```
