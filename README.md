# Welcome / BOILERPLATE-GRAPHQL

## Description

Welcome ! Boilerplate-graphql, built with `NodeJs` and `GraphQL`.

## Getting started

### Prerequisites

#### IDE

You can choose the IDE you whant, but you need to have some packages installed with it like `ESLint` for the live linter, and some `Nodejs` packages to get autocompletion, ...
Here an exemple of the needed packages with Visual Studio Code IDE:

- `Nodejs code snippets`
- `ESLint`

#### Node / Npm / Yarn

Since it's a JS-Based project, due to NodeJs & express you need to install some stuff on your computer:

- macOS:
  Install [Homebrew](https://brew.sh) as package manager and install the following dependencies:

```bash
brew install node
brew install npm
```
---
- Windows:
  Note that you can't run iOS app on windows.
  Install [Chocolatey](https://chocolatey.org) as package manager and install the following dependencies:

```bash
choco install -y nodejs.install python2 jdk8 npm
```
---
- Linux:
  Follow the [install instructions for your linux distribution](https://nodejs.org/en/download/package-manager/) to install Node 8 or newer and npm.
---
- Yarn:
```bash
npm install -g yarn
```

### Install the project

First you need to clone the repository.
  Do not forget to upload your SSH Key into gitlab and having the right access.

```bash
git clone git@github.com:werayn/boilerplate-graphql.git
```

```bash
cd /boilerplate-graphql && yarn
```

### Run it

When everything is installed, if you want to run it, do the following:

server dev mode :
```bash
yarn start:dev
```

**NOTE :**
```bash
ask the .env to the owner
before running the server and the client please make sure to :
1. setup the file ".env"
2. If you want to point to the production DB make sure to have the good right.

by default the file point to the production DB.
```

### Deployment

Please read [DEPLOYMENT](./docs/DEPLOYMENT.md) for details on our deployment process on the SISSE-NODE server.
```
TODO
```

### Test it

when everything is installed and run well, if you want to run every unit tests, do the following inside the good folder:

```bash
TODO
```

## Documentation

if you want to know everything about the application just run inside the good folder:

```bash
TODO
```

## Contributing

Please read [CONTRIBUTING](./docs/CONTRIBUTING.md) for details on our code of conduct, and the process for pushing new features/patch

## Authors

* **Junique Virgile** - *Initial contributor* - [Junique Virgile](https://github.com/werayn)

## License

This project is completely private.
