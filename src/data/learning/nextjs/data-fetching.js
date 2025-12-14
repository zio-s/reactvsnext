// data/learning/nextjs/data-fetching.js
// Next.js 데이터 페칭 학습 데이터

const dataFetching = [
  {
    id: 'server-components-fetch',
    title: '서버 컴포넌트에서 데이터 페칭',
    description: 'React Server Components에서 직접 데이터를 가져오는 방법을 배웁니다.',
    content: `Next.js App Router의 서버 컴포넌트에서는 컴포넌트 내에서 직접 async/await를 사용하여 데이터를 가져올 수 있습니다. 이는 getServerSideProps나 getStaticProps 없이도 서버에서 데이터를 페칭할 수 있게 해줍니다.

서버 컴포넌트에서의 데이터 페칭은 서버에서 실행되므로 데이터베이스에 직접 접근하거나, API 키를 안전하게 사용할 수 있습니다. 또한 클라이언트로 JavaScript 코드를 보내지 않아 번들 크기가 줄어듭니다.

fetch API는 Next.js에서 확장되어 자동 캐싱과 재검증 기능을 제공합니다.`,
    keyPoints: [
      '서버 컴포넌트에서 async/await 직접 사용',
      '데이터베이스 직접 접근 가능',
      'API 키 등 민감한 정보 안전하게 사용',
      '자동 요청 중복 제거 (Request Memoization)',
      '확장된 fetch API로 캐싱 제어',
    ],
    code: {
      title: '서버 컴포넌트 데이터 페칭',
      language: 'jsx',
      snippet: `// app/users/page.js
// 서버 컴포넌트 - 기본적으로 async 함수로 정의 가능
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    // 캐싱 옵션
    cache: 'force-cache', // 기본값: 캐시 사용
    // cache: 'no-store',  // 캐시 사용 안 함 (항상 새로운 데이터)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 데이터베이스 직접 접근 예시
import { db } from '@/lib/database';

async function getProducts() {
  // 서버에서만 실행되므로 DB 직접 접근 가능
  const products = await db.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>상품 목록</h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`,
    },
    resources: [
      {
        name: 'Data Fetching 문서',
        url: 'https://nextjs.org/docs/app/building-your-application/data-fetching',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'caching-revalidation',
    title: '캐싱과 재검증',
    description: '데이터 캐싱 전략과 재검증 방법을 배웁니다.',
    content: `Next.js는 fetch 요청에 대해 자동으로 캐싱을 적용합니다. 이를 통해 동일한 데이터를 여러 컴포넌트에서 요청해도 실제로는 한 번만 요청이 발생합니다.

재검증(Revalidation)은 캐시된 데이터를 새로운 데이터로 갱신하는 과정입니다. 시간 기반 재검증(Time-based)과 요청 기반 재검증(On-demand)을 선택할 수 있습니다.

route segment config를 통해 페이지 전체의 캐싱 동작을 설정할 수도 있습니다.`,
    keyPoints: [
      'fetch는 기본적으로 캐시됨',
      'revalidate 옵션으로 시간 기반 재검증',
      'revalidatePath/revalidateTag로 수동 재검증',
      'cache: no-store로 캐시 비활성화',
      'Request Memoization으로 중복 요청 방지',
    ],
    code: {
      title: '캐싱 및 재검증 예시',
      language: 'jsx',
      snippet: `// 시간 기반 재검증
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // 1시간마다 재검증
  });
  return res.json();
}

// 캐시 사용 안 함 (항상 새로운 데이터)
async function getRealtimeData() {
  const res = await fetch('https://api.example.com/realtime', {
    cache: 'no-store',
  });
  return res.json();
}

// 태그 기반 재검증
async function getProduct(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    next: { tags: ['products', \`product-\${id}\`] },
  });
  return res.json();
}

// Route Segment Config로 페이지 전체 설정
// app/dashboard/page.js
export const revalidate = 60; // 60초마다 재검증
export const dynamic = 'force-dynamic'; // 항상 동적 렌더링
export const fetchCache = 'force-no-store'; // 모든 fetch 캐시 비활성화

export default async function DashboardPage() {
  // 이 페이지의 모든 fetch는 설정을 따름
  const data = await fetchDashboardData();
  return <Dashboard data={data} />;
}

// 수동 재검증 (Server Action 또는 Route Handler에서)
// app/actions.js
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });

  // 특정 경로 재검증
  revalidatePath('/products');
  revalidatePath(\`/products/\${id}\`);

  // 태그로 재검증
  revalidateTag('products');
  revalidateTag(\`product-\${id}\`);
}

// Route Handler에서 재검증
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tag, secret } = await request.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}`,
    },
  },
  {
    id: 'parallel-sequential-fetch',
    title: '병렬 및 순차 데이터 페칭',
    description: '여러 데이터를 효율적으로 가져오는 패턴을 배웁니다.',
    content: `여러 데이터를 가져올 때 병렬(Parallel)과 순차(Sequential) 페칭을 적절히 사용해야 합니다. 독립적인 데이터는 병렬로 가져와 대기 시간을 줄이고, 의존성이 있는 데이터는 순차적으로 가져옵니다.

Promise.all을 사용하면 여러 요청을 병렬로 처리할 수 있습니다. 하지만 하나의 요청이 실패하면 전체가 실패하므로, Promise.allSettled를 사용하여 부분 실패를 처리할 수도 있습니다.

Next.js는 요청 중복 제거(Request Memoization)를 자동으로 처리하여, 같은 요청이 여러 컴포넌트에서 발생해도 실제로는 한 번만 요청합니다.`,
    keyPoints: [
      '독립적인 요청은 Promise.all로 병렬 처리',
      '의존적인 요청은 순차 처리',
      'Promise.allSettled로 부분 실패 처리',
      'Suspense로 스트리밍 데이터 로딩',
      '요청 중복 제거 자동 적용',
    ],
    code: {
      title: '병렬 및 순차 페칭 예시',
      language: 'jsx',
      snippet: `// 병렬 데이터 페칭 - Promise.all
async function getUser(id) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`);
  return res.json();
}

async function getUserPosts(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/posts\`);
  return res.json();
}

async function getUserComments(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/comments\`);
  return res.json();
}

// 병렬 페칭 - 모든 요청이 동시에 시작
export default async function UserProfilePage({ params }) {
  // 동시에 3개 요청 시작 - 가장 오래 걸리는 요청 시간만큼만 대기
  const [user, posts, comments] = await Promise.all([
    getUser(params.id),
    getUserPosts(params.id),
    getUserComments(params.id),
  ]);

  return (
    <div>
      <UserInfo user={user} />
      <UserPosts posts={posts} />
      <UserComments comments={comments} />
    </div>
  );
}

// 순차 데이터 페칭 - 의존성이 있는 경우
async function getCategory(slug) {
  const res = await fetch(\`https://api.example.com/categories/\${slug}\`);
  return res.json();
}

async function getCategoryProducts(categoryId) {
  const res = await fetch(\`https://api.example.com/products?category=\${categoryId}\`);
  return res.json();
}

export default async function CategoryPage({ params }) {
  // 순차 페칭 - category를 먼저 가져와야 products를 가져올 수 있음
  const category = await getCategory(params.slug);
  const products = await getCategoryProducts(category.id);

  return (
    <div>
      <h1>{category.name}</h1>
      <ProductList products={products} />
    </div>
  );
}

// Suspense로 스트리밍 - 각 컴포넌트가 독립적으로 로딩
import { Suspense } from 'react';

async function RecommendedProducts() {
  const products = await getRecommendedProducts();
  return <ProductGrid products={products} />;
}

async function RecentReviews() {
  const reviews = await getRecentReviews();
  return <ReviewList reviews={reviews} />;
}

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* 각 Suspense 경계가 독립적으로 로딩 */}
      <Suspense fallback={<ProductSkeleton />}>
        <RecommendedProducts />
      </Suspense>

      <Suspense fallback={<ReviewSkeleton />}>
        <RecentReviews />
      </Suspense>
    </div>
  );
}`,
    },
  },
  {
    id: 'client-data-fetching',
    title: '클라이언트 데이터 페칭',
    description: '클라이언트 컴포넌트에서 데이터를 가져오는 방법을 배웁니다.',
    content: `클라이언트 컴포넌트에서는 useEffect나 SWR, React Query 같은 라이브러리를 사용하여 데이터를 가져옵니다. 사용자 상호작용에 따라 데이터를 가져오거나, 실시간 업데이트가 필요한 경우에 적합합니다.

SWR은 Vercel에서 만든 데이터 페칭 라이브러리로, 캐싱, 재검증, 포커스 시 재페칭 등의 기능을 제공합니다. React Query(TanStack Query)도 유사한 기능을 제공하며, 더 많은 고급 기능을 포함합니다.

서버 컴포넌트에서 초기 데이터를 가져온 후 클라이언트에서 이를 hydrate하여 사용할 수도 있습니다.`,
    keyPoints: [
      'useEffect로 기본적인 데이터 페칭',
      'SWR로 캐싱과 재검증 자동화',
      'React Query로 복잡한 상태 관리',
      '서버 데이터를 클라이언트로 전달',
      '로딩/에러 상태 처리',
    ],
    code: {
      title: '클라이언트 데이터 페칭 예시',
      language: 'jsx',
      snippet: `// useEffect 기본 패턴
'use client';

import { useState, useEffect } from 'react';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div>검색 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// SWR 사용 예시
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile({ userId }) {
  const { data: user, error, isLoading, mutate } = useSWR(
    \`/api/users/\${userId}\`,
    fetcher,
    {
      revalidateOnFocus: true,      // 탭 포커스 시 재검증
      revalidateOnReconnect: true,  // 네트워크 재연결 시 재검증
      refreshInterval: 30000,       // 30초마다 자동 새로고침
    }
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>사용자를 불러올 수 없습니다</div>;

  const handleRefresh = () => {
    mutate(); // 수동으로 재검증
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleRefresh}>새로고침</button>
    </div>
  );
}

// 서버 데이터를 클라이언트로 전달
// app/products/page.js (서버 컴포넌트)
import ClientProductList from './ClientProductList';

async function getInitialProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function ProductsPage() {
  const initialProducts = await getInitialProducts();

  return (
    <div>
      <h1>상품 목록</h1>
      {/* 서버에서 가져온 데이터를 클라이언트로 전달 */}
      <ClientProductList initialData={initialProducts} />
    </div>
  );
}

// ClientProductList.js (클라이언트 컴포넌트)
'use client';

import useSWR from 'swr';

export default function ClientProductList({ initialData }) {
  const { data: products } = useSWR('/api/products', fetcher, {
    fallbackData: initialData,  // 서버에서 받은 초기 데이터 사용
  });

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`,
    },
  },
  {
    id: 'loading-streaming',
    title: '로딩 상태와 스트리밍',
    description: 'Suspense와 loading.js를 활용한 로딩 UX 패턴을 배웁니다.',
    content: `Next.js App Router는 React Suspense를 활용하여 데이터 로딩 중 대체 UI를 보여줄 수 있습니다. loading.js 파일을 만들면 해당 경로 세그먼트의 로딩 상태를 자동으로 처리합니다.

스트리밍(Streaming)을 통해 페이지의 일부가 준비되면 먼저 보여주고, 나머지는 준비되는 대로 점진적으로 렌더링할 수 있습니다. 이를 통해 사용자는 전체 페이지가 로드되기 전에 콘텐츠와 상호작용할 수 있습니다.

스켈레톤 UI를 사용하면 로딩 중에도 레이아웃이 유지되어 콘텐츠가 로드될 때 레이아웃 시프트를 방지할 수 있습니다.`,
    keyPoints: [
      'loading.js로 자동 로딩 상태 처리',
      'Suspense 경계로 세밀한 로딩 제어',
      '스트리밍으로 점진적 렌더링',
      '스켈레톤 UI로 레이아웃 시프트 방지',
      'error.js로 에러 바운더리 설정',
    ],
    code: {
      title: '로딩 상태 및 스트리밍 예시',
      language: 'jsx',
      snippet: `// app/dashboard/loading.js
// 이 파일이 있으면 자동으로 Suspense 경계가 생성됨
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// app/dashboard/page.js
export default async function DashboardPage() {
  // 이 데이터가 로딩되는 동안 loading.js가 표시됨
  const dashboardData = await getDashboardData();

  return <Dashboard data={dashboardData} />;
}

// Suspense로 세밀한 로딩 제어
import { Suspense } from 'react';

// 각각 독립적인 데이터 페칭을 하는 컴포넌트들
async function Stats() {
  const stats = await getStats(); // 빠름
  return <StatsCard stats={stats} />;
}

async function RecentOrders() {
  const orders = await getRecentOrders(); // 중간
  return <OrdersList orders={orders} />;
}

async function Analytics() {
  const data = await getAnalytics(); // 느림
  return <AnalyticsChart data={data} />;
}

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 각 섹션이 준비되는 대로 표시됨 */}
      <Suspense fallback={<StatsCardSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<OrdersListSkeleton />}>
        <RecentOrders />
      </Suspense>

      <div className="col-span-2">
        <Suspense fallback={<AnalyticsChartSkeleton />}>
          <Analytics />
        </Suspense>
      </div>
    </div>
  );
}

// 스켈레톤 컴포넌트
function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}

function OrdersListSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-4 mb-3 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// app/dashboard/error.js - 에러 바운더리
'use client';

export default function DashboardError({ error, reset }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-red-800 font-semibold">문제가 발생했습니다</h2>
      <p className="text-red-600 text-sm mt-1">{error.message}</p>
      <button
        onClick={reset}
        className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
      >
        다시 시도
      </button>
    </div>
  );
}`,
    },
  },
];

export default dataFetching;
