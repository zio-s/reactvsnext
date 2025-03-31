// data/learning/react/hooks.js
// React Hooks 학습 데이터

const hooks = [
  {
    id: 'hooks-intro',
    title: 'React Hooks 입문',
    description: 'Hook의 기본 개념과 사용 이유를 소개합니다.',
    content: `Hooks는 React 16.8에서 도입된 기능으로, 함수형 컴포넌트에서 상태(state)와 생명주기 기능(lifecycle features)을 사용할 수 있게 해줍니다. 이전에는 이러한 기능을 사용하기 위해 클래스 컴포넌트를 작성해야 했습니다.

Hooks의 도입 목적:
1. 컴포넌트 사이에서 상태 로직을 재사용하기 쉽게 만들기
2. 관련 있는, 하지만 생명주기에 의해 분리된 로직을 함께 묶기
3. 클래스와 this 키워드의 혼란을 줄이기

Hooks를 사용하면 컴포넌트를 더 작은 함수로 분해할 수 있으며, 클래스 없이도 React의 모든 기능을 활용할 수 있습니다.`,
    keyPoints: [
      '함수형 컴포넌트에서만 사용 가능',
      '컴포넌트 최상위 레벨에서만 호출 가능 (루프, 조건문, 중첩 함수 내부에서 사용 불가)',
      'React 함수 내에서만 호출 가능',
      "이름이 'use'로 시작해야 함",
    ],
    code: {
      title: 'Hook 기본 사용 예시',
      language: 'jsx',
      snippet: `import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  // 상태(State) 사용
  const [count, setCount] = useState(0);
  
  // 부수 효과(Side Effect) 사용
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    // 정리(cleanup) 함수
    return () => {
      document.title = 'React App';
    };
  }, [count]); // 의존성 배열
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    },
    rules: [
      '조건부로 Hook을 실행하지 마세요. 항상 함수 최상위 레벨에서 호출해야 합니다.',
      'React 함수 컴포넌트 또는 사용자 정의 Hook 내에서만 Hook을 호출하세요.',
      'Hook의 순서는 항상 동일해야 합니다. 렌더링마다 같은 순서로 호출되어야 합니다.',
    ],
  },
  {
    id: 'useState-hook',
    title: 'useState Hook',
    description: '함수형 컴포넌트에서 상태를 관리하는 방법을 배웁니다.',
    content: `useState Hook은 함수형 컴포넌트에서 상태(state)를 추가할 수 있게 해주는 React의 내장 Hook입니다. 이전에는 상태를 사용하기 위해 클래스 컴포넌트를 작성해야 했지만, useState를 사용하면 함수형 컴포넌트에서도 상태를 관리할 수 있습니다.

useState는 상태 값과 그 값을 업데이트하는 함수를 반환합니다. 초기 렌더링 시, 반환된 상태는 첫 번째 인자(초기 상태)와 동일합니다.

상태 업데이트 함수는 새 상태 값을 받아 컴포넌트 리렌더링을 큐에 등록합니다. 다음 렌더링 중에 useState의 첫 번째 반환값은 항상 업데이트 후의 최신 상태가 됩니다.`,
    keyPoints: [
      '함수형 컴포넌트에 상태 추가',
      '배열 구조 분해를 통해 상태 값과 업데이터 함수 획득',
      '초기 상태는 첫 번째 렌더링에서만 사용됨',
      '이전 상태에 기반한 업데이트는 함수형 업데이트 사용',
      '객체 상태를 업데이트할 때는 이전 상태를 직접 변경하지 말고 새 객체 생성',
      '여러 상태 변수 사용 가능',
    ],
    code: {
      title: 'useState 기본 사용법',
      language: 'jsx',
      snippet: `import React, { useState } from 'react';

function Counter() {
  // 숫자 상태
  const [count, setCount] = useState(0);
  
  // 문자열 상태
  const [message, setMessage] = useState('안녕하세요');
  
  // 객체 상태
  const [user, setUser] = useState({
    name: '홍길동',
    age: 25,
    isActive: true
  });
  
  const incrementCount = () => {
    // 기본적인 상태 업데이트
    setCount(count + 1);
    
    // 또는 함수형 업데이트 (이전 상태에 기반)
    // setCount(prevCount => prevCount + 1);
  };
  
  const updateMessage = () => {
    setMessage('상태가 변경되었습니다');
  };
  
  const updateUser = () => {
    // 객체 상태 업데이트 (불변성 유지)
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1,
      isActive: !prevUser.isActive
    }));
  };
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={incrementCount}>증가</button>
      
      <p>메시지: {message}</p>
      <button onClick={updateMessage}>메시지 변경</button>
      
      <p>사용자: {user.name}, {user.age}세, {user.isActive ? '활성' : '비활성'}</p>
      <button onClick={updateUser}>사용자 정보 변경</button>
    </div>
  );
}`,
    },
    functionalUpdate: {
      title: '함수형 업데이트',
      description: '이전 상태에 기반하여 상태를 업데이트하는 안전한 방법',
      code: `// 일반적인 상태 업데이트 (연속 호출 시 문제 발생 가능)
