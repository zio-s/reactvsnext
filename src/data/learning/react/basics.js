// data/learning/react/basics.js
// React 기본 개념 학습 데이터

const basics = [
  {
    id: 'react-intro',
    title: 'React란 무엇인가?',
    description: 'React의 기본 개념과 특징을 소개합니다.',
    content: `React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 페이스북(현 Meta)에서 개발했으며, 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI 요소를 만들 수 있습니다.

React의 주요 철학은 "한 번 배우고, 어디서나 작성하기(Learn Once, Write Anywhere)"입니다. 이는 React가 특정 플랫폼에 국한되지 않고 웹, 모바일(React Native), 데스크톱 애플리케이션 등 다양한 환경에서 활용될 수 있음을 의미합니다.

React는 선언적(declarative) 프로그래밍 방식을 채택하여 개발자가 "어떻게(how)" 렌더링할지보다 "무엇을(what)" 렌더링할지에 집중할 수 있게 합니다. 이는 코드의 가독성을 높이고 버그를 줄이는 데 도움이 됩니다.`,
    keyPoints: [
      '컴포넌트 기반 아키텍처',
      '가상 DOM을 통한 효율적인 렌더링',
      '단방향 데이터 흐름',
      'JSX 문법으로 UI 정의',
      '선언적 프로그래밍 방식',
      '풍부한 생태계와 커뮤니티',
    ],
    code: {
      title: '첫 번째 React 컴포넌트',
      language: 'jsx',
      snippet: `import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>안녕하세요, React!</h1>
      <p>첫 번째 컴포넌트입니다.</p>
    </div>
  );
}

export default HelloWorld;`,
    },
    visualAid: 'react-component-diagram.svg',
    resources: [
      {
        name: 'React 공식 문서',
        url: 'https://react.dev',
        type: 'documentation',
      },
      {
        name: 'React 상호작용 튜토리얼',
        url: 'https://react.dev/learn',
        type: 'tutorial',
      },
    ],
  },
  {
    id: 'jsx-intro',
    title: 'JSX 소개',
    description: 'React에서 사용하는 JavaScript 확장 문법인 JSX를 이해합니다.',
    content: `JSX(JavaScript XML)는 React에서 UI 구조를 정의하기 위해 사용하는 JavaScript 확장 문법입니다. HTML과 유사한 구문을 JavaScript 코드 내에서 직접 작성할 수 있게 해줍니다.

JSX는 필수는 아니지만, React 개발에서 널리 사용됩니다. 표현력이 뛰어나고 시각적으로 더 이해하기 쉬운 코드를 작성할 수 있게 해주기 때문입니다.

JSX 코드는 빌드 과정에서 Babel과 같은 트랜스파일러에 의해 일반 JavaScript 함수 호출로 변환됩니다. 즉, JSX는 React.createElement() 함수 호출에 대한 문법적 설탕(syntactic sugar)입니다.`,
    keyPoints: [
      'JavaScript와 HTML의 결합',
      '표현식 사용 가능 (중괄호 내부)',
      '속성은 camelCase로 작성 (className, onClick 등)',
      'React 요소를 반환하는 트랜스파일 과정',
      '자식 요소를 포함할 수 있음',
      '항상 닫는 태그 필요 (자체 닫기 태그 포함)',
    ],
    code: {
      title: 'JSX 기본 문법',
      language: 'jsx',
      snippet: `// JSX 사용 예시
function Greeting({ name, age }) {
  return (
    <div className="greeting">
      <h1>안녕하세요, {name}님!</h1>
      {age && <p>당신은 {age}세입니다.</p>}
      <ul>
        {['사과', '바나나', '오렌지'].map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
      <img src="avatar.png" alt="프로필 이미지" />
    </div>
  );
}`,
    },
    comparison: {
      title: 'JSX vs React.createElement',
      items: [
        {
          jsx: `<div className="container">
  <h1>제목</h1>
  <p>내용</p>
</div>`,
          createElement: `React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, '제목'),
  React.createElement('p', null, '내용')
)`,
        },
      ],
    },
    pitfalls: [
      'JSX에서는 class 대신 className을 사용해야 합니다.',
      '모든 태그는 닫혀야 합니다 (예: <img />).',
      'JSX 내에서는 JavaScript 표현식만 사용할 수 있습니다 (if문, for 루프 등은 직접 사용 불가).',
      '인접한 JSX 요소는 반드시 하나의 부모 요소로 감싸야 합니다.',
    ],
  },
  {
    id: 'components-props',
    title: '컴포넌트와 Props',
    description: 'React 컴포넌트 개념과 Props를 통한 데이터 전달 방법을 배웁니다.',
    content: `React 애플리케이션은 컴포넌트로 구성됩니다. 컴포넌트는 UI의 독립적이고 재사용 가능한 조각으로, 자체 로직과 모양을 가집니다. 개념적으로 컴포넌트는 JavaScript 함수와 같습니다. 입력("props"라고 하는 속성)을 받아 화면에 표시할 React 요소를 반환합니다.

Props(Properties의 줄임말)는 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하는 메커니즘입니다. Props는 읽기 전용이며, 컴포넌트 내에서 수정해서는 안 됩니다. 이것이 React의 '하향식 데이터 흐름' 또는 '단방향 바인딩'을 나타냅니다.`,
    keyPoints: [
      '컴포넌트는 UI의 독립적인 조각',
      '함수형 또는 클래스형 컴포넌트로 정의 가능',
      'Props는 읽기 전용(immutable)',
      '컴포넌트 합성을 통한 복잡한 UI 구축',
      '단방향 데이터 흐름',
      'Pure 함수처럼 동작 (같은 props에 대해 같은 결과)',
    ],
    code: {
      title: '컴포넌트와 Props 사용 예시',
      language: 'jsx',
      snippet: `// Button 컴포넌트 정의
function Button({ text, onClick, color = 'blue' }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, color: 'white', padding: '8px 16px' }}
    >
      {text}
    </button>
  );
}

// Button 컴포넌트 사용
function App() {
  const handleClick = () => alert('버튼이 클릭되었습니다!');
  
  return (
    <div>
      <h1>컴포넌트와 Props 예제</h1>
      <Button 
        text="클릭하세요" 
        onClick={handleClick} 
      />
      <Button 
        text="저장" 
        onClick={() => console.log('저장되었습니다')} 
        color="green" 
      />
    </div>
  );
}`,
    },
    propTypes: {
      title: 'PropTypes를 사용한 타입 검사',
      description: 'PropTypes는 컴포넌트가 받는 props의 타입을 검사하여 개발 시 오류를 빠르게 발견할 수 있게 해줍니다.',
      code: `import PropTypes from 'prop-types';

function User({ name, age, isAdmin }) {
  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      {isAdmin && <p>관리자입니다</p>}
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isAdmin: PropTypes.bool
};

User.defaultProps = {
  age: 30,
  isAdmin: false
};`,
    },
    composition: {
      title: '컴포넌트 합성',
      description: '여러 컴포넌트를 조합하여 복잡한 UI를 구성하는 방법',
      code: `// 특화된 버튼 컴포넌트들
function PrimaryButton(props) {
  return <Button {...props} color="blue" />;
}

function DangerButton(props) {
  return <Button {...props} color="red" />;
}

// 레이아웃 컴포넌트
function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// 컴포넌트 합성 사용
function UserProfile() {
  return (
    <Card title="사용자 프로필">
      <img src="avatar.png" alt="프로필" />
      <h2>홍길동</h2>
      <p>프론트엔드 개발자</p>
      <DangerButton text="삭제" onClick={() => alert('삭제')} />
    </Card>
  );
}`,
    },
  },
  {
    id: 'state-lifecycle',
    title: 'State와 생명주기',
    description: 'React 컴포넌트의 상태 관리와 생명주기 메서드에 대해 알아봅니다.',
    content: `State는 컴포넌트 내부에서 관리되는 데이터로, 사용자 상호작용, 네트워크 응답 등에 따라 변경될 수 있습니다. State가 변경되면 컴포넌트는 리렌더링됩니다.

React 컴포넌트는 생명주기(lifecycle)를 가지며, 특정 시점에 코드를 실행할 수 있는 메서드를 제공합니다. 생명주기 메서드는 컴포넌트가 마운트(DOM에 삽입)되거나, 업데이트되거나, 언마운트(DOM에서 제거)될 때 호출됩니다.

함수형 컴포넌트에서는 useState Hook을 사용하여 상태를 관리하고, useEffect Hook을 사용하여 생명주기 기능을 구현합니다.`,
    keyPoints: [
      'State는 컴포넌트 내부에서 관리되는 데이터',
      'State 변경 시 컴포넌트가 다시 렌더링됨',
      'setState()는 비동기적으로 동작',
      '컴포넌트 생명주기: 마운트, 업데이트, 언마운트',
      '함수형 컴포넌트는 Hooks로 상태와 생명주기 관리',
      '상태 업데이트는 병합이 아닌 대체(replacement)',
    ],
    code: {
      title: '상태 관리 예시 (클래스형 vs 함수형)',
      language: 'jsx',
      classComponent: `// 클래스형 컴포넌트에서의 상태 관리
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    document.title = \`클릭 횟수: \${this.state.count}\`;
  }
  
  componentDidUpdate() {
    document.title = \`클릭 횟수: \${this.state.count}\`;
  }
  
  incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };
  
  render() {
    return (
      <div>
        <p>클릭 횟수: {this.state.count}</p>
        <button onClick={this.incrementCount}>증가</button>
      </div>
    );
  }
}`,
      functionalComponent: `// 함수형 컴포넌트에서의 상태 관리
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`클릭 횟수: \${count}\`;
  }, [count]);
  
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>클릭 횟수: {count}</p>
      <button onClick={incrementCount}>증가</button>
    </div>
  );
}`,
    },
    lifecycle: {
      title: '컴포넌트 생명주기 다이어그램',
      description: '클래스 컴포넌트의 주요 생명주기 메서드와 호출 시점',
      methods: [
        {
          phase: '마운팅',
          methods: ['constructor()', 'static getDerivedStateFromProps()', 'render()', 'componentDidMount()'],
        },
        {
          phase: '업데이트',
          methods: [
            'static getDerivedStateFromProps()',
            'shouldComponentUpdate()',
            'render()',
            'getSnapshotBeforeUpdate()',
            'componentDidUpdate()',
          ],
        },
        {
          phase: '언마운팅',
          methods: ['componentWillUnmount()'],
        },
      ],
    },
    bestPractices: [
      '상태 업데이트 시 이전 상태에 의존하는 경우, 함수형 업데이트 사용하기',
      '상태는 최소한으로 유지하고, 계산 가능한 값은 파생시키기',
      '여러 상태 변수를 함께 업데이트해야 하는 경우, 객체로 그룹화하기',
      '상태 끌어올리기(Lifting State Up)를 통해 관련 컴포넌트 간에 상태 공유하기',
    ],
  },
  {
    id: 'handling-events',
    title: '이벤트 처리하기',
    description: 'React에서 사용자 이벤트를 처리하는 방법을 배웁니다.',
    content: `React에서 이벤트 처리는 DOM 이벤트 처리와 유사하지만, 몇 가지 문법적 차이가 있습니다. React 이벤트는 소문자 대신 camelCase 명명 규칙을 사용하며, JSX에서는 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

또한 React에서는 기본 동작을 방지하기 위해 'return false'를 사용할 수 없습니다. 명시적으로 preventDefault()를 호출해야 합니다. 이벤트 핸들러에는 합성 이벤트(SyntheticEvent)가 전달되는데, 이는 브라우저의 네이티브 이벤트를 감싸는 크로스 브라우저 래퍼입니다.`,
    keyPoints: [
      'camelCase 이벤트 이름 사용 (onClick, onSubmit 등)',
      '이벤트 핸들러는 함수로 전달',
      'preventDefault()로 기본 동작 방지',
      '합성 이벤트(SyntheticEvent) 시스템',
      '이벤트 위임(Event Delegation)을 자동으로 처리',
      '클래스 메서드의 this 바인딩 필요',
    ],
    code: {
      title: '이벤트 처리 예시',
      language: 'jsx',
      snippet: `import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(\`이름: \${name}, 댓글: \${comment}\`);
    // 폼 제출 처리 로직...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="comment">댓글:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}`,
    },
    bindingInClass: {
      title: '클래스 컴포넌트에서의 바인딩',
      description: '클래스 컴포넌트에서 이벤트 핸들러의 this 바인딩',
      methods: [
        {
          name: '생성자에서 바인딩',
          code: `constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}`,
        },
        {
          name: '클래스 필드 문법',
          code: `handleClick = () => {
  console.log('this는 바인딩됨:', this);
}`,
        },
        {
          name: '콜백에서 화살표 함수',
          code: `render() {
  return <button onClick={() => this.handleClick()}>클릭</button>;
}`,
        },
      ],
    },
    commonEvents: [
      {
        name: 'onClick',
        description: '요소 클릭 시 발생',
        example: `<button onClick={handleClick}>클릭</button>`,
      },
      {
        name: 'onChange',
        description: '입력 요소의 값이 변경될 때 발생',
        example: `<input onChange={handleChange} value={value} />`,
      },
      {
        name: 'onSubmit',
        description: '폼 제출 시 발생',
        example: `<form onSubmit={handleSubmit}>...</form>`,
      },
      {
        name: 'onFocus/onBlur',
        description: '요소가 포커스를 얻거나 잃을 때 발생',
        example: `<input onFocus={handleFocus} onBlur={handleBlur} />`,
      },
      {
        name: 'onMouseEnter/onMouseLeave',
        description: '마우스가 요소에 들어가거나 나올 때 발생',
        example: `<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>...</div>`,
      },
    ],
  },
];

export default basics;
