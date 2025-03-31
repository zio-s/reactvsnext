// data/learning/react/routing.js
// React 라우팅 학습 데이터

const routing = [
  {
    id: 'routing-intro',
    title: 'React에서의 라우팅 개념',
    description: 'React 애플리케이션에서 라우팅의 기본 개념과 필요성을 이해합니다.',
    content: `웹 애플리케이션에서 라우팅은 URL 경로에 따라 다른 페이지나 컴포넌트를 표시하는 메커니즘입니다. React는 기본적으로 싱글 페이지 애플리케이션(SPA)을 구축하기 위한 라이브러리이므로, 기본 제공되는 라우팅 기능이 없습니다.

React에서 라우팅을 구현하기 위해서는 일반적으로 React Router와 같은 외부 라이브러리를 사용합니다. React Router는 선언적인 방식으로 애플리케이션의 UI와 URL을 동기화할 수 있게 해주는 라이브러리입니다.

SPA에서 라우팅은 서버에 새로운 페이지를 요청하지 않고 클라이언트 측에서 페이지 전환을 처리하여 사용자 경험을 개선하고 애플리케이션의 성능을 향상시키는 중요한 역할을 합니다.`,
    keyPoints: [
      'React 자체에는 내장 라우팅 기능이 없음',
      'React Router 같은 외부 라이브러리 필요',
      '클라이언트 사이드 라우팅 방식 사용',
      '페이지 새로고침 없이 화면 전환',
      'URL 기반 상태 관리 가능',
      '브라우저 히스토리 API 활용',
    ],
    code: {
      title: 'React Router 기본 설정',
      language: 'jsx',
      snippet: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;`,
    },
    visualAid: 'react-routing-diagram.svg',
    resources: [
      {
        name: 'React Router 공식 문서',
        url: 'https://reactrouter.com',
        type: 'documentation',
      },
      {
        name: 'React Router 튜토리얼',
        url: 'https://reactrouter.com/docs/en/v6/getting-started/tutorial',
        type: 'tutorial',
      },
    ],
  },
  {
    id: 'react-router',
    title: 'React Router 사용하기',
    description: 'React Router 라이브러리를 사용한 라우팅 구현 방법을 배웁니다.',
    content: `React Router는 React 애플리케이션에서 가장 널리 사용되는 라우팅 라이브러리입니다. 이 라이브러리는 선언적이고 컴포넌트 기반 접근 방식을 사용하여 애플리케이션의 라우팅을 관리합니다.

React Router v6는 이전 버전과 비교하여 더 간결하고 강력한 API를 제공합니다. <Routes> 컴포넌트 내에서 <Route> 요소를 사용하여 URL 경로와 해당 경로에서 렌더링할 컴포넌트를 매핑합니다.

React Router는 브라우저의 History API를 활용하여 실제 페이지 전환 없이도 URL을 변경하고 브라우저의 뒤로 가기/앞으로 가기 기능을 지원합니다.`,
    keyPoints: [
      'BrowserRouter와 HashRouter 타입 제공',
      'Routes와 Route로 경로 매핑',
      'Link 컴포넌트로 페이지 간 이동',
      'URL 파라미터와 쿼리 문자열 지원',
      '중첩 라우팅 구현 가능',
      'Navigate 컴포넌트로 리다이렉션 처리',
    ],
    code: {
      title: 'React Router 주요 컴포넌트 사용',
      language: 'jsx',
      snippet: `import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';

// 메인 레이아웃 컴포넌트
function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/products">제품 목록</Link></li>
          <li><Link to="/about">소개</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet /> {/* 중첩 라우트가 렌더링되는 위치 */}
    </div>
  );
}

// 제품 상세 페이지
function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>제품 {productId} 상세 정보</h2>
      <button onClick={() => navigate('/products')}>뒤로 가기</button>
    </div>
  );
}

// 라우팅 설정
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`,
    },
    routerTypes: {
      title: 'React Router 타입',
      description: '사용할 수 있는 다양한 라우터 타입과 그 특징',
      types: [
        {
          name: 'BrowserRouter',
          description: '일반적인 URL 경로를 사용 (예: /about, /products)',
          bestFor: '대부분의 현대 웹 애플리케이션',
          note: '서버에 라우팅 설정이 필요할 수 있음',
        },
        {
          name: 'HashRouter',
          description: 'URL에 해시(#)를 사용 (예: /#/about, /#/products)',
          bestFor: '정적 호스팅 환경에서 서버 구성 없이 작동해야 하는 경우',
          note: 'SEO에 불리하지만 서버 설정이 필요 없음',
        },
        {
          name: 'MemoryRouter',
          description: '메모리에 URL 히스토리를 저장 (주소 표시줄 변경 없음)',
          bestFor: '테스트 환경이나 주소 표시줄이 없는 환경 (React Native 등)',
          note: '개발 및 테스트용으로 주로 사용',
        },
        {
          name: 'StaticRouter',
          description: '정적 위치를 유지하는 라우터 (URL 변경 없음)',
          bestFor: '서버 사이드 렌더링(SSR) 환경',
          note: '서버에서 React 애플리케이션을 렌더링할 때 사용',
        },
      ],
    },
    routingHooks: {
      title: 'React Router Hooks',
      description: 'React Router v6에서 제공하는 주요 훅',
      hooks: [
        {
          name: 'useParams',
          description: 'URL 파라미터 접근',
          example: `// URL: /products/123
