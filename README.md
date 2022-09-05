## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Packages
```bash
# JWT
$ npm install @nestjs/jwt jsonwebtoken
# Datebase
$ npm install @nestjs/mongoose mongoose
# Passport
$ npm install @nestjs/passport passport passport-jwt
# Utils
$ npm install uuid dotenv bcrypt class-transformer class-validator
# Types
$ npm install -D @types/bcrypt
$ npm install -D @types/passport
$ npm install -D @types/passport-jwt
```

## Configs

*main.ts*
```ts
// use dotenv
import 'dotenv/config';
```
