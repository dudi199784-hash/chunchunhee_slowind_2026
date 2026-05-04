'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Item() {
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        const result = await fetch ("http://localhost:8090/api/v1/products").then(row => row.json());
            setProducts(result.data.products);
            console.log(result.data.products);
    }
  return (
    <div>
      상품게시물 { products.map(product => <li key={product.id}> {product.name} {product.description}</li>) } 
    </div>
  );
}
