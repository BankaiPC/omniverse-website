import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const locales = ['en', 'es'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) return locale;
  }
  return defaultLocale;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
