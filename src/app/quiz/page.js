'use client';

import QuizContent from '@/components/quiz/QuizContent';
import quizData from '@/data/quiz/quizData';
export default function QuizPage() {
  return (
    <main className='max-w-5xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center text-gray-900'>Quiz ✅</h1>
      <QuizContent quizData={quizData} />
    </main>
  );
}
