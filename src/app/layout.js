import './globals.css';

export const metadata = {
  title: 'React vs Next.js',
  description: 'React와 Next.js의 차이점 학습 및 비교 플랫폼',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body>
        <header className='border-b'>
          <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <a href='/' className='text-xl font-bold'>
              React<span className='text-blue-600'>Vs</span>Next
            </a>
            <nav>
              <ul className='flex space-x-6'>
                <li>
                  <a href='/comparison' className='hover:text-blue-600'>
                    비교
                  </a>
                </li>
                <li>
                  <a href='/learning' className='hover:text-blue-600'>
                    학습
                  </a>
                </li>
                <li>
                  <a href='/quiz' className='hover:text-blue-600'>
                    퀴즈
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className='border-t mt-16 py-8 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <p className='text-center text-gray-500'>© 2025 ReactVsNext. 모든 권리 보유.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
