# Playwright-Base

Playwright-Base project represents small testing project, that can be used as starting point for writing tests in Typescript using [Playwright](https://playwright.dev/). Basic configuration together with the examples for API tests, UI ent-to-end tests and UI integration tests is provided.</br>
In the project structure, possible solutions for organizing tests can be found. For API tests, structure is made based on different API endpoints, while for UI tests, it's made based on [Page Object Model](https://playwright.dev/docs/pom).</br>
Also, constants and test data are in separate `.ts` files, so they can be used for both, API and UI tests.</br>

## Pre-requests

- Installed [Node.js](https://nodejs.org/en) (version 14 or above)
- Installed [Visual Studio Code](https://code.visualstudio.com/)

## Getting started

In order to write your first Playwright Test, there are only few steps to be made:</br>

- Clone this project and open it in VS Code.</br>
- Go to the Terminal and in the project's root folder run the command for installing playwright:<br/>

```
npm init playwright@latest --save-dev
```

During instalation proces, depending on your needs, you will need to decide on the following:</br>

- Choose between TypeScript or JavaScript (default is TypeScript).</br>
- Name of your Tests folder (default is _tests_ or _e2e_ if you already have a _tests_ folder in your project).</br>
- Add a GitHub Actions workflow to easily run tests on CI.</br>
- Install Playwright browsers (default is true).</br>

## How to run tests and open the report

To run all tests from this project, run the next command:<br/>

```
npx playwright test
```

In `package.json` file, under `scripts`, you can find different commands for running certain type of tests, in certain mode, taking into account the environment on which the tests will be executed.<br/>

To open a HTML test report after test execution, run the following command:<br/>

```
npx playwright show-report
```

## How to setup tests

All configuration related to playwright tests is made in `playwright.config.ts` file.</br>
There you can find (and change if it's needed) configuration related to location from where the tests will be executed, default timeouts, parallel test execution, test reporter, browsers on which tests will be executed, test environments, re-using authentication state, etc.</br>

### Authentication

In order to re-use authetication when running tests, `dependencies` option of `projects` in `playwright.config.ts` file is used.</br>
Project with name `setup` is created, which is run before all tests, in order to authenticate the user and save storage state, so it can be re-used in all tests.</br>
This approach is chosen instead of `globalSetup` option, because enables authentication steps to be shown in the HTML report together with all executed tests.</br>

### Test environments

Usually, it is needed to run tests on different environments (development, staging, acceptance, etc.).</br>
In this project, `globalSetup` option and `dotenv` module are used for loading environment variables. You will find `.env.template` file, according to which you can create as many `.env` files as you need (e.g. `.env.development.local`, `.env.staging.local`, `.env.acceptance.local`, etc.). As it is mentioned earlier, in `package.json` file you can find scripts for running tests, taking into account the environment. Currently, there are only scripts that run on production environment, but you can add new ones that will be run on other environments.</br>
For example, if you want to run all API tests on `staging` environment, you need to:</br>

- Create `.env.staging.local` file in project's root folder and populate it with appropriate environment variables.</br>
- Add new script in `package.json` file, e.g. `test:api:staging`, that will have set `TEST_ENV` to `staging`.</br>
- Run newly created script in the Terminal.</br>

### Cross browser testing

By default, tests will be run in headless mode, using 3 workers, on 3 browser engines: chromium, firefox and webkit.</br>
As mentioned earlier, this can be changed in `playwright.config.ts` file. For example, aditional browsers or viewports can be added.</br>

## VS Code extension

One more possibility that Playwright enables is using it's [VS Code extension](https://playwright.dev/docs/getting-started-vscode).</br>
Instead of running commands through Terminal, you can install and run tests using the extension. All you need to do is to install the _Playwright Test for VSCode_ extension and follow the steps given on the link above.</br>
The advantages this extension brings are: even more easier running the tests (on click) and great debugging experience.</br>

**Important notes:**

VS Code extension will use ONLY `.env` file (without specific environment in the name) for loading environment variables.</br>
In other words, you need to create separate `.env` file and change values of your environment variables according to the environment on which you want to run your tests.</br>
