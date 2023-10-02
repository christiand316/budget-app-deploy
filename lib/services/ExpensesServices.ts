import { z } from "zod";
import prisma from "../../prisma";
import { ExpensesUpdateType, ExpensesCreateType } from "@lib/schemas/ExpensesSchemas";

export const ExpensesServices = {
  async GetAllExpenses() {
    const expenses = await prisma.monthlyExpense.findMany();
  },
  async GetExpensesById(id: string) {
    const expenses = await prisma.monthlyExpense.findFirst({
      where: {
        id: id,
      },
    });
    return expenses;
  },
  async CreateExpenses(expensesData: ExpensesCreateType) {
    try {
      const expenses = await prisma.monthlyExpense.create({
        data: {
          ...expensesData,
        },
      });
      return expenses;
    } catch (e) {
      throw e;
    }
  },
  async UpdateExpenses(id: string, expensesData: Partial<ExpensesUpdateType>) {
    try {
      const expenses = await prisma.monthlyExpense.update({
        where: {
          id: id,
        },
        data: {
          ...expensesData,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async DeleteExpenses(id: string) {
    try {
      const expenses = await prisma.monthlyExpense.delete({
        where: {
          id: id,
        },
      });
      return expenses;
    } catch (e) {
      throw e;
    }
  },
};
