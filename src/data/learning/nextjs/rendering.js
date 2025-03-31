// data/learning/nextjs/rendering.js
// Next.js 렌더링 방식 학습 데이터

const rendering = [
  {
    id: 'rendering-overview',
    title: 'Next.js의 다양한 렌더링 방식',
    description: 'Next.js에서 제공하는 여러 렌더링 전략을 이해하고 적절한 사용 사례를 배웁니다.',
    content: `Next.js는 웹 애플리케이션의 서로 다른 부분에 대해 다양한 렌더링 전략을 선택할 수 있는 유연성을 제공합니다. 이는 성능, SEO, 사용자 경험 등의 요구 사항에 따라 최적의 방식을 선택할 수 있게 해줍니다.

주요 렌더링 방식으로는 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 점진적 정적 재생성(ISR), 클라이언트 사이드 렌더링(CSR)이 있습니다. 각 방식은 고유한 장단점이 있으며, 페이지의 특성에 따라 적절한 방식을 선택해야 합니다.

Next.js는 페이지별로 다른 렌더링 방식을 적용할 수 있어, 하이브리드 애플리케이션을 구축할 수 있습니다. 예를 들어, 자주 변경되지 않는 마케팅 페이지는 SSG로, 사용자별 맞춤 콘텐츠를 제공하는 대시보드는 SSR로 구현할 수 있습니다.`,
    keyPoints: [
      '서버 사이드 렌더링(SSR): 각 요청마다 서버에서 페이지 렌더링',
      '정적 사이트 생성(SSG): 빌드 시 모든 페이지를 미리 렌더링',
      '증분 정적 재생성(ISR): 일정 시간마다 페이지를 백그라운드에서 다시 생성',
      '클라이언트 사이드 렌더링(CSR): 브라우저에서 JavaScript로 렌더링',
      '서버 컴포넌트(App Router): 서버에서 렌더링되고 캐시될 수 있는 컴포넌트',
      '클라이언트 컴포넌트(App Router): 브라우저에서 인터랙티브 요소를 처리하는 컴포넌트',
    ],
    renderingComparison: {
      title: '렌더링 방식 비교',
      table: [
        {
          feature: '초기 로딩 성능',
          ssr: '중간',
          ssg: '매우 좋음',
          isr: '매우 좋음',
          csr: '느림',
        },
        {
          feature: 'SEO',
          ssr: '좋음',
          ssg: '매우 좋음',
          isr: '매우 좋음',
          csr: '제한적',
        },
        {
          feature: '데이터 최신성',
          ssr: '매우 좋음',
          ssg: '제한적 (빌드 시점 데이터)',
          isr: '좋음 (주기적 업데이트)',
          csr: '매우 좋음',
        },
        {
          feature: '서버 부하',
          ssr: '높음',
          ssg: '없음',
          isr: '낮음',
          csr: '없음',
        },
        {
          feature: '사용자별 콘텐츠',
          ssr: '지원',
          ssg: '제한적',
          isr: '제한적',
          csr: '지원',
        },
        {
          feature: '빌드 시간',
          ssr: '빠름',
          ssg: '페이지 수에 비례',
          isr: '페이지 수에 비례',
          csr: '빠름',
        },
      ],
    },
    decisionTree: {
      title: '렌더링 방식 선택 가이드',
      questions: [
        {
          question: '페이지가 사용자별로 다른 콘텐츠를 보여주나요?',
          yes: 'SSR 또는 CSR을 고려하세요.',
          no: 'SSG 또는 ISR이 좋은 선택일 수 있습니다.',
        },
        {
          question: '데이터가 자주 변경되나요?',
          yes: 'SSR 또는 짧은 revalidate 시간을 가진 ISR을 고려하세요.',
          no: 'SSG가 가장 좋은 성능을 제공합니다.',
        },
        {
          question: 'SEO가 중요한가요?',
          yes: 'SSG, ISR 또는 SSR을 사용하세요.',
          no: 'CSR도 고려할 수 있습니다.',
        },
        {
          question: '서버 부하를 줄이는 것이 중요한가요?',
          yes: 'SSG 또는 ISR을 고려하세요.',
          no: 'SSR도 좋은 선택일 수 있습니다.',
        },
      ],
    },
  },
  {
    id: 'server-side-rendering',
    title: '서버 사이드 렌더링 (SSR)',
    description: '각 요청마다 서버에서 페이지를 생성하는 방식을 배웁니다.',
    content: `서버 사이드 렌더링(SSR)은 페이지 요청이 있을 때마다 서버에서 페이지를 실시간으로 생성하여 클라이언트에 전달하는 방식입니다. 이 방식은 항상 최신 데이터를 포함한 페이지를 제공할 수 있고, 사용자별 맞춤 콘텐츠가 필요한 경우에 적합합니다.

SSR의 주요 장점은 SEO 최적화와 초기 로딩 시 사용자에게 완성된 HTML을 빠르게 보여줄 수 있다는 점입니다. 검색 엔진은 JavaScript를 실행하지 않고도 페이지 콘텐츠를 크롤링할 수 있습니다.

반면, 각 요청마다 서버에서 렌더링을 수행하기 때문에 서버 부하가 발생하고, 렌더링 시간에 따라 응답 시간이 달라질 수 있다는 단점이 있습니다. 또한 Time To Interactive(TTI)가 정적 페이지보다 느릴 수 있습니다.

Next.js에서는 Pages Router에서 getServerSideProps 함수를 사용하거나, App Router에서 기본적으로 서버 컴포넌트를 통해 SSR을 구현할 수 있습니다.`,
    keyPoints: [
      '매 요청마다 페이지 HTML을 새로 생성',
      '항상 최신 데이터 제공',
      '사용자별 맞춤 콘텐츠에 적합',
      '서버 부하 발생 가능',
      'SEO에 유리',
      '초기 로딩 빠름, 인터랙티브 지연 가능',
    ],
    code: {
      title: 'Pages Router에서의 SSR 구현',
      language: 'jsx',
      snippet: `// pages/ssr-example.js
export async function getServerSideProps(context) {
  // context 객체에는 req, res, query 등의 정보가 포함됩니다
  const { req, res, query, params } = context;
  
  // 쿠키 접근
  const cookies = req.headers.cookie;
  
  // 외부 API에서 데이터 가져오기
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  // 사용자 인증 확인
  const user = getUserFromCookie(cookies);
  
  // 리다이렉션이 필요한 경우
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // 페이지 컴포넌트에 props로 전달할 데이터
  return {
    props: {
      data,
      user,
      timestamp: new Date().toISOString(),
    },
  };
}

export default function SSRPage({ data, user, timestamp }) {
  return (
    <div>
      <h1>서버 사이드 렌더링 예제</h1>
      <p>안녕하세요, {user.name}님!</p>
      <p>현재 시간: {timestamp}</p>
      <div>
        <h2>데이터:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}`,
    },
    appRouterExample: {
      title: 'App Router에서의 SSR 구현',
      description: 'React 서버 컴포넌트를 사용한 SSR',
      code: `// app/ssr-example/page.js
// 기본적으로 서버 컴포넌트로 동작합니다
export default async function SSRPage() {
  // 서버에서 직접 데이터 페칭
  const data = await fetch('https://api.example.com/data', { cache: 'no-store' });
  const jsonData = await data.json();
  
  // 현재 시간 가져오기
  const timestamp = new Date().toISOString();
  
  return (
    <div>
      <h1>서버 사이드 렌더링 예제 (App Router)</h1>
      <p>현재 시간: {timestamp}</p>
      <div>
        <h2>데이터:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
}`,
    },
    useCases: [
      {
        scenario: '대시보드',
        description: '사용자별 실시간 데이터를 표시하는 대시보드',
      },
      {
        scenario: '전자상거래 제품 페이지',
        description: '재고 및 가격이 자주 변경되는 제품 페이지',
      },
      {
        scenario: '개인화된 콘텐츠',
        description: '사용자 프로필, 설정 또는 기본 설정에 따라 맞춤화된 페이지',
      },
      {
        scenario: '실시간 데이터 표시',
        description: '뉴스, 주식 시세, 날씨 등 실시간 정보를 표시하는 페이지',
      },
    ],
    pros: ['항상 최신 데이터 제공', '사용자별 콘텐츠 지원', 'SEO 최적화', '초기 페이지 로드 시 완성된 HTML 제공'],
    cons: ['서버 부하 증가', 'TTFB(Time To First Byte)가 느릴 수 있음', 'CDN 캐싱이 어려움', '서버 의존성이 높음'],
  },
  {
    id: 'static-site-generation',
    title: '정적 사이트 생성 (SSG)',
    description: '빌드 시점에 페이지를 미리 생성하는 방식을 배웁니다.',
    content: `정적 사이트 생성(Static Site Generation, SSG)은 빌드 시점에 HTML 페이지를 미리 생성하여 CDN이나 정적 파일 서버에 배포하는 방식입니다. 사용자 요청이 들어오면 미리 생성된 HTML을 즉시 제공하므로 매우 빠른 응답 시간을 제공합니다.

SSG는 블로그, 마케팅 사이트, 문서 등 콘텐츠가 자주 변경되지 않는 웹사이트에 이상적입니다. 모든 사용자에게 동일한 콘텐츠를 제공하며, CDN을 통해 전 세계에 효율적으로 배포할 수 있습니다.

Next.js에서 SSG는 Pages Router에서 getStaticProps 함수를 사용하거나, App Router에서 정적 렌더링(기본값)을 통해 구현할 수 있습니다. 동적 경로의 경우 getStaticPaths 함수를 통해 어떤 경로를 미리 생성할지 지정할 수 있습니다.

SSG의 주요 단점은 데이터가 빌드 시점에 고정되어 최신 데이터를 반영하기 위해서는 재빌드와 재배포가 필요하다는 점입니다. 이 문제를 해결하기 위해 Next.js는 증분 정적 재생성(ISR)이라는 하이브리드 접근 방식을 제공합니다.`,
    keyPoints: [
      '빌드 시점에 모든 페이지를 미리 생성',
      '매우 빠른 TTFB와 초기 로드 시간',
      'CDN 캐싱과 전 세계 배포에 적합',
      '서버 부하 없음',
      '빌드 시간이 페이지 수에 비례하여 증가',
      '콘텐츠 업데이트에 재빌드/재배포 필요',
    ],
    code: {
      title: 'Pages Router에서의 SSG 구현',
      language: 'jsx',
      snippet: `// pages/ssg-example.js
export async function getStaticProps() {
  // 빌드 시점에 한 번만 실행됨
  const res = await fetch('https://api.example.com/static-data');
  const data = await res.json();
  
  // 빌드 시간 기록
  const buildTime = new Date().toISOString();
  
  return {
    props: {
      data,
      buildTime,
    },
    // 선택적으로 revalidate 추가 가능 (ISR 활성화)
    // revalidate: 60, // 60초마다 페이지 재생성 시도
  };
}

export default function StaticPage({ data, buildTime }) {
  return (
    <div>
      <h1>정적 사이트 생성 예제</h1>
      <p>이 페이지는 빌드 시점에 생성되었습니다.</p>
      <p>빌드 시간: {buildTime}</p>
      <div>
        <h2>빌드 시점 데이터:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}`,
    },
    dynamicRoutesExample: {
      title: '동적 경로를 위한 SSG 설정',
      description: 'getStaticPaths를 사용한 동적 경로 생성',
      code: `// pages/posts/[slug].js
export async function getStaticPaths() {
  // 빌드 시점에 생성할 경로 목록 가져오기
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  // 각 포스트에 대한 경로 매개변수 생성
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  
  return {
    paths,
    // fallback 옵션:
    // false: 존재하지 않는 경로는 404 반환
    // true: 존재하지 않는 경로는 런타임에 SSR로 생성
    // 'blocking': 존재하지 않는 경로는 SSR로 생성 (클라이언트에서 로딩 상태 없음)
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // params에서 slug 값 추출
  const { slug } = params;
  
  // 특정 포스트 데이터 가져오기
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  const post = await res.json();
  
  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>작성자: {post.author}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`,
    },
    appRouterExample: {
      title: 'App Router에서의 SSG 구현',
      description: 'React 서버 컴포넌트를 사용한 SSG',
      code: `// app/ssg-example/page.js
// fetch 함수에 별도의 캐시 옵션을 지정하지 않으면 기본적으로 정적 생성됨
export default async function StaticPage() {
  // 기본적으로 빌드 시점에 데이터 페칭 및 캐싱
  const data = await fetch('https://api.example.com/static-data');
  const jsonData = await data.json();
  
  return (
    <div>
      <h1>정적 사이트 생성 예제 (App Router)</h1>
      <div>
        <h2>데이터:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
}

// 동적 경로 매개변수 생성
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => 
    res.json()
  );
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}`,
    },
    useCases: [
      {
        scenario: '블로그 또는 콘텐츠 사이트',
        description: '콘텐츠가 자주 변경되지 않는 블로그 포스트, 기사 등',
      },
      {
        scenario: '마케팅 웹사이트',
        description: '회사 소개, 제품 정보 등의 정적 페이지',
      },
      {
        scenario: '문서 사이트',
        description: 'API 문서, 사용자 가이드 등',
      },
      {
        scenario: '포트폴리오',
        description: '개인 또는 회사 포트폴리오 사이트',
      },
    ],
    pros: [
      '매우 빠른 페이지 로드 시간',
      '우수한 SEO',
      '낮은 운영 비용',
      '높은 신뢰성 (서버 중단에 영향 받지 않음)',
      'CDN에 쉽게，캐싱 가능',
    ],
    cons: [
      '빌드 시 데이터만 표시 (최신 데이터 반영 어려움)',
      '사용자별 콘텐츠 제공 어려움',
      '많은 페이지가 있는 경우 빌드 시간 증가',
      '동적 기능 구현을 위해 추가 클라이언트 코드 필요',
    ],
  },
  {
    id: 'incremental-static-regeneration',
    title: '증분 정적 재생성 (ISR)',
    description: '정적 페이지를 주기적으로 백그라운드에서 재생성하는 방식을 배웁니다.',
    content: `증분 정적 재생성(Incremental Static Regeneration, ISR)은 Next.js의 혁신적인 기능으로, 정적 사이트 생성(SSG)의 성능 이점과 서버 사이드 렌더링(SSR)의 데이터 최신성을 결합한 하이브리드 접근 방식입니다.

ISR을 사용하면 전체 사이트를 다시 빌드하지 않고도 페이지별로 백그라운드에서 정적 페이지를 재생성할 수 있습니다. 이는 특정 시간 간격(revalidate)으로 설정되거나 주문형(on-demand)으로 트리거될 수 있습니다.

기본 작동 방식은 다음과 같습니다:
1. 사용자가 페이지를 처음 방문하면 캐시된 정적 버전을 받습니다.
2. 설정된 시간이 지나면 Next.js는 백그라운드에서 페이지를 재생성하려고 시도합니다.
3. 재생성이 성공하면 캐시가 무효화되고 새 버전이 제공됩니다.
4. 재생성이 실패하면 기존 페이지가 계속 제공됩니다.

이 방식은 콘텐츠가 정기적으로 업데이트되지만 실시간성이 엄격하게 요구되지 않는 대규모 사이트에 이상적입니다.`,
    keyPoints: [
      '정적 생성과 서버 사이드 렌더링의 장점 결합',
      '페이지별 또는 주문형 재생성 지원',
      '백그라운드에서 페이지 재생성',
      '항상 캐시된 버전을 먼저 제공하여 빠른 응답 보장',
      '서버 부하 감소 (SSR보다 효율적)',
      '전체 사이트 재빌드 없이 콘텐츠 업데이트 가능',
    ],
    code: {
      title: 'Pages Router에서의 ISR 구현',
      language: 'jsx',
      snippet: `// pages/isr-example.js
export async function getStaticProps() {
  // 데이터 가져오기
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  // 생성 시간 기록
  const generatedAt = new Date().toISOString();
  
  return {
    props: {
      products,
      generatedAt,
    },
    // 60초마다 페이지를 백그라운드에서 재생성
    revalidate: 60,
  };
}

export default function ProductsPage({ products, generatedAt }) {
  return (
    <div>
      <h1>제품 목록</h1>
      <p>마지막 생성 시간: {generatedAt}</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    onDemandRevalidation: {
      title: '주문형 재검증 (On-Demand Revalidation)',
      description: '특정 이벤트(예: CMS 업데이트)에 따라 페이지를 재생성하는 방법',
      code: `// pages/api/revalidate.js
export default async function handler(req, res) {
  // 비밀 토큰으로 API 엔드포인트 보호
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: '유효하지 않은 토큰' });
  }
  
  try {
    // 경로 매개변수에서 재검증할 경로 가져오기
    const path = req.query.path;
    
    // 페이지 재검증
    await res.revalidate(path);
    
    return res.json({ revalidated: true });
  } catch (err) {
    // 에러가 발생하면 재검증 실패로 간주
    return res.status(500).send('오류 발생: ' + err.message);
  }
}

