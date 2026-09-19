// Added by repocurator (feature 002).
//
// package.json's own "test" script is `tsc --watch`, which never exits and
// so cannot be a CI step. This script instead checks the two things that
// actually make the app work:
//
//   1. `yarn build` really produced a Next.js build (not just a build step
//      that ran and silently did nothing).
//   2. The local mock data that src/pages/todos/index.tsx reads with
//      require(...) at request time -- public/todos.json and users.json --
//      is well-formed and internally consistent. Neither file is touched by
//      `next build` (which only compiles code), so a broken data file would
//      otherwise surface only when a page is actually requested.

"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const buildDir = path.join(root, ".next");
assert.ok(
  fs.existsSync(buildDir),
  `expected ${buildDir} to exist after \`yarn build\``
);
assert.ok(
  fs.existsSync(path.join(buildDir, "BUILD_ID")),
  "expected .next/BUILD_ID after a completed `next build`"
);

const todos = require(path.join(root, "public", "todos.json"));
assert.ok(
  Array.isArray(todos) && todos.length > 0,
  "public/todos.json must be a non-empty array"
);
for (const todo of todos) {
  assert.strictEqual(typeof todo.id, "number", "each todo needs a numeric id");
  assert.strictEqual(
    typeof todo.userId,
    "number",
    "each todo needs a numeric userId"
  );
  assert.strictEqual(typeof todo.title, "string", "each todo needs a title");
  assert.strictEqual(
    typeof todo.completed,
    "boolean",
    "each todo needs a completed flag"
  );
}

const users = require(path.join(root, "users.json"));
assert.ok(
  Array.isArray(users) && users.length > 0,
  "users.json must be a non-empty array"
);

const userIds = new Set(users.map((user) => user.id));
const todoUserIds = new Set(todos.map((todo) => todo.userId));
for (const id of todoUserIds) {
  assert.ok(
    userIds.has(id),
    `public/todos.json references userId ${id}, which is missing from users.json ` +
      "(src/pages/todos/index.tsx would silently render it as 'UnKnow')"
  );
}

console.log(
  `ci-smoke-test: build output present, ${todos.length} todos, ${users.length} users, all todo owners resolve. OK`
);
