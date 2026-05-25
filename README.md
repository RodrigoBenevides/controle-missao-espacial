# Controle de Missao Espacial

Solucao integrada com backend Spring Boot e app mobile React Native + TypeScript para cadastro e consulta de sensores, eventos operacionais e alertas criticos de uma missao espacial.

## Tecnologias previstas

- Java
- Spring Boot
- H2 Database em modo file
- React Native
- TypeScript
- Expo

## Estrutura inicial

```text
controle-missao-espacial/
  backend/
    src/
      main/
        java/
        resources/
    pom.xml
  mobile/
    src/
      screens/
      services/
      types/
      navigation/
    App.tsx
    package.json
  README.md
  entrega.txt
```

## Observacao

Este projeto sera desenvolvido em cards pequenos, seguindo estritamente o enunciado da Global Solution.

## Backend inicial

Para rodar o backend:

```bash
cd backend
mvn spring-boot:run
```

Endpoint inicial:

- GET `http://localhost:8080/api/health`

H2 Console:

- `http://localhost:8080/h2-console`

## Endpoints da missao

- GET `http://localhost:8080/api/sensores`
- POST `http://localhost:8080/api/sensores`
- GET `http://localhost:8080/api/eventos`
- POST `http://localhost:8080/api/eventos`
- GET `http://localhost:8080/api/alertas`
- POST `http://localhost:8080/api/alertas`

Exemplo de sensor:

```json
{
  "nome": "Sensor de Temperatura",
  "tipo": "Temperatura",
  "modulo": "Modulo Orbital",
  "leitura": 23.5,
  "unidade": "Celsius",
  "status": "Ativo"
}
```

Exemplo de evento:

```json
{
  "sistemaMonitorado": "Sistema de Navegacao",
  "descricao": "Ajuste automatico de rota executado",
  "status": "Normal"
}
```

Exemplo de alerta:

```json
{
  "origem": "Modulo de Energia",
  "mensagem": "Nivel de bateria abaixo do recomendado",
  "severidade": "Alta",
  "resolvido": false
}
```

## Integracao com o mobile

URL local padrao da API no computador:

- `http://localhost:8080`

No emulador Android, usar:

- `http://10.0.2.2:8080`

Em celular fisico, usar o IP da maquina na rede local:

- `http://SEU_IP_LOCAL:8080`
