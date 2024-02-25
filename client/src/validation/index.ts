// Validations
import { z } from "zod"
// Link
export const linkSchema = z.object({
    url: z.string().url()
})
// Login
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50)
})
// Register
export const registerSchema = z.object({
    name: z.string().min(5).max(90),
    email: z.string().email(),
    password: z.string().min(6).max(50)
})
// Update
export const updateSchema = z.object({
    name: z.string().min(5).max(90),
})