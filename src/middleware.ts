import { NextRequest, NextResponse, userAgent } from "next/server";

// Block mobile and tablet devices by redirecting them to /unsupported
export function middleware(request: NextRequest) {
  const { device, isBot } = userAgent(request);

  // Treat bots as allowed to avoid SEO issues; block only human mobile/tablet
  const type = device.type; // 'mobile' | 'tablet' | ... | undefined for desktop
  const isMobileOrTablet = type === "mobile" || type === "tablet";

  const { pathname } = request.nextUrl;
  if (!isBot && isMobileOrTablet && !pathname.startsWith("/unsupported")) {
    const url = request.nextUrl.clone();
    url.pathname = "/unsupported";
    url.search = ""; // ensure a clean URL
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exclude common static paths and the unsupported page itself
export const config = {
  matcher: [
    // Match all paths except for:
    // - api routes
    // - Next.js internals (static, image)
    // - common metadata files
    // - the unsupported page itself
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|unsupported).*)",
  ],
};
