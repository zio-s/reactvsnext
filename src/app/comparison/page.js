import FrameworkComparison from '@/components/comparison/FrameworkComparison';

export const metadata = {
  title: 'React vs Next.js 비교 | ReactVsNext',
  description: 'React.js와 Next.js의 특징, 성능, 사용 사례 비교',
};

export default function ComparisonPage() {
  return (
    <div className='container mx-auto py-8'>
      <FrameworkComparison />
    </div>
  );
}
