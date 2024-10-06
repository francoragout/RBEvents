"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { InformationSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { toast } from "sonner";
import { CreateInformation } from "@/actions/information";
import { increment } from "@/lib/features/notifications/CounterSlice";
import { useDispatch } from "react-redux";

interface InformationCreateFormProps {
  eventId: string;
  information: number;
}

export default function InformationCreateForm(
  { eventId, information }: InformationCreateFormProps
) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (information === 2) {
      setDisabled(true);
    }
  }, [information]);


  const form = useForm<z.infer<typeof InformationSchema>>({
    resolver: zodResolver(InformationSchema),
    defaultValues: {
      full_name: "",
      mother: "",
      father: "",
      brothers: "",
      children: "",
      godparents: "",
      witnesses: "",
      nutrition: "",
      allergies: "",
      drinks: "",
    },
  });

  function onSubmit(values: z.infer<typeof InformationSchema>) {
    startTransition(() => {
      CreateInformation(eventId, values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset();
          setOpen(false);
          dispatch(increment(1));
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="h-8" size="sm" disabled={disabled}>
          New Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Use Tabs and Enter keys to navigate faster between fields.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name (required)"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Family
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mother"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Mother</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mother (optional)"
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
                name="father"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Father</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Father (optional)"
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
                name="brothers"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Brothers</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brothers (optional)"
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
                name="children"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Children</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Children (optional)"
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
                name="godparents"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Godparents</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Godparents (optional)"
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
                name="witnesses"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Witnesses</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Witnesses (optional)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Preferences
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nutrition"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nutrition</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nutrition (optional)"
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
                name="allergies"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Allergies (optional)"
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
                name="drinks"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Drinks</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Drinks (optional)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-4 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  className="h-8"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => form.reset()}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
