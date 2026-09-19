<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# OhMyTodoList

A Next.js and TypeScript to-do list demo that renders sample tasks and users from bundled local JSON files instead of a live backend, built while learning the Next.js src-directory layout, TypeScript, and Tailwind CSS.

**English** · [简体中文](README.zh-CN.md)

[![CI](https://github.com/anyingiit/OhMyTodoList/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/OhMyTodoList/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/OhMyTodoList)](LICENSE)

[Report a bug](https://github.com/anyingiit/OhMyTodoList/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/anyingiit/OhMyTodoList/issues/new?template=feature_request.yml)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

OhMyTodoList is a Next.js 12 application written in TypeScript that lists to-do items next to the users who own them, built from `src/components/main.tsx`, `src/components/todoBase.tsx` and `src/components/list.tsx`. Its data comes from two local JSON files bundled with the repository, `public/todos.json` and `users.json`, which `src/pages/todos/index.tsx` loads with `require(...)`; a call to the JSONPlaceholder API is written in that same file but commented out, so nothing ever leaves the machine it runs on. The project doubles as its author's own Next.js study notes: `src/pages/study/`, `src/readme.md` and `studyNotes.md` record, in Chinese, what was learned about the framework while building it.

See the [open issues](https://github.com/anyingiit/OhMyTodoList/issues) for planned features and known issues.

## Getting Started

### Prerequisites

- Node.js, to run the `dev`/`build`/`start` scripts declared in `package.json`
- Yarn, since dependencies are pinned in `yarn.lock` rather than a `package-lock.json`

### Installation

```sh
git clone https://github.com/anyingiit/OhMyTodoList.git
cd OhMyTodoList
yarn install
```

## Usage

```sh
yarn dev
```

This starts the Next.js development server. Visiting the site redirects immediately to `/todos` (`src/pages/index.tsx`), which lists every task from `public/todos.json` next to the name of the user in `users.json` who owns it (`src/pages/todos/index.tsx`). `yarn build` followed by `yarn start` runs the same app from a production build instead.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open an issue or a pull request, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standards expected of everyone taking part.

Please do not report security issues in public issues or pull requests. [SECURITY.md](SECURITY.md) explains how to report them privately.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Project link: [https://github.com/anyingiit/OhMyTodoList](https://github.com/anyingiit/OhMyTodoList)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
