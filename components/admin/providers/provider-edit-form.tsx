"use client";

import { CreateProvider, UpdateProvider } from "@/actions/provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProviderSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ExtendedProviderSchema = ProviderSchema.extend({
  id: z.string(),
});

type Provider = z.infer<typeof ExtendedProviderSchema>;

export default function ProviderEditForm({ provider }: { provider: Provider }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProviderSchema>>({
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      name: provider.name,
      address: provider.address,
      city: provider.city,
      phone: provider.phone,
    },
  });

  function onSubmit(values: z.infer<typeof ProviderSchema>) {
    startTransition(() => {
      UpdateProvider(provider.id, values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          router.push("/admin/providers");
        } else {
          toast.error(response.message);
        }
      });
    });
  }
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Update Provider</CardTitle>
        <CardDescription>Edit your provider</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name (required)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address (required)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City (required)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone (optional)"
                        type="number"
                        {...field}
                        disabled={isPending}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button asChild variant="outline" size="sm" className="h-8">
                <Link href="/admin/providers">Cancel</Link>
              </Button>
              <Button type="submit" size="sm" className="h-8">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
