[English](README.md) · **简体中文**

> 英文版是规范版本。本页与 [README.md](README.md) 不一致时，以英文版为准。

<!-- translation-of: README.md sha256:8d2099ab7ead7b18 -->

<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# OhMyTodoList

一个基于 Next.js 与 TypeScript 的待办事项列表演示项目，用打包在仓库中的本地 JSON 文件渲染示例任务与用户，而不连接真实后端，是学习 Next.js 的 src 目录结构、TypeScript 和 Tailwind CSS 时写的练习项目。

[![CI](https://github.com/anyingiit/OhMyTodoList/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/OhMyTodoList/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/OhMyTodoList)](LICENSE)

[报告问题](https://github.com/anyingiit/OhMyTodoList/issues/new?template=bug_report.yml) · [提出需求](https://github.com/anyingiit/OhMyTodoList/issues/new?template=feature_request.yml)

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#about-the-project">关于本项目</a></li>
    <li><a href="#getting-started">开始使用</a></li>
    <li><a href="#usage">用法</a></li>
    <li><a href="#contributing">参与贡献</a></li>
    <li><a href="#license">许可证</a></li>
    <li><a href="#contact">联系方式</a></li>
  </ol>
</details>

## 关于本项目

OhMyTodoList 是一个使用 TypeScript 编写的 Next.js 12 应用，把待办事项和它们各自的所有者列在一起，由 `src/components/main.tsx`、`src/components/todoBase.tsx` 和 `src/components/list.tsx` 构建而成。它的数据来自随仓库打包的两个本地 JSON 文件，`public/todos.json` 和 `users.json`，`src/pages/todos/index.tsx` 用 `require(...)` 读取它们；同一文件里写了一段调用 JSONPlaceholder API 的代码，但被注释掉了，所以运行时不会向外发出任何请求。这个项目同时也是作者自己的 Next.js 学习笔记：`src/pages/study/`、`src/readme.md` 和 `studyNotes.md` 用中文记录了搭建过程中对这个框架的理解。

计划中的功能与已知问题，见 [open issues](https://github.com/anyingiit/OhMyTodoList/issues)。

## 开始使用

### 前置条件

- Node.js，用于运行 `package.json` 中声明的 `dev`/`build`/`start` 脚本
- Yarn，因为依赖锁定在 `yarn.lock` 中，而不是 `package-lock.json`

### 安装

```sh
git clone https://github.com/anyingiit/OhMyTodoList.git
cd OhMyTodoList
yarn install
```

## 用法

```sh
yarn dev
```

这会启动 Next.js 开发服务器。访问站点会立即跳转到 `/todos`（`src/pages/index.tsx`），该页面把 `public/todos.json` 中的每个任务和 `users.json` 中对应所有者的名字列在一起（`src/pages/todos/index.tsx`）。先执行 `yarn build` 再执行 `yarn start`，则会以生产构建的方式运行同一个应用。

## 参与贡献

欢迎参与。[CONTRIBUTING.md](CONTRIBUTING.md) 说明如何提交 issue 或 pull request，[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明对所有参与者的行为要求。

请不要在公开的 issue 或 pull request 中报告安全问题。[SECURITY.md](SECURITY.md) 说明了私下报告的方式。

## 许可证

以 MIT 许可证分发。详见 [LICENSE](LICENSE)。

## 联系方式

项目地址：[https://github.com/anyingiit/OhMyTodoList](https://github.com/anyingiit/OhMyTodoList)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
