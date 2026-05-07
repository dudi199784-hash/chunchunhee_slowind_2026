import { DesignsListResponse, getDesigns } from "../../lib/api/design";
import DesignAdminRow from "./DesignAdminRow";
import Link from "next/link";

export default async function AdminDesignsPage() {
  const response = await getDesigns();
  const { designs } = response as DesignsListResponse;

  return (
    <div>
      <h1>Admin Designs</h1> 
      <Link href="/admin/designs/new">디자인 추가</Link>
      {designs.map((design) => (
        <DesignAdminRow key={design.id} design={design} />
      ))}
    </div>
  );
}
