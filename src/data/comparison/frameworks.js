export const frameworks = {
  overview: {
    react: {
      name: 'React.js',
      description: '페이스북에서 개발한 JavaScript 라이브러리로, UI 구축을 위한 도구입니다.',
      releaseYear: 2013,
      developer: 'Facebook',
      type: '라이브러리',
      url: 'https://react.dev',
    },
    nextjs: {
      name: 'Next.js',
      description: 'Vercel에서 개발한 React 기반 풀스택 웹 프레임워크입니다.',
      releaseYear: 2016,
      developer: 'Vercel',
      type: '프레임워크',
      url: 'https://nextjs.org',
    },
  },

  features: [
    {
      name: '렌더링 방식',
      react: 'CSR(Client-Side Rendering) 기본',
      nextjs: 'SSR, SSG, ISR, CSR 모두 지원',
      explanation:
        'React는 기본적으로 클라이언트 측 렌더링만 지원하는 반면, Next.js는 다양한 렌더링 방식을 지원합니다.',
    },
    {
      name: '라우팅',
      react: '내장 기능 없음 (React Router 같은 라이브러리 필요)',
      nextjs: '파일 기반 라우팅 내장',
      explanation: 'Next.js는 디렉토리 구조에 기반한 라우팅 시스템을 제공하여 별도 설정이 필요 없습니다.',
    },
    {
      name: '데이터 페칭',
      react: 'useEffect 훅이나 외부 라이브러리 사용',
      nextjs: 'getServerSideProps, getStaticProps, ISR 등 내장 기능',
      explanation: 'Next.js는 서버 사이드 데이터 페칭을 위한 다양한 함수를 제공합니다.',
    },
    {
      name: '코드 분할',
      react: 'React.lazy와 Suspense 사용 (수동 설정)',
      nextjs: '자동 코드 분할',
      explanation: 'Next.js는 페이지 단위로 자동 코드 분할을 제공하여 초기 로딩 시간을 최적화합니다.',
    },
    {
      name: '이미지 최적화',
      react: '직접 구현 필요',
      nextjs: '내장 Image 컴포넌트로 자동 최적화',
      explanation: 'Next.js의 Image 컴포넌트는 이미지 크기 조정, 포맷 변환, 지연 로딩 등을 자동으로 처리합니다.',
    },
    {
      name: 'API 구현',
      react: '별도 백엔드 서버 필요',
      nextjs: 'API 라우트 내장',
      explanation: 'Next.js는 동일한 프로젝트 내에서 API 엔드포인트를 쉽게 생성할 수 있는 기능을 제공합니다.',
    },
    {
      name: '환경 설정',
      react: '직접 웹팩, 바벨 등 설정 필요',
      nextjs: '제로 설정 (Zero Config)',
      explanation: 'Next.js는 대부분의 설정이 사전 구성되어 있어 바로 개발을 시작할 수 있습니다.',
    },
    {
      name: 'TypeScript 지원',
      react: '추가 설정 필요',
      nextjs: '기본 지원',
      explanation: 'Next.js는 TypeScript를 즉시 사용할 수 있도록 내장 지원합니다.',
    },
  ],

  performance: [
    {
      metric: '초기 로딩 시간',
      react: '느림 (전체 JS 번들 다운로드 필요)',
      nextjs: '빠름 (서버에서 렌더링된 HTML 제공)',
      details: 'Next.js의 SSR/SSG는 사용자에게 즉시 볼 수 있는 콘텐츠를 제공하여 인지된 성능을 향상시킵니다.',
    },
    {
      metric: 'SEO 최적화',
      react: '제한적 (추가 작업 필요)',
      nextjs: '우수 (서버 렌더링으로 검색 엔진이 콘텐츠 인식 가능)',
      details:
        'Next.js는 페이지가 서버에서 렌더링되어 검색 엔진이 JavaScript를 실행하지 않고도 콘텐츠를 크롤링할 수 있습니다.',
    },
    {
      metric: 'Time To Interactive (TTI)',
      react: '느림 (하이드레이션 후 상호작용 가능)',
      nextjs: '중간 (SSR 시 하이드레이션 필요)',
      details: '두 프레임워크 모두 하이드레이션 과정이 필요하지만, Next.js는 사용자에게 더 빨리 콘텐츠를 표시합니다.',
    },
    {
      metric: '자동 성능 최적화',
      react: '제한적 (직접 구현 필요)',
      nextjs: '우수 (자동 이미지 최적화, 코드 분할 등)',
      details: 'Next.js는 많은 성능 최적화 기능이 내장되어 있어 개발자가 명시적으로 구현하지 않아도 됩니다.',
    },
  ],

  useCases: [
    {
      scenario: '콘텐츠 중심 웹사이트 (블로그, 뉴스 등)',
      recommended: 'Next.js',
      explanation: 'SEO가 중요하고 정적 콘텐츠가 많은 사이트는 Next.js의 SSG 기능이 적합합니다.',
    },
    {
      scenario: '대시보드, 관리자 패널',
      recommended: 'React',
      explanation: '사용자 인증 후 사용하는 내부 도구는 SEO가 덜 중요하므로 React의 CSR이 적합할 수 있습니다.',
    },
    {
      scenario: '이커머스 사이트',
      recommended: 'Next.js',
      explanation: '제품 페이지의 SEO가 중요하고 초기 로딩 성능이 매출에 영향을 주므로 Next.js가 적합합니다.',
    },
    {
      scenario: '단일 페이지 애플리케이션 (SPA)',
      recommended: 'React',
      explanation: '단순한 SPA는 React만으로도 충분히 구현 가능합니다.',
    },
    {
      scenario: '하이브리드 웹 애플리케이션',
      recommended: 'Next.js',
      explanation:
        '일부는 정적으로, 일부는 동적으로 처리해야 하는 복합적인 사이트는 Next.js의 다양한 렌더링 방식이 유용합니다.',
    },
    {
      scenario: '마케팅 웹사이트',
      recommended: 'Next.js',
      explanation: '빠른 로딩 시간과 SEO가 중요한 마케팅 사이트는 Next.js의 SSG가 적합합니다.',
    },
  ],
};
