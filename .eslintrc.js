module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",  // <<<<<<<<<<<<<< Adicione esta linha
    tsconfigRootDir: __dirname, // (opcional, mas recomendado para resolver caminhos)
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    // Performance Rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    "react/jsx-no-constructed-context-values": "error",
    "react/no-unstable-nested-components": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],

    // Clean Code Rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-duplicate-imports": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // TypeScript Rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",

    // React Native Specific Rules
    "react-native/no-inline-styles": "error",
    "react-native/no-color-literals": "error",
    "react-native/no-raw-text": "error",
    "react-native/no-single-element-style-arrays": "error",
    "react-native/no-unused-styles": "error",

    // Prettier Rules
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};