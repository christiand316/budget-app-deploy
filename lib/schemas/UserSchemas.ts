import { z } from "zod"

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string()
})

export const UserUpdateSchema = UserSchema.pick({
    name: true,
    email: true
})
export const UserCreateSchema = UserSchema.pick({
    name: true,
    email: true
})

export type UserUpdateType = z.infer<typeof UserUpdateSchema>
export type UserCreateType = z.infer<typeof UserCreateSchema>