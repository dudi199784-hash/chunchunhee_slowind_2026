import { http } from "./http";

/** POST `/api/v1/products` body (`WriteRequest`) */
export interface CreateProductBody {
  title: string;
  description: string;
  category: string;
}

/** PUT `/api/v1/products/{id}` body (`WriteRequest`) */
export interface UpdateProductBody {
  title: string;
  description: string;
  category: string;
}

/** Serialized `Product` entity from API */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  createTime?: string;
  updateTime?: string;
}

/** `GET /api/v1/products` body (`ProductsResponse`) */
export interface ProductsListResponse {
  products: Product[];
}

export const getProducts = async (): Promise<ProductsListResponse> => {
  const response = await http.get<ProductsListResponse>("/api/v1/products");
  return response.data;
};

/** `GET /api/v1/products/{id}` body (`ProductResponse`) */
export interface ProductDetailResponse {
  product: Product;
}

export const getProduct = async (id: number): Promise<ProductDetailResponse> => {
  const response = await http.get<ProductDetailResponse>(`/api/v1/products/${id}`);
  return response.data;
};

export const createProduct = async (product: CreateProductBody) => {
  const response = await http.post("/api/v1/products", product);
  return response.data;
};

export const updateProduct = async (id: number, product: UpdateProductBody) => {
  const response = await http.patch(`/api/v1/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await http.delete(`/api/v1/products/${id}`);
  return response.data;
};
