"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GuestSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { guestTypes } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function GuestCreateForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof GuestSchema>>({
    resolver: zodResolver(GuestSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof GuestSchema>) {
    startTransition(() => {
      //   CreateEvent(values).then((response) => {
      //     if (response.success) {
      //       toast.success(response.message);
      //       router.push("/admin/events");
      //     } else {
      //       toast.error(response.message);
      //     }
      //   });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Guest</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name (required)"
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
              name="last_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name (required)"
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
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Type</FormLabel>
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
                        <SelectValue placeholder="Type (required)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {guestTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
              name="observation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Observation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Observation"
                      {...field}
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="table_number"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Table Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Table Number"
                      type="number"
                      {...field}
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="sm"
              className="h-8"
              disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
