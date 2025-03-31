'use client';

import { useState } from 'react';
import { frameworks } from '@/data/comparison/frameworks';
import FeatureTable from './FeatureTable';
import PerformanceChart from './PerformanceChart';
import UseCaseCards from './UseCaseCards';
import OverviewCards from './OverviewCards';

export default function FrameworkComparison() {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8 text-gray-900'>React vs Next.js 비교</h1>

      {/* 프레임워크 개요 */}
      <OverviewCards frameworks={frameworks.overview} />

      {/* 탭 네비게이션 */}
      <div className='flex flex-wrap border-b border-gray-200'>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'features'
              ? 'border-b-2 border-blue-500 text-blue-600 '
              : 'text-gray-600 hover:text-blue-500 '
          }`}
        >
          기능 비교
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'performance'
              ? 'border-b-2 border-blue-500 text-blue-600 '
              : 'text-gray-600 hover:text-blue-500 '
          }`}
        >
          성능 비교
        </button>
        <button
          onClick={() => setActiveTab('usecases')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'usecases'
              ? 'border-b-2 border-blue-500 text-blue-600 '
              : 'text-gray-600 hover:text-blue-500 '
          }`}
        >
          사용 사례
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className='mt-6'>
        {activeTab === 'features' && <FeatureTable features={frameworks.features} />}
        {activeTab === 'performance' && <PerformanceChart performance={frameworks.performance} />}
        {activeTab === 'usecases' && <UseCaseCards useCases={frameworks.useCases} />}
      </div>
    </div>
  );
}
