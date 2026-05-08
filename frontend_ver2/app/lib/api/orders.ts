import { http } from "./http";

const ORDER_API_BASE_URL = "/api/v1/orders";

export interface Order {
  id: number;
  memberId?: number;
  productId?: number;
  quantity?: number;
  totalPrice?: number;
  status?: string;
  createTime?: string;
  updateTime?: string;
}

export interface OrdersListResponse {
  orders: Order[];
}

export const getOrders = async (): Promise<OrdersListResponse> => {
  const response = await http.get<OrdersListResponse>(ORDER_API_BASE_URL);
  return response.data;
};
