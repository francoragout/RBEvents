"use client";

import { CreateProvider } from "@/actions/provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, features } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProviderSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ProviderCreateForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProviderSchema>>({
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      name: "",
      address: "",
      features: [],
    },
  });

  function onSubmit(values: z.infer<typeof ProviderSchema>) {
    startTransition(() => {
      CreateProvider(values).then((result) => {
        if (result.success) {
          toast.success(result.message);
          router.push("/admin/providers");
        } else {
          toast.error(result.message);
        }
      });
    });
  }
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Create Provider</CardTitle>
        <CardDescription>Create a new provider</CardDescription>
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
                        placeholder="Address (optional)"
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SelectValue placeholder="City (required)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Capacity (optional)"
                        type="number"
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
                name="rent"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rent</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rent (optional)"
                        type="number"
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
                name="dinner"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Dinner Card</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dinner card (optional)"
                        type="number"
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
                name="lunch"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Lunch Card</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lunch card (optional)"
                        type="number"
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
                name="after"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>After Card</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="After card (optional)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="mt-8">
                    <FormLabel className="text-base">Features</FormLabel>
                    <FormDescription>
                      Select the features that the provider offers (optional)
                    </FormDescription>
                  </div>
                  <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {features.map((feature) => (
                        <FormField
                          key={feature.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={feature.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(feature.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value ?? []),
                                            feature.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== feature.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {feature.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                </FormItem>
              )}
            />

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
