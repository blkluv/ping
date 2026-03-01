import Link from "next/link";
import { Check } from "lucide-react";

import { HandleSearch } from "@/components/marketing/HandleSearch";
import { InboxPreviewCard } from "@/components/marketing/InboxPreviewCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOwnerSession } from "@/lib/auth/ownerSession";
import { getPingTierConfig, PING_TIER_ORDER, type PingTier } from "@/lib/ping/tiers";
import { getEnvServer } from "@/lib/env/env.server";
import { isSolanaDevnet, solanaNetworkLabel } from "@/lib/solana/chain";
import { getYouTubeVideoId } from "@/lib/utils/youtube";

export default async function HomePage() {
  const session = await getOwnerSession();
  const env = getEnvServer();
  const networkLabel = solanaNetworkLabel(env.X402_NETWORK);
  const isDevnet = isSolanaDevnet(env.X402_NETWORK);
  const demoVideoId = env.DEMO_VIDEO_URL ? getYouTubeVideoId(env.DEMO_VIDEO_URL) : null;
  const demoEmbedSrc = demoVideoId
    ? `https://www.youtube-nocookie.com/embed/${demoVideoId}?rel=0&modestbranding=1`
    : null;

  const tierBenefits: Record<PingTier, { badge: string; bullets: string[] }> = {
    standard: {
      badge: "Starter",
      bullets: ["Lowest cost signal", "Great for quick questions", "Delivered via x402 proof + retry"],
    },
    priority: {
      badge: "Most popular",
      bullets: ["Stronger urgency signal", "Ideal for time-sensitive requests", "Shows up clearly in the inbox"],
    },
    vip: {
      badge: "Highest signal",
      bullets: ["Top-tier urgency", "Best for escalations", "Premium price discourages spam"],
    },
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="pt-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Web5</Badge>
              <Badge variant="secondary">Solana Tips</Badge>
              <Badge variant="secondary">Claimable handles</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="h1">🤑 Get off read receipts and onto REAL receipts</h1>
              <p className="lead">
                TipMe.bio lets you pay $0.01–$0.25 to skip the line and actually get a reply. 
                no spam. no subs. just proof it happened.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/ping">Send a Tip</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#how-it-works">How it works</Link>
              </Button>
              {session ? (
                <Button asChild variant="ghost" size="lg">
                  <Link href="/inbox">Open inbox</Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="lg">
                  <Link href="/owner-signin">Claim a handle</Link>
                </Button>
              )}
            </div>

            <HandleSearch />
          </div>

          <div className="animate-in fade-in-0 zoom-in-95 duration-700 lg:justify-self-end">
            <InboxPreviewCard />
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      {demoEmbedSrc ? (
        <section id="demo-video" className="scroll-mt-24">
          <Card className="overflow-hidden bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">Watch the demo</CardTitle>
              <CardDescription>
                A quick walkthrough of the paid ping flow: choose a creator, pick a tier, pay with Solana Pay, and get a verifiable receipt.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted">
                <iframe
                  className="h-full w-full"
                  src={demoEmbedSrc}
                  title="tipme.bio demo video"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button asChild variant="brand">
                <Link href="/demo-video" target="_blank" rel="noreferrer">
                  Open on YouTube
                </Link>
              </Button>
              {env.PITCH_DECK_URL ? (
                <Button asChild variant="outline">
                  <Link href="/pitch-deck" target="_blank" rel="noreferrer">
                    Open pitch deck
                  </Link>
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </section>
      ) : null}

      {/* How It Works Section */}
      <section id="how-it-works" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <h2 className="h3">✨ How it works</h2>
          <p className="muted">
            Three clicks. zero confusion. actually works.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">1) Grab your link</CardTitle>
              <p className="text-sm text-muted-foreground">
                Every creator has a shareable link at{" "}
                <code className="rounded bg-muted px-1 py-0.5">/u/[handle]</code> — put it in your bio, drop it in DMs, whatever..
              </p>
            </CardHeader>
          </Card>

          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">2) Pick the vibe</CardTitle>
              <p className="text-sm text-muted-foreground">
                standard 🤷‍♀️ | priority ⚡ | vip 👑
                more urgency = more attention. simple math.
              </p>
            </CardHeader>
          </Card>

          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">3) Pay & it's delivered</CardTitle>
              <p className="text-sm text-muted-foreground">
                No payment? no ping. solana says{" "}
                <code className="rounded bg-muted px-1 py-0.5">PAYMENT-SIGNATURE</code> proof,
                then your message goes through.
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Funding Section */}
      <section id="funding" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="h3">💰 Funding</h2>
            <Badge variant="secondary" className="capitalize">
              {networkLabel}
            </Badge>
          </div>
          <p className="muted">
            You only pay when you send a Tip. Keep enough balance for fees and the requested
            token (shown at checkout).
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">Devnet (Currently BETA Testing)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Recommended for demos and testing. Use a faucet for devnet SOL.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Faucet:{" "}
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href="https://faucet.solana.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  faucet.solana.com
                </a>
              </p>
              {isDevnet ? (
                <p className="text-xs">
                  This environment is currently configured for devnet.
                </p>
              ) : (
                <p className="text-xs">
                  Switch your environment to devnet if you want faucet-funded testing.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">Mainnet (Launching When We Go Viral)</CardTitle>
              <p className="text-sm text-muted-foreground">
                For real users. Ensure you have SOL for fees and the required token balance.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="text-xs">
                If you're paying with a token (like a stablecoin), the paywall specifies the mint
                and amount at checkout.
              </p>
              <p className="text-xs">
                Tip: Keep a small SOL buffer so retries can settle cleanly.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground">
          Need more detail? Open the Funding section anytime from the top navigation.
        </p>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="h3">💀 E-mail inbox is cooked</h2>
          <p className="muted">
            A paid inbox solves e-mail inbox spam by replacing the "free" filter with a "paid" filter. Legitimate messages get through, low-effort spam doesn't.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">📱 Creators & Founders</CardTitle>
              <p className="text-sm text-muted-foreground">
                Stop letting "just wanted to connect" DMs bury actual opportunities. 
              </p>
            </CardHeader>
          </Card>
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">🚨 Security & On-call</CardTitle>
              <p className="text-sm text-muted-foreground">
                When everything is "urgent," nothing is. Paid Tips = real problems.
              </p>
            </CardHeader>
          </Card>
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">🛟 Support Teams</CardTitle>
              <p className="text-sm text-muted-foreground">
                "This is an emergency!!!" — said everyone, about everything, always.
              </p>
            </CardHeader>
          </Card>
          <Card className="bg-card/60 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">💅 Services</CardTitle>
              <p className="text-sm text-muted-foreground">
                Filter real potential customers from windows-shoppers with a paid inbox.
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <h2 className="h3">💌 Message tiers</h2>
          <p className="muted">
            Three tiers, one simple rule: higher tier → higher priority.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PING_TIER_ORDER.map((tier) => {
            const meta = getPingTierConfig(tier);
            const variant =
              tier === "vip" ? "brand" : tier === "priority" ? "default" : "outline";
            const highlight = tier === "vip";
            const benefits = tierBenefits[tier];

            return (
              <Card
                key={tier}
                className={
                  highlight
                    ? "overflow-hidden border-primary/30 bg-card/60 shadow-md backdrop-blur"
                    : "bg-card/60 backdrop-blur"
                }
              >
                {highlight ? (
                  <div
                    className="h-1 w-full bg-gradient-to-r from-[rgb(var(--brand-purple-strong))] to-[rgb(var(--brand-green-strong))]"
                    aria-hidden="true"
                  />
                ) : null}
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{meta.label}</CardTitle>
                      <div className="text-3xl font-semibold tracking-tight">
                        {meta.priceUsd}
                      </div>
                      <p className="text-sm text-muted-foreground">{meta.description}</p>
                    </div>
                    <Badge variant={highlight ? "default" : "secondary"}>{benefits.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {benefits.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={variant} className="w-full">
                    <Link href="/ping">Choose a creator</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Tiers are enforced by a paywalled endpoint at{" "}
          <code className="rounded bg-muted px-1 py-0.5">/api/ping/send</code>.{" "}
          <Link className="underline underline-offset-4" href="/#how-it-works">
            Read the flow
          </Link>
          .
        </p>
      </section>

      <Separator />

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 space-y-8">
        <div className="space-y-2">
          <h2 className="h3">🙋🏽‍♀️ Wait but how tho</h2>
          <p className="muted">
            All the questions ur too afraid to ask (we got u)
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="wallet">
            <AccordionTrigger>Do i need a wallet to send a Tip?</AccordionTrigger>
            <AccordionContent>
              only if you're actually tryna reach someone bestie 💅 
              no wallet = no pay = no ping. 
              but like... it takes 2 seconds to set one up and then ur in the club.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="x402">
            <AccordionTrigger>OK but what even IS x402?</AccordionTrigger>
            <AccordionContent>
              think of it as the bouncer at the door 🚫 
              no payment? no entry. 
              the server literally says "402 Payment Required" until u pay, 
              then it's like "oop—come on in bestie" and ur message goes through. 
              simple math.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="creator-signin">
            <AccordionTrigger>How do i claim my @handle?</AccordionTrigger>
            <AccordionContent>
              connect ur wallet (phantom works, whatever u like), 
              pick ur name, sign a message—NO money leaves ur account bestie it's free. 
              then ur in the dashboard. that's literally it. 
              no credit card, no 15-step verification, no cap.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="realtime">
            <AccordionTrigger>Does this actually work in real time?</AccordionTrigger>
            <AccordionContent>
              bestie we're not living in 2015 💀 
              soon as the payment hits, ur inbox updates. 
              no refreshing, no "pls wait 24 hours," 
              just instant gratification like tiktok algorithm feeding u exactly what u want.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="mainnet">
            <AccordionTrigger>Devnet or mainnet?</AccordionTrigger>
            <AccordionContent>
              The app supports both; set{" "}
              <code className="rounded bg-muted px-1 py-0.5">X402_NETWORK</code> to the Solana
              CAIP-2 chain id for{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1
              </code>{" "}
              (devnet) or{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp
              </code>{" "}
              (mainnet).
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="spam">
            <AccordionTrigger>What prevents spam?</AccordionTrigger>
            <AccordionContent>
              Payment is the filter. When sending a ping costs money, low-effort spam becomes
              economically irrational—while high-intent requests still go through.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="rounded-xl border bg-card/60 p-8 backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="h4">Ready to get started?</h2>
            <p className="muted">
              {session
                ? "Jump back into your inbox, or share your public page."
                : "Find a creator inbox to send a paid ping, or claim your handle to start receiving them."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="brand">
              <Link href="/ping">Send a Tip</Link>
            </Button>
            {session ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/inbox">Open inbox</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href={`/u/${encodeURIComponent(session.handle)}`}>View public page</Link>
                </Button>
              </>
            ) : (
              <Button asChild variant="outline">
                <Link href="/owner-signin">Claim a handle</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}