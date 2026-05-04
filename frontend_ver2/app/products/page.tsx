import { getProducts } from "../lib/api/products";

export default async function Products() {
  const { products } = await getProducts();
  return (
    <div>
      Products
    <br />--------------------------------
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.category}</p>
          --------------------------------ㅇ
        </div>
      ))}
    </div>
  );
}
