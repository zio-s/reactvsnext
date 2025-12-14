// data/learning/nextjs/optimization.js
// Next.js 최적화 학습 데이터

const optimization = [
  {
    id: 'image-optimization',
    title: '이미지 최적화',
    description: 'next/image를 활용한 자동 이미지 최적화 방법을 배웁니다.',
    content: `Next.js의 Image 컴포넌트는 자동으로 이미지를 최적화합니다. WebP, AVIF 등 최신 포맷으로 변환하고, 디바이스 크기에 맞게 리사이징하며, 지연 로딩(Lazy Loading)을 기본으로 적용합니다.

레이아웃 시프트(CLS)를 방지하기 위해 이미지 크기를 미리 지정하거나, fill 속성으로 부모 컨테이너를 채울 수 있습니다. placeholder 옵션으로 이미지가 로드되기 전 블러 효과를 적용할 수 있습니다.

외부 이미지를 사용할 때는 next.config.js에서 도메인을 허용해야 합니다.`,
    keyPoints: [
      '자동 포맷 변환 (WebP, AVIF)',
      '반응형 이미지 자동 생성',
      '지연 로딩으로 초기 로드 최적화',
      'placeholder로 로딩 UX 개선',
      'priority로 LCP 이미지 우선 로드',
    ],
    code: {
      title: 'Image 컴포넌트 사용 예시',
      language: 'jsx',
      snippet: `import Image from 'next/image';

// 기본 사용 - 로컬 이미지
import profilePic from './profile.jpg';

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="프로필 사진"
      width={200}
      height={200}
      placeholder="blur"  // 블러 플레이스홀더 (로컬 이미지만)
    />
  );
}

// 외부 이미지
export function ExternalImage() {
  return (
    <Image
      src="https://example.com/photo.jpg"
      alt="외부 이미지"
      width={800}
      height={600}
      // 외부 이미지는 blurDataURL 직접 지정
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
    />
  );
}

// fill 속성 - 부모 컨테이너를 채움
export function HeroImage() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/hero.jpg"
        alt="히어로 이미지"
        fill
        style={{ objectFit: 'cover' }}
        priority  // LCP 이미지에 사용 - 지연 로딩 비활성화
      />
    </div>
  );
}

// 반응형 이미지
export function ResponsiveImage() {
  return (
    <Image
      src="/responsive.jpg"
      alt="반응형 이미지"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
    />
  );
}

// next.config.js - 외부 이미지 도메인 설정
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',  // 와일드카드
      },
    ],
    // 포맷 우선순위
    formats: ['image/avif', 'image/webp'],
    // 디바이스 크기
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 이미지 크기
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;`,
    },
  },
  {
    id: 'font-optimization',
    title: '폰트 최적화',
    description: 'next/font를 활용한 웹 폰트 최적화 방법을 배웁니다.',
    content: `next/font는 Google Fonts를 포함한 모든 폰트 파일을 자동으로 최적화합니다. 빌드 시점에 폰트를 다운로드하여 자체 호스팅하므로 외부 네트워크 요청이 발생하지 않습니다.

CSS size-adjust 속성을 자동으로 적용하여 폰트 로딩 중 레이아웃 시프트(CLS)를 방지합니다. 가변 폰트(Variable Font)도 지원하여 다양한 두께와 스타일을 효율적으로 사용할 수 있습니다.

로컬 폰트 파일도 next/font/local을 통해 동일한 최적화를 적용할 수 있습니다.`,
    keyPoints: [
      'Google Fonts 자체 호스팅으로 성능 향상',
      'size-adjust로 레이아웃 시프트 방지',
      '가변 폰트 지원',
      '로컬 폰트 최적화',
      'preload 자동 적용',
    ],
    code: {
      title: '폰트 최적화 예시',
      language: 'jsx',
      snippet: `// app/layout.js
import { Inter, Noto_Sans_KR } from 'next/font/google';

// Google 폰트 설정
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={\`\${inter.variable} \${notoSansKr.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// tailwind.config.js에서 사용
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-kr)', 'sans-serif'],
      },
    },
  },
};

// 로컬 폰트 사용
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

// 가변 폰트 (Variable Font)
const pretendardVariable = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  // 가변 폰트의 weight 범위 지정
  weight: '100 900',
});

// 특정 컴포넌트에서만 폰트 적용
export function Heading({ children }) {
  return (
    <h1 className={pretendard.className}>
      {children}
    </h1>
  );
}`,
    },
  },
  {
    id: 'script-optimization',
    title: '스크립트 최적화',
    description: 'next/script를 활용한 서드파티 스크립트 최적화 방법을 배웁니다.',
    content: `next/script 컴포넌트는 서드파티 스크립트의 로딩을 최적화합니다. 스크립트 로딩 전략(strategy)을 지정하여 페이지 성능에 미치는 영향을 최소화할 수 있습니다.

beforeInteractive는 페이지가 인터랙티브해지기 전에 로드하고, afterInteractive(기본값)는 페이지가 인터랙티브해진 직후에 로드합니다. lazyOnload는 브라우저가 유휴 상태일 때 로드합니다.

worker 전략은 Web Worker에서 스크립트를 실행하여 메인 스레드의 부하를 줄일 수 있습니다(Partytown 필요).`,
    keyPoints: [
      'strategy로 로딩 시점 제어',
      'beforeInteractive: 중요한 스크립트',
      'afterInteractive: 기본 전략',
      'lazyOnload: 우선순위 낮은 스크립트',
      'onLoad/onError 콜백 지원',
    ],
    code: {
      title: '스크립트 최적화 예시',
      language: 'jsx',
      snippet: `import Script from 'next/script';

// app/layout.js - 전역 스크립트
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}

        {/* Google Analytics - 페이지 인터랙티브 후 로드 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          \`}
        </Script>

        {/* 채팅 위젯 - 낮은 우선순위 */}
        <Script
          src="https://widget.example.com/chat.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Chat widget loaded');
          }}
        />
      </body>
    </html>
  );
}

// 페이지별 스크립트
export default function MapPage() {
  return (
    <div>
      <div id="map" style={{ height: '400px' }} />

      {/* 지도 API - 페이지 인터랙티브 전에 필요 */}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"
        strategy="beforeInteractive"
      />

      <Script
        id="init-map"
        strategy="afterInteractive"
        onLoad={() => {
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.5665, lng: 126.9780 },
            zoom: 12,
          });
        }}
      />
    </div>
  );
}

// 조건부 스크립트 로딩
'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function VideoPlayer() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPlayer(true)}>
        비디오 플레이어 로드
      </button>

      {showPlayer && (
        <>
          <Script
            src="https://player.example.com/sdk.js"
            onLoad={() => {
              window.Player.init('#video-container');
            }}
            onError={() => {
              console.error('Failed to load video player');
            }}
          />
          <div id="video-container" />
        </>
      )}
    </div>
  );
}`,
    },
  },
  {
    id: 'metadata-seo',
    title: '메타데이터와 SEO',
    description: 'Metadata API를 활용한 SEO 최적화 방법을 배웁니다.',
    content: `Next.js App Router는 Metadata API를 통해 페이지의 메타데이터를 정의합니다. 정적 메타데이터는 객체로, 동적 메타데이터는 generateMetadata 함수로 정의합니다.

Open Graph, Twitter Cards 등 소셜 미디어 메타데이터도 쉽게 설정할 수 있습니다. 또한 robots.txt, sitemap.xml, favicon 등도 특수 파일이나 함수로 생성할 수 있습니다.

메타데이터는 상속되며, 자식 페이지에서 부모의 메타데이터를 덮어쓸 수 있습니다.`,
    keyPoints: [
      'metadata 객체로 정적 메타데이터 정의',
      'generateMetadata로 동적 메타데이터 생성',
      'Open Graph, Twitter Cards 지원',
      'sitemap.xml, robots.txt 자동 생성',
      '메타데이터 상속 및 덮어쓰기',
    ],
    code: {
      title: '메타데이터 설정 예시',
      language: 'jsx',
      snippet: `// app/layout.js - 기본 메타데이터
export const metadata = {
  metadataBase: new URL('https://mysite.com'),
  title: {
    default: '내 사이트',
    template: '%s | 내 사이트',  // 페이지 타이틀 템플릿
  },
  description: '내 사이트 설명입니다.',
  keywords: ['Next.js', 'React', '웹개발'],
  authors: [{ name: '작성자', url: 'https://author.com' }],
  creator: '내 이름',
  publisher: '내 회사',

  // Open Graph
  openGraph: {
    title: '내 사이트',
    description: '내 사이트 설명입니다.',
    url: 'https://mysite.com',
    siteName: '내 사이트',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OG 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: '내 사이트',
    description: '내 사이트 설명입니다.',
    images: ['/twitter-image.png'],
    creator: '@username',
  },

  // 검색 엔진
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 파비콘
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
};

// app/products/[id]/page.js - 동적 메타데이터
export async function generateMetadata({ params, searchParams }) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// app/sitemap.js - 사이트맵 생성
export default async function sitemap() {
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: \`https://mysite.com/products/\${product.id}\`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://mysite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://mysite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}

// app/robots.js - robots.txt 생성
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://mysite.com/sitemap.xml',
  };
}`,
    },
  },
  {
    id: 'bundle-optimization',
    title: '번들 최적화',
    description: '코드 스플리팅과 트리 쉐이킹으로 번들 크기를 줄이는 방법을 배웁니다.',
    content: `Next.js는 자동으로 코드 스플리팅을 적용하여 각 페이지에 필요한 코드만 로드합니다. 하지만 추가적인 최적화를 통해 번들 크기를 더 줄일 수 있습니다.

dynamic import를 사용하면 컴포넌트를 지연 로딩할 수 있습니다. 큰 라이브러리나 조건부로 필요한 컴포넌트에 적용하면 초기 로딩 속도를 개선할 수 있습니다.

@next/bundle-analyzer를 사용하면 번들 구성을 시각화하여 최적화 포인트를 찾을 수 있습니다.`,
    keyPoints: [
      '자동 코드 스플리팅',
      'dynamic import로 지연 로딩',
      '번들 분석기로 최적화 포인트 발견',
      '트리 쉐이킹으로 미사용 코드 제거',
      '서드파티 라이브러리 최적화',
    ],
    code: {
      title: '번들 최적화 예시',
      language: 'jsx',
      snippet: `// 동적 import로 컴포넌트 지연 로딩
import dynamic from 'next/dynamic';

// 기본 동적 import
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>차트 로딩 중...</div>,
});

// SSR 비활성화 (클라이언트에서만 렌더링)
const NoSSRComponent = dynamic(
  () => import('@/components/ClientOnly'),
  { ssr: false }
);

// 네임드 export 동적 import
const ModalComponent = dynamic(() =>
  import('@/components/Modal').then((mod) => mod.Modal)
);

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        차트 보기
      </button>

      {/* 조건부 렌더링 - 필요할 때만 로드 */}
      {showChart && <HeavyChart />}

      {/* SSR 비활성화된 컴포넌트 */}
      <NoSSRComponent />
    </div>
  );
}

// 라이브러리 최적화 - 필요한 것만 import
// ❌ 전체 import - 번들 크기 증가
import _ from 'lodash';
const result = _.debounce(fn, 300);

// ✅ 개별 함수 import - 트리 쉐이킹 가능
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);

// date-fns 최적화
// ❌ 전체 import
import { format, parseISO, addDays } from 'date-fns';

// ✅ 개별 import
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

// 번들 분석기 설정
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // 기타 설정
});

// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}

// modularizeImports로 자동 최적화
// next.config.js
module.exports = {
  modularizeImports: {
    'lodash': {
      transform: 'lodash/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
  },
};`,
    },
  },
  {
    id: 'performance-monitoring',
    title: '성능 모니터링',
    description: 'Web Vitals와 성능 메트릭을 모니터링하는 방법을 배웁니다.',
    content: `Core Web Vitals(LCP, FID, CLS)는 사용자 경험을 측정하는 핵심 지표입니다. Next.js는 이러한 메트릭을 쉽게 수집하고 분석할 수 있는 도구를 제공합니다.

Vercel의 Speed Insights를 사용하면 실제 사용자 데이터(RUM)를 수집하여 성능을 모니터링할 수 있습니다. 또는 reportWebVitals 함수를 사용하여 커스텀 분석 서비스로 데이터를 전송할 수 있습니다.

개발 중에는 Chrome DevTools의 Lighthouse나 Performance 탭을 활용하여 성능을 분석할 수 있습니다.`,
    keyPoints: [
      'LCP: Largest Contentful Paint (최대 콘텐츠 렌더링)',
      'FID/INP: First Input Delay / Interaction to Next Paint',
      'CLS: Cumulative Layout Shift (누적 레이아웃 이동)',
      'Vercel Speed Insights로 RUM 수집',
      'reportWebVitals로 커스텀 분석',
    ],
    code: {
      title: '성능 모니터링 예시',
      language: 'jsx',
      snippet: `// app/layout.js - Vercel Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

// reportWebVitals - 커스텀 분석
// app/_components/WebVitals.js
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 분석 서비스로 전송
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,  // 'good' | 'needs-improvement' | 'poor'
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    // Google Analytics로 전송
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // 커스텀 엔드포인트로 전송
    fetch('/api/analytics', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,  // 페이지 이탈 시에도 전송 보장
    });

    // 콘솔에 출력 (개발용)
    console.log(metric);
  });

  return null;
}

// app/layout.js에서 사용
import { WebVitals } from './_components/WebVitals';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}

// 성능 최적화 체크리스트
const performanceChecklist = {
  LCP: {
    target: '2.5초 이하',
    improvements: [
      'priority 속성으로 중요 이미지 우선 로드',
      '서버 응답 시간 최적화',
      '렌더링 차단 리소스 제거',
      'CDN 사용',
    ],
  },
  INP: {
    target: '200ms 이하',
    improvements: [
      '긴 작업을 작은 단위로 분리',
      'Web Worker 활용',
      '이벤트 핸들러 최적화',
      '불필요한 리렌더링 방지',
    ],
  },
  CLS: {
    target: '0.1 이하',
    improvements: [
      '이미지/비디오에 크기 지정',
      '폰트 로딩 최적화 (next/font)',
      '동적 콘텐츠 공간 예약',
      '애니메이션은 transform 사용',
    ],
  },
};`,
    },
  },
];

export default optimization;
