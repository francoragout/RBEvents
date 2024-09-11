"use client";

import { Button } from "@/components/ui/button";
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
import { BudgetSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Textarea } from "../../../ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { UpdateBudget } from "@/actions/budget";
import { Pencil } from "lucide-react";

type Budget = z.infer<typeof BudgetSchema>;

export default function BudgetEditForm({ budget }: { budget: Budget }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof BudgetSchema>>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      category: budget.category,
      name: budget.name,
      description: budget.description,
      paid_method: budget.paid_method,
      total_price: budget.total_price || undefined,
      amount_paid: budget.amount_paid || undefined,
      observation: budget.observation,
    },
  });

  function onSubmit(values: z.infer<typeof BudgetSchema>) {
    startTransition(() => {
      UpdateBudget(budget.id ?? "", budget.eventId ?? "", values).then(
        (response) => {
          if (response.success) {
            toast.success(response.message);
            form.reset();
            setOpen(false);
          } else {
            toast.error(response.message);
          }
        }
      );
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex justify-start pl-2" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category (required)"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name (optional)"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description (optional)"
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
              name="paid_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Method</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paid method (optional)"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="total_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Total Price"
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
                name="amount_paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Paid</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount Paid"
                        type="number"
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
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observation (optional)"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