const { productId } = useParams(); // productId = "123"`,
        },
        {
          name: 'useNavigate',
          description: '프로그래밍 방식으로 다른 경로로 이동',
          example: `const navigate = useNavigate();
// 클릭 시 /products 경로로 이동
<button onClick={() => navigate('/products')}>제품 목록으로</button>`,
        },
        {
          name: 'useLocation',
          description: '현재 URL 정보(경로, 쿼리 문자열 등) 접근',
          example: `const location = useLocation();
// URL: /search?query=react
console.log(location.pathname); // "/search"
console.log(location.search); // "?query=react"`,
        },
        {
          name: 'useSearchParams',
          description: 'URL 검색 파라미터 읽기 및 수정',
          example: `const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query'); // URL의 ?query=값 읽기
// 검색어 변경 시 URL 업데이트
<input value={query} onChange={e => setSearchParams({ query: e.target.value })} />`,
        },
      ],
    },
  },
  {
    id: 'advanced-routing',
    title: '고급 라우팅 기법',
    description: 'React에서 더 복잡한 라우팅 시나리오를 처리하는 방법을 배웁니다.',
    content: `React 애플리케이션의 규모가 커지면 더 복잡한 라우팅 패턴이 필요해집니다. 중첩 라우팅, 동적 라우팅, 보호된 라우트, 그리고 라우트 기반 코드 분할 등의 고급 기법들은 대규모 애플리케이션에서 효율적인 라우팅 구조를 구현하는 데 필수적입니다.

중첩 라우팅은 부모 라우트 내에 자식 라우트를 정의하여 복잡한 UI 계층 구조를 표현할 수 있게 해줍니다. 특히 대시보드나 관리자 페이지와 같이 여러 서브 페이지를 가진 섹션에 유용합니다.

보호된 라우트는 인증된 사용자만 접근할 수 있는 페이지를 구현할 때 사용됩니다. 사용자의 인증 상태에 따라 요청된 페이지를 보여주거나 로그인 페이지로 리다이렉트하는 로직을 구현할 수 있습니다.`,
    keyPoints: [
      '중첩 라우트로 계층적 UI 구성',
      '동적 라우트 매개변수 활용',
      '인증 및 권한에 기반한 보호된 라우트',
      '라우트 기반 코드 분할로 성능 최적화',
      '라우트 구성 객체를 통한 관리',
      '데이터 로딩과 라우팅 통합',
    ],
    code: {
      title: '보호된 라우트 구현',
      language: 'jsx',
      snippet: `import React, { createContext, useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// 인증 컨텍스트
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (username) => {
    // 실제로는 API 호출 및 토큰 저장 등의 로직이 들어갈 것입니다
    setUser({ username });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// 보호된 라우트 컴포넌트
export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // 로그인 페이지로 리다이렉트하면서 원래 가려던 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// 사용 예시
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminRoutes />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}`,
    },
    codeSplitting: {
      title: '라우트 기반 코드 분할',
      description: '성능 최적화를 위한 동적 컴포넌트 로딩',
      code: `import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

// 동적으로 컴포넌트 임포트
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
    },
    dataRouting: {
      title: '데이터와 라우팅 통합',
      description: 'React Router v6.4 이상에서 지원하는 데이터 라우팅 패턴',
      code: `// 데이터 로더 함수 정의
export async function productLoader({ params }) {
  const response = await fetch(\`/api/products/\${params.id}\`);
  
  if (!response.ok) {
    throw new Response("", { 
      status: 404, 
      statusText: "제품을 찾을 수 없습니다" 
    });
  }
  
  return response.json();
}

// 라우트 정의에 로더 연결
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <Products />,
        children: [
          { index: true, element: <ProductsList /> },
          {
            path: ":id",
            element: <ProductDetail />,
            loader: productLoader,
          },
        ],
      },
    ],
  },
]);

// 컴포넌트에서 로드된 데이터 사용
function ProductDetail() {
  const product = useLoaderData();
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>가격: {product.price}</p>
    </div>
  );
}`,
    },
  },
  {
    id: 'routing-alternatives',
    title: 'React Router 대안과 비교',
    description: 'React Router 외에 사용할 수 있는 라우팅 라이브러리들을 알아봅니다.',
    content: `React Router가 가장 널리 사용되는 라우팅 솔루션이지만, 프로젝트의 요구사항에 따라 다른 라우팅 라이브러리를 선택할 수도 있습니다. 각 라이브러리는 고유한 API와 기능을 제공하며, 애플리케이션의 크기와 복잡성에 따라 적합한 솔루션이 달라질 수 있습니다.

Reach Router는 접근성에 중점을 둔 라이브러리였으나, 현재는 React Router v6에 통합되었습니다. React Location은 데이터 관리를 강조하는 최신 라우팅 라이브러리입니다. 그리고 Next.js와 같은 프레임워크는 파일 시스템 기반 라우팅을 제공하여 별도의 라우팅 설정이 필요 없습니다.

작은 프로젝트의 경우 때로는 History API를 직접 사용하거나 간단한 라우팅 로직을 직접 구현하는 것이 더 효율적일 수 있습니다.`,
    keyPoints: [
      'React Router: 가장 널리 사용되는 표준 솔루션',
      'Reach Router: 접근성 중심 (현재 React Router v6에 통합됨)',
      'React Location: 데이터 중심 라우팅 솔루션',
      'Next.js: 파일 시스템 기반 라우팅',
      'Wouter: 경량화된 대안',
      '커스텀 라우팅: 단순한 요구사항에 적합',
    ],
    comparison: {
      title: '라우팅 라이브러리 비교',
      libraries: [
        {
          name: 'React Router',
          pros: [
            '풍부한 기능과 API',
            '활발한 개발 및 커뮤니티 지원',
            '중첩 라우팅, 보호된 라우트 등 고급 기능',
            '다양한 라우터 타입 제공',
          ],
          cons: ['작은 프로젝트에는 과도할 수 있음', '번들 크기가 큰 편', '간헐적인 주요 API 변경'],
          bundleSize: '약 12KB (gzipped)',
        },
        {
          name: 'Wouter',
          pros: ['매우 작은 번들 크기', 'React Router와 유사한 API', '의존성 없음', '간단한 프로젝트에 적합'],
          cons: ['고급 기능 부족', '중첩 라우팅 제한적', '커뮤니티 및 생태계가 작음'],
          bundleSize: '약 1.5KB (gzipped)',
        },
        {
          name: 'React Location',
          pros: ['데이터 로딩/뮤테이션 기능', '비동기 라우팅 최적화', '타입스크립트 지원 우수', '현대적인 API 디자인'],
          cons: ['비교적 새로운 라이브러리', '학습 곡선이 있음', '커뮤니티 리소스 제한적'],
          bundleSize: '약 7KB (gzipped)',
        },
      ],
    },
    code: {
      title: 'Wouter 사용 예시',
      language: 'jsx',
      snippet: `// Wouter - 경량화된 React Router 대안
import React from 'react';
import { Route, Switch, Link, useRoute, useLocation } from 'wouter';

function Home() {
  return <h1>홈페이지</h1>;
}

function About() {
  return <h1>소개 페이지</h1>;
}

function Product({ params }) {
  return <h1>제품 {params.id} 상세 페이지</h1>;
}

function NotFound() {
  return <h1>페이지를 찾을 수 없습니다</h1>;
}

function App() {
  return (
    <div>
      <nav>
        <Link href="/">홈</Link> | 
        <Link href="/about">소개</Link> | 
        <Link href="/products/1">제품 1</Link>
      </nav>
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products/:id" component={Product} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}`,
    },
    customRouting: {
      title: '간단한 커스텀 라우팅 구현',
      description: '작은 규모의 프로젝트를 위한 기본적인 라우팅 구현',
      code: `import React, { useState, useEffect } from 'react';

// 간단한 라우터 컴포넌트
function Router({ children }) {
  const [path, setPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    
    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // URL 변경 함수
  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
  };
  
  // 현재 경로에 맞는 라우트만 렌더링
  const match = (routePath) => {
    // 간단한 구현이므로 정확한 경로 매칭만 지원
    return path === routePath;
  };
  
  // React.Children.map을 사용하여 각 Route 컴포넌트에 
  // match와 navigate 함수 주입
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { match, navigate });
  });
}

// 라우트 컴포넌트
function Route({ path, component: Component, match }) {
  return match(path) ? <Component /> : null;
}

// 링크 컴포넌트
function Link({ to, children, navigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

// 사용 예시
function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">홈</Link> | 
          <Link to="/about">소개</Link>
        </nav>
        
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}`,
    },
  },
];

export default routing;
