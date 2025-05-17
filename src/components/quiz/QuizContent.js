'use client';

import { useState } from 'react';

export default function QuizContent({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const current = quizData[currentQuestion];

  return (
    <div className='w-full max-w-3xl mx-auto px-4 py-8'>
      <div className='bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200'>
        <p className='text-lg font-medium text-gray-800 mb-4'>{current.question}</p>

        <div className='space-y-3'>
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition
                ${
                  showAnswer
                    ? index === current.answer
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : index === selectedOption
                      ? 'bg-red-50 border-red-500 text-red-700'
                      : 'border-gray-300 text-gray-700'
                    : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                }`}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        {showAnswer && (
          <div className='mt-6 text-center'>
            {selectedOption === current.answer ? (
              <p className='text-green-600 font-semibold'>정답입니다!</p>
            ) : (
              <p className='text-red-600 font-semibold'>틀렸어요. 정답은 "{current.options[current.answer]}" 입니다.</p>
            )}
            {currentQuestion < quizData.length - 1 ? (
              <button
                onClick={handleNext}
                className='mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700'
              >
                다음 문제
              </button>
            ) : (
              <p className='mt-4 text-blue-600 font-medium'>퀴즈가 모두 끝났습니다!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
