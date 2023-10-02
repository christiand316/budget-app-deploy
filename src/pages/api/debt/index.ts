import { DebtController } from "@lib/controllers/DebtController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await DebtController.GetDebt(req, res);
      break;
    case "POST":
      await DebtController.CreateDebt(req, res);
      break;
    case "DELETE":
      await DebtController.DeleteDebt(req, res);
      break;
    case "PATCH":
      await DebtController.UpdateDebt(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
