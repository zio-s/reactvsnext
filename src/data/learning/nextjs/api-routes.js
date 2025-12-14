// data/learning/nextjs/api-routes.js
// Next.js API 라우트 학습 데이터

const apiRoutes = [
  {
    id: 'route-handlers-intro',
    title: 'Route Handlers 소개',
    description: 'Next.js App Router에서 API 엔드포인트를 생성하는 방법을 배웁니다.',
    content: `Route Handlers는 Next.js App Router에서 Web Request/Response API를 사용하여 커스텀 요청 핸들러를 만드는 방법입니다. Pages Router의 API Routes와 유사하지만, 더 현대적인 Web API를 활용합니다.

Route Handler는 app 디렉토리 내의 route.js 또는 route.ts 파일에 정의됩니다. HTTP 메서드에 해당하는 함수(GET, POST, PUT, DELETE 등)를 export하여 각 메서드에 대한 핸들러를 만들 수 있습니다.

Route Handlers는 기본적으로 캐싱되지 않지만, GET 메서드와 Response 객체를 사용할 때 정적으로 평가될 수 있습니다.`,
    keyPoints: [
      'route.js 파일에서 API 엔드포인트 정의',
      'HTTP 메서드 함수 export (GET, POST 등)',
      'Web Request/Response API 사용',
      '동일 폴더에 page.js와 route.js 공존 불가',
      '서버에서만 실행되어 보안에 유리',
    ],
    code: {
      title: 'Route Handler 기본 예시',
      language: 'jsx',
      snippet: `// app/api/hello/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello, World!' });
}

// app/api/users/route.js
export async function GET() {
  const users = await fetchUsers();
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const newUser = await createUser(body);

  return Response.json(newUser, { status: 201 });
}

// app/api/users/[id]/route.js - 동적 라우트
export async function GET(request, { params }) {
  const { id } = params;
  const user = await fetchUser(id);

  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return Response.json(user);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await deleteUser(id);

  return new Response(null, { status: 204 });
}`,
    },
    folderStructure: {
      title: 'API 라우트 폴더 구조',
      structure: [
        { path: 'app/api/route.js', description: '/api - 기본 API 엔드포인트' },
        { path: 'app/api/users/route.js', description: '/api/users - 사용자 API' },
        { path: 'app/api/users/[id]/route.js', description: '/api/users/:id - 동적 사용자 API' },
        { path: 'app/api/posts/[...slug]/route.js', description: '/api/posts/* - Catch-all API' },
      ],
    },
    resources: [
      {
        name: 'Route Handlers 문서',
        url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'request-response',
    title: 'Request와 Response 다루기',
    description: 'Web API를 사용하여 요청과 응답을 처리하는 방법을 배웁니다.',
    content: `Route Handlers에서는 표준 Web API인 Request와 Response 객체를 사용합니다. 이를 통해 헤더, 쿠키, 쿼리 파라미터, 요청 본문 등을 다룰 수 있습니다.

NextRequest와 NextResponse는 Next.js에서 제공하는 확장 클래스로, 기본 Web API에 추가 기능을 제공합니다. 예를 들어 NextRequest는 cookies와 nextUrl 속성을 제공하고, NextResponse는 redirect와 rewrite 메서드를 제공합니다.

응답은 JSON, 텍스트, HTML, 리다이렉트 등 다양한 형태로 반환할 수 있습니다.`,
    keyPoints: [
      'request.json()으로 JSON 본문 파싱',
      'URL 객체로 쿼리 파라미터 접근',
      'Headers API로 헤더 관리',
      'NextRequest/NextResponse로 확장 기능 사용',
      '다양한 응답 형식 지원 (JSON, 텍스트, 스트림 등)',
    ],
    code: {
      title: 'Request/Response 처리 예시',
      language: 'jsx',
      snippet: `// app/api/search/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  // URL 쿼리 파라미터 가져오기
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  // 헤더 읽기
  const authorization = request.headers.get('authorization');

  // 검색 수행
  const results = await search(query, parseInt(page));

  // 응답 반환
  return NextResponse.json(results, {
    headers: {
      'X-Total-Count': results.total.toString(),
    },
  });
}

// app/api/upload/route.js - 파일 업로드
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json(
      { error: 'No file uploaded' },
      { status: 400 }
    );
  }

  // 파일 저장 로직
  const buffer = Buffer.from(await file.arrayBuffer());
  // await saveFile(buffer, file.name);

  return NextResponse.json({ success: true });
}

// app/api/redirect/route.js - 리다이렉트
export async function GET() {
  return NextResponse.redirect('https://example.com');
}

// app/api/stream/route.js - 스트리밍 응답
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        controller.enqueue(encoder.encode(\`data: \${i}\\n\\n\`));
        await new Promise(r => setTimeout(r, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`,
    },
  },
  {
    id: 'api-authentication',
    title: 'API 인증 구현',
    description: 'API 라우트에서 인증을 처리하는 다양한 방법을 배웁니다.',
    content: `API 라우트에서 인증은 여러 방법으로 구현할 수 있습니다. JWT 토큰, 세션 기반 인증, API 키 등 다양한 방식을 사용할 수 있으며, 미들웨어나 라우트 핸들러 내에서 직접 검증할 수 있습니다.

보안을 위해 민감한 정보는 환경 변수로 관리하고, HTTPS를 사용하며, 적절한 에러 응답을 반환해야 합니다. 또한 Rate Limiting이나 CORS 설정도 고려해야 합니다.

NextAuth.js(Auth.js)와 같은 인증 라이브러리를 사용하면 복잡한 인증 로직을 쉽게 구현할 수 있습니다.`,
    keyPoints: [
      'JWT 토큰 기반 인증',
      'API 키 검증',
      '세션 기반 인증',
      '미들웨어에서 인증 처리',
      'NextAuth.js 통합',
    ],
    code: {
      title: 'API 인증 예시',
      language: 'jsx',
      snippet: `// lib/auth.js - 인증 유틸리티
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function verifyAuth(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

// app/api/protected/route.js
import { verifyAuth } from '@/lib/auth';

export async function GET(request) {
  const user = await verifyAuth(request);

  if (!user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 인증된 사용자만 접근 가능한 데이터
  const data = await getProtectedData(user.id);

  return Response.json(data);
}

// app/api/auth/login/route.js
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, password } = await request.json();

  // 사용자 검증
  const user = await validateCredentials(email, password);

  if (!user) {
    return Response.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // JWT 토큰 생성
  const token = sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // HTTP-only 쿠키 설정
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return Response.json({ success: true, user });
}`,
    },
    bestPractices: [
      '민감한 정보는 환경 변수로 관리',
      'HTTP-only 쿠키 사용으로 XSS 방지',
      '적절한 HTTP 상태 코드 반환 (401, 403)',
      'Rate Limiting 구현',
      'CORS 설정 검토',
    ],
  },
  {
    id: 'api-error-handling',
    title: 'API 에러 처리',
    description: 'API 라우트에서 에러를 효과적으로 처리하는 방법을 배웁니다.',
    content: `API 라우트에서 에러 처리는 신뢰할 수 있는 API를 만드는 데 필수적입니다. 적절한 HTTP 상태 코드, 명확한 에러 메시지, 일관된 에러 응답 형식을 사용해야 합니다.

try-catch 블록을 사용하여 예외를 처리하고, 클라이언트에게 유용한 에러 정보를 제공합니다. 단, 보안에 민감한 내부 에러 정보는 노출하지 않아야 합니다.

개발 환경에서는 자세한 에러 정보를 제공하고, 프로덕션에서는 일반적인 메시지만 표시하는 것이 좋습니다.`,
    keyPoints: [
      '적절한 HTTP 상태 코드 사용',
      '일관된 에러 응답 형식',
      'try-catch로 예외 처리',
      '환경별 에러 메시지 구분',
      '에러 로깅 구현',
    ],
    code: {
      title: 'API 에러 처리 예시',
      language: 'jsx',
      snippet: `// lib/api-error.js - 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorResponse(error) {
  if (error instanceof ApiError) {
    return Response.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // 프로덕션에서는 내부 에러 숨기기
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : error.message;

  console.error('API Error:', error);

  return Response.json(
    { error: message },
    { status: 500 }
  );
}

// app/api/users/[id]/route.js
import { ApiError, errorResponse } from '@/lib/api-error';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // 입력 검증
    if (!id || isNaN(parseInt(id))) {
      throw new ApiError('Invalid user ID', 400);
    }

    const user = await fetchUser(id);

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    return Response.json(user);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // 입력 검증
    if (!body.name || body.name.length < 2) {
      throw new ApiError('Name must be at least 2 characters', 400);
    }

    const user = await updateUser(id, body);

    return Response.json(user);
  } catch (error) {
    return errorResponse(error);
  }
}`,
    },
  },
  {
    id: 'api-middleware',
    title: 'API 미들웨어 패턴',
    description: '재사용 가능한 API 미들웨어 패턴을 배웁니다.',
    content: `API 미들웨어 패턴은 여러 라우트에서 공통으로 사용되는 로직(인증, 로깅, CORS, Rate Limiting 등)을 재사용할 수 있게 해줍니다.

Next.js의 middleware.js는 모든 요청에 대해 실행되지만, 더 세밀한 제어가 필요한 경우 고차 함수(Higher-Order Function) 패턴을 사용하여 라우트별 미들웨어를 구현할 수 있습니다.

여러 미들웨어를 체이닝하여 복잡한 처리 파이프라인을 만들 수도 있습니다.`,
    keyPoints: [
      '고차 함수 패턴으로 미들웨어 구현',
      '미들웨어 체이닝',
      '조건부 미들웨어 적용',
      '요청/응답 변환',
      '로깅 및 모니터링',
    ],
    code: {
      title: '미들웨어 패턴 예시',
      language: 'jsx',
      snippet: `// lib/middleware/with-auth.js
export function withAuth(handler) {
  return async (request, context) => {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const user = await verifyToken(token);
      // 요청에 사용자 정보 추가
      request.user = user;
      return handler(request, context);
    } catch (error) {
      return Response.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
}

// lib/middleware/with-logging.js
export function withLogging(handler) {
  return async (request, context) => {
    const start = Date.now();

    console.log(\`[\${request.method}] \${request.url}\`);

    const response = await handler(request, context);

    console.log(\`Response: \${response.status} - \${Date.now() - start}ms\`);

    return response;
  };
}

// lib/middleware/compose.js - 미들웨어 합성
export function compose(...middlewares) {
  return (handler) => {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}

// app/api/admin/users/route.js
import { withAuth } from '@/lib/middleware/with-auth';
import { withLogging } from '@/lib/middleware/with-logging';
import { compose } from '@/lib/middleware/compose';

async function handler(request) {
  // request.user 사용 가능
  const users = await getUsers();
  return Response.json(users);
}

export const GET = compose(withLogging, withAuth)(handler);`,
    },
  },
];

export default apiRoutes;
