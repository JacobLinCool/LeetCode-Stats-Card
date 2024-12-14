// @ts-check

import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        ignores: ["packages/*/dist", "packages/cloudflare-worker/worker-configuration.d.ts"],
    },
);
