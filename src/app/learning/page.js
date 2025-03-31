'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import learningData from '@/data/learning';
const LearningPage = () => {
  const [activeFramework, setActiveFramework] = useState('react');
  const [activeCategory, setActiveCategory] = useState('basics');
  const [expandedTopics, setExpandedTopics] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [progress, setProgress] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 활성 프레임워크나 카테고리가 변경될 때 필터링된 토픽 업데이트
    const topics = learningData[activeFramework]?.[activeCategory] || [];

    if (searchTerm.trim() === '') {
      setFilteredTopics(topics);
    } else {
      const filtered = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
    if (typeof window !== 'undefined') {
      // localStorage에서 학습 진행 상황 로드
      const savedProgress = localStorage.getItem('learningProgress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [activeFramework, activeCategory, searchTerm]);

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleFrameworkChange = (framework) => {
    setActiveFramework(framework);
    // 카테고리 재설정: 프레임워크가 바뀌면 기본 카테고리로 돌아감
    setActiveCategory(Object.keys(learningData[framework])[0]);
    setExpandedTopics({});
    setSearchTerm('');
  };

  const markTopicComplete = (topicId, isComplete) => {
    const newProgress = {
      ...progress,
      [topicId]: isComplete,
    };
    setProgress(newProgress);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
    }
  };

  const calculateProgress = (framework, category) => {
    const topics = learningData[framework]?.[category];

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return 0;
    }

    const completedCount = topics.filter((topic) => progress[topic.id]).length;
    return Math.round((completedCount / topics.length) * 100);
  };

  const categories = learningData[activeFramework] ? Object.keys(learningData[activeFramework]) : [];

  // 코드 블록 렌더링 함수
  const renderCodeBlock = (code) => {
    if (!code) return null;

    return (
      <div className='mt-4 rounded-lg overflow-hidden'>
        <div className='bg-gray-700 text-white px-4 py-2 text-sm font-medium'>{code.title}</div>
        <SyntaxHighlighter
          language={code.language}
          style={atomDark}
          showLineNumbers
          customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}
        >
          {code.snippet || code.functional || ''}
        </SyntaxHighlighter>
      </div>
    );
  };

  // 비교 테이블 렌더링 함수
  const renderComparisonTable = (comparison) => {
    if (!comparison || !comparison.table) return null;

    return (
      <div className='mt-4 overflow-x-auto'>
        <h4 className='text-lg font-medium mb-2'>{comparison.title}</h4>
        <table className='min-w-full border-collapse border border-gray-300 rounded-lg'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-2 border text-left'>특성</th>
              <th className='px-4 py-2 border text-left'>SSR</th>
              <th className='px-4 py-2 border text-left'>SSG</th>
              <th className='px-4 py-2 border text-left'>ISR</th>
              <th className='px-4 py-2 border text-left'>CSR</th>
            </tr>
          </thead>
          <tbody>
            {comparison.table.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className='px-4 py-2 border font-medium'>{item.feature}</td>
                <td className='px-4 py-2 border'>{item.ssr}</td>
                <td className='px-4 py-2 border'>{item.ssg}</td>
                <td className='px-4 py-2 border'>{item.isr}</td>
                <td className='px-4 py-2 border'>{item.csr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 핵심 포인트 렌더링 함수
  const renderKeyPoints = (keyPoints) => {
    if (!keyPoints || !keyPoints.length) return null;

    return (
      <div className='mt-4'>
        <h4 className='font-medium text-gray-800 mb-2'>핵심 포인트</h4>
        <ul className='list-disc list-inside space-y-1 text-gray-700'>
          {keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-600 text-white'} shadow-md`}>
        <div className='container mx-auto py-6 px-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold'>프론트엔드 학습 플랫폼</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>React와 Next.js 마스터하기</p>
            </div>
            <div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-indigo-600'}`}
              >
                {darkMode ? '라이트 모드' : '다크 모드'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='container mx-auto py-8 px-4'>
        {/* 프레임워크 선택 탭 */}
        <div className='flex border-b border-gray-200 mb-6'>
          <button
            className={`py-3 px-6 font-medium text-lg ${
              activeFramework === 'react'
                ? darkMode
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-indigo-600 border-b-2 border-indigo-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleFrameworkChange('react')}
          >
            React.js
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg ${
              activeFramework === 'nextjs'
                ? darkMode
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-indigo-600 border-b-2 border-indigo-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleFrameworkChange('nextjs')}
          >
            Next.js
          </button>
        </div>

        {/* 검색 바 */}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='학습 내용 검색...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border border-gray-300'
            }`}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* 사이드바: 카테고리 메뉴 */}
          <div className='md:col-span-1'>
            <div className={`rounded-lg shadow-sm p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className='text-xl font-bold mb-4'>
                {activeFramework === 'react' ? 'React.js' : 'Next.js'} 학습 경로
              </h2>
              <nav>
                <ul className='space-y-2'>
                  {categories.map((category) => {
                    const progressPercent = calculateProgress(activeFramework, category);
                    return (
                      <li key={category}>
                        <button
                          className={`w-full text-left py-2 px-3 rounded-md ${
                            activeCategory === category
                              ? darkMode
                                ? 'bg-blue-900 text-blue-300'
                                : 'bg-indigo-100 text-indigo-700'
                              : darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          <div className='flex justify-between items-center'>
                            <span>{category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}</span>
                            <span
                              className={`text-xs font-medium ${
                                progressPercent === 100
                                  ? darkMode
                                    ? 'text-green-400'
                                    : 'text-green-500'
                                  : darkMode
                                  ? 'text-gray-400'
                                  : 'text-gray-500'
                              }`}
                            >
                              {progressPercent}%
                            </span>
                          </div>
                          {/* 진행 상황 표시 바 */}
                          <div className={`mt-1 w-full h-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className={`h-1 rounded-full ${
                                progressPercent === 100
                                  ? darkMode
                                    ? 'bg-green-500'
                                    : 'bg-green-500'
                                  : darkMode
                                  ? 'bg-blue-500'
                                  : 'bg-indigo-500'
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className='md:col-span-3'>
            <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className='text-2xl font-bold mb-6'>
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('_', ' ')}
              </h2>

              {/* 검색 결과가 없을 때 */}
              {filteredTopics.length === 0 && (
                <div className='text-center py-10'>
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    검색 결과가 없습니다. 다른 검색어를 입력해보세요.
                  </p>
                </div>
              )}

              {/* 토픽 리스트 */}
              <div className='space-y-6'>
                {filteredTopics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className={`border rounded-lg overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    {/* 토픽 헤더 (클릭 가능) */}
                    <div
                      className={`p-4 cursor-pointer flex justify-between items-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                      onClick={() => toggleTopic(topic.id)}
                    >
                      <div className='flex-1'>
                        <div className='flex items-center'>
                          <h3 className='text-lg font-medium'>{topic.title}</h3>
                          <div className='ml-3'>
                            <input
                              type='checkbox'
                              checked={!!progress[topic.id]}
                              onChange={(e) => {
                                e.stopPropagation();
                                markTopicComplete(topic.id, e.target.checked);
                              }}
                              className='h-4 w-4'
                            />
                          </div>
                        </div>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {topic.description}
                        </p>
                      </div>
                      <span className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                        {expandedTopics[topic.id] ? '▼' : '▶'}
                      </span>
                    </div>

                    {/* 확장 가능한 토픽 내용 */}
                    {expandedTopics[topic.id] && (
                      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                          {/* 내용을 단락으로 분할 */}
                          {topic.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>

                        {/* 핵심 포인트 */}
                        {renderKeyPoints(topic.keyPoints)}

                        {/* 코드 블록 */}
                        {topic.code && renderCodeBlock(topic.code)}

                        {/* 렌더링 비교 테이블 */}
                        {topic.renderingComparison && renderComparisonTable(topic.renderingComparison)}

                        {/* 추가 정보 섹션 */}
                        {topic.folderStructure && (
                          <div className='mt-6'>
                            <h4 className='font-medium text-lg mb-2'>프로젝트 구조</h4>
                            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {topic.folderStructure.structure?.map((item, idx) => (
                                <li key={idx} className='flex'>
                                  <span className='font-mono font-medium mr-2'>{item.path}</span>
                                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    - {item.description}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 다음/이전 학습 버튼 */}
                        <div className='mt-6 flex justify-between'>
                          {index > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTopics((prev) => ({
                                  ...prev,
                                  [topic.id]: false,
                                  [filteredTopics[index - 1].id]: true,
                                }));
                              }}
                              className={`px-4 py-2 rounded ${
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                            >
                              ← 이전 학습
                            </button>
                          )}
                          {index < filteredTopics.length - 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTopics((prev) => ({
                                  ...prev,
                                  [topic.id]: false,
                                  [filteredTopics[index + 1].id]: true,
                                }));
                              }}
                              className={`px-4 py-2 rounded ml-auto ${
                                darkMode
                                  ? 'bg-blue-600 hover:bg-blue-700'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                              }`}
                            >
                              다음 학습 →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className={`py-6 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className='container mx-auto px-4 text-center'>
          <p>React와 Next.js를 배우는 모든 개발자를 위해.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearningPage;
