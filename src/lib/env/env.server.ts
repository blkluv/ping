import "server-only";

import { z } from "zod";
import { SOLANA_DEVNET_CHAIN_ID, SOLANA_MAINNET_CHAIN_ID } from "@/lib/solana/chain";

const UrlString = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  return value.trim();
}, z.string().url());

const OptionalUrlString = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}, z.string().url().optional());

const ServerEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: UrlString.optional(),

  X402_NETWORK: z
    .enum([SOLANA_DEVNET_CHAIN_ID, SOLANA_MAINNET_CHAIN_ID])
    .default(SOLANA_DEVNET_CHAIN_ID),

  X402_FACILITATOR_URL: UrlString
    .default("https://x402.org/facilitator")
    .transform((v) => v.replace(/\/$/, "")),

  DEMO_VIDEO_URL: OptionalUrlString,
  PITCH_DECK_URL: OptionalUrlString,

  // ⚠️ Make optional here — enforce in API layer instead
  PING402_JWT_SECRET: z.string().min(32).optional(),
});

export type EnvServer = z.infer<typeof ServerEnvSchema>;

let cached: EnvServer | undefined;

export function getEnvServer(): EnvServer {
  if (cached) return cached;

  const result = ServerEnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ ENV VALIDATION ERROR:", result.error.flatten());
    // Return minimal safe defaults instead of crashing homepage
    cached = {
      X402_NETWORK: SOLANA_DEVNET_CHAIN_ID,
      X402_FACILITATOR_URL: "https://x402.org/facilitator",
      NEXT_PUBLIC_CONVEX_URL: undefined,
      DEMO_VIDEO_URL: undefined,
      PITCH_DECK_URL: undefined,
      PING402_JWT_SECRET: undefined,
    };
    return cached;
  }

  cached = result.data;
  return cached;
}