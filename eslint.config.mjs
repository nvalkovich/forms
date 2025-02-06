import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      "server/src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "client/src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
        project: "./tsconfig.json", // Укажите путь к вашему tsconfig.json
      },
      globals: {
        ...globals.browser, // Для работы с глобальными переменными браузера
        process: "readonly", // Добавляем process как глобальную переменную
        React: "readonly", // Указываем React как глобальную переменную
      },
    },
    ignores: ["**/node_modules/**", "**/dist/**"],
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
    },
    settings: {
      react: {
        version: "detect", // Даем ESLint определять версию React
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...configPrettier.rules,
    },
  },
];
