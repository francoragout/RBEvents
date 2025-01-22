"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EventSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizations, types } from "@/lib/data";
import { es } from "date-fns/locale";

type Event = z.infer<typeof EventSchema>;
export default function Overview({ event }: { event: Event }) {
  const date = new Date(event.date);
  date.setHours(date.getHours() + 3);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const confirmedGuests = event.guest?.filter(
    (guest) => guest.invitation !== "TO_BE_CONFIRMED"
  ).length;


  // sumar todos los presupuestos de un evento 

  const budget = event.budget?.reduce((acc, budget) => {
    return acc + budget.total_price;
  }
  , 0);

  console.log(budget);

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: event.name,
      type: event.type,
      date: date,
      time: event.time,
      providerId: event.providerId,
      organization: event.organization,
      email: event.email,
    },
  });

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
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
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={
                        types.find((type) => type.value === field.value)?.label
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={format(new Date(field.value), "eee, dd MMM yyyy", {
                        locale: es,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hora</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Organización</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={
                        organizations.find((org) => org.value === field.value)
                          ?.label
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="providerId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Salón</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={event.provider?.name || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={event.email || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Días Restantes</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={diffDays} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guest"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invitados</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={confirmedGuests} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Presupuesto</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly value={budget} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
