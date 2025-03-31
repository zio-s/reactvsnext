'use client';

export default function PerformanceChart({ performance }) {
  return (
    <div>
      <div className='space-y-4'>
        {performance.map((metric, index) => (
          <div key={index} className='rounded-lg border overflow-hidden'>
            <div className='bg-gray-50 px-4 py-3 border-b'>
              <h3 className='font-medium'>{metric.metric}</h3>
            </div>
            <div className='p-4 grid md:grid-cols-2 gap-4'>
              {/* React 성능 카드 */}
              <div className='p-4 rounded-lg bg-blue-50 border border-blue-100'>
                <div className='flex items-center mb-2'>
                  <span className='font-medium text-blue-800'>React.js</span>
                  <PerformanceIndicator value={metric.react} />
                </div>
                <p className='text-sm text-gray-700'>{metric.react}</p>
              </div>

              {/* Next.js 성능 카드 */}
              <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                <div className='flex items-center mb-2'>
                  <span className='font-medium text-gray-800'>Next.js</span>
                  <PerformanceIndicator value={metric.nextjs} />
                </div>
                <p className='text-sm text-gray-700'>{metric.nextjs}</p>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 border-t'>
              <p className='text-sm text-gray-600'>{metric.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceIndicator({ value }) {
  let color = '';
  let dots = '';

  if (value.toLowerCase().includes('우수') || value.toLowerCase().includes('빠름')) {
    color = 'text-green-600';
    dots = '●●●';
  } else if (value.toLowerCase().includes('중간')) {
    color = 'text-yellow-600';
    dots = '●●○';
  } else if (value.toLowerCase().includes('제한') || value.toLowerCase().includes('느림')) {
    color = 'text-red-600';
    dots = '●○○';
  }

  return <span className={`ml-2 text-sm font-bold ${color}`}>{dots}</span>;
}
