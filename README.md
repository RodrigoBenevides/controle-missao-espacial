# Controle de Missão Espacial

Solução integrada com backend Spring Boot e aplicativo mobile React Native + TypeScript para controle de missão espacial.

## Funcionalidades

- Cadastro e consulta de sensores e módulos da missão.
- Cadastro e consulta de eventos operacionais.
- Cadastro e consulta de alertas críticos.
- Dashboard mobile com status da API e quantidades cadastradas.
- Integração entre mobile e backend via requisições GET e POST.

## Tecnologias

- Java
- Spring Boot
- Spring Data JPA
- H2 Database em modo file
- React Native
- TypeScript
- Expo

## Estrutura do projeto

```text
controle-missao-espacial/
  backend/
    src/main/java/
    src/main/resources/
    pom.xml
    API_TESTS.md
  mobile/
    src/
      navigation/
      screens/
      services/
      types/
    App.tsx
    package.json
  README.md
  entrega.txt
```

## Como rodar o backend

```bash
cd backend
mvn spring-boot:run
```

O backend roda por padrão em:

- `http://localhost:8080`

H2 Console:

- `http://localhost:8080/h2-console`

Banco H2 em modo file:

- `jdbc:h2:file:./data/missiondb`

## Como rodar o mobile

```bash
cd mobile
npm install
npx expo start
```

Para testar a integração, primeiro rode o backend na porta `8080` e depois inicie o app mobile.

## Endpoints

- GET `/api/health`
- GET `/api/sensores`
- POST `/api/sensores`
- GET `/api/eventos`
- POST `/api/eventos`
- GET `/api/alertas`
- POST `/api/alertas`

## Integração com o mobile

- Web/browser: `http://localhost:8080`
- Emulador Android: `http://10.0.2.2:8080`
- Celular físico: usar o IP local da máquina, por exemplo `http://SEU_IP_LOCAL:8080`

## Integrantes

- Caio Tadeu da Silva Faraleski - RM558795
- Rodrigo Caruzzo Benevides - RM554665
- Eduardo do Nascimento Souza - RM558819
