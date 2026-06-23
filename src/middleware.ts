import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

function hasLocale(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname)) return NextResponse.next();

  // Prefer the visitor's previously chosen locale (cookie), else Accept-Language, else default.
  const cookieLocale = request.cookies.get("eip-locale")?.value;
  const accept = request.headers.get("accept-language") ?? "";
  const detected =
    (cookieLocale && LOCALES.includes(cookieLocale as never) && cookieLocale) ||
    (accept.toLowerCase().startsWith("vi") ? "vi" : DEFAULT_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|data|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
