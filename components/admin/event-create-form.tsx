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
import {  useState, useTransition } from "react";
import { CreateEvent } from "@/actions/create-event";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(20, {
      message: "Title must not be longer than 20 characters.",
    }),
  type: z.string({
    required_error: "Please select the type of event to display.",
  }),
  date: z.date({
    required_error: "Required.",
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Time must be in the format HH:MM.",
  }),
  lounge: z
    .string()
    .max(30, {
      message: "Lounge must not be longer than 30 characters.",
    })
    .optional(),
  description: z
    .string()
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    })
    .optional(),
});

export default function EventCreateForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      lounge: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateEvent(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of the title"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>This field is requiered.</FormDescription>
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
                      <SelectValue placeholder="Select type of event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Opening">Opening</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This field is requiered.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isPending}
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>This field is requiered.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Shedule a time"
                    {...field}
                    type="time"
                    value={field.value || ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>This field is requiered.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lounge"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-8">
              <FormLabel>Lounge</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name of the Lounge"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>This field is opcional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-8">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="You can add more information here!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>This field is opcional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" className="mt-8">
          Submit
        </Button>
      </form>
    </Form>
  );
}
