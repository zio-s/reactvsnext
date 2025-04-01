const components = [
  {
    id: 'components-intro',
    title: 'React 컴포넌트 소개',
    description: 'React 컴포넌트의 기본 개념과 유형을 배웁니다.',
    content: `React 애플리케이션은 컴포넌트라는 독립적이고 재사용 가능한 코드 조각으로 구성됩니다. 컴포넌트는 JavaScript 함수나 클래스로, 입력(props)을 받아 화면에 엘리먼트를 반환합니다.

컴포넌트는 UI를 독립적인 조각으로 나누어 각 부분을 개별적으로 생각할 수 있게 해줍니다. 이는 코드의 재사용성과 유지보수성을 크게 향상시킵니다.

React에서 컴포넌트는 크게 함수형 컴포넌트와 클래스형 컴포넌트로 나눌 수 있습니다. 최신 React에서는 Hooks의 도입으로 함수형 컴포넌트가 권장되며, 대부분의 새로운 기능과 패턴은 함수형 컴포넌트를 중심으로 설계되고 있습니다.`,
    keyPoints: [
      'UI를 재사용 가능한 독립적인 조각으로 분할',
      '함수형 컴포넌트와 클래스형 컴포넌트 두 가지 유형 존재',
      'Props를 통해 데이터를 전달받음',
      '컴포넌트 합성을 통한 복잡한 UI 구성',
      '단방향 데이터 흐름 유지',
      '선언적 UI 패러다임 채택',
    ],
    code: {
      title: '함수형 vs 클래스형 컴포넌트',
      language: 'jsx',
      snippet: `// 함수형 컴포넌트 (권장)
import React from 'react';

function Welcome(props) {
return <h1>안녕하세요, {props.name}님!</h1>;
}

export default Welcome;

// 클래스형 컴포넌트
import React, { Component } from 'react';

class Welcome extends Component {
render() {
return <h1>안녕하세요, {this.props.name}님!</h1>;
}
}

export default Welcome;`,
    },
    visualAid: 'component-hierarchy-diagram.svg',
    resources: [
      {
        name: 'React 공식 문서 - 컴포넌트와 Props',
        url: 'https://react.dev/learn/your-first-component',
        type: 'documentation',
      },
      {
        name: 'React 컴포넌트 패턴',
        url: 'https://reactpatterns.com/',
        type: 'reference',
      },
    ],
  },
  {
    id: 'functional-components',
    title: '함수형 컴포넌트',
    description: 'React의 함수형 컴포넌트 작성 방법과 Hooks를 활용한 상태 관리 방법을 배웁니다.',
    content: `함수형 컴포넌트는, 그 이름에서 알 수 있듯이, JavaScript 함수로 작성된 React 컴포넌트입니다. 함수형 컴포넌트는 props를 인자로 받아 React 엘리먼트를 반환합니다.

React 16.8에서 Hooks가 도입되기 전에는 함수형 컴포넌트는 "무상태 컴포넌트(stateless component)"로만 사용되었습니다. 즉, 상태를 가질 수 없고 라이프사이클 메서드를 사용할 수 없었습니다. 하지만 Hooks의 도입으로 함수형 컴포넌트에서도 상태 관리, 라이프사이클 기능, 컨텍스트 사용 등이 가능해졌습니다.

현재 React 개발에서는 함수형 컴포넌트가 권장되며, 클래스형 컴포넌트보다 코드가 간결하고, 이해하기 쉬우며, 테스트하기 용이한 장점이 있습니다.`,
    keyPoints: [
      '간결한 문법으로 빠르게 컴포넌트 작성 가능',
      'useState, useEffect 등의 Hooks를 사용해 상태와 생명주기 관리',
      '명시적인 props 사용으로 코드 가독성 향상',
      '불필요한 메서드와 this 키워드의 복잡성 제거',
      '메모리 사용량이 클래스형 컴포넌트보다 적음',
      '자동으로 PureComponent 최적화와 유사한 동작 제공(React.memo 사용 시)',
    ],
    code: {
      title: '함수형 컴포넌트 예시',
      language: 'jsx',
      snippet: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  // 상태 관리
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 생명주기 관리
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // API에서 사용자 데이터 가져오기
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
          throw new Error('사용자 정보를 가져오는데 실패했습니다.');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // 클린업 함수 (컴포넌트 언마운트 시 실행)
    return () => {
      // 리소스 정리 로직 (필요한 경우)
      console.log('컴포넌트가 언마운트됩니다.');
    };
  }, [userId]); // userId가 변경될 때마다 실행

  // 조건부 렌더링
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>이메일: {user.email}</p>
      {user.bio && <p>소개: {user.bio}</p>}
      <button onClick={() => alert(\`\${user.name}님에게 메시지 보내기\`)}>
        메시지 보내기
      </button>
    </div>
  );
}

export default UserProfile;`,
    },
    hooks: {
      title: '주요 React Hooks',
      items: [
        {
          name: 'useState',
          description: '컴포넌트에 상태를 추가할 수 있게 해주는 Hook',
          example: `const [count, setCount] = useState(0);`,
        },
        {
          name: 'useEffect',
          description: '컴포넌트의 부수 효과(side effects)를 처리하는 Hook',
          example: `useEffect(() => {
document.title = \`클릭 횟수: \${count}\`;
}, [count]);`,
        },
        {
          name: 'useContext',
          description: 'React 컨텍스트를 구독하는 Hook',
          example: `const theme = useContext(ThemeContext);`,
        },
        {
          name: 'useReducer',
          description: '복잡한 상태 로직을 관리하는 Hook',
          example: `const [state, dispatch] = useReducer(reducer, initialState);`,
        },
        {
          name: 'useCallback',
          description: '메모이제이션된 콜백을 반환하는 Hook',
          example: `const memoizedCallback = useCallback(() => {
doSomething(a, b);
}, [a, b]);`,
        },
        {
          name: 'useMemo',
          description: '메모이제이션된 값을 반환하는 Hook',
          example: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`,
        },
      ],
    },
    bestPractices: [
      'props 구조 분해 할당으로 가독성 높이기',
      '조건부 렌더링을 위한 조기 리턴 패턴 사용하기',
      'React.memo()로 불필요한 리렌더링 방지하기',
      '커스텀 Hook으로 로직 재사용하기',
      '복잡한 상태 관리는 useReducer 활용하기',
      'props 기본값 설정하기',
    ],
  },
];

export default components;
