// data/learning/react/state-management.js
// React 상태 관리 학습 데이터

const stateManagement = [
  {
    id: 'state-management-intro',
    title: 'React 상태 관리 소개',
    description: 'React에서 상태 관리의 중요성과 다양한 상태 관리 방법을 소개합니다.',
    content: `상태 관리(State Management)는 React 애플리케이션에서 데이터를 관리하고 컴포넌트 간에 데이터를 공유하는 방법을 말합니다. React 애플리케이션이 복잡해짐에 따라 효율적인 상태 관리는 필수적입니다.

React는 기본적으로 컴포넌트 내부에서 useState를 통한 로컬 상태 관리를 제공합니다. 그러나 애플리케이션의 규모가 커지고 다양한 컴포넌트 간에 상태를 공유해야 할 때는 더 체계적인 상태 관리 방법이 필요합니다.

상태 관리의 방식은 크게 내장 상태 관리(Built-in State Management)와 외부 라이브러리를 사용한 상태 관리로 나눌 수 있습니다. 내장 상태 관리에는 useState, useReducer, Context API 등이 있으며, 외부 라이브러리로는 Redux, Recoil, Zustand, Jotai, MobX 등이 있습니다.`,
    keyPoints: [
      '적절한 상태 관리는 애플리케이션의 성능과 유지보수성에 직접적인 영향을 미침',
      '상태의 위치와 범위에 따라 적절한 상태 관리 도구 선택 필요',
      '로컬 상태, 글로벌 상태, 서버 상태 등 다양한 유형의 상태 존재',
      '단방향 데이터 흐름 유지하는 것이 중요',
      '상태 관리 도구 선택 시 팀의 경험, 프로젝트 복잡도, 성능 요구사항 고려 필요',
      '불필요한 리렌더링을 방지하는 상태 최적화 기법 중요',
    ],
    code: {
      title: '상태 관리 방식 비교',
      language: 'jsx',
      snippet: `// 1. 로컬 상태 관리 (useState)
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

// 2. useReducer를 사용한 복잡한 상태 관리
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
    </div>
  );
}

// 3. Context API를 사용한 상태 공유
import React, { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = { count, setCount };
  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

function Counter() {
  const { count, setCount } = useContext(CounterContext);
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}`,
    },
    visualAid: 'react-state-management-flow.svg',
    resources: [
      {
        name: 'React 공식 문서 - 상태 관리',
        url: 'https://react.dev/learn/managing-state',
        type: 'documentation',
      },
      {
        name: 'Redux 공식 문서',
        url: 'https://redux.js.org',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'useState-hook',
    title: 'useState Hook',
    description: 'React의 가장 기본적인 상태 관리 도구인 useState Hook을 자세히 알아봅니다.',
    content: `useState는 React 함수형 컴포넌트에서 상태를 추가할 수 있게 해주는 Hook입니다. 이 Hook은 현재 상태 값과 이 값을 업데이트하는 함수를 쌍으로 제공합니다.

useState의 인자로는 상태의 초기값을 전달합니다. 초기값은 첫 번째 렌더링에만 사용되며, 이후 렌더링에서는 무시됩니다. 만약 초기값이 복잡한 계산을 필요로 한다면, 함수를 전달하여 지연 초기화(lazy initialization)를 할 수 있습니다.

상태 업데이트 함수는 새로운 상태 값을 직접 전달하거나, 이전 상태를 기반으로 새 상태를 계산하는 함수를 전달할 수 있습니다. 함수를 전달하는 방식은 이전 상태에 의존하는 업데이트에서 권장됩니다.`,
    keyPoints: [
      '컴포넌트의 로컬 상태 관리에 적합',
      '함수형 업데이트로 이전 상태 기반 업데이트 가능',
      '객체 상태 업데이트 시 전체 객체를 새로 생성해야 함',
      '상태 업데이트는 비동기적으로 일괄 처리됨',
      '독립적인 상태는 여러 useState 호출로 분리하는 것이 좋음',
      '복잡한 상태 로직은 useReducer 고려',
    ],
    code: {
      title: 'useState 활용 예시',
      language: 'jsx',
      snippet: `import React, { useState } from 'react';

function UserForm() {
  // 기본적인 원시 타입 상태
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
  // 객체 형태의 상태
  const [user, setUser] = useState({ name: '', email: '' });
  
  // 배열 형태의 상태
  const [skills, setSkills] = useState([]);
  
  // 이전 상태에 기반한 업데이트 (함수형 업데이트)
  const incrementAge = () => {
    setAge(prevAge => prevAge + 1);
  };
  
  // 객체 상태 업데이트 (불변성 유지)
  const updateUserEmail = (email) => {
    setUser(prevUser => ({ ...prevUser, email }));
  };
  
  // 배열 상태 업데이트
  const addSkill = (skill) => {
    setSkills(prevSkills => [...prevSkills, skill]);
  };
  
  // 지연 초기화 (복잡한 초기값)
  const [initialData] = useState(() => {
    // 복잡한 계산이나 로컬 스토리지에서 값 가져오기 등
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : { theme: 'light', notifications: true };
  });
  
  return (
    <div>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="이름"
      />
      
      <div>
        <span>나이: {age}</span>
        <button onClick={incrementAge}>나이 증가</button>
      </div>
      
      <input 
        value={user.email} 
        onChange={e => updateUserEmail(e.target.value)} 
        placeholder="이메일"
      />
      
      <button onClick={() => addSkill('React')}>React 스킬 추가</button>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    bestPractices: [
      {
        title: '상태 분할하기',
        description: '관련 없는 상태는 여러 useState 호출로 분리하여 관리하는 것이 좋습니다.',
        code: `// 권장
const [name, setName] = useState('');
const [age, setAge] = useState(0);

// 관련 있는 상태는 객체로 그룹화
const [position, setPosition] = useState({ x: 0, y: 0 });`,
      },
      {
        title: '함수형 업데이트 사용하기',
        description: '이전 상태에 의존하는 업데이트는 함수형 업데이트를 사용해야 합니다.',
        code: `// 권장 (함수형 업데이트)
setCount(prevCount => prevCount + 1);

// 권장하지 않음 (경쟁 상태 발생 가능)
setCount(count + 1);`,
      },
      {
        title: '객체 상태 업데이트 시 불변성 유지하기',
        description: '객체나 배열 상태를 업데이트할 때는 불변성을 유지해야 합니다.',
        code: `// 객체 업데이트 (권장)
setUser(prevUser => ({ ...prevUser, name: 'Kim' }));

// 배열 업데이트 (권장)
setItems(prevItems => [...prevItems, newItem]);
setItems(prevItems => prevItems.filter(item => item.id !== id));
setItems(prevItems => prevItems.map(item => 
  item.id === id ? { ...item, completed: true } : item
));`,
      },
    ],
    pitfalls: [
      '상태 업데이트 직후 변경된 상태 값에 즉시 접근할 수 없음 (비동기 처리)',
      '객체나 배열 상태를 직접 변경하면 리렌더링이 발생하지 않음',
      '너무 많은 useState 사용은 코드 가독성 저하 (useReducer 고려)',
      '지역 변수와 상태 변수의 차이점을 이해하지 못하고 사용하는 경우',
      '컴포넌트 간 상태 공유가 필요한 경우에도 로컬 상태만 사용하는 경우',
    ],
  },
  {
    id: 'useReducer-hook',
    title: 'useReducer Hook',
    description: '복잡한 상태 로직을 관리하기 위한 useReducer Hook의 활용법을 배웁니다.',
    content: `useReducer는 useState의 대안으로, 복잡한 상태 로직을 포함하는 컴포넌트에 적합합니다. useReducer는 현재 상태와 디스패치 함수를 반환하며, 리듀서 함수와 초기 상태를 인자로 받습니다.

리듀서 함수는 (state, action) => newState 형태의 순수 함수로, 현재 상태와 액션 객체를 받아 새 상태를 반환합니다. 이는 Redux의 패턴과 유사하지만 React 내장 기능으로 제공됩니다.

useReducer는 여러 값을 포함하는 복잡한 상태 객체를 다루거나, 다음 상태가 이전 상태에 의존하는 경우에 특히 유용합니다. 또한 상태 업데이트 로직을 컴포넌트 외부로 분리할 수 있어 코드 구조화에 도움이 됩니다.`,
    keyPoints: [
      '복잡한 상태 로직을 리듀서 함수로 분리하여 관리',
      '상태 변경을 액션 타입과 페이로드로 명확하게 표현',
      '여러 하위 값을 포함하는 복잡한 상태에 적합',
      '상태 업데이트 로직을 컴포넌트 외부로 분리 가능',
      '테스트하기 쉬운 순수 함수 기반 상태 관리',
      '디버깅에 용이한 명확한 상태 변경 추적',
    ],
    code: {
      title: 'useReducer 기본 사용법',
      language: 'jsx',
      snippet: `import React, { useReducer } from 'react';

// 리듀서 함수 정의
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  // useReducer 사용
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // 액션 디스패치
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일 추가"
        />
        <button type="submit">추가</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <span onClick={() => dispatch({
              type: 'TOGGLE_TODO',
              payload: todo.id
            })}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({
              type: 'DELETE_TODO',
              payload: todo.id
            })}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    advanced: {
      title: '초기 상태 지연 초기화',
      description: '초기 상태 계산이 복잡한 경우 지연 초기화 활용',
      code: `// 초기화 함수
function initTodos(initialCount) {
  return Array.from({ length: initialCount }, (_, i) => ({
    id: i,
    text: \`할 일 \${i + 1}\`,
    completed: false
  }));
}

// 지연 초기화로 useReducer 사용
const [todos, dispatch] = useReducer(todoReducer, 5, initTodos);`,
    },
    comparison: {
      title: 'useState vs useReducer',
      items: [
        {
          scenario: '단순한 원시 값(문자열, 숫자 등)',
          recommended: 'useState',
          reason: '간단한 상태에는 useState가 더 간결하고 직관적입니다.',
        },
        {
          scenario: '여러 하위 값을 가진 복잡한 객체 상태',
          recommended: 'useReducer',
          reason: '관련된 상태 변경을 그룹화하고 일관되게 처리할 수 있습니다.',
        },
        {
          scenario: '다음 상태가 이전 상태에 의존하는 경우',
          recommended: 'useReducer',
          reason: '상태 업데이트 로직을 액션으로 명확하게 정의할 수 있습니다.',
        },
        {
          scenario: '상태 변경이 여러 이벤트 핸들러에 분산된 경우',
          recommended: 'useReducer',
          reason: '상태 변경 로직을 중앙화하여 유지보수성을 높일 수 있습니다.',
        },
      ],
    },
    pitfalls: [
      '액션 타입을 문자열로 관리할 때 오타 발생 가능 (상수 사용 권장)',
      '리듀서 함수가 너무 커지면 관리가 어려워짐 (기능별 분리 필요)',
      '불필요하게 단순한 상태에 useReducer를 사용하면 코드가 복잡해짐',
      '컴포넌트 간 상태 공유를 위해서는 Context API와 함께 사용 필요',
    ],
  },
  {
    id: 'context-api',
    title: 'Context API',
    description: '컴포넌트 트리 전체에 데이터를 제공하는 Context API의 활용법을 배웁니다.',
    content: `Context API는 React에서 "props drilling" 없이 컴포넌트 트리 전체에 데이터를 제공하는 방법입니다. 주로 테마, 언어 선택, 인증 상태와 같이 여러 컴포넌트에서 필요한 "전역" 데이터를 공유할 때 유용합니다.

Context는 createContext() 함수로 생성하며, Provider 컴포넌트로 하위 트리에 값을 제공하고, useContext() Hook이나 Consumer 컴포넌트로 값을 소비할 수 있습니다.

Context는 상태 관리 도구가 아닌 데이터 전달 메커니즘이라는 점에 유의해야 합니다. 상태 관리를 위해서는 주로 useState나 useReducer와 함께 사용됩니다.`,
    keyPoints: [
      'props 전달 없이 컴포넌트 트리 전체에 데이터 제공',
      '전역적으로 사용되는 데이터 공유에 적합 (테마, 언어, 인증 등)',
      'Provider 컴포넌트로 값 제공, useContext나 Consumer로 값 사용',
      '기본값 설정 가능 (Provider가 없는 경우 사용됨)',
      '값이 변경되면 모든 소비자 컴포넌트 리렌더링',
      '중첩된 Provider로 값 오버라이딩 가능',
    ],
    code: {
      title: 'Context API 기본 사용법',
      language: 'jsx',
      snippet: `import React, { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = createContext('light');

// 2. Provider 컴포넌트 생성
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // value prop으로 상태와 업데이트 함수 제공
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 커스텀 Hook으로 Context 사용 간소화
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. Context 소비자 컴포넌트
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 15px',
        border: '1px solid #999',
        borderRadius: '4px'
      }}
      onClick={toggleTheme}
    >
      테마 전환
    </button>
  );
}

// 5. 애플리케이션에서 Provider 사용
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Context API 예제</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}`,
    },
    advanced: {
      title: '다중 Context 사용',
      description: '여러 Context를 함께 사용하는 패턴',
      code: `// 여러 Context 정의
const ThemeContext = createContext();
const AuthContext = createContext();
const LanguageContext = createContext();

// 중첩된 Provider 사용
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <MainContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// 여러 Context 소비
function MainContent() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  
  // ...
}`,
    },
    optimization: {
      title: 'Context 최적화 기법',
      items: [
        {
          name: '분리된 Context 사용',
          description: '상태와 업데이트 함수를 별도의 Context로 분리하여 불필요한 리렌더링 방지',
          code: `// 분리된 Context
const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={setTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}

// 읽기만 하는 컴포넌트
function ThemedText() {
  const theme = useContext(ThemeStateContext);
  // theme 값만 사용, setTheme가 변경되어도 리렌더링되지 않음
}

// 업데이트만 하는 컴포넌트
function ThemeToggle() {
  const setTheme = useContext(ThemeDispatchContext);
  // setTheme 함수만 사용, theme 값이 변경되어도 리렌더링되지 않음
}`,
        },
        {
          name: 'React.memo 활용',
          description: 'Context 값이 변경되어도 컴포넌트 속성이 변경되지 않으면 리렌더링 방지',
          code: `const MemoizedThemedButton = React.memo(ThemedButton);`,
        },
      ],
    },
    bestPractices: [
      '관련 있는 데이터만 함께 그룹화하여 Context 생성',
      '자주 변경되는 값과 자주 변경되지 않는 값을 별도 Context로 분리',
      '커스텀 Hook으로 Context 사용 로직 추상화',
      'Context 기본값에 의미 있는 값 설정하기',
      'Context를 상태 관리가 아닌 데이터 전달 메커니즘으로 이해하기',
    ],
    pitfalls: [
      'Context 값이 변경되면 모든 소비자 컴포넌트가 리렌더링됨',
      '너무 많은 데이터를 하나의 Context에 넣으면 불필요한 리렌더링 발생',
      'Context 값의 참조가 변경되면 최적화 기법(React.memo 등)이 효과가 없을 수 있음',
      '깊은 컴포넌트 트리에서 Context를 사용하면 개발 도구에서 디버깅이 어려울 수 있음',
    ],
  },
  {
    id: 'external-state-management',
    title: '외부 상태 관리 라이브러리',
    description: 'Redux, Recoil, Zustand 등 인기 있는 외부 상태 관리 라이브러리를 비교합니다.',
    content: `복잡한 애플리케이션에서는 React의 내장 상태 관리 기능만으로는 충분하지 않을 수 있습니다. 이런 경우 외부 상태 관리 라이브러리를 사용하면 더 체계적인 상태 관리가 가능합니다.

각 라이브러리는 서로 다른 패러다임과 장단점을 가지고 있습니다. Redux는 예측 가능한 상태 컨테이너로 엄격한 단방향 데이터 흐름을 제공하며, Recoil은 React에 최적화된 원자(Atom) 기반 상태 관리를, Zustand는 간단하고 직관적인 API와 함께 Redux의 복잡성을 줄인 접근법을 제공합니다.

적합한 상태 관리 라이브러리 선택은 프로젝트의 규모, 복잡성, 팀의 경험 등을 고려하여 결정해야 합니다.`,
    keyPoints: [
      '대규모 애플리케이션에서는 일관된 상태 관리 패턴 중요',
      '상태 변경의 예측 가능성과 디버깅 용이성 고려',
      '서로 다른 라이브러리는 다양한 트레이드오프 제공',
      '불필요하게 무거운 라이브러리 도입은 피해야 함',
      '미들웨어 지원, 개발자 도구, 생태계 고려 필요',
      '새로운 상태 관리 패러다임 학습 비용 고려',
    ],
    libraries: [
      {
        name: 'Redux',
        description: '예측 가능한 상태 컨테이너로, 단일 스토어에 전체 애플리케이션 상태를 저장합니다.',
        advantages: [
          '예측 가능한 상태 변화',
          '강력한 개발자 도구',
          '미들웨어를 통한 확장성',
          '시간 여행 디버깅',
          '큰 생태계와 많은 학습 자료',
        ],
        disadvantages: [
          '많은 보일러플레이트 코드',
          '학습 곡선이 가파름',
          '작은 상태 변경에도 많은 코드 필요',
          '비동기 로직 처리를 위해 추가 미들웨어 필요',
        ],
        code: `// Redux 기본 사용법 예시
import { createStore } from 'redux';

// 액션 타입 정의
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 액션 생성자
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// 리듀서
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(counterReducer);

// 구독 설정
store.subscribe(() => console.log(store.getState()));

// 액션 디스패치
store.dispatch(increment()); // { count: 1 }
store.dispatch(increment()); // { count: 2 }
store.dispatch(decrement()); // { count: 1 }`,
      },
      {
        name: 'Redux Toolkit',
        description: 'Redux의 공식 도구로, 보일러플레이트를 줄이고 더 효율적인 Redux 코드를 작성할 수 있게 해줍니다.',
        advantages: [
          'Redux 보일러플레이트 감소',
          '내장된 불변성 업데이트 로직 (Immer)',
          '자동 액션 생성자',
          'TypeScript 지원',
          '비동기 로직을 위한 createAsyncThunk',
        ],
        disadvantages: ['여전히 Redux 개념 이해 필요', '작은 앱에는 과도할 수 있음'],
        code: `// Redux Toolkit 사용 예시
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 슬라이스 생성 (리듀서 + 액션 생성자)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      // Immer를 통한 "변경" 가능
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    }
  }
});

// 액션 생성자 내보내기
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 스토어 설정
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// 사용법
store.dispatch(increment());
store.dispatch(incrementByAmount(5));`,
      },
      {
        name: 'Recoil',
        description: 'Facebook에서 개발한 React 전용 상태 관리 라이브러리로, 원자(atom) 기반 접근 방식을 사용합니다.',
        advantages: [
          'React와 유사한 프로그래밍 모델',
          '작은 단위(atom)로 상태 분할 가능',
          '파생 상태(selector)를 통한 상태 계산',
          '비동기 데이터 처리 내장',
          '상태 관찰 및 지연 로딩 가능',
        ],
        disadvantages: ['상대적으로 새로운 라이브러리', '생태계가 작음', '복잡한 앱에서 원자 관리가 어려울 수 있음'],
        code: `// Recoil 기본 사용 예시
import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// 원자(atom) 정의
const counterState = atom({
  key: 'counterState', // 고유 키
  default: 0, // 기본값
});

// 파생 상태(selector) 정의
const doubledCounterState = selector({
  key: 'doubledCounterState',
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});

// 컴포넌트에서 사용
function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  const doubledCount = useRecoilValue(doubledCounterState);

  return (
    <div>
      <p>카운트: {count}</p>
      <p>2배 카운트: {doubledCount}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

// 애플리케이션에 적용
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}`,
      },
      {
        name: 'Zustand',
        description: '최소한의 API로 설계된 간단하고 빠른 상태 관리 라이브러리입니다.',
        advantages: ['간결한 API', '최소한의 보일러플레이트', 'Redux DevTools 지원', '미들웨어 지원', '작은 번들 크기'],
        disadvantages: ['대규모 앱에서 구조화된 패턴 부족할 수 있음', '복잡한 상태 로직에는 부적합할 수 있음'],
        code: `// Zustand 기본 사용 예시
import create from 'zustand';

// 스토어 생성
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 컴포넌트에서 사용
function Counter() {
  // 필요한 상태와 액션만 선택적으로 가져오기
  const { count, increment, decrement, reset } = useStore();
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}`,
      },
      {
        name: 'MobX',
        description: '객체 지향 프로그래밍과 반응형 프로그래밍 원칙을 적용한 상태 관리 라이브러리입니다.',
        advantages: [
          '적은 보일러플레이트',
          '객체 지향적 접근',
          '자동 상태 추적 및 반응',
          '복잡한 도메인 모델에 적합',
          '가변 상태 허용',
        ],
        disadvantages: [
          '데코레이터 문법 사용 (구문이 복잡할 수 있음)',
          '상태 변경 추적이 어려울 수 있음',
          'Redux에 비해 예측 가능성이 낮을 수 있음',
        ],
        code: `// MobX 기본 사용 예시
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// 상태 모델 정의
class CounterStore {
  count = 0;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
  
  get doubledCount() {
    return this.count * 2;
  }
}

// 스토어 인스턴스 생성
const counterStore = new CounterStore();

// observer로 감싸 자동 리렌더링 활성화
const Counter = observer(() => {
  return (
    <div>
      <p>카운트: {counterStore.count}</p>
      <p>2배 카운트: {counterStore.doubledCount}</p>
      <button onClick={() => counterStore.increment()}>증가</button>
      <button onClick={() => counterStore.decrement()}>감소</button>
    </div>
  );
});`,
      },
    ],
    comparison: {
      title: '상태 관리 라이브러리 비교',
      items: [
        {
          criteria: '학습 곡선',
          redux: '높음',
          recoil: '중간',
          zustand: '낮음',
          mobx: '중간',
          explanation:
            'Redux는 불변성, 액션, 리듀서 등 많은 개념을 이해해야 합니다. Zustand는 간단한 API로 빠르게 시작할 수 있습니다.',
        },
        {
          criteria: '보일러플레이트',
          redux: '많음',
          recoil: '적음',
          zustand: '매우 적음',
          mobx: '적음',
          explanation:
            'Redux는 액션, 리듀서, 스토어 설정 등 많은 코드가 필요합니다. Zustand와 MobX는 간결한 코드로 상태 관리가 가능합니다.',
        },
        {
          criteria: '성능',
          redux: '좋음',
          recoil: '좋음',
          zustand: '매우 좋음',
          mobx: '좋음',
          explanation:
            '대부분의 라이브러리가 최적화되어 있지만, Zustand는 특히 최소한의 리렌더링으로 높은 성능을 제공합니다.',
        },
        {
          criteria: '개발자 도구',
          redux: '매우 강력함',
          recoil: '기본적',
          zustand: '좋음 (Redux DevTools 지원)',
          mobx: '좋음',
          explanation:
            'Redux는 시간 여행 디버깅 등 강력한 개발자 도구를 제공합니다. Zustand도 Redux DevTools를 활용할 수 있습니다.',
        },
        {
          criteria: '비동기 처리',
          redux: '미들웨어 필요 (Redux Thunk, Redux Saga 등)',
          recoil: '내장',
          zustand: '내장 (미들웨어로 확장 가능)',
          mobx: '내장 (flow)',
          explanation:
            'Redux는 비동기 작업을 위한 별도 미들웨어가 필요합니다. Recoil과 MobX는 비동기 로직을 더 쉽게 처리할 수 있습니다.',
        },
      ],
    },
    bestPractices: [
      '프로젝트 규모와 요구사항에 맞는 라이브러리 선택',
      '팀의 경험과 학습 곡선 고려',
      '불필요하게 복잡한 솔루션 피하기',
      '서버 상태와 클라이언트 상태 구분하기',
      '필요한 경우 여러 접근 방식 조합하기 (예: Redux + React Query)',
    ],
  },
  {
    id: 'server-state-management',
    title: '서버 상태 관리',
    description: 'React Query, SWR과 같은 도구를 사용한 서버 데이터 상태 관리 방법을 알아봅니다.',
    content: `클라이언트 상태(UI 상태, 폼 입력 등)와 서버 상태(API에서 가져온 데이터)는 서로 다른 특성을 가지며, 다른 방식으로 관리해야 합니다. 서버 상태는 비동기적으로 로드되며, 캐싱, 재검증, 폴링, 변이 등 여러 복잡한 처리가 필요합니다.

React Query, SWR과 같은 서버 상태 관리 라이브러리는 이러한 복잡성을 추상화하여, 데이터 페칭, 캐싱, 동기화, 업데이트를 쉽게 처리할 수 있게 해줍니다. 이들 라이브러리는 선언적인 방식으로 데이터를 관리하며, 자동 재시도, 백그라운드 갱신, 웹소켓 통합 등 다양한 기능을 제공합니다.`,
    keyPoints: [
      '클라이언트 상태와 서버 상태 구분하기',
      '자동 캐싱과 재검증으로 성능 최적화',
      '데이터 로딩/에러 상태 자동 처리',
      '중복 요청 제거',
      '낙관적 업데이트를 통한 반응성 향상',
      '백그라운드 갱신 및 폴링 기능',
    ],
    libraries: [
      {
        name: 'React Query',
        description: '서버 상태를 관리하기 위한 강력한 데이터 동기화 라이브러리입니다.',
        features: [
          '선언적 쿼리 및 뮤테이션',
          '자동 캐싱 및 가비지 컬렉션',
          '백그라운드 데이터 갱신',
          '무한 스크롤/페이지네이션 지원',
          '낙관적 업데이트',
          '리액트 서스펜스 지원',
        ],
        code: `// React Query 기본 사용 예시
import { useQuery, useMutation, useQueryClient } from 'react-query';

// 데이터 페칭 함수
const fetchTodos = async () => {
  const response = await fetch('/api/todos');
  if (!response.ok) {
    throw new Error('네트워크 응답이 정상이 아닙니다');
  }
  return response.json();
};

// 새 할일 추가 함수
const addTodo = async (newTodo) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

function TodoApp() {
  const queryClient = useQueryClient();
  
  // 쿼리 사용
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery('todos', fetchTodos, {
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: true,
    retry: 3,
  });
  
  // 뮤테이션 사용
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // 성공 시 todos 쿼리 무효화하여 재패칭
      queryClient.invalidateQueries('todos');
    },
  });
  
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      
      <button
        onClick={() => {
          mutation.mutate({ title: '새 할일', completed: false });
        }}
      >
        할일 추가
      </button>
    </div>
  );
}`,
      },
      {
        name: 'SWR',
        description: 'Vercel에서 개발한 React Hooks 기반의 데이터 페칭 라이브러리입니다.',
        features: [
          '간결한 API',
          '자동 재검증 (stale-while-revalidate)',
          '포커스 시 재검증',
          '폴링 간격 설정',
          '페이지네이션 지원',
          '로컬 뮤테이션',
        ],
        code: `// SWR 기본 사용 예시
import useSWR, { useSWRConfig } from 'swr';

// 페처 함수
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('네트워크 응답이 정상이 아닙니다');
  }
  return response.json();
};

function TodoList() {
  const { mutate } = useSWRConfig();
  
  // 데이터 페칭
  const { data, error, isValidating } = useSWR('/api/todos', fetcher, {
    refreshInterval: 3000, // 3초마다 갱신
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });
  
  // 새 할일 추가 함수
  const addTodo = async (title) => {
    // 낙관적 UI 업데이트
    const newTodo = { id: Date.now(), title, completed: false };
    const updatedTodos = [...data, newTodo];
    
    // 로컬 데이터 즉시 업데이트
    mutate('/api/todos', updatedTodos, false);
    
    // API 호출
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    // 데이터 재검증
    mutate('/api/todos');
  };
  
  if (!data) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  
  return (
    <div>
      {isValidating && <div>갱신 중...</div>}
      
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      
      <button onClick={() => addTodo('새 할일')}>
        할일 추가
      </button>
    </div>
  );
}`,
      },
    ],
    comparison: {
      title: 'React Query vs SWR',
      items: [
        {
          criteria: 'API 디자인',
          reactQuery: '더 많은 기능과 옵션 제공',
          swr: '더 간단하고 직관적인 API',
          explanation: 'React Query는 더 많은 고급 기능을 제공하지만, SWR은 더 간결한 API를 가지고 있습니다.',
        },
        {
          criteria: '기능 범위',
          reactQuery: '다양한 고급 기능 (쿼리 무효화, 쿼리 취소 등)',
          swr: '핵심 기능에 집중 (간결함 우선)',
          explanation: 'React Query는 더 포괄적인 기능을 제공하여 복잡한 사용 사례에 적합합니다.',
        },
        {
          criteria: '번들 크기',
          reactQuery: '더 큼',
          swr: '더 작음',
          explanation: 'SWR은 더 작은 번들 크기를 가지고 있어 성능에 더 민감한 프로젝트에 적합할 수 있습니다.',
        },
        {
          criteria: '개발자 도구',
          reactQuery: '내장 DevTools 제공',
          swr: '별도 DevTools 없음',
          explanation: 'React Query는 강력한 개발자 도구를 제공하여 디버깅이 용이합니다.',
        },
      ],
    },
    bestPractices: [
      '서버 상태와 클라이언트 상태 분리하기',
      '적절한 스테일 타임과 캐시 타임 설정하기',
      '낙관적 업데이트로 사용자 경험 향상시키기',
      '에러 처리 및 재시도 전략 구현하기',
      '불필요한 리페칭 최소화하기',
      '가능한 경우 백그라운드 리페칭 활용하기',
    ],
    pitfalls: [
      '과도한 리페칭으로 서버 부하 증가',
      '낙관적 업데이트와 실제 서버 상태 불일치',
      '복잡한 의존성으로 인한 불필요한 쿼리 실행',
      '큰 데이터셋에 대한 메모리 사용량 관리 미흡',
    ],
  },
  {
    id: 'performance-optimization',
    title: '상태 관리 성능 최적화',
    description: '효율적인 상태 관리를 위한 성능 최적화 기법을 배웁니다.',
    content: `React 애플리케이션의 성능을 최적화하려면 상태 관리를 효율적으로 구현해야 합니다. 불필요한 리렌더링, 과도한 메모리 사용, 복잡한 상태 계산은 애플리케이션의 성능을 저하시킬 수 있습니다.

성능 최적화 기법으로는 메모이제이션(React.memo, useMemo, useCallback), 상태 정규화, 컴포넌트 분할, 상태 위치 최적화 등이 있습니다. 또한 상태 관리 라이브러리가 제공하는 최적화 기능을 활용하는 것도 중요합니다.`,
    keyPoints: [
      '불필요한 리렌더링 방지가 핵심',
      '상태 정규화로 중복 데이터 방지',
      '계산 비용이 높은 작업에 메모이제이션 활용',
      '상태 변경 범위 최소화',
      '적절한 코드 분할 및 지연 로딩',
      '상태 구독 최적화',
    ],
    techniques: [
      {
        name: '메모이제이션 활용',
        description: 'React.memo, useMemo, useCallback을 사용하여 불필요한 계산과 리렌더링 방지',
        code: `// 컴포넌트 메모이제이션
const MemoizedComponent = React.memo(MyComponent);

// 계산 결과 메모이제이션
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 함수 메모이제이션
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
      },
      {
        name: '상태 정규화',
        description: '중첩된 객체를 평면화하여 상태 업데이트 성능 향상',
        code: `// 비정규화된 상태 (비효율적)
const state = {
  users: [
    {
      id: 1,
      name: '홍길동',
      posts: [
        { id: 101, title: '첫 번째 글' },
        { id: 102, title: '두 번째 글' }
      ]
    }
  ]
};

// 정규화된 상태 (효율적)
const normalizedState = {
  users: {
    byId: {
      1: { id: 1, name: '홍길동', postIds: [101, 102] }
    },
    allIds: [1]
  },
  posts: {
    byId: {
      101: { id: 101, title: '첫 번째 글', authorId: 1 },
      102: { id: 102, title: '두 번째 글', authorId: 1 }
    },
    allIds: [101, 102]
  }
};`,
      },
      {
        name: '컴포넌트 분할',
        description: '큰 컴포넌트를 작은 단위로 분할하여 리렌더링 범위 축소',
        code: `// 최적화 전: 하나의 큰 컴포넌트
function UserDashboard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={user.posts} />
      <UserSettings 
        settings={user.settings}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

// 최적화 후: 상태를 포함한 컴포넌트 분리
function UserSettings({ settings }) {
  // 상태를 이 컴포넌트로 이동
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      {isEditing ? (
        <SettingsForm settings={settings} onSave={() => setIsEditing(false)} />
      ) : (
        <SettingsView settings={settings} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}`,
      },
      {
        name: '지연 초기화',
        description: '초기 상태 계산이 복잡한 경우 지연 초기화 활용',
        code: `// 비효율적: 매 렌더링마다 계산됨
const [state, setState] = useState(createInitialState());

// 효율적: 초기 렌더링에서만 계산됨
const [state, setState] = useState(() => createInitialState());`,
      },
      {
        name: '상태 위치 최적화',
        description: '상태를 필요한 가장 낮은 레벨의 컴포넌트에 배치',
        example: `// 전역 상태로 관리할 필요가 없는 UI 상태는 로컬 상태로 관리
// 여러 컴포넌트에서 필요한 상태는 공통 부모로 끌어올리기
// 앱 전체에서 필요한 상태만 전역 상태로 관리`,
      },
    ],
    tools: [
      {
        name: 'React DevTools Profiler',
        description: '컴포넌트 렌더링 성능을 분석하고 병목 지점 파악',
        usage: '렌더링 시간 측정, 리렌더링 원인 파악, 커밋 비교',
      },
      {
        name: 'why-did-you-render',
        description: '불필요한 리렌더링을 감지하고 원인을 분석하는 라이브러리',
        code: `// 설정 예시
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}`,
      },
    ],
    bestPractices: [
      '상태 업데이트를 최소화하고 일괄 처리하기',
      '복잡한 상태 로직은 useReducer로 구조화하기',
      '파생 상태는 계산하여 사용하기 (상태에 저장하지 않기)',
      '렌더링에 필요한 데이터만 상태로 관리하기',
      '상태 변경이 자주 발생하는 부분과 정적인 부분 분리하기',
      '메모이제이션(React.memo, useMemo, useCallback)을 전략적으로 사용하기',
    ],
    pitfalls: [
      '과도한 전역 상태 사용',
      '지나친 메모이제이션으로 인한 메모리 오버헤드',
      '잘못된 의존성 배열 설정',
      '불필요하게 큰 객체를 상태로 관리',
      '너무 깊은 컴포넌트 트리에서의 상태 관리',
    ],
  },
  {
    id: 'practical-patterns',
    title: '실전 상태 관리 패턴',
    description: '실제 프로젝트에서 활용할 수 있는 상태 관리 패턴과 아키텍처를 알아봅니다.',
    content: `효과적인 상태 관리를 위해서는 단순히 라이브러리 사용법을 아는 것을 넘어, 검증된 패턴과 아키텍처를 적용하는 것이 중요합니다. 상태의 종류와 범위, 변경 빈도, 접근 패턴 등을 고려하여 최적의 상태 관리 전략을 수립해야 합니다.

실전에서는 단일 접근법보다 여러 기술을 조합하여 사용하는 경우가 많습니다. 예를 들어, UI 상태는 로컬 상태로, 공유 상태는 Context API나 외부 라이브러리로, 서버 데이터는 React Query나 SWR로 관리하는 식입니다.

또한 상태 관리 코드의 재사용성과 테스트 용이성을 높이기 위해 커스텀 훅을 적극 활용하는 것이 좋습니다.`,
    keyPoints: [
      '상태의 특성과 범위에 따른 관리 전략 수립',
      '여러 상태 관리 접근법의 조합 활용',
      '커스텀 훅을 통한 상태 관리 로직 재사용',
      '비즈니스 로직과 UI 로직의 분리',
      '상태 접근 인터페이스의 일관성 유지',
      '테스트 가능한 상태 관리 구조 설계',
    ],
    patterns: [
      {
        name: '커스텀 훅을 통한 상태 캡슐화',
        description: '관련 상태와 로직을 커스텀 훅으로 캡슐화하여 재사용성과 테스트 용이성 향상',
        code: `// 인증 상태 관리 커스텀 훅
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 인증 상태 확인 로직
    const checkAuth = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const userData = await authService.login(credentials);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}

// 사용 예시
function App() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  return isAuthenticated ? (
    <AuthenticatedApp user={user} onLogout={logout} />
  ) : (
    <LoginScreen onLogin={login} />
  );
}`,
      },
      {
        name: '상태 관리자 패턴',
        description: '상태 관리 로직을 별도의 관리자 클래스나 객체로 분리하여 비즈니스 로직을 UI에서 분리',
        code: `// 상태 관리자 클래스
class TodoManager {
  constructor(initialTodos = []) {
    this.subscribers = [];
    this.todos = initialTodos;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.todos));
  }

  addTodo(text) {
    this.todos = [...this.todos, {
      id: Date.now(),
      text,
      completed: false
    }];
    this.notifySubscribers();
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.notifySubscribers();
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.notifySubscribers();
  }
}

// 전역 인스턴스 생성
const todoManager = new TodoManager();

// 커스텀 훅으로 React 컴포넌트에서 사용
function useTodos() {
  const [todos, setTodos] = useState(todoManager.todos);

  useEffect(() => {
    const unsubscribe = todoManager.subscribe(setTodos);
    return unsubscribe;
  }, []);

  return {
    todos,
    addTodo: todoManager.addTodo.bind(todoManager),
    toggleTodo: todoManager.toggleTodo.bind(todoManager),
    removeTodo: todoManager.removeTodo.bind(todoManager),
  };
}`,
      },
      {
        name: '컨텍스트 선택자 패턴',
        description: 'Context API 사용 시 불필요한 리렌더링을 방지하기 위한 선택자 패턴',
        code: `// Context 생성
const UserContext = createContext();

// Provider 컴포넌트
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  
  // 값의 안정성을 위해 useMemo 사용
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

// 선택자 훅: 특정 상태만 선택하여 불필요한 리렌더링 방지
function useUserName() {
  const { state } = useContext(UserContext);
  return state.user?.name;
}

function useUserRole() {
  const { state } = useContext(UserContext);
  return state.user?.role;
}

// 컴포넌트에서 사용
function UserGreeting() {
  // name이 변경될 때만 리렌더링
  const name = useUserName();
  return <h1>안녕하세요, {name}님!</h1>;
}

function UserPermissions() {
  // role이 변경될 때만 리렌더링
  const role = useUserRole();
  return <div>권한: {role}</div>;
}`,
      },
      {
        name: '상태 계층화 패턴',
        description: '상태를 범위와 특성에 따라 계층화하여 관리',
        structure: `1. 로컬 UI 상태: useState, useReducer
   - 폼 입력, 토글, 팝업 상태 등
   - 단일 컴포넌트 내에서만 필요한 상태

2. 화면/기능 상태: Context API, 상태 끌어올리기
   - 특정 화면이나 기능 내에서 공유되는 상태
   - 제한된 범위 내에서만 필요한 상태

3. 애플리케이션 상태: 외부 라이브러리(Redux, Zustand 등)
   - 인증, 테마, 글로벌 설정 등
   - 앱 전체에서 필요한 상태

4. 서버 상태: React Query, SWR
   - API에서 가져온 데이터
   - 캐싱, 동기화, 재검증이 필요한 상태`,
      },
      {
        name: '이벤트 소싱 패턴',
        description: '상태 변경을 이벤트의 흐름으로 모델링하는 패턴',
        code: `// 이벤트 타입 정의
const EVENT_TYPES = {
  USER_REGISTERED: 'USER_REGISTERED',
  USER_PROFILE_UPDATED: 'USER_PROFILE_UPDATED',
  USER_PREFERENCES_CHANGED: 'USER_PREFERENCES_CHANGED',
};

// 이벤트 스토어
class EventStore {
  constructor() {
    this.events = [];
    this.subscribers = [];
  }

  publish(event) {
    this.events.push({
      ...event,
      timestamp: Date.now(),
    });
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.events));
  }
}

// 이벤트에서 현재 상태 계산
function computeUserState(events) {
  return events.reduce((state, event) => {
    switch (event.type) {
      case EVENT_TYPES.USER_REGISTERED:
        return {
          ...state,
          id: event.payload.id,
          email: event.payload.email,
          registeredAt: event.timestamp,
        };
      case EVENT_TYPES.USER_PROFILE_UPDATED:
        return {
          ...state,
          name: event.payload.name,
          avatar: event.payload.avatar,
        };
      case EVENT_TYPES.USER_PREFERENCES_CHANGED:
        return {
          ...state,
          preferences: {
            ...state.preferences,
            ...event.payload.preferences,
          },
        };
      default:
        return state;
    }
  }, {});
}

// React에서 사용
function useUserEvents() {
  const [events, setEvents] = useState([]);
  const [currentState, setCurrentState] = useState({});
  
  useEffect(() => {
    const unsubscribe = eventStore.subscribe(newEvents => {
      setEvents(newEvents);
      setCurrentState(computeUserState(newEvents));
    });
    return unsubscribe;
  }, []);
  
  const publishEvent = (type, payload) => {
    eventStore.publish({ type, payload });
  };
  
  return {
    events,
    currentState,
    publishEvent,
  };
}`,
      },
    ],
    bestPractices: [
      '상태의 특성에 맞는 관리 기술 조합하기',
      '비즈니스 로직과 UI 상태 로직 분리하기',
      '상태 변경을 최소화하고 예측 가능하게 만들기',
      '커스텀 훅으로 상태 관리 로직 재사용하기',
      '상태 테스트 전략 수립하기',
      '적절한 상태 초기화 및 동기화 전략 구현하기',
    ],
  },
];

export default stateManagement;
