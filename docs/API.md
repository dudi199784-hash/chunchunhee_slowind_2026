# API 문서 (Swagger) & 프론트 연동

## Swagger UI (백엔드)

Spring Boot에 **springdoc-openapi**가 연결되어 있습니다.

| 항목 | URL (로컬 기준) |
|------|-----------------|
| **Swagger UI** | `http://localhost:8090/swagger-ui.html` (프로파일 `dev` 기본) |
| **OpenAPI JSON** | `http://localhost:8090/v3/api-docs` |

### 인증이 필요한 API 시험하기

1. **POST** `/api/v1/members/login` 으로 로그인 (또는 Swagger에서 Try it out)
2. 응답 JSON의 **`accessToken`** 복사
3. Swagger 페이지 상단 **Authorize** → `bearerAuth` 에 토큰 붙여넣기 (일반적으로 `Bearer ` 는 UI가 처리)
4. 장바구니·주문·OpenAI 이미지 등 보호 API 호출

### 운영(prod) 프로파일

`application-prod.yml` 에서 **Swagger / api-docs 는 기본 비활성화**되어 있습니다.

---

## 프론트엔드에서 쓰는 주요 API (요약)

프론트는 Axios `baseURL` + 아래 경로로 호출합니다. (코드 기준 정리)

| 영역 | 메서드 · 경로 | 사용처(대략) |
|------|----------------|-------------|
| 회원 | `POST /api/v1/members`, `POST /api/v1/members/login` | 로그인·가입 |
| 회원 | `GET/PATCH /api/v1/members/{id}` | 계정 |
| 상품 | `GET /api/v1/products`, `GET /api/v1/products/{id}` | 상품 목록·상세 |
| 장바구니 | `GET/POST /api/v1/carts` | `lib/api/cart.ts` |
| 주문 | `GET/POST /api/v1/orders` | `app/lib/api/orders.ts` |
| 디자인 | `GET /api/v1/designs`, `POST /api/v1/designs` (관리) | 쇼룸·어드민 |
| OpenAI | `POST /api/v1/openai/images/generate` | JSON body |
| OpenAI | `POST /api/v1/openai/images/edit-uniform` | **multipart**: template, mask, prompt (레거시 인페인트) |
| OpenAI | `GET /api/v1/openai/images/uniform-reference-teams` | 레퍼런스 팀 목록 |
| OpenAI | `POST /api/v1/openai/images/uniform-proposal` | **multipart**: `referenceTeamId`, `kitType`(HOME/AWAY), `teamName`, `logo` — 제안서 시안 |
| 로고 에셋 | `POST /api/v1/logo-assets` | 저장 |
| 파일 | `GET /api/v1/files/logos/{fileName}` | 로고 파일 |
| 커뮤니티/댓글 | `/api/v1/communities`, `/api/v1/comments` | 커뮤니티 |

**상세 스키마·쿼리 파라미터·응답 타입**은 Swagger UI에서 컨트롤러별로 확인하는 것이 가장 정확합니다.

---

## 보안 정책 참고 코드

- `backend/src/main/java/.../global/security/ApiSecurityConfig.java` — `/api/v1/**` 공개·인증·관리자 구분

---

## 다이어그램과의 관계

- **이 문서 + Swagger** = “API 안내서” 역할
- **아키텍처 다이어그램** = 브라우저 → Spring → DB / OpenAI 같은 **큰 그림** (PPT·README용 이미지와 별개로 유지하면 됨)
