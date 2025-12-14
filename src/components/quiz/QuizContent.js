'use client';

import { useState, useEffect, useMemo } from 'react';
import { difficultyLabels, categories, difficulties } from '@/data/quiz/quizData';

// 로컬 스토리지 키
const QUIZ_HISTORY_KEY = 'quiz_history';
const QUIZ_SETTINGS_KEY = 'quiz_settings';

// 히스토리 저장
function saveHistory(history) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  }
}

// 히스토리 로드
function loadHistory() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(QUIZ_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  }
  return [];
}

// 설정 저장
function saveSettings(settings) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify(settings));
  }
}

// 설정 로드
function loadSettings() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(QUIZ_SETTINGS_KEY);
    return saved ? JSON.parse(saved) : { category: 'All', difficulty: 'All' };
  }
  return { category: 'All', difficulty: 'All' };
}

// 난이도 배지 컴포넌트
function DifficultyBadge({ difficulty }) {
  const info = difficultyLabels[difficulty];
  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClasses[info.color]}`}>
      {info.label}
    </span>
  );
}

// 필터 컴포넌트
function QuizFilters({ category, difficulty, onCategoryChange, onDifficultyChange, filteredCount, totalCount }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">카테고리:</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? '전체' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">난이도:</label>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff === 'All' ? '전체' : difficultyLabels[diff]?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-500">
          {filteredCount} / {totalCount} 문제
        </div>
      </div>
    </div>
  );
}

// 진행률 컴포넌트
function ProgressBar({ current, total, correctCount }) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>문제 {current + 1} / {total}</span>
        <span>정답: {correctCount}개</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// 결과 화면 컴포넌트
function QuizResult({ correctCount, totalCount, history, onRestart, onShare }) {
  const percentage = Math.round((correctCount / totalCount) * 100);

  const getMessage = () => {
    if (percentage >= 90) return '훌륭합니다! 마스터 수준이에요! 🏆';
    if (percentage >= 70) return '잘했어요! 조금만 더 노력하면 완벽해요! 🎉';
    if (percentage >= 50) return '좋은 시작이에요! 계속 학습해보세요! 💪';
    return '아직 배울 게 많아요. 다시 도전해보세요! 📚';
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">퀴즈 완료!</h2>

      <div className="mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-2">{percentage}%</div>
        <p className="text-gray-600">{correctCount} / {totalCount} 정답</p>
      </div>

      <p className="text-lg text-gray-700 mb-8">{getMessage()}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          다시 풀기
        </button>
        <button
          onClick={onShare}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition"
        >
          결과 공유
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">틀린 문제 복습</h3>
          <div className="space-y-3 text-left max-h-64 overflow-y-auto">
            {history
              .filter((item) => !item.correct)
              .map((item, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-800 font-medium">{item.question}</p>
                  <p className="text-xs text-red-600 mt-1">
                    정답: {item.correctAnswer}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 히스토리 패널 컴포넌트
function HistoryPanel({ history, onClear }) {
  if (history.length === 0) return null;

  const recentSessions = history.slice(-5).reverse();

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">최근 기록</h3>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700"
        >
          기록 삭제
        </button>
      </div>
      <div className="space-y-2">
        {recentSessions.map((session, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-600 p-2 bg-gray-50 rounded">
            <span>{new Date(session.date).toLocaleDateString('ko-KR')}</span>
            <span>
              {session.correct}/{session.total} ({Math.round((session.correct / session.total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QuizContent({ quizData }) {
  // 상태
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [settings, setSettings] = useState({ category: 'All', difficulty: 'All' });
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드 확인
  useEffect(() => {
    setIsClient(true);
    setSessionHistory(loadHistory());
    setSettings(loadSettings());
  }, []);

  // 필터링된 퀴즈 데이터
  const filteredQuizData = useMemo(() => {
    return quizData.filter((q) => {
      const categoryMatch = settings.category === 'All' || q.category === settings.category;
      const difficultyMatch = settings.difficulty === 'All' || q.difficulty === settings.difficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [quizData, settings.category, settings.difficulty]);

  // 현재 문제
  const current = filteredQuizData[currentQuestion];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    const newSettings = { ...settings, category };
    setSettings(newSettings);
    saveSettings(newSettings);
    handleRestart();
  };

  // 난이도 변경 핸들러
  const handleDifficultyChange = (difficulty) => {
    const newSettings = { ...settings, difficulty };
    setSettings(newSettings);
    saveSettings(newSettings);
    handleRestart();
  };

  // 옵션 클릭 핸들러
  const handleOptionClick = (index) => {
    if (showAnswer) return;

    setSelectedOption(index);
    setShowAnswer(true);

    const isCorrect = index === current.answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setAnswerHistory((prev) => [
      ...prev,
      {
        questionId: current.id,
        question: current.question,
        selectedAnswer: current.options[index],
        correctAnswer: current.options[current.answer],
        correct: isCorrect,
      },
    ]);
  };

  // 다음 문제 핸들러
  const handleNext = () => {
    if (currentQuestion < filteredQuizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      // 퀴즈 종료
      setQuizFinished(true);

      // 세션 히스토리 저장
      const newSession = {
        date: new Date().toISOString(),
        correct: correctCount + (selectedOption === current.answer ? 0 : 0),
        total: filteredQuizData.length,
        category: settings.category,
        difficulty: settings.difficulty,
      };

      // 정답 수 재계산 (마지막 문제 포함)
      const finalCorrect = answerHistory.filter((h) => h.correct).length;
      newSession.correct = finalCorrect;

      const updatedHistory = [...sessionHistory, newSession];
      setSessionHistory(updatedHistory);
      saveHistory(updatedHistory);
    }
  };

  // 재시작 핸들러
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setCorrectCount(0);
    setQuizFinished(false);
    setAnswerHistory([]);
  };

  // 공유 핸들러
  const handleShare = async () => {
    const finalCorrect = answerHistory.filter((h) => h.correct).length;
    const percentage = Math.round((finalCorrect / filteredQuizData.length) * 100);
    const shareText = `React vs Next.js 퀴즈 결과!\n\n📊 점수: ${finalCorrect}/${filteredQuizData.length} (${percentage}%)\n📚 카테고리: ${settings.category === 'All' ? '전체' : settings.category}\n⭐ 난이도: ${settings.difficulty === 'All' ? '전체' : difficultyLabels[settings.difficulty]?.label}\n\n나도 도전해보기 👉`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'React vs Next.js 퀴즈',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // 사용자가 공유 취소
      }
    } else {
      // 클립보드에 복사
      try {
        await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
        alert('결과가 클립보드에 복사되었습니다!');
      } catch (err) {
        alert('공유 기능을 사용할 수 없습니다.');
      }
    }
  };

  // 히스토리 삭제 핸들러
  const handleClearHistory = () => {
    if (confirm('모든 기록을 삭제하시겠습니까?')) {
      setSessionHistory([]);
      saveHistory([]);
    }
  };

  // 클라이언트 렌더링 전
  if (!isClient) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 필터링된 문제가 없는 경우
  if (filteredQuizData.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <QuizFilters
          category={settings.category}
          difficulty={settings.difficulty}
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={handleDifficultyChange}
          filteredCount={0}
          totalCount={quizData.length}
        />
        <div className="bg-white rounded-2xl shadow p-8 text-center border border-gray-200">
          <p className="text-gray-600">선택한 조건에 맞는 문제가 없습니다.</p>
          <button
            onClick={() => {
              setSettings({ category: 'All', difficulty: 'All' });
              saveSettings({ category: 'All', difficulty: 'All' });
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            필터 초기화
          </button>
        </div>
      </div>
    );
  }

  // 퀴즈 완료 화면
  if (quizFinished) {
    const finalCorrect = answerHistory.filter((h) => h.correct).length;
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <QuizFilters
          category={settings.category}
          difficulty={settings.difficulty}
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={handleDifficultyChange}
          filteredCount={filteredQuizData.length}
          totalCount={quizData.length}
        />
        <QuizResult
          correctCount={finalCorrect}
          totalCount={filteredQuizData.length}
          history={answerHistory}
          onRestart={handleRestart}
          onShare={handleShare}
        />
      </div>
    );
  }

  // 퀴즈 진행 화면
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <QuizFilters
        category={settings.category}
        difficulty={settings.difficulty}
        onCategoryChange={handleCategoryChange}
        onDifficultyChange={handleDifficultyChange}
        filteredCount={filteredQuizData.length}
        totalCount={quizData.length}
      />

      <HistoryPanel history={sessionHistory} onClear={handleClearHistory} />

      <ProgressBar
        current={currentQuestion}
        total={filteredQuizData.length}
        correctCount={answerHistory.filter((h) => h.correct).length}
      />

      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
        {/* 문제 헤더 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {current.category}
          </span>
          <DifficultyBadge difficulty={current.difficulty} />
        </div>

        {/* 문제 */}
        <p className="text-lg font-medium text-gray-800 mb-6">{current.question}</p>

        {/* 선택지 */}
        <div className="space-y-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition cursor-pointer
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
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        {/* 정답 피드백 */}
        {showAnswer && (
          <div className="mt-6">
            {selectedOption === current.answer ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-semibold mb-2">정답입니다! 🎉</p>
                <p className="text-green-600 text-sm">{current.explanation}</p>
              </div>
            ) : (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700 font-semibold mb-2">
                  틀렸어요. 정답은 &quot;{current.options[current.answer]}&quot; 입니다.
                </p>
                <p className="text-red-600 text-sm">{current.explanation}</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                {currentQuestion < filteredQuizData.length - 1 ? '다음 문제' : '결과 보기'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
