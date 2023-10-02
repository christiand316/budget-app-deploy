import { z } from "zod";

const BudgetSchema = z.object({
  id: z.string().uuid(),
  groupId: z.string().uuid(),
  budgetAmount: z.number().optional(),
});

export const BudgetUpdateSchema = BudgetSchema.pick({
  groupId: true,
  budgetAmount: true,
});

export const BudgetCreateSchema = BudgetSchema.pick({
  groupId: true,
});

export type BudgetUpdateType = z.infer<typeof BudgetUpdateSchema>;
export type BudgetCreateType = z.infer<typeof BudgetCreateSchema>;

//export type BudgetCreateType = z.infer<typeof BudgetSchema>

/**
 *     recurringTransactions: z.any(),
    oneTimeTransaction: z.any()
 * 
 *     recurringTransactions: true,
    oneTimeTransaction: true
 */
