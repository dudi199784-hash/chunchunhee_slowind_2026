import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link><br />
      <Link href="/products">Products</Link><br />
      <Link href="/order">Order</Link><br />
      <Link href="/members">Members</Link><br />
      <Link href="/design">Design</Link><br />
      <Link href="/community">Community</Link><br />
      <Link href="/cart">Cart</Link><br />
      <Link href="/login">Login</Link><br />
      <Link href="/signup">Signup</Link><br />
    </nav>
  );
}