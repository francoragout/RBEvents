import { columns } from "@/components/admin/providers/columns";
import { DataTable } from "@/components/data-table";
import { z } from "zod";
import { ProviderSchema } from "@/lib/validations";
import { db } from "@/lib/db";

type Provider = z.infer<typeof ProviderSchema>;

async function getProviders(): Promise<Provider[]> {
  const providers = await db.provider.findMany();

  return providers.map((provider) => ProviderSchema.parse(provider));
}

export default async function ProvidersPage() {
  const providers = await getProviders();

  return <DataTable data={providers} columns={columns} />;
}
