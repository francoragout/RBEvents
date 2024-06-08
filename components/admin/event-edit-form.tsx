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
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { CreateEvent, EditEvent } from "@/actions/event";
import { toast } from "../ui/use-toast";
import { EventSchema } from "@/lib/validations";
import { redirect, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { revalidatePath } from "next/cache";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ToastAction } from "../ui/toast";

const ExtendedEventSchema = EventSchema.extend({
  id: z.string(),
});

type Event = z.infer<typeof ExtendedEventSchema>;

export default function EventEditForm({ event }: { event: Event }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: event.name,
    },
  });

  function onSubmit(values: z.infer<typeof EventSchema>) {
    startTransition(() => {
      EditEvent(event.id, values).then((response) => {
        if (response.success) {
          toast({
            title: response.message,
          });
          router.push("/admin/events");
        } else {
          toast({
            title: "Failed to update event",
            description: response.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      });
    });
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Edit event</CardTitle>
        <CardDescription>Update your event details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Render form fields */}
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

            <div className="flex justify-between mt-8">
              <Button asChild variant="outline">
                <Link href="/admin/events">Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
