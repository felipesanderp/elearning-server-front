import * as z from "zod"

export const mePatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).max(250).optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  imageKey: z.string().optional()
})

export const userPatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(3).max(250).optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT']).optional(),
})

export const createUserSchema = z.object({
  name: z.string().min(3).max(250),
  email: z.string().email().optional(),
  password: z.string().min(8).max(50).optional(),
  role: z.enum(['ADMIN', 'PROFESSOR', 'STUDENT']).optional(),
})

export const userAlterPassword = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Senhas não conferem!'
})