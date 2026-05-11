import { http } from "./http";
const MEMBER_API_BASE_URL = "/api/v1/members";
/** POST `/api/v1/products` body (`WriteRequest`) */
export interface CreateMemberBody {
  username: string;
  userId: string;
  userpassword: string;
}

/** PUT `/api/v1/products/{id}` body (`WriteRequest`) */
export interface UpdateMemberBody {
    username: string;
    userId: string;
    userpassword: string;
}

/** `Member` 엔티티 JSON (`MemberResponse.member` 등) — `userpassword`는 `@JsonIgnore` */
export interface Member {
  id: number;
  username: string;
  userId: string;
  userpassword?: string;
  createTime?: string;
  updateTime?: string;
}

/** 백엔드 `MemberDto` — 로그인 응답 `memberDto` */
export interface MemberDto {
  id: number;
  userId: string;
  createTime?: string;
  modifyTime?: string;
}

/** `GET /api/v1/products` body (`ProductsResponse`) */
export interface MembersListResponse {
  members: Member[];
}

export const getMembers = async (): Promise<MembersListResponse> => {
  const response = await http.get<MembersListResponse>(MEMBER_API_BASE_URL);
  return response.data;
};

/** `GET /api/v1/products/{id}` body (`ProductResponse`) */
export interface MemberDetailResponse {
  member: Member;
}

export const getMember = async (id: number): Promise<MemberDetailResponse> => {
  const response = await http.get<MemberDetailResponse>(`${MEMBER_API_BASE_URL}/${id}`);
  return response.data;
};

export const createMember = async (product: CreateMemberBody) => {
  const response = await http.post(MEMBER_API_BASE_URL, product);
  return response.data;
};

export const updateMember = async (id: number, product: UpdateMemberBody) => {
  const response = await http.patch(`${MEMBER_API_BASE_URL}/${id}`, product);
  return response.data;
};

export const deleteMember = async (id: number) => {
  const response = await http.delete(`${MEMBER_API_BASE_URL}/${id}`);
  return response.data;
};

/** `ApiV1MemberController.LoginRequestBody` */
export interface LoginRequestBody {
  userId: string;
  password: string;
}

/** `ApiV1MemberController.LoginResponseBody` */
export interface LoginResponseBody {
  memberDto: MemberDto;
  accessToken: string;
}

export const login = async (body: LoginRequestBody): Promise<LoginResponseBody> => {
  const response = await http.post<LoginResponseBody>(`${MEMBER_API_BASE_URL}/login`, body);
  return response.data;
};