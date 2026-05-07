import { http } from "./http";
const DESIGN_API_BASE_URL = "/api/v1/designs";

export const getDesigns = async (userSerial?: number, category?: string) => {
  const response = await http.get(DESIGN_API_BASE_URL, {
    params: { userSerial, category },
  });
  return response.data;
};