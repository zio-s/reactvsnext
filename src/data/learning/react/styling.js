// React 스타일링 학습 데이터
const styling = [
  {
    id: 'inline-styles',
    title: '인라인 스타일',
    description: 'JavaScript 객체로 스타일을 직접 정의하는 방법입니다.',
    content: `인라인 스타일은 React에서 가장 기본적인 스타일링 방법입니다. JavaScript 객체를 사용하여 스타일을 직접 정의하고 style 속성에 전달합니다.

CSS 속성명은 camelCase로 작성하며, 값은 문자열 또는 숫자로 지정합니다. 숫자 값은 자동으로 픽셀(px) 단위로 변환됩니다.

인라인 스타일은 간단한 동적 스타일링에 유용하지만, 의사 클래스(:hover 등)를 지원하지 않고 재사용성이 떨어지는 단점이 있습니다.`,
    keyPoints: [
      'JavaScript 객체로 스타일 정의',
      'CSS 속성명은 camelCase 사용',
      '동적 스타일링에 용이',
      ':hover, :focus 등 의사 클래스 미지원',
      '미디어 쿼리 직접 지원 안 됨',
    ],
    code: {
      title: '인라인 스타일 예시',
      language: 'jsx',
      snippet: `function Button({ primary, children }) {
  const buttonStyle = {
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={buttonStyle}>
      {children}
    </button>
  );
}`,
    },
  },
  {
    id: 'css-modules',
    title: 'CSS Modules',
    description: '로컬 스코프를 가진 CSS 파일로 스타일을 정의합니다.',
    content: `CSS Modules는 CSS 파일의 클래스명을 자동으로 고유하게 변환하여 전역 네임스페이스 충돌을 방지합니다.

파일명을 [name].module.css 형식으로 지정하면 자동으로 CSS Module로 인식됩니다. import한 styles 객체를 통해 클래스에 접근할 수 있습니다.

기존 CSS 문법을 그대로 사용할 수 있어 학습 비용이 낮고, 빌드 시 정적으로 처리되어 런타임 오버헤드가 없습니다.`,
    keyPoints: [
      '클래스명 자동 해싱으로 충돌 방지',
      '기존 CSS 문법 그대로 사용',
      '런타임 오버헤드 없음',
      '의사 클래스, 미디어 쿼리 완전 지원',
      'Next.js, CRA에서 기본 지원',
    ],
    code: {
      title: 'CSS Modules 사용 예시',
      language: 'jsx',
      snippet: `/* Button.module.css */
.button {
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: blue;
  color: white;
}

.secondary {
  background-color: gray;
  color: white;
}

/* Button.js */
import styles from './Button.module.css';

function Button({ primary, children }) {
  const buttonClass = primary
    ? styles.primary
    : styles.secondary;

  return (
    <button className={\`\${styles.button} \${buttonClass}\`}>
      {children}
    </button>
  );
}`,
    },
  },
  {
    id: 'styled-components',
    title: 'Styled Components',
    description: 'CSS-in-JS 라이브러리를 사용한 컴포넌트 단위 스타일링입니다.',
    content: `Styled Components는 가장 인기 있는 CSS-in-JS 라이브러리 중 하나입니다. 컴포넌트와 스타일을 하나의 파일에서 관리할 수 있습니다.

Tagged Template Literal 문법을 사용하여 일반 CSS 문법으로 스타일을 작성하며, props를 통해 동적으로 스타일을 변경할 수 있습니다.

자동으로 고유한 클래스명을 생성하고, 벤더 프리픽스를 자동 적용하며, 테마 지원이 내장되어 있습니다.`,
    keyPoints: [
      '컴포넌트와 스타일 통합 관리',
      'props 기반 동적 스타일링',
      '자동 벤더 프리픽스 적용',
      '테마 시스템 내장',
      '서버 사이드 렌더링 지원',
    ],
    code: {
      title: 'Styled Components 예시',
      language: 'jsx',
      snippet: `import styled from 'styled-components';

const StyledButton = styled.button\`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background-color: \${props => props.primary ? '#0066cc' : '#666'};
  color: white;

  &:hover {
    background-color: \${props => props.primary ? '#0052a3' : '#4d4d4d'};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
\`;

function Button({ primary, children }) {
  return (
    <StyledButton primary={primary}>
      {children}
    </StyledButton>
  );
}`,
    },
  },
  {
    id: 'tailwind-css',
    title: 'Tailwind CSS',
    description: '유틸리티-퍼스트 CSS 프레임워크를 활용한 스타일링입니다.',
    content: `Tailwind CSS는 유틸리티 클래스를 조합하여 스타일을 적용하는 방식입니다. 미리 정의된 클래스를 사용하여 빠르게 스타일링할 수 있습니다.

일관된 디자인 시스템을 제공하고, 사용하지 않는 스타일을 자동으로 제거(Purge)하여 번들 크기를 최적화합니다.

초기 학습 곡선이 있지만, 익숙해지면 매우 빠른 개발 속도를 얻을 수 있습니다.`,
    keyPoints: [
      '유틸리티 클래스 조합 방식',
      '일관된 디자인 시스템 제공',
      '미사용 CSS 자동 제거 (Tree Shaking)',
      '반응형 디자인 유틸리티 내장',
      'JIT 컴파일러로 빠른 빌드',
    ],
    code: {
      title: 'Tailwind CSS 예시',
      language: 'jsx',
      snippet: `function Button({ primary, children }) {
  const baseClasses = \`
    px-4 py-2
    rounded
    border-none
    cursor-pointer
    text-white
    transition-colors
  \`;

  const colorClasses = primary
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-gray-600 hover:bg-gray-700';

  return (
    <button className={\`\${baseClasses} \${colorClasses}\`}>
      {children}
    </button>
  );
}

// 반응형 예시
function ResponsiveCard() {
  return (
    <div className="
      p-4 md:p-6 lg:p-8
      text-sm md:text-base
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      gap-4
    ">
      {/* 콘텐츠 */}
    </div>
  );
}`,
    },
  },
  {
    id: 'emotion',
    title: 'Emotion',
    description: '유연한 CSS-in-JS 라이브러리입니다.',
    content: `Emotion은 Styled Components와 유사한 CSS-in-JS 라이브러리이지만, 더 다양한 스타일 적용 방식을 제공합니다.

css prop을 사용한 인라인 방식과 styled API를 사용한 컴포넌트 방식 모두 지원합니다. 번들 크기가 작고 성능이 우수합니다.

서버 사이드 렌더링 지원이 뛰어나며, Next.js와의 통합이 간편합니다.`,
    keyPoints: [
      '다양한 스타일 적용 방식 지원',
      '작은 번들 크기',
      '뛰어난 SSR 지원',
      'css prop과 styled API 모두 제공',
      '컴포지션 패턴에 최적화',
    ],
    code: {
      title: 'Emotion 사용 예시',
      language: 'jsx',
      snippet: `/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// css prop 방식
const buttonStyle = css\`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
\`;

const primaryStyle = css\`
  background-color: #0066cc;
  color: white;
  &:hover {
    background-color: #0052a3;
  }
\`;

function CssPropButton({ primary, children }) {
  return (
    <button css={[buttonStyle, primary && primaryStyle]}>
      {children}
    </button>
  );
}

// styled 방식
const StyledButton = styled.button\`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: \${props => props.primary ? '#0066cc' : '#666'};
  color: white;
\`;`,
    },
  },
  {
    id: 'sass-scss',
    title: 'Sass/SCSS',
    description: 'CSS 전처리기를 사용한 고급 스타일링입니다.',
    content: `Sass는 CSS의 기능을 확장한 전처리기로, 변수, 중첩, 믹스인, 함수 등의 기능을 제공합니다.

SCSS는 Sass의 최신 문법으로, 기존 CSS와 완전히 호환됩니다. 대규모 스타일시트를 구조화하고 관리하는 데 유용합니다.

Next.js와 Create React App에서 기본적으로 지원하며, 별도의 설정 없이 사용할 수 있습니다.`,
    keyPoints: [
      '변수, 믹스인, 함수 등 고급 기능',
      '중첩 규칙으로 구조화된 코드',
      '기존 CSS 문법과 호환',
      '대규모 프로젝트 관리에 적합',
      '@import, @use로 모듈화',
    ],
    code: {
      title: 'SCSS 사용 예시',
      language: 'scss',
      snippet: `// _variables.scss
$primary-color: #0066cc;
$secondary-color: #666666;
$border-radius: 4px;

// _mixins.scss
@mixin button-base {
  padding: 10px 15px;
  border-radius: $border-radius;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

// Button.scss
@use 'variables' as *;
@use 'mixins' as *;

.button {
  @include button-base;

  &.primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  &.secondary {
    background-color: $secondary-color;
    color: white;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}`,
    },
  },
  {
    id: 'theming',
    title: '테마 시스템 구현',
    description: '다크 모드 등 테마 전환 기능을 구현하는 방법입니다.',
    content: `테마 시스템을 구현하면 사용자에게 라이트/다크 모드 등 다양한 시각적 옵션을 제공할 수 있습니다.

CSS 변수(Custom Properties)나 CSS-in-JS 라이브러리의 ThemeProvider를 활용하여 구현할 수 있습니다.

시스템 설정을 감지하여 자동으로 테마를 적용하거나, 사용자 선호도를 로컬 스토리지에 저장하여 유지할 수 있습니다.`,
    keyPoints: [
      'CSS 변수 또는 ThemeProvider 활용',
      '시스템 테마 감지 (prefers-color-scheme)',
      '로컬 스토리지로 사용자 설정 유지',
      '테마 전환 애니메이션 적용 가능',
      '접근성을 고려한 색상 대비 확보',
    ],
    code: {
      title: '테마 시스템 구현 예시',
      language: 'jsx',
      snippet: `// CSS 변수 방식 (globals.css)
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --accent: #0066cc;
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #f0f0f0;
  --accent: #4d94ff;
}

// ThemeProvider.js
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // 시스템 테마 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (mediaQuery.matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);`,
    },
  },
  {
    id: 'accessibility-styling',
    title: '접근성을 고려한 스타일링',
    description: '모든 사용자가 이용할 수 있는 접근성 있는 스타일을 작성합니다.',
    content: `접근성 있는 스타일링은 시각 장애, 색각 이상 등 다양한 사용자를 고려하여 UI를 설계하는 것입니다.

충분한 색상 대비, 포커스 표시, 적절한 텍스트 크기 등이 중요합니다. WCAG 가이드라인을 준수하면 더 많은 사용자에게 좋은 경험을 제공할 수 있습니다.

색상만으로 정보를 전달하지 않고, 아이콘이나 텍스트로 보조하는 것이 좋습니다.`,
    keyPoints: [
      'WCAG 색상 대비 기준 준수 (4.5:1)',
      '포커스 표시 스타일 유지 (outline 제거 금지)',
      '충분한 텍스트 크기와 줄 간격',
      '색상 외 추가 정보 제공',
      'prefers-reduced-motion 미디어 쿼리 지원',
    ],
    code: {
      title: '접근성 스타일링 예시',
      language: 'css',
      snippet: `/* 포커스 스타일 - 절대 제거하지 않기 */
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* 포커스-비지블 (키보드 포커스만 표시) */
button:focus:not(:focus-visible) {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* 색상 대비 확보 */
.error-message {
  color: #c30000;  /* 배경색과 4.5:1 이상 대비 */
  font-weight: bold;
}

/* 색상 외 추가 표시 */
.error-message::before {
  content: "⚠ ";
}

/* 애니메이션 감소 설정 존중 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 충분한 터치 영역 */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}`,
    },
  },
];

export default styling;
