// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: vercel(),
  server: { port: Number(process.env.PORT) || 4321 },
});
