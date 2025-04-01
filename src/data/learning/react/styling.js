// React 스타일링 방식 및 접근성 관련 데이터
const stylingAndAccessibility = {
  styling: {
    approaches: [
      {
        name: '인라인 스타일',
        description: 'JavaScript 객체로 스타일 직접 정의',
        code: `function Button({ primary, children }) {
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
        pros: ['간단한 구현', '동적 스타일링 용이', '별도의 CSS 파일 불필요', 'JavaScript와 스타일 통합'],
        cons: [
          'CSS 의사 클래스(:hover 등) 직접 지원 안 됨',
          '미디어 쿼리 지원 제한적',
          '성능 이슈 가능성',
          'CSS 재사용 어려움',
        ],
      },
      {
        name: 'CSS 모듈',
        description: '로컬 스코프를 가진 CSS 파일로 스타일 정의',
        code: `/* Button.module.css */
.button {
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
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
import React from 'react';
import styles from './Button.module.css';

function Button({ primary, children }) {
  const buttonClass = primary ? styles.primary : styles.secondary;

  return (
    <button className={\`\${styles.button} \${buttonClass}\`}>
      {children}
    </button>
  );
}`,
        pros: [
          'CSS 클래스 이름 충돌 방지 (로컬 스코프)',
          '기존 CSS 지식과 도구 활용 가능',
          '의사 클래스와 미디어 쿼리 완전 지원',
          '런타임 오버헤드 없음',
        ],
        cons: [
          '동적 스타일링에 제한 있음',
          'CSS와 JS 사이의 변수 공유 어려움',
          '빌드 설정 필요',
          '클래스 이름 조합이 복잡할 수 있음',
        ],
      },
      {
        name: 'Sass/SCSS',
        description: 'CSS 전처리기를 사용한 고급 스타일링',
        code: `/* Button.scss */
$primary-color: #0066cc;
$secondary-color: #666666;

.button {
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;

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
}

/* Button.js */
import React from 'react';
import './Button.scss';

function Button({ primary, children }) {
  const buttonClass = primary ? 'primary' : 'secondary';

  return (
    <button className={\`button \${buttonClass}\`}>
      {children}
    </button>
  );
}`,
        pros: [
          '변수, 믹스인, 중첩 등 고급 기능',
          'CSS 코드 구조화 및 재사용성 향상',
          '대규모 스타일시트 관리 용이',
          '기존 CSS 문법과 호환',
        ],
        cons: [
          '빌드 단계 필요',
          '로컬 스코프를 위해 CSS 모듈과 결합 필요',
          '동적 스타일링에 제한 있음',
          '별도의 전처리기 학습 필요',
        ],
      },
      {
        name: 'Styled Components',
        description: 'CSS-in-JS 라이브러리를 사용한 컴포넌트 단위 스타일링',
        code: `import React from 'react';
import styled from 'styled-components';

// 스타일이 적용된 버튼 컴포넌트 정의
const StyledButton = styled.button\`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background-color: \${props => props.primary ? '#0066cc' : '#666666'};
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
        pros: [
          '컴포넌트와 스타일 통합',
          'props 기반 동적 스타일링',
          '벤더 프리픽스 적용',
          '테마 및 글로벌 스타일 지원',
          '실제 사용된 스타일만 최종 번들에 포함',
        ],
        cons: ['런타임 오버헤드', '새로운 API 학습 필요', '빌드 크기 증가 가능성', '개발 도구 통합 복잡할 수 있음'],
      },
      {
        name: 'Emotion',
        description: '강력한 CSS-in-JS 라이브러리',
        code: `/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// 인라인 스타일 방식
const buttonStyle = css\`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
\`;

const primaryStyle = css\`
  background-color: #0066cc;
  color: white;
  &:hover {
    background-color: #0052a3;
  }
\`;

const secondaryStyle = css\`
  background-color: #666666;
  color: white;
  &:hover {
    background-color: #4d4d4d;
  }
\`;

// styled 방식
const StyledButton = styled.button\`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background-color: \${props => props.primary ? '#0066cc' : '#666666'};
  color: white;

  &:hover {
    background-color: \${props => props.primary ? '#0052a3' : '#4d4d4d'};
  }
\`;

// 두 가지 사용 방식
function Button({ primary, children, variant }) {
  // css prop 방식
  if (variant === 'css') {
    return (
      <button
        css={[
          buttonStyle,
          primary ? primaryStyle : secondaryStyle
        ]}
      >
        {children}
      </button>
    );
  }

  // styled 방식
  return (
    <StyledButton primary={primary}>
      {children}
    </StyledButton>
  );
}`,
        pros: [
          'Styled Components와 유사한 장점',
          '다양한 스타일 적용 방식 지원',
          '서버 사이드 렌더링 지원 우수',
          '파일 크기가 작고 성능 최적화',
          '컴포지션 패턴에 최적화',
        ],
        cons: ['CSS-in-JS 접근법의 일반적인 단점', '다양한 API로 인한 학습 곡선', '설정이 복잡할 수 있음'],
      },
      {
        name: 'Tailwind CSS',
        description: '유틸리티-퍼스트 CSS 프레임워크',
        code: `// tailwind.config.js 설정 필요

// Button.js
import React from 'react';

function Button({ primary, children }) {
  const buttonClasses = \`
    px-4 py-2 
    rounded
    border-none
    cursor-pointer
    text-white
    \${primary 
      ? 'bg-blue-600 hover:bg-blue-700' 
      : 'bg-gray-600 hover:bg-gray-700'
    }
  \`;

  return (
    <button className={buttonClasses}>
      {children}
    </button>
  );
}`,
        pros: [
          'HTML 내에서 직접 스타일링',
          '빠른 개발 속도',
          '일관된 디자인 시스템',
          '번들 크기 최적화',
          '반응형 디자인 지원 우수',
        ],
        cons: [
          'HTML이 장황해질 수 있음',
          '학습 곡선',
          '사용자 정의 디자인에 추가 설정 필요',
          '분리된 관심사 원칙에 위배될 수 있음',
        ],
      },
    ],
    comparison: {
      title: '스타일링 접근법 비교',
      items: [
        {
          criteria: '개발 속도',
          inlineStyles: '빠름',
          cssModules: '보통',
          sass: '보통',
          styledComponents: '느림 (초기), 빠름 (익숙 후)',
          tailwind: '매우 빠름 (익숙 후)',
        },
        {
          criteria: '런타임 성능',
          inlineStyles: '보통',
          cssModules: '우수',
          sass: '우수',
          styledComponents: '보통',
          tailwind: '우수',
        },
        {
          criteria: '유지보수성',
          inlineStyles: '낮음',
          cssModules: '높음',
          sass: '높음',
          styledComponents: '매우 높음',
          tailwind: '보통',
        },
        {
          criteria: '동적 스타일링',
          inlineStyles: '우수',
          cssModules: '제한적',
          sass: '제한적',
          styledComponents: '우수',
          tailwind: '보통',
        },
        {
          criteria: '학습 곡선',
          inlineStyles: '낮음',
          cssModules: '낮음',
          sass: '중간',
          styledComponents: '중간',
          tailwind: '높음 (초기)',
        },
      ],
    },
    themingExample: {
      title: '테마 구현 예시 (Styled Components)',
      code: `// theme.js
export const lightTheme = {
  primary: '#0066cc',
  secondary: '#666666',
  background: '#ffffff',
  text: '#333333',
  border: '#dddddd',
};

export const darkTheme = {
  primary: '#4d94ff',
  secondary: '#999999',
  background: '#1a1a1a',
  text: '#f0f0f0',
  border: '#444444',
};

// App.js
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './GlobalStyle';

function App() {
  const [theme, setTheme] = useState('light');
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <button onClick={toggleTheme}>
        {theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      </button>
      <AppContent />
    </ThemeProvider>
  );
}

// 스타일이 적용된 컴포넌트
const Button = styled.button\`
  background-color: \${({ theme }) => theme.primary};
  color: white;
  padding: 10px 15px;
  border: 1px solid \${({ theme }) => theme.border};
  border-radius: 4px;
\`;

const Card = styled.div\`
  background-color: \${({ theme }) => theme.background};
  color: \${({ theme }) => theme.text};
  border: 1px solid \${({ theme }) => theme.border};
  padding: 20px;
  border-radius: 8px;
\`;`,
    },
    bestPractices: [
      '프로젝트 요구 사항에 맞는 스타일링 방식 선택하기',
      '일관된 디자인 시스템 및 변수 사용하기',
      '컴포넌트 단위로 스타일 캡슐화하기',
      '동적 스타일링 로직 간결하게 유지하기',
      '접근성(a11y)을 고려한 스타일링하기',
      '반응형 디자인 적용하기',
      '성능 영향을 고려한 스타일링 선택하기',
    ],
  },
  accessibility: {
    id: 'component-accessibility',
    title: '컴포넌트 접근성',
    description: '접근성(a11y)을 고려한 React 컴포넌트 개발 방법을 알아봅니다.',
    content: `웹 접근성(Web Accessibility, a11y)은 모든 사용자, 특히 장애를 가진 사용자들이 웹 콘텐츠에 접근하고 이용할 수 있도록 보장하는 것을 의미합니다. React 애플리케이션에서 접근성을 고려한 컴포넌트 개발은 법적 요구사항을 충족하는 것뿐만 아니라, 더 넓은 사용자층에게 서비스를 제공하기 위해 중요합니다.

React는 HTML과 마찬가지로 접근성 기능을 지원하지만, 개발자가 의도적으로 이를 활용해야 합니다. 시맨틱 HTML 요소 사용, ARIA 속성 추가, 키보드 탐색 지원, 색상 대비 확보 등의 방법으로 접근성을 향상시킬 수 있습니다.

접근성 있는 컴포넌트 개발은 처음부터 설계에 반영되어야 하며, 지속적인 테스트와 개선이 필요합니다.`,
    keyPoints: [
      '접근성은 모든 사용자를 위한 것',
      '시맨틱 HTML 요소 활용이 기본',
      'ARIA 속성으로 의미와 상태 보완',
      '키보드 탐색 및 포커스 관리 중요',
      '충분한 색상 대비와 텍스트 크기 확보',
      '스크린 리더 호환성 확인 필요',
    ],
    guidelines: [
      {
        name: '시맨틱 HTML 사용',
        description: '적절한 HTML 요소를 사용하여 문서 구조 정의',
        code: `// 잘못된 예
function BadArticle() {
  return (
    <div className="article">
      <div className="article-title">접근성 소개</div>
      <div className="article-content">
        이 글은 접근성에 대해 설명합니다.
      </div>
    </div>
  );
}

// 좋은 예
function GoodArticle() {
  return (
    <article>
      <h2>접근성 소개</h2>
      <p>이 글은 접근성에 대해 설명합니다.</p>
    </article>
  );
}`,
        tips: [
          '구조에 맞는 시맨틱 태그 사용(article, section, nav, header, footer 등)',
          '제목에 h1-h6 태그 사용하고 계층 구조 유지',
          '목록은 ul, ol, dl 태그 사용',
          '강조는 em, strong 태그 사용',
          'div, span은 다른 적절한 요소가 없을 때만 사용',
        ],
      },
      {
        name: 'ARIA 속성 적용',
        description: 'Accessible Rich Internet Applications 속성으로 접근성 향상',
        code: `// 탭 컴포넌트 예시
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div role="tablist" aria-label="콘텐츠 탭">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            id={\`tab-\${index}\`}
            aria-selected={activeTab === index}
            aria-controls={\`panel-\${index}\`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={\`panel-\${index}\`}
          aria-labelledby={\`tab-\${index}\`}
          hidden={activeTab !== index}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}`,
        tips: [
          'ARIA 역할(role)로 요소의 목적 명시',
          'aria-label, aria-labelledby로 요소 설명',
          'aria-expanded, aria-hidden으로 상태 표시',
          'aria-live로 동적 콘텐츠 알림',
          'HTML이 의미를 전달하면 ARIA 사용 자제',
        ],
      },
      {
        name: '키보드 접근성',
        description: '마우스 없이도 모든 기능을 이용할 수 있도록 지원',
        code: `// 키보드 접근성 예시
function KeyboardAccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const items = ['프로필', '설정', '알림', '로그아웃'];

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
      case ' ': // 스페이스바
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else if (activeIndex >= 0) {
          alert(\`선택: \${items[activeIndex]}\`);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        메뉴
      </button>

      {isOpen && (
        <ul role="menu">
          {items.map((item, index) => (
            <li
              key={index}
              role="menuitem"
              tabIndex={0}
              aria-selected={activeIndex === index}
              style={{ 
                backgroundColor: activeIndex === index ? '#eee' : 'transparent' 
              }}
              onClick={() => {
                alert(\`선택: \${item}\`);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        tips: [
          '모든 상호작용 요소에 키보드 접근성 제공',
          'tabIndex 속성으로 포커스 순서 관리',
          '키보드 단축키 제공 시 충돌 방지',
          '포커스 표시 스타일 유지 (outline 제거 지양)',
          'Escape 키로 모달, 메뉴 등 닫기 지원',
        ],
      },
      {
        name: '색상 및 시각적 접근성',
        description: '시각 장애가 있는 사용자를 위한 디자인 고려',
        code: `// 접근성 있는 폼 필드 예시
function AccessibleFormField({ label, error, ...props }) {
  const id = useId();
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {props.required && (
          <span className="required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? \`\${id}-error\` : undefined}
        {...props}
      />
      {error && (
        <div
          id={\`\${id}-error\`}
          className="error-message"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}

// CSS
/* 
.error-message {
  color: #c30;  // 배경색과 4.5:1 이상의 대비 보장
  font-weight: bold;
  display: flex;
  align-items: center;
}

.error-message::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("error-icon.svg");
  margin-right: 8px;
}
*/`,
        tips: [
          'WCAG 권장 대비율 준수 (일반 텍스트 4.5:1, 큰 텍스트 3:1)',
          '색상만으로 정보 전달하지 않기 (아이콘, 텍스트 보조)',
          '충분한 텍스트 크기와 줄 간격 사용',
          '고대비 모드 지원 고려',
          '애니메이션 최소화 및 제어 옵션 제공',
        ],
      },
      {
        name: '폼 접근성',
        description: '접근성 있는 입력 폼 구현',
        code: `// 접근성 있는 폼 예시
function AccessibleForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    preference: 'email',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 처리
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="form-title">
      <h2 id="form-title">뉴스레터 구독</h2>

      <div className="form-field">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-required="true"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-required="true"
          required
        />
      </div>

      <fieldset>
        <legend>연락 방식</legend>
        
        <div className="radio-group">
          <input
            id="pref-email"
            name="preference"
            type="radio"
            value="email"
            checked={values.preference === 'email'}
            onChange={handleChange}
          />
          <label htmlFor="pref-email">이메일</label>
        </div>
        
        <div className="radio-group">
          <input
            id="pref-phone"
            name="preference"
            type="radio"
            value="phone"
            checked={values.preference === 'phone'}
            onChange={handleChange}
          />
          <label htmlFor="pref-phone">전화</label>
        </div>
      </fieldset>

      <div className="checkbox-field">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={values.terms}
          onChange={handleChange}
          required
        />
        <label htmlFor="terms">
          개인정보 처리방침에 동의합니다.
        </label>
      </div>

      <button type="submit" disabled={!values.terms}>
        구독하기
      </button>
    </form>
  );
}`,
        tips: [
          '모든 입력 필드에 연결된 레이블 제공',
          '필드셋과 레전드로 관련 필드 그룹화',
          '필수 필드 명확히 표시',
          '오류 메시지 명시적 연결',
          '충분한 터치 영역 확보',
        ],
      },
    ],
    tools: [
      {
        name: 'eslint-plugin-jsx-a11y',
        description: 'ESLint 플러그인으로 접근성 문제 정적 분석',
        example: `// .eslintrc 설정
{
  "plugins": ["jsx-a11y"],
  "extends": ["plugin:jsx-a11y/recommended"]
}`,
      },
      {
        name: 'React Axe',
        description: '개발 모드에서 접근성 이슈를 실시간으로 확인',
        example: `// index.js (개발 환경에서만 추가)
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  const React = require('react');
  const ReactDOM = require('react-dom');

  axe(React, ReactDOM, 1000);
}`,
      },
      {
        name: 'WAVE (Web Accessibility Evaluation Tool)',
        description: '웹 페이지 접근성 문제를 식별하는 도구',
        features: [
          '자동화된 접근성 검사',
          '문제에 대한 시각적 표시',
          '문제 해결 방법에 대한 가이드라인',
          '브라우저 확장 프로그램으로 사용 가능',
        ],
      },
      {
        name: 'React Testing Library',
        description: '접근성을 고려한 컴포넌트 테스트 도구',
        example: `// 접근성 테스트 예시
import { render, screen } from '@testing-library/react';
import Form from './Form';

test('폼 요소가 레이블과 연결되어 있다', () => {
  render(<Form />);

  // 레이블로 입력 필드 찾기 (연결 확인)
  const nameInput = screen.getByLabelText('이름');
  expect(nameInput).toBeInTheDocument();

  // 역할과 상태로 요소 찾기
  const submitButton = screen.getByRole('button', { name: '제출' });
  expect(submitButton).not.toBeDisabled();
});`,
      },
    ],
    bestPractices: [
      '처음부터 접근성을 고려하여 설계하기',
      'HTML 시맨틱 요소 적극 활용하기',
      '키보드 접근성 보장하기',
      '적절한 색상 대비 확보하기',
      '스크린 리더 호환성 테스트하기',
      '접근성 도구로 정기적으로 검사하기',
      '실제 사용자 피드백 반영하기',
    ],
  },
};
