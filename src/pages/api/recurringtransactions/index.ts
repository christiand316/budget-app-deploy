import { ExpensesController } from "@lib/controllers/ExpensesController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await ExpensesController.GetExpenses(req, res);
      break;
    case "POST":
      await ExpensesController.CreateExpenses(req, res);
      break;
    case "DELETE":
      await ExpensesController.DeleteExpenses(req, res);
      break;
    case "PATCH":
      await ExpensesController.UpdateExpenses(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
