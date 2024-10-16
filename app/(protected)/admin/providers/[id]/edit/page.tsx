import ProviderEditForm from "@/components/admin/providers/provider-edit-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import NotFound from "./not-found";

export default async function EditProviderPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  // Fetch the provider data from the database
  const provider = await db.provider.findUnique({
    where: {
      id: id,
    },
  });

  // Handle case when provider is not found
  if (!provider) {
    return NotFound();
  }

  // Transform null values to undefined
  const transformedProvider = {
    ...provider,
    address: provider.address || undefined,
    phone: provider.phone || undefined,
    capacity: provider.capacity || undefined,
    rent: provider.rent || undefined,
    banquet: provider.banquet || undefined,
    party: provider.party || undefined,
  };

  return (
    <div>
      <ProviderEditForm provider={transformedProvider} />
    </div>
  );
}
