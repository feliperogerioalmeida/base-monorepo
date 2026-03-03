export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["auth", "backend", "frontend", "types", "ui", "utils", "repo"],
    ],
    "scope-empty": [2, "never"],
    "body-max-line-length": [0, "always"],
  },
};
