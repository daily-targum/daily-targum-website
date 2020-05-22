![The Daily Targum App - Banner](https://i.ibb.co/L5TtWGR/github-banner.png)

<p align="center">
  <a href='https://github.com/daily-targum/daily-targum-website/actions'>
    <img src='https://github.com/daily-targum/daily-targum-website/workflows/Deploy/badge.svg'>
  </a>

  <a href="https://codecov.io/gh/daily-targum/daily-targum-website">
    <img src="https://codecov.io/gh/daily-targum/daily-targum-website/branch/master/graph/badge.svg" />
  </a>

  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/daily-targum/daily-targum-website">

  <img alt="GitHub" src="https://img.shields.io/github/license/daily-targum/daily-targum-website">
</p>

---

* 🚀 [Getting Started](#-getting-started)
* 📦 [Download and Setup](#-download-and-setup)
* ✍️ [Contributing](#%EF%B8%8F-contributing)
* ✅ [Testing](#-testing)
* 💻 [Environment Variables](#-environment-variables)

The Daily Targum is a student-written and student-managed, non-profit incorporated newspaper published by the Targum Publishing Company, with a circulation of 5,000.

Founded in 1869, The Daily Targum is the second oldest and among the largest college newspapers in the nation. The Daily Targum has been a repeat recipient of the Columbia Scholastic Press Association Gold Crown Award, the highest recognition a college newspaper can be awarded in the United States.

**IMPORTANT NOTE: This app is open source, but it requires API keys to run. For now, these keys are only for internal use within the company.**

## 🚀 Getting started

  1. Download and setup repo ([directions](#-download-and-setup))

  2. Start bundler
  
      ```bash
      yarn start
      ```

  3. Open in the brower

      The default port is 3000. You can test the website locally by going to http://localhost:3000

  4. (optional but recommended)

      Make sure your IDE/text editor supports TypeScript to catch errors as you go. Type check will be run locally using pre-commit hook and again remotely using GitHub Actions.
      


## 📦 Download and Setup

1. Clone repo with submodules

    ```bash
    git clone --recurse-submodules

    # or if you already cloned the repo
    # you can sync the submodules by running
    git submodule sync --recursive
    git submodule update --init --recursive
    ```

2. Install dependencies

    ```bash
    # this command will automatically
    # install dependencies for submodules
    yarn
    ```

3. Add environment variables ([more info below](#-environment-variables))

    ```bash
    # This file must be called .env NOT .env.local
    cp .env.example .env

    # Open .env and set varabiles
    ```

    Set the correct values for all variables in `.env`.

## ✍ Contributing

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

## ✅ Testing

  * Lint code (checks if [rules of hooks](https://reactjs.org/docs/hooks-rules.html) have been broken)

      ```bash
      yarn lint
      ```

  * Check for TypeScript errors

      ```bash
      yarn typescript
      ```

  * Jest tests

      ```bash
      yarn test
      ```

## 💻 Environment Variables

Setup

```bash
# This file must be called .env NOT .env.local
cp .env.example .env

# Open .env and set varabiles
```

The following environment variables are required.

```bash
# .env.example

# AWS AppSync Config 
AWS_APPSYNC_URL=
AWS_APPSYNC_REGION=
AWS_APPSYNC_API_KEY=
```

Adding environment variables requires changing the following files:

* This repo
  * `.env.example`
  * `.github/workflows/*`
* Submodule
  * `src/shared/__mocks__/expo-constants.ts`
  * `src/shared/.github/workflows/*`
* Local
  * `.env` (on your local machine)

_Files responsible for configuring environment variables are commented `ENVIRONMENT VARIABLES` so you can easily be found._