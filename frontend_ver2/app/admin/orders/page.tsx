// import { getOrders } from "@/app/lib/api/orders";

// export default async function AdminOrdersPage() {
//   const { orders } = await getOrders();

//   return (
//     <div>
//       <h1>Admin Orders</h1>
//       {orders.map((order) => (
//         <div key={order.id}>
//           <h2>Order #{order.id}</h2>
//           <p>memberId: {order.memberId ?? "-"}</p>
//           <p>productId: {order.productId ?? "-"}</p>
//           <p>quantity: {order.quantity ?? "-"}</p>
//           <p>status: {order.status ?? "-"}</p>
//           <p>totalPrice: {order.totalPrice ?? "-"}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }
