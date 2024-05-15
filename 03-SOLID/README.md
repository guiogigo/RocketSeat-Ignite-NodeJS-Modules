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
    > npm i prisma -D
        - Baixa o necessário para rodar o prisma
    > npx prisma init
        - Inicia o prisma no projeto
    > npm i @prisma/client
    
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
    > docker compose up -d
        - Roda o compose para criação dos containers
        - -d significa que ele não ficará exibindo os logs
    > docker compose stop
        - Para de rodar os containers ativos
    > docker compose down
        - Delete os containers criados