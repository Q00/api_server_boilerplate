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

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Q00/api_server_boilerplate/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
