<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 💰 Bank API - Backend MVP

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p>Um projeto de backend que simula operações bancárias básicas, criado como MVP para estudo e portfólio. Permite gerenciar usuários, contas bancárias e transações de forma segura e organizada. A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🎯 Objetivo do Projeto

- Criar uma API para operações bancárias:
- Cadastro de usuários
- Criação de contas
- Depósitos e transferências
- Garantir segurança e validação dos dados
- Servir como projeto de estudo e portfólio para NestJS e backend em geral
- Estudo do [Nest](https://github.com/nestjs/nest) framework.

## 🛠 Tecnologias Utilizadas

- NestJS – Framework Node.js para criar APIs estruturadas
- Prisma – ORM moderno para manipulação do banco de dados
- SQLite – Banco leve e fácil de configurar para MVP
- class-validator – Validação de dados de entrada
- Jest – Testes unitários

## 🔑 Funcionalidades

  💳 Cadastro de usuários e contas bancárias
  💰 Depósitos e saques
  🔄 Transferências entre contas
  🔒 Proteção de dados sensíveis
  ✅ Validação de dados de entrada

## 🚀Project setup

1 - Instalar dependencias

```bash
$ pnpm install
```

2 - Gerar cliente Prisma:

```bash
npx prisma generate
```

3 - Rodar migrations:
```bash
npx prisma migrate dev --name init
```

4 - Iniciar aplicação:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

A API estará disponível em http://localhost:3000

## 🧪 Testes

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 🌱 Próximos passos

- Autenticação JWT
- Melhorias na documentação (Swagger)
- Migração para banco mais robusto (Postgres/MySQL)
- Funcionalidades avançadas: extratos, limites e agendamento de transferências

## Stay in touch

- Author - [Guilherme Castelo](https://github.com/castelogui)
- Linkedin - [@nestframework](https://linkedin.com/in/castelo-guilherme)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
