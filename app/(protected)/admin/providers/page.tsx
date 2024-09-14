import { z } from "zod";
import { ProviderSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { ProvidersTable } from "@/components/admin/providers/providers-table";
import { ProvidersColumns } from "@/components/admin/providers/providers-columns";
import { Suspense } from "react";

type Provider = z.infer<typeof ProviderSchema>;

async function getProviders(): Promise<Provider[]> {
  const providers = await db.provider.findMany();

  return providers.map((provider) => ProviderSchema.parse(provider));
}

export default async function ProvidersPage() {
  const providers = await getProviders();

  return <ProvidersTable data={providers} columns={ProvidersColumns} />;
}
