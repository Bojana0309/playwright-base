# Playwright-Base

Playwright-Base project represents small testing project, that can be used as starting point for writing tests in Typescript using [Playwright](https://playwright.dev/). Basic configuration together with the examples for API tests, UI ent-to-end tests and UI integration tests is provided.</br>
In the project structure, possible solutions for organizing tests can be found. For API tests, structure is made based on different API endpoints, while for UI tests, it's made based on POM [Page Object Model](https://playwright.dev/docs/pom).</br>
Also, _constants_ and _test-data_ are in separate _.ts_ files, so they can be used for both, API and UI tests.</br>

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

In _package.json_ file, under _scripts_, you can find different commands for running certain type of tests, in certain mode, taking into account the environment on which the tests will be executed.<br/>

To open a HTML test report after test execution, run the following command:<br/>

```
npx playwright show-report
```

## How to setup tests

All configuration related to playwright tests is made in _playwright.config.ts_ file.</br>
There you can find (and change if it's needed) configuration related to location from where the tests will be executed, default timeouts, parallel test execution, test reporter, browsers on which tests will be executed, test environments, re-using authentication state, etc.</br>

### Authentication

In order to re-use authetication when running tests, _dependencies_ option of _projects_ in _playwright.config.ts_ file is used.</br>
Project with name _setup_ is created, which is run before all tests, in order to authenticate the user and save storage state, so it can be re-used in all tests.</br>
This approach is chosen instead of _globalSetup_ option, because enables authentication steps to be shown in the HTML report together with all executed tests.</br>

### Test environments

Usually, it is needed to run tests on different environments (development, staging, acceptance, etc.).</br>
In this project, _globalSetup_ option and _dotenv_ module are used for loading environment variables. You will find _.env.template_ file, according to which you can create as many _.env_ files as you need (e.g. _.env.development.local_, _.env.staging.local_, _.env.acceptance.local_, etc.). As it is mentioned earlier, in _package.json_ file you can find scripts for running tests, taking into account the environment. Currently, there are only scripts that run on production environment, but you can add new ones that will be run on other environments.</br>
For example, if you want to run all API tests on _staging_ environment, you need to:</br>

- Create _.env.staging.local_ file in project's root folder and populate it with appropriate environment variables.</br>
- Add new script in _package.json_ file, e.g. _test:api:staging_, that will have set _TEST_ENV_ to _staging_.</br>
- Run newly created script in the Terminal.</br>

### Cross browser testing

By default, tests will be run in headless mode, using 3 workers, on 3 browser engines: chromium, firefox and webkit.</br>
As mentioned earlier, this can be changed in _playwright.config.ts_ file. For example, aditional browsers or viewports can be added.</br>

## VS Code extension

One more possibility that Playwright enables is using it's [VS Code extension](https://playwright.dev/docs/getting-started-vscode).</br>
Instead of running commands through Terminal, you can install and run tests using the extension. All you need to do is to install the _Playwright Test for VSCode_ extension and follow the steps given on the link above.</br>
The advantages this extension brings are: even more easier running the tests (on click) and great debugging experience.</br>

**Important notes:**

VS Code extension will use ONLY _.env_ file (without specific environment in the name) for loading environment variables.</br>
In other words, you need to create separate _.env_ file and change values of your environment variables according to the environment on which you want to run your tests.</br>
