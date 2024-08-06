import ProviderEditForm from "@/components/admin/providers/provider-edit-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditProviderPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const provider = await db.provider.findUnique({
    where: {
      id: id,
    },
  });

  if (!provider) {
    notFound();
  }

  return (
    <div>
      <ProviderEditForm provider={provider} />
    </div>
  )
}