// 사용 예시: /api/revalidate?secret=<token>&path=/products/1`,
    },
    appRouterExample: {
      title: 'App Router에서의 ISR 구현',
      description: 'React 서버 컴포넌트와 fetch API를 사용한 ISR',
      code: `// app/isr-example/page.js
export default async function ISRPage() {
  // next: { revalidate: 60 } 옵션으로 ISR 활성화
  const data = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }
  });
  const products = await data.json();
  
  // 현재 시간 표시 (페이지가 재생성될 때마다 업데이트됨)
  const generatedAt = new Date().toISOString();
  
  return (
    <div>
      <h1>제품 목록 (ISR)</h1>
      <p>생성 시간: {generatedAt}</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// App Router에서 주문형 재검증
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '유효하지 않은 토큰' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: '경로가 필요합니다' }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}`,
    },
    useCases: [
      {
        scenario: '이커머스 제품 페이지',
        description: '가격과 재고가 주기적으로 업데이트되는 제품 정보',
      },
      {
        scenario: '뉴스 또는 블로그 사이트',
        description: '주기적으로 새로운 콘텐츠가 추가되는 사이트',
      },
      {
        scenario: 'CMS 기반 웹사이트',
        description: 'WordPress, Contentful 등의 CMS에서 관리되는 콘텐츠',
      },
      {
        scenario: '이벤트 또는 캘린더 사이트',
        description: '향후 이벤트 정보를 표시하는 사이트',
      },
    ],
    pros: [
      'SSG의 빠른 페이지 로드와 SEO 이점 유지',
      '정기적으로 최신 데이터 반영 가능',
      '전체 사이트 재빌드 없이 개별 페이지 업데이트',
      '백그라운드 재생성으로 사용자 경험 저하 없음',
      'CDN 캐싱 활용 가능',
    ],
    cons: [
      '완전한 실시간 데이터가 필요한 경우 적합하지 않음',
      '첫 방문자는 오래된 데이터를 볼 수 있음',
      'revalidate 간격 설정에 대한 고려 필요',
      '서버리스 환경에서 제약 사항 발생 가능',
    ],
  },
  {
    id: 'client-side-rendering',
    title: '클라이언트 사이드 렌더링 (CSR)',
    description: '브라우저에서 JavaScript를 사용하여 페이지를 렌더링하는 방식을 배웁니다.',
    content: `클라이언트 사이드 렌더링(CSR)은 서버에서 최소한의 HTML 구조만 전송하고, 나머지 UI는 브라우저에서 JavaScript를 실행하여 생성하는 방식입니다. 이는 전통적인 React 애플리케이션의 기본 동작 방식으로, Create React App과 같은 도구로 만든 SPA(Single Page Application)가 이 방식을 사용합니다.

Next.js에서도 클라이언트 사이드 렌더링을 활용할 수 있으며, 보통 페이지 초기 로드 후 추가 데이터를 가져오거나 사용자 인터랙션에 따라 UI를 동적으로 업데이트할 때 사용됩니다. React의 useState, useEffect 같은 훅을 사용하여 구현합니다.

CSR의 장점은 서버 부하가 적고, 초기 로드 후 페이지 전환이 빠르며, 풍부한 인터랙티브 기능을 제공할 수 있다는 것입니다. 반면, 초기 로딩 시간이 길고 SEO가 제한적이며, 자바스크립트가 비활성화된 환경에서는 사용할 수 없다는 단점이 있습니다.

Next.js의 하이브리드 렌더링 접근 방식을 통해 SSR 또는 SSG로 초기 HTML을 제공하고, 이후 클라이언트에서 인터랙티브 기능을 추가하는 방식이 일반적입니다.`,
    keyPoints: [
      '브라우저에서 JavaScript로 UI 렌더링',
      '서버에서는 최소한의 HTML만 전송',
      '동적이고 인터랙티브한 UI에 적합',
      '사용자 장치에 계산 부하 전가',
      'SPA(Single Page Application) 구현에 이상적',
      '초기 로드 후 빠른 페이지 전환',
    ],
    code: {
      title: 'Next.js에서의 CSR 구현',
      language: 'jsx',
      snippet: `// pages/csr-example.js
import { useState, useEffect } from 'react';

export default function CSRPage() {
  // 상태 관리
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 클라이언트 측에서 데이터 가져오기
  useEffect(() => {
    // 컴포넌트 마운트 후에만 실행 (브라우저 환경)
    const fetchData = async () => {
      try {
        setLoading(true);
        // 데이터 요청
        const response = await fetch('/api/data');
        
        // 응답 확인
        if (!response.ok) {
          throw new Error('데이터를 가져올 수 없습니다');
        }
        
        // 데이터 파싱
        const result = await response.json();
        
        // 상태 업데이트
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // 빈 의존성 배열 - 최초 렌더링 시 한 번만 실행
  
  // 로딩 상태 표시
  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  
  // 오류 표시
  if (error) return <div>오류: {error}</div>;
  
  // 데이터가 없을 경우
  if (!data) return <div>데이터가 없습니다</div>;
  
  // 데이터로 UI 렌더링
  return (
    <div>
      <h1>클라이언트 사이드 렌더링 예제</h1>
      <p>이 데이터는 브라우저에서 가져왔습니다.</p>
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    swr: {
      title: 'SWR 라이브러리를 사용한 CSR',
      description: 'Next.js 팀이 만든 데이터 페칭 라이브러리 사용',
      code: `// pages/swr-example.js
import useSWR from 'swr';

// 데이터 페칭 함수
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function SWRExample() {
  // SWR 훅 사용
  const { data, error, isLoading } = useSWR('/api/data', fetcher);
  
  // 로딩 상태
  if (isLoading) return <div>로딩 중...</div>;
  
  // 에러 처리
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  
  // 데이터 렌더링
  return (
    <div>
      <h1>SWR 예제</h1>
      <ul>
        {data.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// SWR의 장점:
// 1. 캐싱과 자동 재검증
// 2. 페이지 포커스 시 자동 데이터 갱신
// 3. 간격에 따른 폴링
// 4. 중복 요청 제거
// 5. 오프라인 지원`,
    },
    clientComponent: {
      title: 'App Router에서의 클라이언트 컴포넌트',
      description: "'use client' 지시어를 사용한 클라이언트 컴포넌트",
      code: `// app/client-component-example/page.js
import ClientDataFetcher from './ClientDataFetcher';

// 서버 컴포넌트
export default function Page() {
  return (
    <div>
      <h1>클라이언트 컴포넌트 예제</h1>
      <ClientDataFetcher />
    </div>
  );
}

// app/client-component-example/ClientDataFetcher.js
'use client'; // 클라이언트 컴포넌트 지시어

import { useState, useEffect } from 'react';

export default function ClientDataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  if (loading) return <p>로딩 중...</p>;
  
  return (
    <div>
      <h2>클라이언트에서 가져온 데이터</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`,
    },
    useCases: [
      {
        scenario: '대시보드와 관리자 패널',
        description: '인증 후 접근하는 데이터 시각화 및 관리 인터페이스',
      },
      {
        scenario: '인터랙티브 애플리케이션',
        description: '게임, 드로잉 도구, 계산기 등 사용자 상호작용이 많은 앱',
      },
      {
        scenario: '내부 도구 및 사내 앱',
        description: 'SEO가 중요하지 않은 내부 직원용 도구',
      },
      {
        scenario: '페이지 내 동적 요소',
        description: '탭, 아코디언, 모달 등 페이지 내 동적 UI 요소',
      },
    ],
    pros: [
      '풍부한 인터랙티브 기능',
      '서버 부하 감소',
      '초기 로드 후 빠른 페이지 전환',
      '오프라인 기능 및 PWA 지원 가능',
      '백엔드와 프론트엔드 완전 분리 가능',
    ],
    cons: [
      '초기 로드 성능 저하 (큰 JavaScript 번들)',
      'SEO 제한 (검색 엔진이 자바스크립트 콘텐츠를 제대로 크롤링하지 못할 수 있음)',
      '사용자 기기에 의존적인 성능',
      '자바스크립트 비활성화 환경에서 작동 안함',
      '전체 페이지 로드 전에는 빈 화면 또는 로딩 스피너만 표시',
    ],
  },
  {
    id: 'server-components',
    title: 'React 서버 컴포넌트',
    description: 'App Router에서 도입된 React 서버 컴포넌트의 개념과 사용법을 배웁니다.',
    content: `React 서버 컴포넌트(RSC)는 Next.js App Router에 도입된 새로운 React 기능으로, 서버에서 렌더링되고 브라우저로 스트리밍될 수 있는 컴포넌트입니다. 서버 컴포넌트는 JavaScript 번들 크기에 영향을 주지 않고, 서버의 리소스에 직접 접근할 수 있으며, 데이터베이스나 파일 시스템과 같은 백엔드 리소스에 직접 접근할 수 있습니다.

서버 컴포넌트는 클라이언트 컴포넌트와 함께 사용되어 하이브리드 웹 애플리케이션을 구축할 수 있게 합니다. 서버 컴포넌트는 초기 페이지 로드 성능을 최적화하고, 클라이언트 JavaScript 번들 크기를 줄이며, 데이터 페칭을 단순화합니다.

App Router에서는 모든 컴포넌트가 기본적으로 서버 컴포넌트로 취급됩니다. 클라이언트 컴포넌트를 만들려면 파일 상단에 'use client' 지시어를 명시적으로 추가해야 합니다. 이러한 클라이언트/서버 컴포넌트 모델은 개발자에게 더 세밀한 제어와 최적화 기회를 제공합니다.`,
    keyPoints: [
      '서버에서 렌더링되고 HTML로 전송됨',
      '클라이언트 JavaScript 번들에 포함되지 않음',
      '데이터베이스, 파일 시스템 등에 직접 접근 가능',
      'React 상태, 이펙트, 브라우저 API 사용 불가',
      '서버에서 비동기 데이터 페칭 간소화',
      '클라이언트 컴포넌트와 결합하여 하이브리드 앱 구축 가능',
    ],
    code: {
      title: '기본 서버 컴포넌트 예제',
      language: 'jsx',
      snippet: `// app/server-component-example/page.js
// 별도의 지시어가 없으면 기본적으로 서버 컴포넌트입니다
import { db } from '@/lib/db';

// 비동기 서버 컴포넌트
export default async function ProductsPage() {
  // 서버에서 직접 데이터 접근 (브라우저로 코드 전송되지 않음)
  const products = await db.products.findMany();
  
  return (
    <div>
      <h1>제품 목록</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    clientInteraction: {
      title: '서버 컴포넌트와 클라이언트 컴포넌트 결합',
      description: '서버와 클라이언트 컴포넌트를 함께 사용하는 패턴',
      code: `// app/hybrid-example/page.js
// 서버 컴포넌트
import { db } from '@/lib/db';
import ClientSideProductFilter from './ClientSideProductFilter';

export default async function ProductsPage() {
  // 서버에서 데이터 가져오기
  const products = await db.products.findMany();
  
  return (
    <div>
      <h1>제품 목록</h1>
      
      {/* 클라이언트 컴포넌트에 서버 데이터 전달 */}
      <ClientSideProductFilter products={products} />
    </div>
  );
}

// app/hybrid-example/ClientSideProductFilter.js
'use client'; // 클라이언트 컴포넌트 지시어

import { useState } from 'react';

export default function ClientSideProductFilter({ products }) {
  const [filterText, setFilterText] = useState('');
  
  // 클라이언트에서 필터링 로직 처리
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  );
  
  return (
    <div>
      <input
        type="text"
        placeholder="제품 검색..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    patterns: {
      title: '서버/클라이언트 컴포넌트 패턴',
      items: [
        {
          name: '클라이언트 컴포넌트 내에서 서버 컴포넌트를 직접 임포트하지 않는다',
          description:
            '서버 컴포넌트는 클라이언트 컴포넌트의 자식으로 전달할 수 있지만, 클라이언트 컴포넌트에서 직접 임포트하면 에러가 발생합니다.',
          example: `// ❌ 잘못된 패턴
'use client';
import ServerComponent from './ServerComponent';

// ✅ 올바른 패턴
'use client';
export default function ClientComponent({ children }) {
  return <div>{children}</div>;
}

// 사용:
<ClientComponent>
  <ServerComponent />
</ClientComponent>`,
        },
        {
          name: '서버에서 데이터를 가져와 클라이언트 컴포넌트에 props로 전달',
          description: '서버 컴포넌트에서 데이터를 가져와 클라이언트 컴포넌트에 전달하는 패턴입니다.',
          example: `// 서버 컴포넌트
async function getData() {
  const res = await fetch('...');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <ClientComponent data={data} />;
}`,
        },
        {
          name: '클라이언트 컴포넌트 하나에 여러 서버 컴포넌트 합성',
          description:
            '클라이언트 컴포넌트가 레이아웃이나 컨테이너 역할을 하고 내부에 여러 서버 컴포넌트를 배치하는 패턴입니다.',
          example: `// 서버 컴포넌트
export default function Page() {
  return (
    <ClientLayout>
      <ServerHeader />
      <ServerSidebar />
      <ServerMainContent />
      <ServerFooter />
    </ClientLayout>
  );
}`,
        },
      ],
    },
    limitations: [
      {
        name: '상태 관리',
        description: '서버 컴포넌트에서는 useState, useReducer와 같은 상태 관리 훅을 사용할 수 없습니다.',
      },
      {
        name: '이벤트 핸들러',
        description: '서버 컴포넌트에서는 onClick과 같은 이벤트 핸들러를 추가할 수 없습니다.',
      },
      {
        name: '브라우저 API',
        description: '서버 컴포넌트에서는 window, document와 같은 브라우저 API에 접근할 수 없습니다.',
      },
      {
        name: '라이프사이클 메소드',
        description: '서버 컴포넌트에서는 useEffect, useLayoutEffect 등의 생명주기 훅을 사용할 수 없습니다.',
      },
      {
        name: '클라이언트 전용 라이브러리',
        description: '서버 컴포넌트에서는 브라우저 환경을 가정하는 라이브러리를 사용할 수 없습니다.',
      },
    ],
    useCases: [
      {
        scenario: '데이터 페칭 컴포넌트',
        description: 'API, 데이터베이스 등에서 데이터를 가져와 표시하는 컴포넌트',
      },
      {
        scenario: '정적 UI 요소',
        description: '상호작용이 필요 없는 헤더, 푸터, 카드 등의 UI 요소',
      },
      {
        scenario: 'SEO 중요 콘텐츠',
        description: '검색 엔진에 적절히 표시되어야 하는 제품 설명, 블로그 포스트 등',
      },
      {
        scenario: '대용량 라이브러리 사용',
        description: 'Markdown 파서, 데이터 처리 도구 등 클라이언트에 전송하면 무거운 라이브러리 활용',
      },
    ],
    pros: [
      '클라이언트 JavaScript 번들 크기 감소',
      '초기 페이지 로드 성능 향상',
      '백엔드 리소스에 직접 접근 가능',
      '데이터 페칭 코드 단순화',
      'SEO 개선',
      '컴포넌트 단위의 세밀한 최적화 가능',
    ],
    cons: [
      '상태 관리 및 이벤트 처리 불가',
      '브라우저 API 접근 불가',
      '새로운 개념 학습 필요',
      '컴포넌트 구조 계획 복잡성 증가',
      '클라이언트/서버 경계에 대한 주의 필요',
    ],
  },
];

export default rendering;
