import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";
import rocketseatConfig from "@rocketseat/eslint-config/next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  nextCoreWebVitals,
  rocketseatConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: eslintParserTs,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error",
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },

  prettierConfig,
];
