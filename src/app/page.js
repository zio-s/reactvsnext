import Link from 'next/link';

export const metadata = {
  title: 'React vs Next.js | 프레임워크 비교 및 학습',
  description: 'React와 Next.js의 차이점을 비교하고 학습할 수 있는 플랫폼입니다.',
};

export default function HomePage() {
  return (
    <div className='container mx-auto px-4 py-12'>
      {/* 히어로 섹션 */}
      <section className='text-center mb-16'>
        <h1 className='text-4xl md:text-5xl font-bold mb-6'>
          <span className='text-blue-600'>React</span> vs <span className='text-black'>Next.js</span>
        </h1>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
          두 프레임워크의 차이점을 이해하고, 각각의 장단점을 학습한 후 퀴즈로 지식을 테스트해보세요.
        </p>
        <div className='flex flex-wrap justify-center gap-4'>
          <Link
            href='/comparison'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
          >
            비교 시작하기
          </Link>
          <Link
            href='/learning'
            className='px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors'
          >
            학습하기
          </Link>
        </div>
      </section>

      {/* 3개 컬럼 소개 섹션 */}
      <section className='grid md:grid-cols-3 gap-8 mb-16'>
        <FeatureCard
          icon={<CompareIcon />}
          title='비교 섹션'
          description='React와 Next.js의 특징, 성능, 사용 사례를 체계적으로 비교해보세요.'
          link='/comparison'
        />
        <FeatureCard
          icon={<LearnIcon />}
          title='학습 섹션'
          description='두 프레임워크의 핵심 문법과 개념을 코드 예제와 함께 배워보세요.'
          link='/learning'
        />
        <FeatureCard
          icon={<QuizIcon />}
          title='퀴즈 섹션'
          description='배운 내용을 재미있는 퀴즈로 테스트하고 지식을 확인해보세요.'
          link='/quiz'
        />
      </section>

      {/* 프로젝트 소개 섹션 */}
      <section className='bg-gray-50 rounded-xl p-8 mb-16'>
        <h2 className='text-2xl font-bold mb-4 text-gray-900'>이 프로젝트에 대해</h2>
        <p className='text-gray-700 mb-4'>
          프론트엔드 개발자로서 React와 Next.js는 현대 웹 개발에서 가장 인기 있는 도구입니다. 이 프로젝트는 두
          프레임워크의 차이점을 이해하고, 어떤 상황에서 어떤 도구가 더 적합한지 학습할 수 있도록 만들어졌습니다.
        </p>
        <p className='text-gray-700'>
          프레임워크 공부와 함께 학습 여정을 기록하고 지식을 공유하기 위해 개발되었으며, 앞으로도 계속 콘텐츠를 추가하고
          개선해 나갈 예정입니다.
        </p>
      </section>

      {/* 최근 업데이트 섹션 */}
      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-900'>최근 업데이트</h2>
        <div className='border rounded-lg overflow-hidden'>
          <div className='bg-gray-50 px-4 py-2 border-b'>
            <span className='text-sm font-medium text-gray-700'>2025년 3월 31일</span>
          </div>
          <div className='p-4 bg-white'>
            <h3 className='font-medium mb-2 text-gray-900'>프로젝트 출시</h3>
            <p className='text-gray-600'>
              React vs Next.js 비교 프로젝트가 시작되었습니다. 기본적인 비교 섹션이 완성되었으며, 앞으로 더 많은
              콘텐츠가 추가될 예정입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// 특성 카드 컴포넌트
function FeatureCard({ icon, title, description, link }) {
  return (
    <div className='border rounded-lg p-6 bg-white hover:shadow-md transition-shadow'>
      <div className='text-blue-600 mb-4'>{icon}</div>
      <h3 className='text-xl font-medium mb-2 text-gray-900'>{title}</h3>
      <p className='text-gray-600 mb-4'>{description}</p>
      <Link href={link} className='text-blue-600 hover:underline flex items-center'>
        바로가기
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 ml-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </Link>
    </div>
  );
}

// 아이콘 컴포넌트들
function CompareIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
      />
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path d='M12 14l9-5-9-5-9 5 9 5z' />
      <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
      />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
}
