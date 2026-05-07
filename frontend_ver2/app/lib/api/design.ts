import { http } from "./http";
const DESIGN_API_BASE_URL = "/api/v1/designs";

/** Serialized `Design` entity from API */
export interface Design {
    memberSerial: number;
    productSerial: number;
    id: number;
    designTitle: string;
    designDescription: string;
    designCategory: string;
    createTime?: string;
    updateTime?: string;
  }
/** `GET /api/v1/designs` body (`DesignsResponse`) */
export interface DesignsListResponse {
  designs: Design[];
}

export const getDesigns = async (): Promise<DesignsListResponse> => {
  const response = await http.get<DesignsListResponse>(DESIGN_API_BASE_URL);
  return response.data;
};

/** `GET /api/v1/designs/{id}` body (`DesignResponse`) */
export interface DesignDetailResponse {
  design: Design;
}

export const getDesign = async (id: number): Promise<DesignDetailResponse> => {
  const response = await http.get<DesignDetailResponse>(`${DESIGN_API_BASE_URL}/${id}`);
  return response.data;
};
export const createDesign = async (design: Design) => {
  const response = await http.post<DesignDetailResponse>(DESIGN_API_BASE_URL, design);
  return response.data;
};