setCount(count + 1);
setCount(count + 1); // 이전 업데이트를 고려하지 않음

// 함수형 업데이트 (안전하게 이전 상태 사용)
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1); // 이전 업데이트를 고려함`,
    },
    lazyInitialization: {
      title: '지연 초기화',
      description: '복잡한 계산이 필요한 초기 상태는 함수로 지연 초기화 가능',
      code: `// 일반 초기화
const [state, setState] = useState(someExpensiveComputation());

// 지연 초기화 (첫 렌더링에서만 함수가 호출됨)
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation();
  return initialState;
});`,
    },
    bestPractices: [
      '상태는 최소한으로 유지하세요. 파생 데이터는 렌더링 중에 계산하세요.',
      '관련 상태는 객체나 배열로 그룹화하세요.',
      '복잡한 상태 로직이 있다면 useReducer를 고려하세요.',
      '상태 업데이트 시 항상 불변성을 유지하세요.',
      '함수형 업데이트를 통해 이전 상태에 의존하는 업데이트를 안전하게 처리하세요.',
    ],
  },
  {
    id: 'useEffect-hook',
    title: 'useEffect Hook',
    description: '함수형 컴포넌트에서 부수 효과(Side Effects)를 다루는 방법을 배웁니다.',
    content: `useEffect Hook을 사용하면 함수형 컴포넌트에서 부수 효과(side effects)를 수행할 수 있습니다. 부수 효과란 데이터 가져오기, 구독 설정, DOM 수동 조작 등 컴포넌트의 렌더링 외에 발생하는 모든 작업을 말합니다.

useEffect는 클래스 컴포넌트의 componentDidMount, componentDidUpdate, componentWillUnmount 생명주기 메서드를 통합한 API입니다. 기본적으로 useEffect는 첫 번째 렌더링과 이후의 모든 업데이트에서 실행됩니다.

useEffect의 두 번째 인자로 의존성 배열을 지정할 수 있습니다. 이 배열에 포함된 값이 변경될 때만 효과가 다시 실행됩니다. 빈 배열([])을 전달하면 컴포넌트가 마운트될 때만 실행되고, 업데이트 시에는 실행되지 않습니다.`,
    keyPoints: [
      '부수 효과(side effects) 처리',
      '의존성 배열로 효과 실행 제어',
      '클린업 함수로 구독 해제 등의 정리 작업 수행',
      '비동기 데이터 가져오기',
      'DOM 조작',
      '타이머 설정 및 제거',
    ],
    code: {
      title: 'useEffect 활용 예시',
      language: 'jsx',
      snippet: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 데이터 가져오기 효과
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        if (!response.ok) {
          throw new Error('사용자 정보를 가져오는데 실패했습니다');
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]); // userId가 변경될 때만 효과 실행
  
  // 타이틀 변경 효과
  useEffect(() => {
    if (user) {
      document.title = \`\${user.name}의 프로필\`;
    } else {
      document.title = '사용자 프로필';
    }
    
    // 클린업 함수
    return () => {
      document.title = 'React App';
    };
  }, [user]);
  
  // 윈도우 크기 감지 효과
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    // 클린업 함수: 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 의존성 배열: 마운트와 언마운트 시에만 실행
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;
  
  return (
    <div>
      <h1>{user.name}의 프로필</h1>
      <p>이메일: {user.email}</p>
      <p>현재 창 너비: {windowWidth}px</p>
    </div>
  );
}`,
    },
    effectPatterns: [
      {
        title: '마운트 시에만 실행',
        code: `useEffect(() => {
  // 컴포넌트가 마운트될 때만 실행
  console.log('컴포넌트가 마운트되었습니다');
  
  // 선택적 클린업 함수
  return () => {
    console.log('컴포넌트가 언마운트되었습니다');
  };
}, []); // 빈 의존성 배열`,
      },
      {
        title: '특정 값 변경 시 실행',
        code: `useEffect(() => {
  console.log('count 또는 name이 변경되었습니다');
  // count 또는 name이 변경될 때마다 실행
}, [count, name]); // 의존성 배열에 변수들 포함`,
      },
      {
        title: '모든 렌더링 후 실행',
        code: `useEffect(() => {
  console.log('컴포넌트가 렌더링되었습니다');
  // 의존성 배열 생략 시 모든 렌더링 후 실행
});`,
      },
    ],
    asyncEffects: {
      title: '비동기 효과 처리',
      description: 'useEffect 내에서 비동기 작업을 처리하는 방법',
      code: `useEffect(() => {
  // 비동기 함수 정의
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  // 비동기 함수 호출
  fetchData();
  
  // 주의: useEffect 콜백 자체를 async로 만들면 안 됩니다!
  // 이렇게 하면 안 됨: useEffect(async () => {...}, []);
}, []);`,
    },
    pitfalls: [
      '의존성 배열에 모든 외부 값을 포함하지 않으면, 예상치 못한 버그가 발생할 수 있습니다.',
      '부수 효과 내에서 사용하는 모든 변수는 의존성 배열에 추가해야 합니다.',
      '불필요한 재실행을 방지하기 위해 객체와 함수는 가능하면 컴포넌트 외부로 이동하거나 useCallback/useMemo를 사용하세요.',
      '클린업 함수는 새로운 효과가 실행되기 전과 컴포넌트가 언마운트될 때 실행됩니다.',
    ],
  },
  {
    id: 'useContext-hook',
    title: 'useContext Hook',
    description: 'Context API를 함수형 컴포넌트에서 사용하는 방법을 배웁니다.',
    content: `useContext Hook은 React의 Context API를 함수형 컴포넌트에서 쉽게 사용할 수 있게 해줍니다. Context는 prop drilling 없이 컴포넌트 트리 전체에 데이터를 전달하는 방법을 제공합니다.

useContext는 Context 객체를 인자로 받아 해당 Context의 현재 값을 반환합니다. Context의 값이 변경되면 useContext Hook은 항상 최신 값을 사용하여 컴포넌트를 다시 렌더링합니다.

Context를 사용하면 전역 상태나 테마, 인증 정보 등을 여러 컴포넌트 레벨을 거치지 않고도 필요한 컴포넌트에 직접 제공할 수 있습니다.`,
    keyPoints: [
      'prop drilling 문제 해결',
      '전역 상태 관리',
      '테마, 로케일, 인증 등의 데이터 공유',
      'Context.Provider로 값 제공',
      'useContext로 값 소비',
      'Context 값 변경 시 소비하는 모든 컴포넌트 리렌더링',
    ],
    code: {
      title: 'useContext 사용 예시',
      language: 'jsx',
      snippet: `import React, { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = createContext(null);

// 2. Provider 컴포넌트 생성
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // 값 객체에는 상태와 상태를 변경하는 함수 모두 포함
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 커스텀 Hook으로 Context 사용 추상화 (선택 사항)
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. Context 값을 소비하는 컴포넌트
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      현재 테마: {theme} (클릭하여 전환)
    </button>
  );
}

// 5. 깊이 중첩된 컴포넌트
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 6. 앱 컴포넌트
function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Context 예제</h1>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
}

export default App;`,
    },
    multipleContexts: {
      title: '여러 Context 사용하기',
      description: '여러 Context를 조합하여 사용하는 방법',
      code: `// 여러 Context 생성
const ThemeContext = createContext(null);
const UserContext = createContext(null);

// 중첩된 Provider 사용
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: '홍길동', isAdmin: false });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <MainContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 여러 Context 소비
function MainContent() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  
  return (
    <div className={theme}>
      <h1>안녕하세요, {user.name}님!</h1>
      {user.isAdmin && <AdminPanel />}
    </div>
  );
}`,
    },
    optimization: {
      title: 'Context 최적화',
      description: '불필요한 리렌더링을 방지하는 최적화 전략',
      tips: [
        'Context 값을 여러 개로 분리하여 필요한 부분만 리렌더링되도록 하기',
        '자주 변경되는 값과 거의 변경되지 않는 값을 별도의 Context로 분리하기',
        'React.memo와 함께 사용하여 컴포넌트 메모이제이션하기',
        '객체 대신 원시 값을 Context 값으로 사용하기',
        'Context의 값이 참조적으로 안정적이도록 useMemo 사용하기',
      ],
      code: `// Context 분리 예시
const ThemeContext = createContext(null);
const ThemeUpdateContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // 참조적 안정성을 위해 useMemo 사용
  const themeValue = useMemo(() => ({ theme }), [theme]);
  const updateFunctions = useMemo(() => ({ setTheme }), []);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeUpdateContext.Provider value={updateFunctions}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}`,
    },
    whenToUse: [
      '여러 중첩 레벨의 컴포넌트에 데이터를 전달해야 할 때',
      '전역 상태를 관리해야 할 때 (작은 규모의 앱)',
      '테마, 인증, 사용자 환경설정 등의 애플리케이션 수준 데이터를 공유할 때',
      '컴포넌트 합성으로 해결하기 어려운 경우',
    ],
  },
  {
    id: 'useReducer-hook',
    title: 'useReducer Hook',
    description: '복잡한 상태 로직을 관리하는 방법을 배웁니다.',
    content: `useReducer는 useState의 대안으로, 복잡한 상태 로직을 관리할 때 더 적합합니다. Redux에서 영감을 받은 이 Hook은 상태 업데이트 로직을 상태 값 자체와 분리할 수 있게 해줍니다.

useReducer는 현재 상태와 액션을 인자로 받아 새 상태를 반환하는 reducer 함수와 함께 사용됩니다. 상태 전환이 여러 부분에 영향을 미치거나 다음 상태가 이전 상태에 의존할 때 특히 유용합니다.

useState와 마찬가지로 현재 상태를 반환하지만, 상태 설정 함수 대신 디스패치 함수를 반환합니다. 디스패치 함수는 액션을 발생시켜 상태를 변경합니다.`,
    keyPoints: [
      '복잡한 상태 로직 관리',
      '상태 업데이트 로직과 상태 값 분리',
      '관련 상태 값들을 그룹화',
      '예측 가능한 상태 변경',
      '상태 전환 디버깅 용이성',
      '테스트하기 쉬운 순수 함수',
    ],
    code: {
      title: 'useReducer 기본 사용법',
      language: 'jsx',
      snippet: `import React, { useReducer } from 'react';

// 상태 업데이트 로직을 정의하는 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(\`알 수 없는 액션 타입: \${action.type}\`);
  }
}

function Counter() {
  // state: 현재 상태, dispatch: 액션을 발생시키는 함수
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
      <button onClick={() => dispatch({ type: 'reset' })}>초기화</button>
      <button onClick={() => dispatch({ type: 'set', payload: 10 })}>10으로 설정</button>
    </div>
  );
}`,
    },
    complexExample: {
      title: '복잡한 상태 관리 예제',
      description: '여러 관련 상태를 관리하는 복잡한 useReducer 예제',
      code: `import React, { useReducer } from 'react';

// 초기 상태 정의
const initialState = {
  isLoading: false,
  error: null,
  data: [],
  selectedId: null,
  filter: 'all'
};

// 리듀서 함수
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedId: action.payload
      };
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedId: null
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function DataManager() {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { isLoading, error, data, selectedId, filter } = state;
  
  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };
  
  const selectItem = (id) => {
    dispatch({ type: 'SELECT_ITEM', payload: id });
  };
  
  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };
  
  const setFilter = (filterType) => {
    dispatch({ type: 'SET_FILTER', payload: filterType });
  };
  
  // 필터링된 데이터 계산
  const filteredData = filter === 'all' 
    ? data 
    : data.filter(item => item.category === filter);
  
  // 선택된 아이템 찾기
  const selectedItem = selectedId 
    ? data.find(item => item.id === selectedId) 
    : null;
  
  return (
    <div>
      {/* UI 구현 */}
      {isLoading && <p>로딩 중...</p>}
      {error && <p>오류: {error}</p>}
      
      <div>
        <button onClick={fetchData}>데이터 가져오기</button>
      </div>
      
      <div>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">모두</option>
          <option value="books">책</option>
          <option value="movies">영화</option>
        </select>
      </div>
      
      <ul>
        {filteredData.map(item => (
          <li 
            key={item.id} 
            onClick={() => selectItem(item.id)}
            style={{ fontWeight: item.id === selectedId ? 'bold' : 'normal' }}
          >
            {item.title}
          </li>
        ))}
      </ul>
      
      {selectedItem && (
        <div>
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.description}</p>
          <button onClick={clearSelection}>선택 취소</button>
        </div>
      )}
    </div>
  );
}`,
    },
    vsUseState: {
      title: 'useState vs useReducer',
      description: '언제 useState 대신 useReducer를 사용해야 할까요?',
      comparison: [
        {
          criteria: '상태 복잡도',
          useState: '단순한 상태 (숫자, 문자열, 불리언 등)',
          useReducer: '복잡한 객체 또는 배열 상태',
        },
        {
          criteria: '상태 업데이트 로직',
          useState: '단순한 상태 설정',
          useReducer: '복잡한 상태 전환 로직',
        },
        {
          criteria: '관련 상태 값',
          useState: '독립적인 상태 값',
          useReducer: '함께 업데이트되는 여러 상태 값',
        },
        {
          criteria: '다음 상태 계산',
          useState: '이전 상태와 무관한 경우',
          useReducer: '이전 상태에 의존적인 경우',
        },
        {
          criteria: '코드 유지보수',
          useState: '간단한 컴포넌트',
          useReducer: '상태 로직이 많은 복잡한 컴포넌트',
        },
        {
          criteria: '테스트 용이성',
          useState: '상태 업데이트가 간단한 경우',
          useReducer: '테스트하기 쉬운 순수 리듀서 함수',
        },
      ],
    },
    initialStateWithInit: {
      title: '초기 상태 계산 최적화',
      description: '초기 상태를 지연 초기화하는 방법',
      code: `// 초기 상태 계산 함수
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  // 세 번째 인자로 초기화 함수 전달
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        초기화
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}`,
    },
    bestPractices: [
      '액션 타입을 상수로 정의하여 오타를 방지하세요.',
      '리듀서 함수는 순수 함수로 유지하세요 (부수 효과 없음).',
      '복잡한 상태는 정규화하여 중첩을 최소화하세요.',
      '상태 업데이트는 항상 불변성을 유지하세요.',
      '액션 생성자 함수를 사용하여 일관된 액션 객체를 생성하세요.',
    ],
  },
  {
    id: 'custom-hooks',
    title: '사용자 정의 Hook 만들기',
    description: '재사용 가능한 로직을 사용자 정의 Hook으로 추출하는 방법을 배웁니다.',
    content: `사용자 정의 Hook(Custom Hook)은 React의 내장 Hook을 활용하여 컴포넌트 간에 상태 로직을 재사용할 수 있게 해주는 JavaScript 함수입니다. 이름이 'use'로 시작하는 함수로, React의 Hook 규칙을 따라야 합니다.

사용자 정의 Hook을 사용하면 컴포넌트에서 상태 관련 로직을 추출하여 독립적인 함수로 분리할 수 있습니다. 이렇게 하면 로직을 재사용하고, 컴포넌트를 더 작고 단순하게 유지할 수 있습니다.

사용자 정의 Hook은 React의 내장 Hook을 호출할 수 있으며, 필요에 따라 상태와 부수 효과를 포함할 수 있습니다. 각 Hook 호출은 완전히 독립적인 상태를 가지므로, 같은 사용자 정의 Hook을 여러 컴포넌트에서 사용해도 상태가 공유되지 않습니다.`,
    keyPoints: [
      "함수 이름은 'use'로 시작해야 함",
      '내장 Hook 규칙을 따라야 함',
      '상태와 로직 재사용 가능',
      '각 호출마다 독립적인 상태 유지',
      '다른 Hook 호출 가능',
      '테스트 용이성',
    ],
    code: {
      title: '사용자 정의 Hook 예시',
      language: 'jsx',
      snippet: `// useLocalStorage: 로컬 스토리지와 동기화되는 상태 Hook
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 초기 상태 설정
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 로컬 스토리지에서 값 가져오기
      const item = window.localStorage.getItem(key);
      // 저장된 값이 있으면 파싱하여 반환, 없으면 초기값 반환
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // 값이 변경될 때마다 로컬 스토리지 업데이트
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

// Hook 사용 예시
function UserSettingsForm() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
  
  return (
    <div>
      <h2>사용자 설정</h2>
      <div>
        <label>
          테마:
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="light">라이트</option>
            <option value="dark">다크</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          글꼴 크기:
          <input
            type="number"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            min="12"
            max="24"
          />
        </label>
      </div>
    </div>
  );
}`,
    },
    moreExamples: [
      {
        name: 'useWindowSize',
        description: '창 크기 변화를 추적하는 Hook',
        code: `function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}`,
      },
      {
        name: 'useFetch',
        description: '데이터 가져오기를 위한 Hook',
        code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  return { data, loading, error };
}`,
      },
      {
        name: 'useForm',
        description: '폼 상태 관리를 위한 Hook',
        code: `function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
    setErrors
  };
}`,
      },
    ],
    bestPractices: [
      "Hook 이름은 항상 'use'로 시작하고 Camel Case로 작성하세요.",
      '한 가지 책임을 가진 작은 Hook을 만드세요.',
      '필요한 매개변수만 받도록 설계하세요.',
      '명확한 반환 값을 제공하세요 (객체 또는 배열).',
      'Hook 내부의 컴포넌트는 PascalCase로 명명하세요.',
      '관련 상태와 함수를 함께 그룹화하세요.',
      '가능하면, Hook에 대한 문서화와 TypeScript 타입을 제공하세요.',
    ],
  },
];

export default hooks;
