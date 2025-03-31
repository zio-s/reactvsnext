// data/learning/nextjs/basics.js
// Next.js 기본 개념 학습 데이터

const basics = [
  {
    id: 'nextjs-intro',
    title: 'Next.js란 무엇인가?',
    description: 'Next.js의 기본 개념과 React와의 관계를 소개합니다.',
    content: `Next.js는 React 기반의 풀스택 웹 프레임워크로, Vercel에서 개발 및 유지 관리하고 있습니다. React에 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API 라우트 등의 기능을 추가하여 프로덕션 수준의 React 애플리케이션을 쉽게 만들 수 있게 해줍니다.

React가 UI 라이브러리로서 사용자 인터페이스를 구축하는 데 중점을 두고 있다면, Next.js는 그 위에 구축된 프레임워크로, 라우팅, 데이터 페칭, 빌드 최적화 등 웹 애플리케이션 개발에 필요한 다양한 기능을 제공합니다. React만으로는 직접 구현해야 하는 여러 기능들이 Next.js에는 내장되어 있습니다.

Next.js는 "제로 설정(Zero Config)"을 지향하여, 복잡한 웹팩이나 바벨 설정 없이도 바로 개발을 시작할 수 있도록 설계되었습니다. 또한 개발자 경험을 중요시하여 빠른 컴파일, 자동 새로고침, 에러 보고 등의 기능을 제공합니다.`,
    keyPoints: [
      'React 기반 풀스택 웹 프레임워크',
      '서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 클라이언트 사이드 렌더링(CSR) 지원',
      '파일 기반 라우팅 시스템',
      'API 라우트를 통한 서버리스 함수 지원',
      '자동 코드 분할 및 최적화',
      '이미지, 폰트 등의 자산 최적화',
      '개발 환경과 프로덕션 환경 모두 지원',
    ],
    code: {
      title: 'Next.js 프로젝트 시작하기',
      language: 'bash',
      snippet: `# Next.js 프로젝트 생성
npx create-next-app@latest my-next-app

# TypeScript 사용 시
npx create-next-app@latest my-next-app --typescript

# 프로젝트 폴더로 이동
cd my-next-app

# 개발 서버 실행
npm run dev`,
    },
    folderStructure: {
      title: 'Next.js 기본 프로젝트 구조',
      structure: [
        {
          path: 'pages/',
          description: '페이지 및 라우팅을 위한 폴더. 각 파일은 경로에 해당하는 페이지가 됩니다.',
        },
        {
          path: 'pages/_app.js',
          description: '모든 페이지를 래핑하는 커스텀 App 컴포넌트. 전역 스타일, 레이아웃 등을 설정합니다.',
        },
        {
          path: 'pages/_document.js',
          description: 'HTML 문서 구조를 커스터마이징하는 파일. <html>, <body> 태그 등을 수정할 수 있습니다.',
        },
        {
          path: 'pages/api/',
          description: 'API 라우트를 위한 폴더. 서버리스 API 함수를 생성합니다.',
        },
        {
          path: 'public/',
          description: "정적 파일(이미지, 폰트 등)을 저장하는 폴더. '/public/image.png'는 '/image.png'로 접근됩니다.",
        },
        {
          path: 'styles/',
          description: 'CSS, SCSS 등의 스타일 파일을 저장하는 폴더.',
        },
        {
          path: 'components/',
          description: '재사용 가능한 React 컴포넌트를 저장하는 폴더 (관례적).',
        },
        {
          path: 'next.config.js',
          description: 'Next.js 설정 파일. 웹팩 설정, 환경 변수, 이미지 최적화 등을 설정할 수 있습니다.',
        },
        {
          path: 'package.json',
          description: '프로젝트 의존성 및 스크립트 정의 파일.',
        },
      ],
    },
    vsReact: {
      title: 'React와 Next.js 비교',
      comparison: [
        {
          feature: '렌더링',
          react: '기본적으로 클라이언트 사이드 렌더링(CSR)만 지원',
          nextjs: '서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 증분 정적 재생성(ISR), CSR 지원',
        },
        {
          feature: '라우팅',
          react: '별도의 라이브러리(React Router 등) 필요',
          nextjs: '파일 시스템 기반 라우팅 내장',
        },
        {
          feature: '데이터 페칭',
          react: 'useEffect 훅이나 외부 라이브러리 사용',
          nextjs: 'getServerSideProps, getStaticProps 등의 내장 함수 제공',
        },
        {
          feature: 'API 엔드포인트',
          react: '별도의 백엔드 서버 필요',
          nextjs: 'API 라우트 내장으로 서버리스 함수 구현 가능',
        },
        {
          feature: '빌드 최적화',
          react: '수동 설정 필요',
          nextjs: '자동 코드 분할, 이미지 최적화 등 기본 제공',
        },
        {
          feature: '설정',
          react: '웹팩, 바벨 등 직접 설정 필요',
          nextjs: '제로 설정으로 바로 시작 가능',
        },
        {
          feature: '타입스크립트',
          react: '별도 설정 필요',
          nextjs: '기본 지원',
        },
      ],
    },
    resources: [
      {
        name: 'Next.js 공식 문서',
        url: 'https://nextjs.org/docs',
        type: 'documentation',
      },
      {
        name: 'Next.js GitHub 저장소',
        url: 'https://github.com/vercel/next.js',
        type: 'code',
      },
      {
        name: 'Next.js 학습 코스',
        url: 'https://nextjs.org/learn',
        type: 'tutorial',
      },
    ],
  },
  {
    id: 'nextjs-installation',
    title: 'Next.js 설치 및 프로젝트 시작',
    description: 'Next.js 프로젝트를 설치하고 설정하는 방법을 배웁니다.',
    content: `Next.js 프로젝트를 시작하는 가장 쉬운 방법은 공식 create-next-app 도구를 사용하는 것입니다. 이 도구는 Next.js 애플리케이션을 위한 보일러플레이트를 생성하고, 필요한 모든 의존성을 설치합니다.

create-next-app은 다양한 템플릿과 함께 사용할 수 있으며, TypeScript, ESLint, Tailwind CSS 등의 도구를 포함하도록 설정할 수 있습니다. 또한 최신 Next.js 기능을 활용하기 위한 App Router나 기존 Pages Router 중에서 선택할 수 있습니다.

프로젝트가 생성되면 'npm run dev' 명령어로 개발 서버를 실행할 수 있습니다. 기본적으로 http://localhost:3000에서 애플리케이션에 접근할 수 있습니다.`,
    steps: [
      {
        title: '필수 조건',
        description: 'Node.js 16.8.0 이상 버전이 설치되어 있어야 합니다.',
        code: 'node -v',
      },
      {
        title: '프로젝트 생성',
        description: 'create-next-app을 사용하여 새 프로젝트를 생성합니다.',
        code: 'npx create-next-app@latest my-next-app',
      },
      {
        title: '설정 옵션',
        description: '프로젝트 생성 시 다양한 옵션을 선택할 수 있습니다.',
        options: [
          'TypeScript 사용 여부',
          'ESLint 사용 여부',
          'Tailwind CSS 사용 여부',
          'src/ 디렉토리 사용 여부',
          'App Router 사용 여부 (최신)',
          '커스텀 import 별칭 설정',
        ],
      },
      {
        title: '프로젝트 폴더로 이동',
        description: '생성된 프로젝트 폴더로 이동합니다.',
        code: 'cd my-next-app',
      },
      {
        title: '개발 서버 실행',
        description: '개발 서버를 실행하여 애플리케이션을 확인합니다.',
        code: 'npm run dev',
      },
    ],
    code: {
      title: '첫 번째 Next.js 페이지 수정하기',
      language: 'jsx',
      snippet: `// pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My First Next.js App</title>
        <meta name="description" content="Created with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          안녕하세요! 이것은 Next.js로 만든 첫 번째 페이지입니다.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}`,
    },
    scripts: {
      title: 'package.json 스크립트',
      description: 'Next.js 프로젝트에서 사용할 수 있는 주요 npm 스크립트',
      items: [
        {
          name: 'dev',
          command: 'npm run dev',
          description: '개발 서버 실행 (핫 리로딩 포함)',
        },
        {
          name: 'build',
          command: 'npm run build',
          description: '프로덕션용 애플리케이션 빌드',
        },
        {
          name: 'start',
          command: 'npm start',
          description: '프로덕션 빌드 실행 (먼저 빌드 필요)',
        },
        {
          name: 'lint',
          command: 'npm run lint',
          description: 'ESLint로 코드 린팅 수행',
        },
      ],
    },
    configuration: {
      title: '기본 설정 파일',
      files: [
        {
          name: 'next.config.js',
          description: 'Next.js 커스텀 설정 파일',
          example: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  // 기타 설정...
};

module.exports = nextConfig;`,
        },
        {
          name: '.env.local',
          description: '환경 변수 설정 파일 (Git에 커밋되지 않음)',
          example: `# 환경 변수 설정
API_URL=https://api.example.com
SECRET_KEY=your_secret_key_here`,
        },
        {
          name: 'jsconfig.json / tsconfig.json',
          description: 'JavaScript/TypeScript 설정 파일',
          example: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/styles/*": ["styles/*"]
    }
  }
}`,
        },
      ],
    },
    troubleshooting: [
      {
        problem: '모듈을 찾을 수 없음',
        solution: 'npm install 명령어로 의존성을 재설치해보세요.',
      },
      {
        problem: '포트 충돌',
        solution: 'PORT=3001 npm run dev 명령어로 다른 포트를 사용하세요.',
      },
      {
        problem: '빌드 오류',
        solution: '콘솔 오류 메시지를 확인하고, next.config.js 설정이 올바른지 검토하세요.',
      },
    ],
  },
  {
    id: 'pages-vs-app-router',
    title: 'Pages Router vs App Router',
    description: 'Next.js의 두 가지 라우팅 시스템을 비교하고 이해합니다.',
    content: `Next.js는 현재 두 가지 라우팅 시스템을 제공합니다: 기존의 Pages Router와 Next.js 13에서 도입된 새로운 App Router입니다. 두 시스템은 공존할 수 있으며, 동일한 Next.js 프로젝트에서 함께 사용할 수 있습니다.

Pages Router는 pages/ 디렉토리를 기반으로 하며, 직관적이고 간단한 파일 시스템 기반 라우팅을 제공합니다. 각 파일은 경로에 해당하는 React 컴포넌트를 내보내며, 특수 함수(getStaticProps, getServerSideProps 등)를 사용하여 데이터를 가져올 수 있습니다.

App Router는 app/ 디렉토리를 기반으로 하며, React 서버 컴포넌트, 중첩 라우팅, 레이아웃 등의 새로운 React 기능을 활용합니다. 폴더와 파일이 URL 경로를 정의하고, 특수 파일(page.js, layout.js 등)이 각 경로의 UI를 구성합니다.

새로운 프로젝트에서는 일반적으로 App Router를 사용하는 것이 권장되지만, 기존 코드베이스나 특정 요구 사항에 따라 Pages Router를 사용해도 됩니다.`,
    comparison: {
      title: 'Pages Router vs App Router 비교',
      items: [
        {
          feature: '기본 디렉토리',
          pages: 'pages/',
          app: 'app/',
        },
        {
          feature: '라우팅 정의',
          pages: '파일 이름과 경로(예: pages/about.js → /about)',
          app: '폴더 구조(예: app/about/page.js → /about)',
        },
        {
          feature: '데이터 페칭',
          pages: 'getStaticProps, getServerSideProps 등의 함수',
          app: '서버 컴포넌트 내에서 직접 비동기 데이터 페칭',
        },
        {
          feature: '렌더링 모델',
          pages: '전체 페이지 렌더링',
          app: '세분화된 서버/클라이언트 컴포넌트',
        },
        {
          feature: '레이아웃',
          pages: '_app.js, 중첩 레이아웃은 수동 구현',
          app: 'layout.js 파일로 중첩 레이아웃 자동 지원',
        },
        {
          feature: '로딩 상태',
          pages: '수동 구현',
          app: 'loading.js 파일로 자동 스트리밍',
        },
        {
          feature: '에러 처리',
          pages: '수동 구현 또는 Error Boundary',
          app: 'error.js 파일로 자동 처리',
        },
      ],
    },
    code: {
      title: '동일한 라우트의 Pages Router와 App Router 비교',
      language: 'jsx',
      pages: `// Pages Router: pages/products/[id].js
import { useRouter } from 'next/router';

// 클라이언트 컴포넌트
export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  
  return <div>제품 ID: {id}</div>;
}

// 서버에서 데이터 가져오기
export async function getServerSideProps({ params }) {
  const res = await fetch(\`https://api.example.com/products/\${params.id}\`);
  const product = await res.json();
  
  return {
    props: { product },
  };
}`,
      app: `// App Router: app/products/[id]/page.js
// 기본적으로 서버 컴포넌트
export default async function Product({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);
  
  return <div>제품 ID: {id}</div>;
}

// 서버 컴포넌트 내에서 직접 비동기 데이터 가져오기
async function fetchProduct(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
}`,
    },
    migrationTips: [
      '점진적으로 마이그레이션하세요. 두 라우터는 같은 프로젝트에 공존할 수 있습니다.',
      'getStaticProps/getServerSideProps를 서버 컴포넌트의 직접 데이터 페칭으로 변환하세요.',
      '_app.js와 _document.js는 app/layout.js로 이전하세요.',
      "클라이언트 컴포넌트에는 'use client' 지시어를 추가하세요.",
      '동적 라우트 매개변수를 router.query에서 params 또는 searchParams 프롭으로 변경하세요.',
      '페이지 간 이동은 useRouter() 대신 next/navigation의 hooks를 사용하세요.',
    ],
    whenToUse: {
      title: '어떤 라우터를 사용해야 할까?',
      pages: [
        '레거시 Next.js 애플리케이션 유지',
        '서드파티 라이브러리와의 호환성 필요',
        '간단한 정적 사이트나 블로그',
        '빠른 개발이 필요한 소규모 프로젝트',
      ],
      app: [
        '새로운 Next.js 프로젝트',
        'React Server Components 활용',
        '복잡한 레이아웃 및 중첩 라우팅',
        '스트리밍 및 서스펜스 기능 필요',
        '더 나은 성능과 번들 크기 최적화 필요',
      ],
    },
  },
  {
    id: 'next-js-config',
    title: 'Next.js 설정 및 환경 변수',
    description: 'Next.js 프로젝트의 설정 방법과 환경 변수 관리에 대해 배웁니다.',
    content: `Next.js는 next.config.js 파일을 통해 다양한 설정을 제공합니다. 이 파일을 통해 웹팩 설정 확장, 환경 변수 설정, 이미지 최적화, 리다이렉션 및 리라이팅 규칙 등을 구성할 수 있습니다.

또한 Next.js는 .env.local, .env.development, .env.production 등의 파일을 통해 환경 변수를 관리할 수 있는 내장 지원을 제공합니다. 환경 변수는 서버 측 코드에서 process.env를 통해 접근할 수 있으며, 클라이언트 측 코드에서는 NEXT_PUBLIC_ 접두사가 붙은 환경 변수만 접근할 수 있습니다.

이러한 설정과 환경 변수 관리를 통해 개발, 테스트, 프로덕션 환경에 맞는 애플리케이션 동작을 구성할 수 있습니다.`,
    keyPoints: [
      'next.config.js는 Next.js 프로젝트의 주요 설정 파일입니다.',
      '환경 변수는 .env 파일을 통해 관리할 수 있습니다.',
      '클라이언트에 노출할 환경 변수는 NEXT_PUBLIC_ 접두사를 사용해야 합니다.',
      '설정 파일은 JavaScript 또는 TypeScript로 작성할 수 있습니다.',
      '설정 변경 후에는 개발 서버를 재시작해야 합니다.',
    ],
    code: {
      title: 'next.config.js 기본 설정',
      language: 'javascript',
      snippet: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // 개발 모드에서 React 엄격 모드 활성화
  reactStrictMode: true,
  
  // 이미지 최적화 설정
  images: {
    domains: ['example.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // 환경 변수 설정
  env: {
    customKey: 'custom-value',
  },
  
  // 리다이렉션 설정
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 상태 코드
      },
    ];
  },
  
  // URL 재작성 설정
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  
  // 빌드 출력 디렉토리 설정
  distDir: 'build',
  
  // 국제화 설정
  i18n: {
    locales: ['en', 'ko', 'ja'],
    defaultLocale: 'en',
  },
  
  // 트레일링 슬래시 설정
  trailingSlash: false,
  
  // 웹팩 설정 확장
  webpack: (config, { isServer }) => {
    // 웹팩 설정 커스터마이징
    return config;
  },
};

