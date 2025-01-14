module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"]
        ],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  rules: {
    indent: [
      1,
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "pattern": {
          "js": "never",
          "ts": "never",
          "jsx": "never",
          "tsx": "never"
        }
      }
    ],
    "import/prefer-default-export": "off",
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "double",
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "max-len": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-explicit-any": "off",
    semi: [
      "error",
      "always",
    ],
  },
};
