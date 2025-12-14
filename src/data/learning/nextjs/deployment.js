// data/learning/nextjs/deployment.js
// Next.js 배포 학습 데이터

const deployment = [
  {
    id: 'vercel-deployment',
    title: 'Vercel 배포',
    description: 'Next.js를 만든 Vercel 플랫폼에 배포하는 방법을 배웁니다.',
    content: `Vercel은 Next.js를 개발한 회사에서 제공하는 클라우드 플랫폼으로, Next.js 애플리케이션을 배포하기에 가장 최적화된 환경을 제공합니다.

GitHub, GitLab, Bitbucket과 연동하여 코드를 푸시하면 자동으로 빌드하고 배포합니다. Preview Deployment 기능을 통해 PR마다 독립적인 미리보기 환경을 제공합니다.

Vercel은 Edge Network를 통해 전 세계적으로 빠른 응답 속도를 제공하며, 서버리스 함수, Edge Functions 등 다양한 기능을 지원합니다.`,
    keyPoints: [
      'GitHub 연동으로 자동 배포',
      'Preview Deployment로 PR 미리보기',
      'Edge Network로 글로벌 배포',
      '환경 변수 관리 용이',
      '무료 티어로 시작 가능',
    ],
    code: {
      title: 'Vercel 배포 설정',
      language: 'json',
      snippet: `// vercel.json - 선택적 설정 파일
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "DATABASE_URL": "@database-url"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/blog/:slug",
      "destination": "/posts/:slug"
    }
  ]
}`,
    },
    deploymentSteps: [
      '1. Vercel 계정 생성 및 GitHub 연동',
      '2. "New Project" 클릭 후 저장소 선택',
      '3. Framework Preset으로 Next.js 자동 감지',
      '4. 환경 변수 설정 (필요시)',
      '5. "Deploy" 클릭으로 배포 시작',
      '6. 배포 완료 후 도메인 할당',
    ],
    resources: [
      {
        name: 'Vercel 배포 가이드',
        url: 'https://nextjs.org/docs/deployment',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'self-hosting',
    title: '셀프 호스팅',
    description: 'Node.js 서버, Docker, 정적 내보내기로 직접 호스팅하는 방법을 배웁니다.',
    content: `Next.js는 Vercel 외에도 다양한 환경에서 셀프 호스팅할 수 있습니다. Node.js 서버로 직접 실행하거나, Docker 컨테이너로 패키징하거나, 정적 사이트로 내보내서 배포할 수 있습니다.

Node.js 서버 방식은 SSR, API Routes, 미들웨어 등 모든 기능을 사용할 수 있습니다. Docker를 사용하면 일관된 배포 환경을 구성할 수 있습니다.

정적 내보내기(Static Export)는 동적 기능 없이 정적 HTML 파일로 내보내는 방식으로, CDN이나 정적 호스팅 서비스에 배포하기 적합합니다.`,
    keyPoints: [
      'Node.js 서버로 모든 기능 사용 가능',
      'Docker로 일관된 배포 환경 구성',
      '정적 내보내기로 CDN 배포',
      'PM2로 프로세스 관리',
      'Nginx 리버스 프록시 설정',
    ],
    code: {
      title: '셀프 호스팅 설정',
      language: 'bash',
      snippet: `# 1. Node.js 서버로 실행
npm run build
npm run start

# 2. 커스텀 서버 (server.js)
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});

# 3. PM2로 프로세스 관리
npm install pm2 -g
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup

# 4. 정적 내보내기 (next.config.js 설정 필요)
npm run build
# output 폴더에 정적 파일 생성`,
    },
    dockerConfig: {
      title: 'Dockerfile 예시',
      language: 'dockerfile',
      snippet: `# Dockerfile
FROM node:18-alpine AS base

# 의존성 설치 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 실행 단계
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]`,
    },
  },
  {
    id: 'environment-variables',
    title: '환경 변수 관리',
    description: '개발, 스테이징, 프로덕션 환경별 변수를 관리하는 방법을 배웁니다.',
    content: `Next.js는 다양한 환경 변수 설정 방법을 제공합니다. .env 파일을 통해 환경별 변수를 관리할 수 있으며, 빌드 타임과 런타임 변수를 구분하여 사용합니다.

NEXT_PUBLIC_ 접두사가 붙은 변수는 브라우저에 노출되므로, 민감한 정보는 서버 사이드에서만 사용해야 합니다.

환경 파일은 우선순위가 있어서 .env.local이 .env보다 높은 우선순위를 가집니다. 프로덕션과 개발 환경을 .env.production과 .env.development로 구분할 수 있습니다.`,
    keyPoints: [
      '.env.local은 .gitignore에 포함',
      'NEXT_PUBLIC_ 접두사로 클라이언트 노출',
      '환경별 파일: .env.development, .env.production',
      '런타임 환경 변수는 서버에서만 접근',
      'Vercel/호스팅 서비스에서 환경 변수 설정',
    ],
    code: {
      title: '환경 변수 사용 예시',
      language: 'bash',
      snippet: `# .env.local (로컬 개발용, .gitignore에 포함)
DATABASE_URL=postgresql://localhost:5432/mydb
API_SECRET_KEY=my-secret-key-local

# .env.development (개발 환경)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=MyApp Dev

# .env.production (프로덕션 환경)
NEXT_PUBLIC_API_URL=https://api.myapp.com
NEXT_PUBLIC_APP_NAME=MyApp

# .env (기본값, 모든 환경)
NEXT_PUBLIC_DEFAULT_LOCALE=ko

# 환경 변수 우선순위 (높은 순)
# 1. 시스템 환경 변수
# 2. .env.local
# 3. .env.development 또는 .env.production
# 4. .env`,
    },
    usageExample: {
      title: '코드에서 환경 변수 사용',
      language: 'jsx',
      snippet: `// 서버 컴포넌트에서 사용 (모든 환경 변수 접근 가능)
export default async function ServerPage() {
  // 서버에서만 접근 가능한 민감한 변수
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_SECRET_KEY;

  const data = await fetchFromDB(dbUrl);

  return <div>Server rendered with secret data</div>;
}

// 클라이언트 컴포넌트에서 사용
'use client';

export default function ClientComponent() {
  // NEXT_PUBLIC_ 접두사가 붙은 변수만 접근 가능
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  // ❌ 접근 불가 - undefined
  // const secret = process.env.API_SECRET_KEY;

  return (
    <div>
      <h1>{appName}</h1>
      <p>API: {apiUrl}</p>
    </div>
  );
}

// next.config.js에서 환경 변수 검증
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR,
  },
  // 빌드 시 환경 변수 검증
  webpack: (config) => {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required');
    }
    return config;
  },
};

module.exports = nextConfig;`,
    },
  },
  {
    id: 'build-optimization',
    title: '빌드 최적화',
    description: '프로덕션 빌드를 최적화하고 분석하는 방법을 배웁니다.',
    content: `Next.js는 프로덕션 빌드 시 다양한 최적화를 자동으로 수행합니다. 코드 스플리팅, 트리 쉐이킹, 미니피케이션 등이 기본으로 적용됩니다.

@next/bundle-analyzer를 사용하면 번들 크기를 시각화하여 최적화 포인트를 찾을 수 있습니다. 불필요한 의존성이나 큰 라이브러리를 식별하여 번들 크기를 줄일 수 있습니다.

빌드 캐시를 활용하면 재빌드 시간을 크게 줄일 수 있습니다. CI/CD 환경에서는 .next/cache 폴더를 캐시하여 빌드 성능을 향상시킬 수 있습니다.`,
    keyPoints: [
      '자동 코드 스플리팅으로 초기 로드 최적화',
      '번들 분석기로 크기 시각화',
      '빌드 캐시로 CI/CD 성능 향상',
      '동적 import로 지연 로딩',
      'Tree shaking으로 미사용 코드 제거',
    ],
    code: {
      title: '빌드 최적화 설정',
      language: 'jsx',
      snippet: `// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone 빌드 (Docker용)
  output: 'standalone',

  // 정적 내보내기
  // output: 'export',

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
    // 정적 내보내기 시
    // unoptimized: true,
  },

  // 실험적 기능
  experimental: {
    // 서버 액션 활성화 (기본 활성화됨)
    serverActions: true,
  },

  // 웹팩 설정 커스터마이징
  webpack: (config, { isServer }) => {
    // 클라이언트 번들에서 특정 모듈 제외
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // 컴파일러 옵션
  compiler: {
    // styled-components 지원
    styledComponents: true,
    // 프로덕션에서 console.log 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// package.json 스크립트
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true npm run build",
    "build:standalone": "next build && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public"
  }
}`,
    },
    dynamicImport: {
      title: '동적 Import 예시',
      language: 'jsx',
      snippet: `// 컴포넌트 지연 로딩
import dynamic from 'next/dynamic';

// 기본 동적 import
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// 로딩 상태와 함께
const ChartComponent = dynamic(
  () => import('./ChartComponent'),
  {
    loading: () => <div>차트 로딩 중...</div>,
    ssr: false, // 클라이언트에서만 렌더링
  }
);

// 조건부 로딩
const AdminPanel = dynamic(() =>
  import('./AdminPanel').then((mod) => mod.AdminPanel)
);

export default function Dashboard({ isAdmin }) {
  return (
    <div>
      <HeavyComponent />
      <ChartComponent data={chartData} />
      {isAdmin && <AdminPanel />}
    </div>
  );
}`,
    },
  },
  {
    id: 'ci-cd-pipeline',
    title: 'CI/CD 파이프라인',
    description: 'GitHub Actions로 자동화된 빌드, 테스트, 배포 파이프라인을 구축합니다.',
    content: `CI/CD 파이프라인을 구축하면 코드 푸시 시 자동으로 테스트, 빌드, 배포가 진행됩니다. GitHub Actions는 Next.js 프로젝트에 쉽게 적용할 수 있는 CI/CD 도구입니다.

파이프라인은 보통 린트 검사, 타입 체크, 단위 테스트, E2E 테스트, 빌드, 배포 단계로 구성됩니다. 각 단계에서 실패하면 다음 단계로 진행하지 않아 안정적인 배포가 가능합니다.

캐싱을 활용하면 의존성 설치와 빌드 시간을 크게 줄일 수 있습니다. node_modules와 .next/cache를 캐시하는 것이 일반적입니다.`,
    keyPoints: [
      'GitHub Actions로 자동화 구축',
      'PR마다 자동 테스트 실행',
      '메인 브랜치 푸시 시 자동 배포',
      '캐싱으로 빌드 시간 단축',
      '환경별 배포 전략 (staging, production)',
    ],
    code: {
      title: 'GitHub Actions 워크플로우',
      language: 'yaml',
      snippet: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  # 린트 및 타입 체크
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Type Check
        run: npm run type-check

  # 테스트
  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # 빌드
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Cache Next.js build
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            \${{ github.workspace }}/.next/cache
          key: \${{ runner.os }}-nextjs-\${{ hashFiles('**/package-lock.json') }}-\${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
          restore-keys: |
            \${{ runner.os }}-nextjs-\${{ hashFiles('**/package-lock.json') }}-

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: \${{ secrets.NEXT_PUBLIC_API_URL }}

  # 배포 (메인 브랜치만)
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`,
    },
    dockerWorkflow: {
      title: 'Docker 배포 워크플로우',
      language: 'yaml',
      snippet: `# .github/workflows/docker-deploy.yml
name: Docker Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
    },
  },
  {
    id: 'monitoring-logging',
    title: '모니터링 및 로깅',
    description: '프로덕션 환경에서 애플리케이션을 모니터링하고 로그를 관리하는 방법을 배웁니다.',
    content: `프로덕션 환경에서는 애플리케이션의 상태를 지속적으로 모니터링하고 로그를 수집해야 합니다. 성능 지표, 에러 추적, 사용자 행동 분석 등을 통해 문제를 조기에 발견하고 해결할 수 있습니다.

Vercel은 자체 분석 도구를 제공하며, 외부 서비스(Sentry, DataDog, New Relic 등)와도 쉽게 연동됩니다. Web Vitals를 추적하여 Core Web Vitals 점수를 모니터링할 수 있습니다.

로깅은 구조화된 JSON 형식으로 기록하면 검색과 분석이 용이합니다. Winston, Pino 같은 로깅 라이브러리를 사용할 수 있습니다.`,
    keyPoints: [
      'Web Vitals로 성능 모니터링',
      'Sentry로 에러 추적',
      '구조화된 로깅 (JSON 형식)',
      'Real User Monitoring (RUM)',
      '알림 설정으로 즉각 대응',
    ],
    code: {
      title: '모니터링 설정',
      language: 'jsx',
      snippet: `// app/layout.js - Web Vitals 리포팅
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

// lib/analytics.js - 커스텀 Web Vitals 리포팅
export function reportWebVitals(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    page: window.location.pathname,
  });

  // 분석 서비스로 전송
  fetch('/api/analytics', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
  });
}

// Sentry 설정 (sentry.client.config.js)
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay(),
  ],
});

// 에러 바운더리와 함께 사용
'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}`,
    },
    loggingExample: {
      title: '구조화된 로깅 예시',
      language: 'jsx',
      snippet: `// lib/logger.js
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;

// API Route에서 사용
import logger from '@/lib/logger';

export async function POST(request) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  logger.info({
    requestId,
    method: 'POST',
    path: '/api/users',
    message: 'Request started',
  });

  try {
    const body = await request.json();
    const result = await createUser(body);

    logger.info({
      requestId,
      duration: Date.now() - startTime,
      message: 'Request completed',
    });

    return Response.json(result);
  } catch (error) {
    logger.error({
      requestId,
      error: error.message,
      stack: error.stack,
      duration: Date.now() - startTime,
      message: 'Request failed',
    });

    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}`,
    },
  },
];

export default deployment;