module.exports = nextConfig;`,
    },
    envVariables: {
      title: '환경 변수 관리',
      description: '다양한 환경별 환경 변수 파일과 사용 방법',
      files: [
        {
          name: '.env',
          description: '모든 환경에서 사용되는 기본 환경 변수',
          example: 'BASE_URL=https://example.com',
        },
        {
          name: '.env.local',
          description: '로컬에서만 사용되는 환경 변수 (Git에 커밋되지 않음)',
          example: 'API_KEY=your-secret-api-key',
        },
        {
          name: '.env.development',
          description: '개발 환경에서만 사용되는 환경 변수',
          example: 'API_URL=https://dev-api.example.com',
        },
        {
          name: '.env.production',
          description: '프로덕션 환경에서만 사용되는 환경 변수',
          example: 'API_URL=https://api.example.com',
        },
        {
          name: '.env.test',
          description: '테스트 환경에서만 사용되는 환경 변수',
          example: 'API_URL=https://test-api.example.com',
        },
      ],
      usage: {
        title: '환경 변수 사용 예시',
        server: `// 서버 측 코드(getServerSideProps, API 라우트 등)
export async function getServerSideProps() {
  // 모든 환경 변수에 접근 가능
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  
  const res = await fetch(\`\${apiUrl}/data\`, {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`
    }
  });
  
  const data = await res.json();
  
  return {
    props: { data }
  };
}`,
        client: `// 클라이언트 측 코드
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // NEXT_PUBLIC_ 접두사가 있는 환경 변수만 접근 가능
    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
    
    // 접근 불가능 (undefined)
    console.log(process.env.API_KEY);
  }, []);
  
  return <div>홈페이지</div>;
}`,
      },
    },
    commonConfigurations: [
      {
        title: '바벨 설정',
        description: '바벨 설정을 커스터마이징하는 방법',
        code: `// .babelrc
{
  "presets": ["next/babel"],
  "plugins": [
    ["styled-components", { "ssr": true }]
  ]
}`,
      },
      {
        title: 'TypeScript 설정',
        description: 'TypeScript 설정을 커스터마이징하는 방법',
        code: `// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@styles/*": ["styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
      },
      {
        title: 'ESLint 설정',
        description: 'ESLint 설정을 커스터마이징하는 방법',
        code: `// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "eslint:recommended"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "warn"
  }
}`,
      },
    ],
    bestPractices: [
      '민감한 정보는 항상 .env.local 파일에 저장하고 Git에 커밋하지 마세요.',
      '클라이언트에 노출되어야 하는 환경 변수는 항상 NEXT_PUBLIC_ 접두사를 사용하세요.',
      '배포 환경별로 적절한 환경 변수 파일을 사용하세요.',
      '설정 변경 후에는 개발 서버를 재시작하세요.',
      '설정 파일을 모듈화하여 유지보수하기 쉽게 만드세요.',
      '실험적 기능은 신중하게 사용하고 문서화하세요.',
    ],
  },
];

export default basics;
