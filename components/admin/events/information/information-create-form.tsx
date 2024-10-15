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

export default function InformationCreateForm({
  eventId,
  information,
}: InformationCreateFormProps) {
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
          Nueva Información
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Información</DialogTitle>
          <DialogDescription>
            Utilice Tabs para navegar más rápido entre los campos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Pareja
            </h4>

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre Completo (requerido)"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Nombres Familia y Amigos
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mother"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Madre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Madre (opcional)"
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
                    <FormLabel>Padre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Padre (opcional)"
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
                    <FormLabel>Hermanos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hermanos (opcional)"
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
                    <FormLabel>Hijos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hijos (opcional)"
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
                    <FormLabel>Padrinos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Padrinos (opcional)"
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
                    <FormLabel>Testigos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Testigos (opcional)"
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
              Preferencias
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nutrition"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nutrición</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nutrición (opcional)"
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
                    <FormLabel>Alergias</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alergias (opcional)"
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
                    <FormLabel>Bebida alcohólica</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bebida alcohólica (opcional)"
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
