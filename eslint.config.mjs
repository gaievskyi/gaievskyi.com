import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss"
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect"
import { defineConfig, globalIgnores } from "eslint/config"
import { parser as eslintParserTypeScript } from "typescript-eslint"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  reactYouMightNotNeedAnEffect.configs.recommended,
  {
    extends: [eslintPluginBetterTailwindcss.configs.recommended],
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unknown-classes": "off",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles/globals.css",
      },
    },
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  globalIgnores([
    "*.gen.ts",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
  ]),
])
