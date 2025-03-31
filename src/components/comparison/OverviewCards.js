export default function OverviewCards({ frameworks }) {
  return (
    <div className='grid md:grid-cols-2 gap-6 mb-10'>
      {/* React 카드 */}
      <div className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border border-blue-200'>
        <div className='flex items-center mb-4'>
          <div className='w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-blue-500 text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <circle cx='12' cy='12' r='3'></circle>
              <circle cx='12' cy='12' r='10' strokeDasharray='30 30' strokeDashoffset='0'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 12 12'
                  to='360 12 12'
                  dur='10s'
                  repeatCount='indefinite'
                />
              </circle>
            </svg>
          </div>
          <div>
            <h2 className='text-xl font-bold'>{frameworks.react.name}</h2>
            <div className='text-sm text-gray-600'>
              {frameworks.react.type} • {frameworks.react.releaseYear}년 출시
            </div>
          </div>
        </div>
        <p className='text-gray-700'>{frameworks.react.description}</p>
        <div className='mt-4 text-sm text-gray-600'>개발: {frameworks.react.developer}</div>
        <a
          href={frameworks.react.url}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-block text-blue-600 hover:underline'
        >
          공식 문서 보기 →
        </a>
      </div>

      {/* Next.js 카드 */}
      <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md p-6 border border-gray-200'>
        <div className='flex items-center mb-4'>
          <div className='w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-black text-white'>
            <svg width='24' height='24' viewBox='0 0 180 180' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <mask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='180' height='180'>
                <circle cx='90' cy='90' r='90' fill='white' />
              </mask>
              <g mask='url(#mask0)'>
                <circle cx='90' cy='90' r='90' fill='black' />
                <path
                  d='M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z'
                  fill='url(#paint0_linear)'
                />
                <rect x='115' y='54' width='12' height='72' fill='url(#paint1_linear)' />
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear'
                  x1='109'
                  y1='116.5'
                  x2='144.5'
                  y2='160.5'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white' />
                  <stop offset='1' stopColor='white' stopOpacity='0' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear'
                  x1='121'
                  y1='54'
                  x2='120.799'
                  y2='106.875'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white' />
                  <stop offset='1' stopColor='white' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h2 className='text-xl font-bold'>{frameworks.nextjs.name}</h2>
            <div className='text-sm text-gray-600'>
              {frameworks.nextjs.type} • {frameworks.nextjs.releaseYear}년 출시
            </div>
          </div>
        </div>
        <p className='text-gray-700'>{frameworks.nextjs.description}</p>
        <div className='mt-4 text-sm text-gray-600'>개발: {frameworks.nextjs.developer}</div>
        <a
          href={frameworks.nextjs.url}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-block text-blue-600 hover:underline'
        >
          공식 문서 보기 →
        </a>
      </div>
    </div>
  );
}
