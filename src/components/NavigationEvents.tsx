"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

// Fires a $pageview event on every App Router navigation.
// Must be wrapped in a <Suspense> boundary because useSearchParams
// opts the component into client-side rendering.
export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, searchParams, posthog]);

  return null;
}
