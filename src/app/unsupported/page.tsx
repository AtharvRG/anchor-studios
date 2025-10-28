import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsupported Device",
  robots: { index: false, follow: false },
};

export default function UnsupportedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md text-center bg-[rgba(0,0,0,0.5)]/0 md:bg-transparent p-8 rounded-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">This site is best on desktop</h1>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Mobile and tablet devices aren&apos;t supported yet. Please visit from a laptop or desktop
          computer for the full experience.
        </p>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">If you believe this is a mistake:</p>
          <ul className="text-xs text-muted-foreground list-disc list-inside">
            <li>Try switching your browser to desktop mode</li>
            <li>Resize your window larger and refresh</li>
          </ul>
        </div>
        <div className="mt-6">
          <Link href="/" className="underline underline-offset-4 text-sm">
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
