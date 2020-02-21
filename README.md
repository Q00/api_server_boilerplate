<h1 align="center">Welcome to api_server_boilerplate 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Q00/api_server_boilerplate/blob/development/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href ="https://github.com/google/gts"><img alt="Cody Style: Google" src="https://img.shields.io/badge/code%20style-google-blueviolet.svg" /></a>
</p>

> easy to use typescript express boilerplate. You can use board api, user api, error tracking etc..

---

### 🏠 [Homepage](https://github.com/Q00/api_server_boilerplate/blob/development/README.md)

## Install

```sh
yarn install
# after put your env flie
yarn db:dev sync # development environment
# or
yarn db:sync # production environment
```

## Usage

```sh
yarn dev # development environment
yarn start # production environment
```

## Run tests

```sh
yarn prepare
yarn build
yarn test

```

Or you can use debug with vscode

## code

### model

There are base models. You can extend this base models.

#### Base model

```typescript
export abstract class BaseModel {
  @IsInt()
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: [bigIntTransformer] })
  id!: number;

  @IsDate()
  @CreateDateColumn()
  createdAt!: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt!: Date;

  @IsDate()
  @Column({ nullable: true, type: 'date', default: null })
  deletedAt?: Date | null;
}
```

Also There are base board, base comment model.

#### Base board model

```typescript
// you can extends this class making child board and add user

export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  title!: string;

  @IsString()
  @Column({ type: 'text' })
  content!: string;

  @IsInt()
  @Column({ default: 0 })
  reportCount!: number;
}

```

#### Base comment model

```typescript
// you can extends this class making child comment and add user

export abstract class BaseComment extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  @MaxLength(50)
  comment!: string;

  @Column({ default: 0 })
  @IsInt()
  reportCount!: number;
}

```

### service

Threr are base services. You can extend this base services to other child service.

#### Base service

```typescript
// you can extends this BaseService to use common method

export abstract class BaseService<T extends BaseModel> {
  protected genericRepository: Repository<T>;
  private repo: ObjectType<T>;
  constructor(repo: ObjectType<T>) {
    this.genericRepository = getConnection().getRepository(repo);
    this.repo = repo;
  }
}
```

And then you just call super call with your using repository

```typescript
  constructor() {
    super(RepoName);
  }
```

#### Base board service

```typescript
@Service()
export abstract class BaseBoardService<T extends BaseBoard> extends BaseService<
  T
> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }
}
```

This service is base board service. In this service, there are common method about board. You can extend this service to other child board service.

#### Base comment service

```typescript
export abstract class BaseCommentService<
  T extends BaseComment
> extends BaseService<T> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }
}
```

This service is base comment service. This service is very similar to base board service.

### Provider

This module makes OAUTH logic. You can use base provider to extends other OAUTH.

```typescript
export abstract class BaseProvider {
  protected accessToken: string;
  protected instance: AxiosInstance | null;
  constructor() {
    this.accessToken = '';
    this.instance = null;
  }
   setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setInstance(url: string, headers: object) {
    this.instance = apiClient(url, headers);
    this.instance.interceptors.response.use(
      (response) => response,
      (err) => Promise.reject(err),
    );
  }

  getInstance() {
    return this.instance;
  }

  async generateToken(userId: number) {
    return `Bearer ${Authentication.generateToken(userId)}`;
  }
}
```

Auth Conroller use this provider to make JWT token.

### Controller

There are BaseAuthController, BaseCommentController and Other Controller. This project use [routing-controllers](https://github.com/typestack/routing-controllers) and [typedi](https://github.com/typestack/typedi). Thier README help you understand this architecture.

#### Base Auth Controller

```typescript
export class BaseAuthController<T extends BaseProvider> extends BaseController {
  // this can be used in child class (ExampleAuthController)
  protected userAccountService: UserAccountService;
  protected userService: UserService;
  constructor(protected provider: T) {
    super();
    this.provider = provider;
    this.userAccountService = Container.get(UserAccountService);
    this.userService = Container.get(UserService);
  }
}
```

#### Base Comment Controller

```typescript
export abstract class BaseCommentController<
  U extends BaseComment,
  T extends BaseCommentService<U>
> extends BaseController {
  protected service: T;
  constructor(service: T) {
    super();
    this.service = service;
  }
}
```

If you want to extends this controller, you should call super with service like below.

```typescript
@JsonController('/example_board_comment')
export class ExampleBoardCommentController extends BaseCommentController<
  ExampleBoardComment,
  ExampleBoardCommentService
> {
  //this private service automaticaly injected by typedi
  constructor(private exampleBoardCommentService: ExampleBoardCommentService) {
    super(exampleBoardCommentService);
  }
}
```

### DTO

To make request schema, this project use [class-validator](https://github.com/typestack/class-validator). This request schema will be shown in swagger ui or Redoc.

### Interceptor

This module use [routing-controllers](https://github.com/typestack/routing-controllers) interceptor

### Middleware

This module use [routing-controllers](https://github.com/typestack/routing-controllers) Middleware

### Database

This project use [typeorm](https://typeorm.io/) and connect with [Postgres](https://www.postgresql.org/).

#### Naming Strategy 

using snake case.

```typescript
export class NamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return plural(snakeCase(userSpecifiedName || targetName));
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  columnName(propertyName: string, customName: string) {
    return snakeCase(customName || propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string,
  ) {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }
}
```

#### config

```typescript
const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  namingStrategy: new NamingStrategy(),
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [`${path.join(__dirname, '..', 'model')}/**.[tj]s`],
  migrations: [`${path.join(__dirname, '..', 'model')}/migration/**.[tj]s`],
};
```

## Env variable

```
DB_HOST=
DB_USER=
DB_PW=
PORT= # your server port
DB_PORT=
DATABASE= # database name
TEST_TOKEN= # jwt token to use in testing
SENTRY_DSN= # sentry dsn
```

## Author

👤 **Q00 <jqyu.lee@gmail.com>**

- Website: https://velog.io/@q00
- Github: [@Q00](https://github.com/Q00)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Q00/api_server_boilerplate/issues).<br/>If you want to contribute this repo, check [contribute page](./CONTRIBUTING.md)

## 🔍 Relase note && Change log

Release note and change log are exist in CHANGELOG(./CHANGELOG.md)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
