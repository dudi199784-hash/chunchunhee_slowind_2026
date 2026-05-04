import Link from "next/link";

export default function AdminComponent() {
  return (
    <nav>
      <Link href="/admin">Admin</Link><br />
      <Link href="/admin/products">Products</Link><br />
      <Link href="/admin/orders">Orders</Link><br />
      <Link href="/admin/members">Members</Link><br />
      <Link href="/admin/design">Design</Link><br />
      <Link href="/admin/community">Community</Link><br />
      <Link href="/admin/cart">Cart</Link><br />
      <Link href="/admin/login">Login</Link><br />
      <Link href="/admin/signup">Signup</Link><br />
    </nav>
  );
}