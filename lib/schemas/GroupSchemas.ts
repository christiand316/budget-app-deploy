import { group } from "console"
import { z } from "zod"

const GroupSchema = z.object({
    id: z.string().uuid(),
    ownerId: z.string().uuid(), //get current user for owner id
    name: z.string()
})

export const GroupUpdateSchema = GroupSchema.pick({
    ownerId: true,
    name: true
})
export const GroupCreateSchema = GroupSchema.pick({
    ownerId: true,
    name: true
})
export const GroupDeleteSchema = GroupSchema.pick({
    id: true,
    ownerId: true
})

export type GroupUpdateType = z.infer<typeof GroupUpdateSchema>
export type GroupCreateType = z.infer<typeof GroupCreateSchema>
export type GroupDeleteType = z.infer<typeof GroupDeleteSchema>