// eslint.config.js (ESM)
import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default defineConfig({
  ignorePatterns: [
    ".now/*",
    "**/*.css",
    "**/.changeset",
    "**/dist",
    "esm/*",
    "public/*",
    "tests/*",
    "scripts/*",
    "**/*.config.js",
    "**/.DS_Store",
    "**/node_modules",
    "**/coverage",
    "**/.next",
    "**/build",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.node,
          ...globals.browser,
        },
        parserOptions: {
          ecmaFeatures: { jsx: true },
          project: "./tsconfig.json",
        },
      },
      plugins: {
        "@next/next": nextPlugin,
        react: reactPlugin,
        "react-hooks": reactHooks,
        "unused-imports": unusedImports,
        import: importPlugin,
        "@typescript-eslint": typescriptEslint,
        "jsx-a11y": jsxA11Y,
        prettier,
      },
      settings: {
        react: { version: "detect" },
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...jsxA11Y.configs.recommended.rules,
        ...prettier.configs.recommended.rules,
        "no-console": "warn",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/interactive-supports-focus": "warn",
        "prettier/prettier": "warn",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_.*?$",
          },
        ],
        "import/order": [
          "warn",
          {
            groups: [
              "type",
              "builtin",
              "object",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
            ],
            pathGroups: [{ pattern: "~/**", group: "external", position: "after" }],
            "newlines-between": "always",
          },
        ],
        "react/self-closing-comp": "warn",
        "react/jsx-sort-props": [
          "warn",
          {
            callbacksLast: true,
            shorthandFirst: true,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
        "padding-line-between-statements": [
          "warn",
          { blankLine: "always", prev: "*", next: "return" },
          { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
          { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        ],
      },
    },
  ],
});
