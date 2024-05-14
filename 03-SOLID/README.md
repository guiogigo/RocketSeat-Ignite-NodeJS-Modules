# App

GynPass Style App

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só poder cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Downloads e conteúdos:
    > npm i typescript @types/node tsx tsup -D
        - typescript e o types do node
        - tsx para transformar os arquivos TS para JS
        - tsup para criar a build da aplicação
    > npx tsc --init 
        - Criar a tsconfig.json
    > npm i fastify
        - Framework para rodar o servidor
    > npm i dotenv zod
        - dotenv para carregamento das variáveis ambiente
        - zod para tipagem de dados
    > npm i @rocketseat/eslint-config -D
        - eslint para formatação do código
    
# Criar Scripts no package:
    "dev": "tsx watch src/server.ts" (Roda a aplicação)
    "build": "tsup src --out-dir build" (Cria a build)
    "start": "node build/server.js" (Roda a build)

# .npmrc
    - save-exact=true
    - Fixa as versões de todas as dependecias facilitando as atualizações por meio de bots com testes automatizados

# Variáveis ambiete
    NODE_ENV=dev

# Configurações adicionais
    - Na tsconfig.json:
        "baseUrl": "./",   
        "paths": {
        "@/*": ["./src/*"] (Facilita os caminhos)
        },  