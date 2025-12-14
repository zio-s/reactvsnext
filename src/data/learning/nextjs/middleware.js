// data/learning/nextjs/middleware.js
// Next.js 미들웨어 학습 데이터

const middleware = [
  {
    id: 'middleware-basics',
    title: '미들웨어 기초',
    description: 'Next.js 미들웨어의 개념과 기본 사용법을 배웁니다.',
    content: `미들웨어는 요청이 완료되기 전에 실행되는 코드입니다. 들어오는 요청에 따라 응답을 수정하거나, 리다이렉트, 요청/응답 헤더 수정, 직접 응답 등의 작업을 수행할 수 있습니다.

미들웨어는 프로젝트 루트의 middleware.js(또는 .ts) 파일에 정의합니다. 모든 라우트에서 실행되기 때문에 matcher 설정으로 특정 경로에서만 실행되도록 제한하는 것이 좋습니다.

미들웨어는 Edge Runtime에서 실행되어 빠른 응답 속도를 제공합니다. 하지만 Node.js API의 일부만 사용할 수 있다는 제한이 있습니다.`,
    keyPoints: [
      '요청 전에 실행되는 코드',
      '프로젝트 루트에 middleware.js 파일',
      'Edge Runtime에서 실행',
      'matcher로 적용 경로 제한',
      '리다이렉트, 리라이트, 헤더 수정 가능',
    ],
    code: {
      title: '미들웨어 기본 예시',
      language: 'jsx',
      snippet: `// middleware.js (프로젝트 루트)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 요청 URL 확인
  const { pathname } = request.nextUrl;

  console.log('Middleware running for:', pathname);

  // 다음 미들웨어 또는 라우트 핸들러로 진행
  return NextResponse.next();
}

// matcher로 미들웨어 적용 경로 설정
export const config = {
  matcher: [
    // 정적 파일, _next, api/health 제외
    '/((?!_next/static|_next/image|favicon.ico|api/health).*)',
  ],
};

// 또는 여러 경로 지정
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'],
};

// 리다이렉트 예시
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /old-page → /new-page 리다이렉트
  if (pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url));
  }

  // /blog/123 → /posts/123 리다이렉트
  if (pathname.startsWith('/blog/')) {
    const newPath = pathname.replace('/blog/', '/posts/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

// 리라이트 예시 (URL은 유지하면서 다른 페이지 표시)
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /shop → /store 리라이트 (사용자에게는 /shop으로 보임)
  if (pathname === '/shop') {
    return NextResponse.rewrite(new URL('/store', request.url));
  }

  return NextResponse.next();
}

// 헤더 수정 예시
export function middleware(request) {
  // 요청 헤더 추가
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-header', 'custom-value');

  // 응답 헤더 추가
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-response-header', 'response-value');

  return response;
}`,
    },
    resources: [
      {
        name: 'Middleware 문서',
        url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'authentication-middleware',
    title: '인증 미들웨어',
    description: '미들웨어를 활용한 인증 및 권한 검사 방법을 배웁니다.',
    content: `미들웨어에서 인증을 처리하면 보호된 페이지에 접근하기 전에 사용자 인증 상태를 확인할 수 있습니다. 토큰이나 세션이 없으면 로그인 페이지로 리다이렉트합니다.

JWT 토큰의 유효성을 검사하거나, 세션 쿠키를 확인하여 인증 상태를 판단합니다. 역할(Role) 기반 접근 제어도 미들웨어에서 구현할 수 있습니다.

NextAuth.js(Auth.js)를 사용하면 미들웨어와 쉽게 통합할 수 있습니다.`,
    keyPoints: [
      '보호된 경로에 대한 인증 검사',
      'JWT 토큰 검증',
      '세션 쿠키 확인',
      '역할 기반 접근 제어',
      'NextAuth.js 통합',
    ],
    code: {
      title: '인증 미들웨어 예시',
      language: 'jsx',
      snippet: `// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// JWT 시크릿 키 (실제로는 환경 변수에서)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// 보호된 경로 목록
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const adminRoutes = ['/admin'];
const publicRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 통과
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 토큰 가져오기
  const token = request.cookies.get('auth-token')?.value;

  // 토큰 없으면 로그인 페이지로
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // JWT 검증
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // 관리자 경로 접근 권한 확인
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    // 요청 헤더에 사용자 정보 추가 (서버 컴포넌트에서 사용)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    // 토큰 만료 또는 유효하지 않음
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*',
  ],
};

// NextAuth.js와 통합
// middleware.js
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request) {
    // NextAuth 인증 후 추가 로직
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    // 관리자 경로 접근 권한 확인
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`,
    },
  },
  {
    id: 'geolocation-locale',
    title: '지역 및 언어 처리',
    description: '미들웨어를 활용한 지역화(i18n) 및 지역 기반 라우팅을 배웁니다.',
    content: `미들웨어에서 사용자의 위치나 선호 언어를 감지하여 적절한 페이지로 리다이렉트하거나 콘텐츠를 제공할 수 있습니다.

request.geo 객체로 사용자의 국가, 지역, 도시 정보를 얻을 수 있습니다(Vercel 배포 시). Accept-Language 헤더로 브라우저의 언어 설정을 확인할 수 있습니다.

쿠키에 사용자의 언어 설정을 저장하여 일관된 경험을 제공할 수 있습니다.`,
    keyPoints: [
      'request.geo로 위치 정보 확인',
      'Accept-Language 헤더로 언어 감지',
      '언어별 경로 리다이렉트',
      '쿠키로 언어 설정 저장',
      'Negotiator로 언어 매칭',
    ],
    code: {
      title: '지역화 미들웨어 예시',
      language: 'jsx',
      snippet: `// middleware.js
import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

const locales = ['ko', 'en', 'ja', 'zh'];
const defaultLocale = 'ko';

function getLocale(request) {
  // 1. 쿠키에서 저장된 언어 확인
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language 헤더에서 언어 감지
  const negotiatorHeaders = {
    'accept-language': request.headers.get('accept-language') || '',
  };
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 이미 로케일이 있는지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 로케일 감지 및 리다이렉트
  const locale = getLocale(request);
  request.nextUrl.pathname = \`/\${locale}\${pathname}\`;

  // 리다이렉트 응답에 쿠키 설정
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1년
  });

  return response;
}

export const config = {
  matcher: [
    // 정적 파일과 API 제외
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};

// 지역 기반 콘텐츠 제공
export function middleware(request) {
  const country = request.geo?.country || 'KR';
  const city = request.geo?.city || 'Seoul';

  // 국가별 다른 페이지로 리라이트
  if (country === 'US') {
    return NextResponse.rewrite(new URL('/us' + pathname, request.url));
  }

  if (country === 'JP') {
    return NextResponse.rewrite(new URL('/jp' + pathname, request.url));
  }

  // 지역 정보를 헤더로 전달
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-geo-country', country);
  requestHeaders.set('x-geo-city', city);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}`,
    },
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    description: '미들웨어를 활용한 요청 속도 제한 구현 방법을 배웁니다.',
    content: `Rate Limiting은 특정 시간 내에 허용되는 요청 수를 제한하여 서버를 보호합니다. 미들웨어에서 구현하면 모든 요청에 대해 일관되게 적용할 수 있습니다.

IP 주소, 사용자 ID, API 키 등을 기준으로 요청을 추적합니다. Redis와 같은 외부 저장소를 사용하면 여러 서버 인스턴스에서도 일관된 제한을 적용할 수 있습니다.

Edge Runtime에서는 사용 가능한 저장소가 제한되므로, KV 스토어나 외부 서비스를 활용합니다.`,
    keyPoints: [
      'IP 또는 사용자 기반 요청 제한',
      '시간 윈도우 기반 카운팅',
      'Redis/KV 스토어 활용',
      '429 Too Many Requests 응답',
      'Retry-After 헤더 제공',
    ],
    code: {
      title: 'Rate Limiting 예시',
      language: 'jsx',
      snippet: `// middleware.js
import { NextResponse } from 'next/server';

// 간단한 인메모리 스토어 (프로덕션에서는 Redis 등 사용)
const rateLimit = new Map();

// 설정
const WINDOW_SIZE = 60 * 1000; // 1분
const MAX_REQUESTS = 60; // 분당 60회

function getRateLimitKey(request) {
  // IP 주소 기반 (Vercel 배포 시)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  return ip;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // API 경로에만 Rate Limiting 적용
  if (!pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const key = getRateLimitKey(request);
  const now = Date.now();

  // 현재 윈도우 데이터 가져오기
  let data = rateLimit.get(key);

  if (!data || now - data.windowStart > WINDOW_SIZE) {
    // 새 윈도우 시작
    data = { windowStart: now, count: 0 };
  }

  data.count++;
  rateLimit.set(key, data);

  // 제한 초과 확인
  if (data.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((data.windowStart + WINDOW_SIZE - now) / 1000);

    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: \`Rate limit exceeded. Try again in \${retryAfter} seconds.\`,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(data.windowStart + WINDOW_SIZE),
        },
      }
    );
  }

  // 남은 요청 수 헤더 추가
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS));
  response.headers.set('X-RateLimit-Remaining', String(MAX_REQUESTS - data.count));
  response.headers.set('X-RateLimit-Reset', String(data.windowStart + WINDOW_SIZE));

  return response;
}

// Vercel KV를 사용한 Rate Limiting
import { kv } from '@vercel/kv';

export async function middleware(request) {
  const ip = request.ip || 'unknown';
  const key = \`rate-limit:\${ip}\`;

  const current = await kv.incr(key);

  // 첫 요청이면 만료 시간 설정
  if (current === 1) {
    await kv.expire(key, 60); // 60초 후 만료
  }

  if (current > MAX_REQUESTS) {
    const ttl = await kv.ttl(key);
    return new NextResponse(
      JSON.stringify({ error: 'Too Many Requests' }),
      {
        status: 429,
        headers: {
          'Retry-After': String(ttl),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};`,
    },
  },
  {
    id: 'ab-testing',
    title: 'A/B 테스팅',
    description: '미들웨어를 활용한 A/B 테스팅 구현 방법을 배웁니다.',
    content: `미들웨어에서 A/B 테스팅을 구현하면 서버 수준에서 사용자를 다른 변형(variant)에 할당할 수 있습니다. 쿠키를 사용하여 사용자가 일관된 경험을 받도록 합니다.

리라이트를 사용하면 URL을 변경하지 않고도 다른 페이지를 보여줄 수 있습니다. Edge Config나 Feature Flags 서비스와 연동하여 실시간으로 실험을 관리할 수 있습니다.

분석 서비스에 변형 정보를 전달하여 실험 결과를 추적합니다.`,
    keyPoints: [
      '쿠키로 사용자 변형 할당 유지',
      '리라이트로 다른 버전 표시',
      'Edge Config로 실험 설정',
      '분석 서비스와 연동',
      '점진적 롤아웃 가능',
    ],
    code: {
      title: 'A/B 테스팅 미들웨어 예시',
      language: 'jsx',
      snippet: `// middleware.js
import { NextResponse } from 'next/server';

// 실험 설정
const EXPERIMENTS = {
  'homepage-hero': {
    variants: ['control', 'variant-a', 'variant-b'],
    weights: [0.34, 0.33, 0.33], // 각 변형의 트래픽 비율
  },
  'checkout-flow': {
    variants: ['original', 'new-flow'],
    weights: [0.5, 0.5],
  },
};

// 가중치에 따른 변형 선택
function selectVariant(experiment) {
  const random = Math.random();
  let sum = 0;

  for (let i = 0; i < experiment.variants.length; i++) {
    sum += experiment.weights[i];
    if (random < sum) {
      return experiment.variants[i];
    }
  }

  return experiment.variants[0];
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 홈페이지 A/B 테스트
  if (pathname === '/') {
    const experimentName = 'homepage-hero';
    const cookieName = \`exp-\${experimentName}\`;

    // 기존 할당 확인
    let variant = request.cookies.get(cookieName)?.value;

    // 없으면 새로 할당
    if (!variant) {
      variant = selectVariant(EXPERIMENTS[experimentName]);
    }

    // 변형에 따른 페이지 리라이트
    const response = NextResponse.rewrite(
      new URL(\`/experiments/homepage/\${variant}\`, request.url)
    );

    // 쿠키에 할당 저장 (30일)
    response.cookies.set(cookieName, variant, {
      maxAge: 60 * 60 * 24 * 30,
    });

    // 분석을 위한 헤더 추가
    response.headers.set('x-experiment', experimentName);
    response.headers.set('x-variant', variant);

    return response;
  }

  return NextResponse.next();
}

// Edge Config를 사용한 실험 설정
import { get } from '@vercel/edge-config';

export async function middleware(request) {
  // Edge Config에서 실험 설정 가져오기
  const experiments = await get('experiments');

  const { pathname } = request.nextUrl;

  for (const [path, config] of Object.entries(experiments)) {
    if (pathname.startsWith(path) && config.enabled) {
      const cookieName = \`exp-\${config.name}\`;
      let variant = request.cookies.get(cookieName)?.value;

      if (!variant) {
        variant = selectVariant(config);
      }

      const response = NextResponse.rewrite(
        new URL(\`\${pathname}?variant=\${variant}\`, request.url)
      );

      response.cookies.set(cookieName, variant, {
        maxAge: config.duration || 60 * 60 * 24 * 7,
      });

      return response;
    }
  }

  return NextResponse.next();
}

// 페이지에서 변형 사용
// app/experiments/homepage/[variant]/page.js
export default function HomePage({ params }) {
  const { variant } = params;

  return (
    <div>
      {variant === 'control' && <OriginalHero />}
      {variant === 'variant-a' && <HeroVariantA />}
      {variant === 'variant-b' && <HeroVariantB />}
    </div>
  );
}

// 분석 이벤트 전송 (클라이언트)
'use client';

import { useEffect } from 'react';

export function TrackExperiment({ experiment, variant }) {
  useEffect(() => {
    // Google Analytics
    gtag('event', 'experiment_viewed', {
      experiment_name: experiment,
      variant_name: variant,
    });

    // 또는 커스텀 분석
    fetch('/api/analytics/experiment', {
      method: 'POST',
      body: JSON.stringify({ experiment, variant }),
    });
  }, [experiment, variant]);

  return null;
}`,
    },
  },
];

export default middleware;
