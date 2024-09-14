# Rest-GraphQL App

Welcome to the Rest-GraphQL App project! This interactive platform allows users to make both REST and GraphQL requests to user-specified endpoints, with additional features like authorization, authentication, and a history page that saves past requests for easy access.

## Technology stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NextJs](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Team Members

- [Yuliya Kursevich](https://github.com/YulikK) - Team Lead. Frontend Developer
- [Dmitry Gaponenko](https://github.com/the-dmitry) - Frontend Developer
- [Yuliya Karuk](https://github.com/Yuliya-Karuk/) - Frontend Developer

## Project Overview

This project aims to create a robust Rest-GraphQL application with the following key features:

- Efficient RESTful API Requests: Easily perform and manage your RESTful API requests with a user-friendly interface designed for efficiency.

- Seamless GraphQL Integration: Take advantage of our built-in GraphiQL interface for smooth and intuitive GraphQL queries and mutations.

- Automatic Query Formatting: Automatically format and organize your queries for improved readability and maintenance.

- Secure Authentication: Ensure your data is protected with built-in Firebase authentication.

- Multi-language Support: Choose your preferred language for a personalized experience.

- Comprehensive Request History: Easily revisit and rerun previous API requests with our robust history feature.

## Getting Started

To get a local copy - follow these simple steps.

### Installation

1. Clone the repo

```sh
  git clone https://github.com/YulikK/graphiql-app.git
```

2. Install NPM packages

```sh
  npm install
```

3. Ask team to produce the .env.local file with settings and place it in the project root.

4. Start project

```sh
  npm run dev
```

<!-- SCRIPTS -->

## Provided scripts

```sh
npm run dev
```

Start local development server

```sh
npm run build
```

Build project in production mode for further deployment

```sh
npm run format:fix
```

Reformat source code & configs to match `Prettier` settings

```sh
npm run ci:format
```

Check source code with `Prettier`

```sh
npm run lint
```

Check source code with `ESLint`. Exit with non-zero return code after the first found warning (useful for CI/CD)

```sh
npm run lint:fix
```

Automatically fix all auto-fixable errors & warnings with `ESLint`

```sh
npm run prepare
```

Runs automatically after package installation to install Husky hooks

```sh
npm run test
```

Runs tests with Vitest

```sh
npm run test:coverage
```

Runs tests with Vitest and displays coverage of implemented tests

### Happy coding!
