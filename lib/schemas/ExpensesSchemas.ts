import { z } from "zod";

const ExpensesSchema = z.object({
  id: z.string().uuid(),
  
  budgetId: z.string().uuid(),
  description: z.string(),
  amount: z.number(),
});

export const ExpensesUpdateSchema = ExpensesSchema.pick({
  budgetId: true,
  description: true,
  amount: true
});
export const ExpensesCreateSchema = ExpensesSchema.pick({
  budgetId: true,
  description: true,
  amount: true
});

export type ExpensesUpdateType = z.infer<typeof ExpensesUpdateSchema>;
export type ExpensesCreateType = z.infer<typeof ExpensesCreateSchema>;
