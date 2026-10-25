# 모아 — 오늘을 정리하는 작은 습관

한국어 중심의 반응형 태스크 관리 SPA입니다. 할 일 목록에서 검색·상태 필터링을 하고, 상세 페이지에서 내용을 확인하며, 생성·수정·삭제와 완료 처리를 할 수 있습니다. 저장소에는 비밀 키나 개인 데이터가 포함되어 있지 않습니다.

## 기술 스택

- React 18, TypeScript, Vite, React Router
- Supabase Database (Postgres)와 `@supabase/supabase-js`
- Lucide 아이콘, 반응형 자체 CSS

## 로컬 실행

1. Node.js 20 이상을 설치합니다.
2. `npm install`로 의존성을 설치합니다.
3. `.env.example`을 `.env`로 복사하고 아래 값을 채웁니다.
4. Supabase SQL Editor에서 [`supabase/schema.sql`](supabase/schema.sql)을 실행합니다.
5. `npm run dev`로 개발 서버를 시작합니다.

필수 환경 변수:

| 변수 | 설명 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key (브라우저용 공개 키) |

`service_role` 키는 브라우저 환경 변수에 넣거나 클라이언트에 배포하지 마세요. `.env` 파일은 Git에서 제외됩니다.

## 데이터베이스 및 공개 데모 주의

`supabase/schema.sql`은 `tasks` 테이블을 만들고 anon 역할에 CRUD를 허용합니다. 이는 로그인 없는 공개 과제 데모를 위한 설정으로, 접속자는 모두 같은 태스크를 보고 수정·삭제할 수 있습니다. 민감하거나 실제 사용자 데이터가 포함된 서비스에는 이 정책을 사용하지 말고, Supabase Auth 및 사용자별 RLS 정책을 적용하세요. 프로덕션에서는 생성/수정 횟수 제한 등 남용 방지책도 추가하는 것이 좋습니다.

## 배포

외부에 배포하려면 먼저 본인의 Supabase 프로젝트를 만들고 SQL을 실행한 다음, Vercel에서 이 저장소를 가져옵니다. 프로젝트 설정에서 `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`를 환경 변수로 등록하고 배포하세요. 빌드 명령은 `npm run build`, 출력 디렉터리는 `dist`입니다. `vercel.json`이 React Router의 직접 URL 진입을 SPA로 재작성합니다. 다른 정적 호스트를 쓰는 경우 해당 플랫폼에도 모든 경로를 `/`로 보내는 SPA fallback rewrite를 설정하세요.

이 저장소에는 배포 환경의 Supabase 자격 증명이 없으므로 실제 공개 배포 URL은 아직 발급되지 않았습니다. 위 두 공개 클라이언트 설정이 구성되어야 원격 CRUD가 동작합니다.

## 주요 화면

- `/tasks` — 전체 태스크, 검색, 상태 필터, 통계
- `/tasks/new` — 새 태스크 작성 및 실시간 미리보기
- `/tasks/:id` — 태스크 상세, 완료 토글, 삭제
- `/tasks/:id/edit` — 태스크 수정 및 실시간 미리보기
- 그 외 모든 경로 — 404 화면
