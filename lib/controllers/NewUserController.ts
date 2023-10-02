import prisma from "@p/prisma";
import { ZodError, z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export const NewUserController = {
    async StageNewUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    }
}