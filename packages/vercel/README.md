# LeetCode Stats Card - Vercel Edge

This package provides a Vercel Edge Function version of the Cloudflare Worker.

## Deploying to Vercel

1. Set the project root in Vercel to `packages/vercel`.
2. Use the build command `pnpm --filter vercel-edge build` to bundle the edge function (it emits `api/[[...path]].js`).
3. Keep the output directory as the project root so the generated `api` folder is deployed.
4. After deployment, the endpoint will be available at `/api` (e.g. `/api/<username>?theme=unicorn`).

All query options and behaviors match the Cloudflare Worker variant, including the demo page when no username is provided.
