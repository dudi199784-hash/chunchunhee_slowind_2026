'use client'
import Image from "next/image";

export default async function Product() {
  await fetch ("http://localhost:8090/api/v1/products") 
  return (
    <div>
      상품게시물
    </div>
  );
}
