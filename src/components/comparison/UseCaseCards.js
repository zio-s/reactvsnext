export default function UseCaseCards({ useCases }) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {useCases.map((useCase, index) => (
        <div
          key={index}
          className='border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='p-5'>
            <h3 className='font-medium text-lg mb-3'>{useCase.scenario}</h3>
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                useCase.recommended === 'Next.js' ? 'bg-black text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {useCase.recommended} 추천
            </div>
            <p className='mt-4 text-gray-600 text-sm'>{useCase.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
