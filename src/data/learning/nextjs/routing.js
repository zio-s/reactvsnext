// data/learning/nextjs/routing.js
// Next.js 라우팅 학습 데이터

const routing = [
  {
    id: 'app-router-basics',
    title: 'App Router 기본',
    description: 'Next.js 13+ App Router의 파일 기반 라우팅 시스템을 이해합니다.',
    content: `App Router는 Next.js 13에서 도입된 새로운 라우팅 시스템으로, React Server Components를 기반으로 합니다. 폴더 구조가 URL 구조를 결정하며, 특수 파일 이름으로 UI를 정의합니다.

App Router는 기존 Pages Router보다 더 유연하고 강력한 기능을 제공하며, 레이아웃 공유, 중첩 라우팅, 로딩 상태 관리 등을 간편하게 구현할 수 있습니다.

폴더는 경로 세그먼트를 정의하고, page.js 파일이 실제 페이지 UI를 렌더링합니다. 이를 통해 명확한 구조와 재사용 가능한 레이아웃을 만들 수 있습니다.`,
    keyPoints: [
      'app/ 디렉토리가 라우팅의 기본',
      '폴더가 URL 경로 세그먼트를 정의',
      'page.js가 공개적으로 접근 가능한 페이지를 생성',
      'layout.js로 여러 페이지가 공유하는 레이아웃 정의',
      'React Server Components 기반으로 동작',
    ],
    code: {
      title: '기본 라우팅 구조',
      language: 'jsx',
      snippet: `// app/page.js - 홈페이지 (/)
export default function HomePage() {
  return <h1>홈페이지</h1>;
}

// app/about/page.js - About 페이지 (/about)
export default function AboutPage() {
  return <h1>회사 소개</h1>;
}

// app/blog/page.js - 블로그 목록 (/blog)
export default function BlogPage() {
  return <h1>블로그</h1>;
}

// app/blog/[slug]/page.js - 블로그 상세 (/blog/:slug)
export default function BlogPost({ params }) {
  return <h1>블로그 포스트: {params.slug}</h1>;
}`,
    },
    folderStructure: {
      title: '폴더 구조와 URL 매핑',
      structure: [
        { path: 'app/page.js', description: '/ - 루트 페이지' },
        { path: 'app/about/page.js', description: '/about - About 페이지' },
        { path: 'app/blog/page.js', description: '/blog - 블로그 목록' },
        { path: 'app/blog/[id]/page.js', description: '/blog/123 - 동적 블로그 포스트' },
        { path: 'app/dashboard/settings/page.js', description: '/dashboard/settings - 중첩된 경로' },
      ],
    },
    resources: [
      {
        name: 'Next.js App Router 문서',
        url: 'https://nextjs.org/docs/app',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'dynamic-routes',
    title: '동적 라우트',
    description: '동적 세그먼트를 사용하여 매개변수 기반 페이지를 생성합니다.',
    content: `동적 라우트는 대괄호 [] 문법을 사용하여 생성됩니다. 이를 통해 블로그 포스트, 제품 상세 페이지 등 매개변수에 따라 달라지는 페이지를 만들 수 있습니다.

Catch-all 라우트는 [...slug] 문법으로 여러 세그먼트를 캡처할 수 있으며, 선택적 Catch-all은 [[...slug]]로 해당 세그먼트가 없을 때도 매칭됩니다.

generateStaticParams 함수를 사용하면 빌드 시점에 정적 페이지를 미리 생성할 수 있어 성능이 향상됩니다.`,
    keyPoints: [
      '[id], [slug] 등 대괄호로 동적 세그먼트 정의',
      'params 프롭으로 동적 매개변수 접근',
      '[...slug]로 모든 후속 세그먼트 캡처',
      '[[...slug]]로 선택적 catch-all 라우트 생성',
      'generateStaticParams로 정적 생성 가능',
    ],
    code: {
      title: '동적 라우트 예시',
      language: 'jsx',
      snippet: `// app/products/[id]/page.js
export default function ProductPage({ params }) {
  return (
    <div>
      <h1>제품 ID: {params.id}</h1>
    </div>
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// app/blog/[...slug]/page.js - Catch-all
export default function BlogPost({ params }) {
  // params.slug는 배열: ['2024', '01', 'post-title']
  const path = params.slug.join('/');
  return <h1>경로: {path}</h1>;
}

// app/shop/[[...slug]]/page.js - 선택적 Catch-all
export default function ShopPage({ params }) {
  // /shop 또는 /shop/category 모두 매칭
  const category = params.slug ? params.slug.join('/') : '전체';
  return <h1>카테고리: {category}</h1>;
}`,
    },
    bestPractices: [
      '동적 라우트는 가능한 한 정적 생성(generateStaticParams) 사용',
      '여러 동적 세그먼트 조합 시 명확한 네이밍 사용',
      'Catch-all 라우트는 진짜 필요할 때만 사용',
      '동적 매개변수 타입 검증 추가 (숫자, 문자열 등)',
    ],
  },
  {
    id: 'layouts-templates',
    title: '레이아웃과 템플릿',
    description: '여러 페이지에서 공유하는 UI 구조를 정의합니다.',
    content: `레이아웃(layout.js)은 여러 페이지 간에 공유되는 UI를 정의하며, 중첩될 수 있습니다. 레이아웃은 상태를 유지하고 리렌더링되지 않습니다.

템플릿(template.js)은 레이아웃과 유사하지만, 각 탐색 시 새로운 인스턴스가 생성되어 상태가 리셋됩니다. 이는 페이지 전환 애니메이션이나 useEffect로 로깅할 때 유용합니다.

루트 레이아웃(app/layout.js)은 필수이며, <html>과 <body> 태그를 포함해야 합니다.`,
    keyPoints: [
      'layout.js로 중첩 가능한 레이아웃 정의',
      '루트 레이아웃은 필수이며 <html>, <body> 포함',
      '레이아웃은 상태를 유지하고 리렌더링되지 않음',
      'template.js는 매번 새 인스턴스 생성',
      '여러 레이아웃을 중첩하여 복잡한 UI 구성',
    ],
    code: {
      title: '레이아웃 사용 예시',
      language: 'jsx',
      snippet: `// app/layout.js - 루트 레이아웃 (필수)
export const metadata = {
  title: 'My Next.js App',
  description: 'Built with Next.js 13+',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <nav>전역 네비게이션</nav>
        </header>
        {children}
        <footer>전역 푸터</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js - 대시보드 레이아웃
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>대시보드 사이드바</aside>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/template.js - 매번 리렌더링되는 템플릿
'use client';

import { useEffect } from 'react';

export default function DashboardTemplate({ children }) {
  useEffect(() => {
    console.log('새 페이지 로드됨'); // 페이지 전환마다 실행
  }, []);

  return <div className="fade-in">{children}</div>;
}`,
    },
  },
  {
    id: 'route-groups',
    title: '라우트 그룹',
    description: 'URL에 영향을 주지 않고 라우트를 논리적으로 그룹화합니다.',
    content: `라우트 그룹은 괄호 (folderName)을 사용하여 생성되며, URL 경로에는 포함되지 않습니다. 이를 통해 라우트를 논리적으로 조직화하고, 같은 세그먼트 수준에서 다른 레이아웃을 적용할 수 있습니다.

라우트 그룹은 마케팅 페이지, 관리자 페이지, 쇼핑 섹션 등 사이트의 다른 부분에 대해 완전히 다른 레이아웃을 만들 때 유용합니다.

여러 루트 레이아웃을 만들 수도 있으며, 이 경우 각 그룹에 자체 layout.js 파일이 필요합니다.`,
    keyPoints: [
      '(folderName) 문법으로 라우트 그룹 생성',
      'URL 경로에는 영향을 주지 않음',
      '같은 레벨에서 다른 레이아웃 적용 가능',
      '여러 루트 레이아웃 생성 가능',
      '코드를 논리적으로 조직화',
    ],
    code: {
      title: '라우트 그룹 예시',
      language: 'jsx',
      snippet: `// 폴더 구조
// app/
// ├── (marketing)/
// │   ├── layout.js
// │   ├── about/page.js      → /about
// │   └── contact/page.js    → /contact
// ├── (shop)/
// │   ├── layout.js
// │   ├── products/page.js   → /products
// │   └── cart/page.js       → /cart
// └── (admin)/
//     ├── layout.js
//     └── dashboard/page.js  → /dashboard

// app/(marketing)/layout.js
export default function MarketingLayout({ children }) {
  return (
    <div>
      <nav>마케팅 네비게이션</nav>
      {children}
      <footer>마케팅 푸터</footer>
    </div>
  );
}

// app/(shop)/layout.js
export default function ShopLayout({ children }) {
  return (
    <div>
      <nav>쇼핑 네비게이션</nav>
      <div className="shop-sidebar">카테고리</div>
      {children}
    </div>
  );
}`,
    },
  },
  {
    id: 'link-navigation',
    title: '링크와 네비게이션',
    description: '페이지 간 이동을 위한 Link 컴포넌트와 프로그래매틱 네비게이션을 배웁니다.',
    content: `Next.js는 <Link> 컴포넌트를 제공하여 클라이언트 사이드 네비게이션을 구현합니다. 이는 전체 페이지 새로고침 없이 빠른 페이지 전환을 가능하게 합니다.

App Router에서는 next/navigation의 useRouter, usePathname, useSearchParams 훅을 사용하여 프로그래매틱 네비게이션과 현재 경로 정보를 얻을 수 있습니다.

Link 컴포넌트는 뷰포트에 보이는 링크를 자동으로 프리페치하여 성능을 최적화합니다.`,
    keyPoints: [
      '<Link> 컴포넌트로 클라이언트 사이드 네비게이션',
      '자동 프리페칭으로 빠른 페이지 전환',
      'useRouter 훅으로 프로그래매틱 네비게이션',
      'usePathname, useSearchParams로 현재 경로 정보 접근',
      'next/navigation 훅은 클라이언트 컴포넌트에서만 사용',
    ],
    code: {
      title: 'Link와 네비게이션 예시',
      language: 'jsx',
      snippet: `// Link 컴포넌트 사용
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/about">회사 소개</Link>
      <Link href="/blog">블로그</Link>

      {/* 동적 라우트 */}
      <Link href={\`/blog/\${postId}\`}>블로그 포스트</Link>

      {/* 쿼리 파라미터 */}
      <Link href={{ pathname: '/search', query: { q: 'nextjs' } }}>
        검색
      </Link>
    </nav>
  );
}

// 프로그래매틱 네비게이션
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로
  const searchParams = useSearchParams(); // URL 파라미터

  const handleClick = () => {
    router.push('/dashboard'); // 페이지 이동
    router.back();             // 뒤로 가기
    router.forward();          // 앞으로 가기
    router.refresh();          // 페이지 새로고침
  };

  return (
    <div>
      <p>현재 경로: {pathname}</p>
      <button onClick={handleClick}>대시보드로 이동</button>
    </div>
  );
}`,
    },
    bestPractices: [
      '내부 링크는 항상 <Link> 컴포넌트 사용',
      '외부 링크는 <a> 태그 사용 (rel="noopener noreferrer" 추가)',
      '대규모 목록에서는 prefetch={false} 고려',
      'useRouter는 클라이언트 컴포넌트에서만 사용',
    ],
  },
  {
    id: 'loading-error-handling',
    title: '로딩 및 에러 처리',
    description: 'loading.js와 error.js를 사용한 로딩 상태와 에러 처리 방법을 배웁니다.',
    content: `Next.js App Router는 loading.js와 error.js 특수 파일을 통해 로딩 상태와 에러를 선언적으로 처리할 수 있습니다.

loading.js는 페이지 콘텐츠가 로드되는 동안 표시되는 로딩 UI를 정의합니다. React Suspense를 기반으로 동작하며, 서버 컴포넌트의 데이터 페칭 중에 자동으로 표시됩니다.

error.js는 런타임 에러를 처리하는 React Error Boundary를 생성합니다. 에러가 발생한 세그먼트만 에러 UI로 대체되며, 나머지 앱은 정상 동작합니다.`,
    keyPoints: [
      'loading.js로 로딩 UI 정의',
      'React Suspense 기반 스트리밍',
      'error.js로 에러 바운더리 생성',
      'not-found.js로 404 페이지 커스터마이징',
      '에러 복구 기능 제공',
    ],
    code: {
      title: '로딩 및 에러 처리 예시',
      language: 'jsx',
      snippet: `// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      <span className="ml-2">로딩 중...</span>
    </div>
  );
}

// app/dashboard/error.js
'use client'; // Error 컴포넌트는 반드시 클라이언트 컴포넌트

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('에러 발생:', error);
  }, [error]);

  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-bold text-red-600">
        문제가 발생했습니다!
      </h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        다시 시도
      </button>
    </div>
  );
}

// app/not-found.js - 404 페이지
export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mt-2">
        요청하신 페이지가 존재하지 않습니다.
      </p>
    </div>
  );
}`,
    },
  },
];

export default routing;
