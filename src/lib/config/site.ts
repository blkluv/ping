import { z } from "zod";

const SiteUrlSchema = z.string().url();

export const siteConfig = {
  name: "tipme.bio",
  title: "tipme.bio — paid tips that get delivered publicly",
  description:
    "A pay-per-message inbox for tips built on Solana",
} as const;

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const parsed = SiteUrlSchema.safeParse(explicit);
    if (!parsed.success) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
    }
    return parsed.data.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();
  if (!path) return baseUrl;
  if (!path.startsWith("/")) return `${baseUrl}/${path}`;
  return `${baseUrl}${path}`;
}
