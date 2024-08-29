import { BudgetColumns } from "@/components/admin/events/budgets/budget-columns";
import { BudgetTable } from "@/components/admin/events/budgets/budget-table";
import { db } from "@/lib/db";
import { BudgetSchema } from "@/lib/validations";
import { z } from "zod";

type Budget = z.infer<typeof BudgetSchema>;

async function getData(eventId: string): Promise<Budget[]> {
  const budgets = await db.budget.findMany({
    where: {
      eventId: eventId,
    },
  });

  return budgets.map((budget) => BudgetSchema.parse(budget));
}

export default async function BudgetsPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;
  const budgets = await getData(eventId);
  return (
    <div className="h-full flex-col">
      <BudgetTable data={budgets} columns={BudgetColumns} eventId={eventId} />
    </div>
  );
}
