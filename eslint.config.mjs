import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";

export default [
  js.configs.recommended,
  ...nextVitals,
  {
    ignores: [".next/**", ".open-next/**", "node_modules/**", "public/generated/**", "cloudflare-env.d.ts"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];