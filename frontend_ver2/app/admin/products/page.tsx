import { getProducts } from "../../lib/api/products";
import ProductAdminRow from "./ProductAdminRow";

export default async function AdminProductsPage() {
  const { products } = await getProducts();

  return (
    <div>
      <h1>Admin Products</h1>
      {products.map((product) => (
        <ProductAdminRow key={product.id} product={product} />
      ))}
    </div>
  );
}
