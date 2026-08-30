import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      eqeqeq: "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "no-unused-vars": "warn",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Other imports
            ["^\\u0000"],
            // 2. Node.js built-in modules
            ["^node:"],
            // 3. React
            ["^react$", "^react-dom$"],
            // 4. Other outside packets
            ["^@?\\w"],
            // 5. Aliaces
            ["^@/"],
            ["^~/"],
            // 6. Parent folders
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // 7. Current folder
            ["^\\./(?=.*/)", "^\\.(?!/?$)", "^\\./?$"],
            // 8. Styles
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
]);