# App

GynPass Style App

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só poder cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
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
    > npm i prisma -D
        - Baixa o necessário para rodar o prisma
    > npx prisma init
        - Inicia o prisma no projeto
    > npm i @prisma/client
    > npm i bcryptjs
        - Biblioteca mais comum para hash de senhas
    > npm i @types/bcryptjs
        - Suporte para typescript
    > npm i vitest vite-tsconfig-paths -D
        - Vitest para os testes da aplicação
        - vite-tsconfig-paths para o vitest entender os paths com @ no tsconfig
    > npm i vitest/coverage-c8 -D
    > npm i dayjs
    > npm i -D npm-run-all
        - Rodas comandos dentro do package
    > npm i supertest -D
        - Biblioteca para fazer chamadas http sem precisar colocar a aplicação no ar
    > npm i @types/supertest -D

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

## Prisma:
    ORM - Object Relational Mapper
    - Instalar a extensão do Prisma
    - Nas configurações do vscode: 

    "[prisma]": {
        "editor.formatOnSave": true,
    },

    - As tabelas são chamadas de model
    - @@ configurações da tabela
    - @ configuração da coluna

    > npx prisma generate
        - Gera toda a tipagem do banco de dados para o TS

    > npx prisma migrate dev
        - Gera uma migrate
    > npx prisma studio
        - Abre um site onde voc~e pode modificar os seus bancos de dados manualmente

## Docker:
    - Plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres. Os contêineres são isolados uns dos outros e agrupam seus próprios softwares, bibliotecas e arquivos de configuração.
    - Tipo uma máquina virtual eu acho
    - bitnami/postgresql (Mais seguro)
    > docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
    > docker ps 
        - Mostra os dockers rodando
    > docker ps -a
        - Mostra todos os dockers já criados
    > docker start [nome]
        - Roda o docker
    > docker rm [nome]
        - Apaga o docker
    - Criar um dockercompose para guiar a criação dos containers da aplicação
    - Após executar os comandos de compose é importante usar o npx prisma migrate dev para rodar todas as migrations no container
    > docker compose up -d
        - Roda o compose para criação dos containers
        - -d significa que ele não ficará exibindo os logs
    > docker compose stop
        - Para de rodar os containers ativos
    > docker compose down
        - Delete os containers criados

# Repository Pattern

## SOLID:
    - S:
    - O
    - L
    - I
    - D => Dependency Inversion Principle

## Sobre teste:
    - Testes unitários precisam ser rápidos e não podem ter ligação direta com o banco de dados
    - InMemoryTestDatabase => Pattern de testes da aplicação

## Factory Pattern:
    - Fabrica de coisas comuns que possuem várias dependências
    - Centralizador de criação dos casos de uso

## TDD:
    - Test-driven development
    - Criar primeiro o teste antes do funcionamento
    - Estado RED:
        - Dar erro no teste (pois não houve implementação)
    - Estado GREEN:
        - Fazer o mínimo para que o teste passe
    - Estado REFACTOR:
        - Tornar a implementação bem escrita

    ==VITEST => Possui um sistema para fake dates ==