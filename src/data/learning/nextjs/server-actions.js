// data/learning/nextjs/server-actions.js
// Next.js Server Actions 학습 데이터

const serverActions = [
  {
    id: 'server-actions-basics',
    title: 'Server Actions 기초',
    description: 'Server Actions의 개념과 기본 사용법을 배웁니다.',
    content: `Server Actions는 서버에서 실행되는 비동기 함수입니다. 폼 제출, 데이터 변경 등의 작업을 클라이언트에서 직접 서버 함수를 호출하여 처리할 수 있습니다.

'use server' 지시어를 사용하여 Server Action을 정의합니다. 파일 상단에 사용하면 해당 파일의 모든 export가 Server Action이 되고, 함수 내부에 사용하면 해당 함수만 Server Action이 됩니다.

Server Actions는 POST 요청으로 호출되며, 자동으로 암호화된 참조를 생성합니다. 클라이언트로 민감한 로직이나 데이터가 노출되지 않습니다.`,
    keyPoints: [
      "'use server' 지시어로 정의",
      '폼 제출과 자연스럽게 통합',
      '클라이언트에서 직접 호출 가능',
      'POST 요청으로 자동 처리',
      '민감한 로직이 서버에서만 실행',
    ],
    code: {
      title: 'Server Actions 기본 예시',
      language: 'jsx',
      snippet: `// app/actions.js
'use server';

// 파일 상단의 'use server'로 모든 export가 Server Action이 됨
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/database';

// 기본 Server Action
export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // 서버에서 데이터베이스에 직접 접근
  await db.post.create({
    data: { title, content },
  });

  // 캐시 무효화
  revalidatePath('/posts');

  // 리다이렉트
  redirect('/posts');
}

// 서버 컴포넌트에서 사용 (app/posts/new/page.js)
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input type="text" name="title" placeholder="제목" required />
      <textarea name="content" placeholder="내용" required />
      <button type="submit">게시하기</button>
    </form>
  );
}

// 인라인 Server Action (서버 컴포넌트 내부)
export default function SettingsPage() {
  async function updateSettings(formData) {
    'use server';

    const theme = formData.get('theme');
    await db.settings.update({
      where: { userId: getCurrentUserId() },
      data: { theme },
    });

    revalidatePath('/settings');
  }

  return (
    <form action={updateSettings}>
      <select name="theme">
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
      <button type="submit">저장</button>
    </form>
  );
}`,
    },
    resources: [
      {
        name: 'Server Actions 문서',
        url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'form-handling',
    title: '폼 처리와 유효성 검사',
    description: 'Server Actions를 활용한 폼 처리 및 유효성 검사 방법을 배웁니다.',
    content: `Server Actions와 함께 useFormState 훅을 사용하면 폼 제출 결과(성공/실패)를 처리할 수 있습니다. useFormStatus 훅으로 제출 중 상태를 표시할 수 있습니다.

서버 측에서 유효성 검사를 수행하고, 에러 메시지를 클라이언트로 반환합니다. Zod 같은 스키마 검증 라이브러리를 활용하면 더 체계적인 검증이 가능합니다.

Progressive Enhancement를 지원하여 JavaScript가 비활성화된 환경에서도 기본 폼 기능이 동작합니다.`,
    keyPoints: [
      'useFormState로 폼 상태 관리',
      'useFormStatus로 제출 상태 표시',
      '서버 측 유효성 검사',
      'Zod 스키마 검증 활용',
      'Progressive Enhancement 지원',
    ],
    code: {
      title: '폼 처리 예시',
      language: 'jsx',
      snippet: `// app/actions.js
'use server';

import { z } from 'zod';
import { db } from '@/lib/database';
import { revalidatePath } from 'next/cache';

// Zod 스키마 정의
const UserSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  age: z.coerce.number().min(18, '18세 이상이어야 합니다'),
});

export async function createUser(prevState, formData) {
  // 폼 데이터 추출
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age'),
  };

  // 유효성 검사
  const validatedFields = UserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: '입력 정보를 확인해주세요.',
    };
  }

  // 이메일 중복 확인
  const existingUser = await db.user.findUnique({
    where: { email: validatedFields.data.email },
  });

  if (existingUser) {
    return {
      success: false,
      errors: { email: ['이미 사용 중인 이메일입니다'] },
      message: '이메일 중복',
    };
  }

  // 데이터베이스에 저장
  try {
    await db.user.create({
      data: validatedFields.data,
    });

    revalidatePath('/users');

    return {
      success: true,
      message: '사용자가 생성되었습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message: '서버 오류가 발생했습니다.',
    };
  }
}

// 클라이언트 컴포넌트 (app/users/new/UserForm.js)
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from '@/app/actions';

// 제출 버튼 컴포넌트
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '처리 중...' : '등록하기'}
    </button>
  );
}

// 폼 컴포넌트
export default function UserForm() {
  const [state, formAction] = useFormState(createUser, {
    success: false,
    errors: {},
    message: '',
  });

  return (
    <form action={formAction}>
      {state.message && (
        <div className={state.success ? 'success' : 'error'}>
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" required />
        {state.errors?.name && (
          <span className="error">{state.errors.name[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required />
        {state.errors?.email && (
          <span className="error">{state.errors.email[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="age">나이</label>
        <input type="number" id="age" name="age" required />
        {state.errors?.age && (
          <span className="error">{state.errors.age[0]}</span>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}`,
    },
  },
  {
    id: 'optimistic-updates',
    title: '낙관적 업데이트',
    description: 'useOptimistic을 활용한 즉각적인 UI 업데이트 방법을 배웁니다.',
    content: `낙관적 업데이트(Optimistic Update)는 서버 응답을 기다리지 않고 UI를 먼저 업데이트하는 패턴입니다. 사용자에게 즉각적인 피드백을 제공하여 더 빠른 체감 속도를 제공합니다.

useOptimistic 훅을 사용하면 낙관적 상태를 쉽게 관리할 수 있습니다. 서버 요청이 실패하면 자동으로 이전 상태로 롤백됩니다.

좋아요, 북마크, 댓글 추가 등 빈번한 사용자 상호작용에 특히 유용합니다.`,
    keyPoints: [
      'useOptimistic으로 낙관적 상태 관리',
      '즉각적인 UI 피드백',
      '실패 시 자동 롤백',
      '좋아요, 북마크 등에 적합',
      '서버 상태와 낙관적 상태 분리',
    ],
    code: {
      title: '낙관적 업데이트 예시',
      language: 'jsx',
      snippet: `// app/actions.js
'use server';

import { db } from '@/lib/database';
import { revalidatePath } from 'next/cache';

export async function addComment(postId, formData) {
  const content = formData.get('content');

  // 인위적 지연 (실제 DB 작업 시뮬레이션)
  await new Promise((r) => setTimeout(r, 1000));

  const comment = await db.comment.create({
    data: {
      content,
      postId,
      authorId: getCurrentUserId(),
    },
    include: {
      author: true,
    },
  });

  revalidatePath(\`/posts/\${postId}\`);
  return comment;
}

export async function toggleLike(postId) {
  const userId = getCurrentUserId();

  const existingLike = await db.like.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await db.like.create({
      data: { postId, userId },
    });
  }

  revalidatePath(\`/posts/\${postId}\`);
}

// 클라이언트 컴포넌트 - 댓글 폼
'use client';

import { useOptimistic, useRef } from 'react';
import { addComment } from '@/app/actions';

export default function CommentSection({ postId, initialComments }) {
  const formRef = useRef(null);

  // 낙관적 상태 관리
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newComment) => [...state, newComment]
  );

  async function handleSubmit(formData) {
    const content = formData.get('content');

    // 낙관적으로 UI 업데이트
    addOptimisticComment({
      id: \`temp-\${Date.now()}\`,
      content,
      author: { name: '나' },
      createdAt: new Date().toISOString(),
      pending: true, // 로딩 표시용
    });

    // 폼 초기화
    formRef.current?.reset();

    // 실제 서버 요청
    await addComment(postId, formData);
  }

  return (
    <div>
      <ul className="comments">
        {optimisticComments.map((comment) => (
          <li
            key={comment.id}
            className={comment.pending ? 'opacity-50' : ''}
          >
            <strong>{comment.author.name}</strong>
            <p>{comment.content}</p>
            {comment.pending && <span>전송 중...</span>}
          </li>
        ))}
      </ul>

      <form ref={formRef} action={handleSubmit}>
        <input type="text" name="content" placeholder="댓글 입력" required />
        <button type="submit">댓글 달기</button>
      </form>
    </div>
  );
}

// 좋아요 버튼
'use client';

import { useOptimistic, useTransition } from 'react';
import { toggleLike } from '@/app/actions';

export default function LikeButton({ postId, initialLiked, likeCount }) {
  const [isPending, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic(
    { liked: initialLiked, count: likeCount },
    (state) => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    })
  );

  function handleClick() {
    startTransition(async () => {
      setOptimistic(null);
      await toggleLike(postId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={optimistic.liked ? 'liked' : ''}
    >
      {optimistic.liked ? '❤️' : '🤍'}
      <span>{optimistic.count}</span>
    </button>
  );
}`,
    },
  },
  {
    id: 'error-handling',
    title: '에러 처리',
    description: 'Server Actions에서 에러를 처리하는 방법을 배웁니다.',
    content: `Server Actions에서 에러가 발생하면 적절히 처리하고 사용자에게 피드백을 제공해야 합니다. try-catch를 사용하여 에러를 잡고, 에러 정보를 클라이언트로 반환합니다.

예상된 에러(유효성 검사 실패, 권한 없음 등)와 예상치 못한 에러(서버 오류)를 구분하여 처리합니다. 예상치 못한 에러의 상세 정보는 로그에 기록하고, 사용자에게는 일반적인 메시지만 표시합니다.

error.js 파일을 사용하면 Server Action 에러에 대한 에러 바운더리를 설정할 수 있습니다.`,
    keyPoints: [
      'try-catch로 에러 처리',
      '예상된 에러와 예상치 못한 에러 구분',
      '에러 정보를 상태로 반환',
      '에러 로깅',
      'error.js로 에러 바운더리',
    ],
    code: {
      title: '에러 처리 예시',
      language: 'jsx',
      snippet: `// lib/errors.js - 커스텀 에러 클래스
export class ActionError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export class ValidationError extends ActionError {
  constructor(message, errors) {
    super(message, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

export class UnauthorizedError extends ActionError {
  constructor(message = '권한이 없습니다') {
    super(message, 'UNAUTHORIZED');
  }
}

export class NotFoundError extends ActionError {
  constructor(message = '리소스를 찾을 수 없습니다') {
    super(message, 'NOT_FOUND');
  }
}

// app/actions.js
'use server';

import { z } from 'zod';
import { db } from '@/lib/database';
import { ValidationError, UnauthorizedError, NotFoundError } from '@/lib/errors';
import { getCurrentUser } from '@/lib/auth';

const PostSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(100, '제목은 100자 이하'),
  content: z.string().min(10, '내용은 10자 이상'),
});

export async function updatePost(postId, prevState, formData) {
  try {
    // 인증 확인
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        },
      };
    }

    // 게시글 존재 확인
    const post = await db.post.findUnique({ where: { id: postId } });
    if (!post) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '게시글을 찾을 수 없습니다.',
        },
      };
    }

    // 권한 확인
    if (post.authorId !== user.id) {
      return {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: '수정 권한이 없습니다.',
        },
      };
    }

    // 유효성 검사
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
    };

    const validated = PostSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '입력 정보를 확인해주세요.',
          fieldErrors: validated.error.flatten().fieldErrors,
        },
      };
    }

    // 업데이트
    await db.post.update({
      where: { id: postId },
      data: validated.data,
    });

    return {
      success: true,
      message: '게시글이 수정되었습니다.',
    };

  } catch (error) {
    // 예상치 못한 에러 로깅
    console.error('updatePost error:', error);

    return {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
    };
  }
}

// 클라이언트 컴포넌트
'use client';

import { useFormState } from 'react-dom';
import { updatePost } from '@/app/actions';

export default function EditPostForm({ post }) {
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, formAction] = useFormState(updatePostWithId, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction}>
      {/* 에러 메시지 표시 */}
      {state.error && (
        <div className="error-banner">
          <p>{state.error.message}</p>
          {state.error.code === 'UNAUTHORIZED' && (
            <a href="/login">로그인하기</a>
          )}
        </div>
      )}

      {/* 성공 메시지 */}
      {state.success && (
        <div className="success-banner">{state.message}</div>
      )}

      <div>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
        />
        {state.error?.fieldErrors?.title && (
          <span className="field-error">
            {state.error.fieldErrors.title[0]}
          </span>
        )}
      </div>

      <div>
        <textarea
          name="content"
          defaultValue={post.content}
        />
        {state.error?.fieldErrors?.content && (
          <span className="field-error">
            {state.error.fieldErrors.content[0]}
          </span>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}`,
    },
  },
  {
    id: 'revalidation-redirect',
    title: '재검증과 리다이렉트',
    description: 'Server Actions 후 캐시 재검증 및 리다이렉트 방법을 배웁니다.',
    content: `Server Actions에서 데이터를 변경한 후에는 관련된 캐시를 무효화하고, 필요한 경우 다른 페이지로 리다이렉트해야 합니다.

revalidatePath로 특정 경로의 캐시를, revalidateTag로 특정 태그의 캐시를 무효화합니다. redirect 함수로 다른 페이지로 이동시킬 수 있습니다.

redirect는 try-catch 블록 외부에서 호출해야 합니다. 내부에서 호출하면 에러로 처리될 수 있습니다.`,
    keyPoints: [
      'revalidatePath로 경로 캐시 무효화',
      'revalidateTag로 태그 캐시 무효화',
      'redirect로 페이지 이동',
      'redirect는 try-catch 외부에서 호출',
      '조건부 재검증 가능',
    ],
    code: {
      title: '재검증과 리다이렉트 예시',
      language: 'jsx',
      snippet: `// app/actions.js
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/database';

// 게시글 생성 - 리다이렉트 포함
export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  let postId;

  try {
    const post = await db.post.create({
      data: { title, content },
    });
    postId = post.id;

    // 목록 페이지 캐시 무효화
    revalidatePath('/posts');

    // 태그 기반 캐시 무효화
    revalidateTag('posts');

  } catch (error) {
    return { error: '게시글 생성 실패' };
  }

  // redirect는 try-catch 외부에서!
  redirect(\`/posts/\${postId}\`);
}

// 게시글 삭제 - 조건부 재검증
export async function deletePost(postId) {
  try {
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { categoryId: true },
    });

    await db.post.delete({ where: { id: postId } });

    // 관련 경로들 재검증
    revalidatePath('/posts');
    revalidatePath(\`/posts/\${postId}\`);

    // 카테고리 페이지도 재검증
    if (post?.categoryId) {
      revalidatePath(\`/categories/\${post.categoryId}\`);
    }

    return { success: true };
  } catch (error) {
    return { error: '삭제 실패' };
  }
}

// 댓글 추가 - 부분 재검증
export async function addComment(postId, formData) {
  const content = formData.get('content');

  await db.comment.create({
    data: {
      content,
      postId,
      authorId: getCurrentUserId(),
    },
  });

  // 해당 게시글 페이지만 재검증
  revalidatePath(\`/posts/\${postId}\`);

  // 게시글 목록의 댓글 수는 재검증하지 않음 (성능 최적화)
  // 필요하면: revalidatePath('/posts');
}

// 대량 데이터 변경 - 태그 활용
export async function updateAllPrices(multiplier) {
  await db.product.updateMany({
    data: {
      price: {
        multiply: multiplier,
      },
    },
  });

  // 태그로 관련 캐시 모두 무효화
  revalidateTag('products');
  revalidateTag('prices');

  // 특정 페이지들만 재검증
  revalidatePath('/products');
  revalidatePath('/admin/inventory');
}

// 데이터 가져올 때 태그 지정
// lib/data.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { tags: ['products', 'prices'] },
  });
  return res.json();
}

// 레이아웃 수준 재검증
// app/admin/page.js
export async function updateSiteSettings(formData) {
  await db.settings.update({
    data: {
      siteName: formData.get('siteName'),
      theme: formData.get('theme'),
    },
  });

  // 레이아웃을 포함한 전체 재검증
  revalidatePath('/', 'layout');
}

// 클라이언트에서 조건부 리다이렉트
'use client';

import { useRouter } from 'next/navigation';
import { createPost } from '@/app/actions';

export default function PostForm() {
  const router = useRouter();

  async function handleSubmit(formData) {
    const result = await createPost(formData);

    if (result?.error) {
      // 에러 처리
      alert(result.error);
    } else if (result?.postId) {
      // 클라이언트에서 리다이렉트
      router.push(\`/posts/\${result.postId}\`);
    }
  }

  return (
    <form action={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  );
}`,
    },
  },
];

export default serverActions;
