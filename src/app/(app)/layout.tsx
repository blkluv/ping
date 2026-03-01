import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShellClient } from "@/components/layout/AppShellClient";
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";
import { getOwnerSession } from "@/lib/auth/ownerSession";

export default async function AppLayout({ children }: { children: ReactNode }) {
  let session = null;

  try {
    session = await getOwnerSession();
  } catch (err) {
    // Treat session parsing/verification errors as "not signed in"
    session = null;
  }

  if (!session) redirect("/owner-signin");

  return (
    <div className="min-h-dvh bg-background [background-image:var(--brand-glow)] bg-no-repeat [background-position:top]">
      <UnifiedHeader />
      <div className="container-page py-10 sm:py-12">
        <AppShellClient ownerHandle={session.handle}>{children}</AppShellClient>
      </div>
    </div>
  );
}