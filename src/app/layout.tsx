import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AssessmentProvider } from "@/lib/assessment-context";
import { PostHogProvider } from "@/components/PostHogProvider";
import { NavigationEvents } from "@/components/NavigationEvents";

export const metadata: Metadata = {
  title: "Clrposture — NIST CSF 2.0 Assessment",
  description:
    "Free NIST CSF 2.0 compliance assessment for SMEs. Identify your cybersecurity gaps and get a prioritized remediation plan in under 30 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <AssessmentProvider>
            {children}
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </AssessmentProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
