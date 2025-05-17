'use client';

import QuizContent from '@/components/quiz/QuizContent';
import quizData from '@/data/quiz/quizData';
export default function QuizPage() {
  return (
    <main className='max-w-5xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center text-gray-900'>React vs Next.js 퀴즈</h1>
      <QuizContent quizData={quizData} />
    </main>
  );
}
