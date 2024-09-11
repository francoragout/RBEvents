"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { InformationSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

export default function InformationCreateForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof InformationSchema>>({
    resolver: zodResolver(InformationSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof InformationSchema>) {
    startTransition(() => {
      // CreateEvent(values).then((response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      //     router.push("/admin/events");
      //   } else {
      //     toast.error(response.message);
      //   }
      // });
    });
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Information About You</CardTitle>
        <CardDescription>
          Use Tabs and Enter keys to navigate faster between fields.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
              

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
