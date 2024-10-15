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
import { TaskSchema } from "@/lib/validations";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { cn } from "@/lib/utils";
import { CreateTask } from "@/actions/task";
import { toast } from "sonner";
import { statuses } from "@/lib/data";
import { Input } from "@/components/ui/input";

export default function TaskCreateForm({ eventId }: { eventId: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      status: "BACKLOG",
    },
  });

  function onSubmit(values: z.infer<typeof TaskSchema>) {
    startTransition(() => {
      CreateTask(eventId, values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset();
          setOpen(false);
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="h-8" size="sm">
          Nueva Tarea
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Tarea</DialogTitle>
          <DialogDescription>
            Utilice Tabs para navegar más rápido entre los campos.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título (requerido)"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Estado (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
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
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Prioridad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Priority (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Baja</SelectItem>
                      <SelectItem value="MEDIUM">Media</SelectItem>
                      <SelectItem value="HIGH">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Etiqueta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Label (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ANA">Ana</SelectItem>
                      <SelectItem value="BELEN">Belen</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
