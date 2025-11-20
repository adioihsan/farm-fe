import { z } from 'zod'

export const registerFormSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword:z.string().min(6),
})
export type RegisterForm = z.infer<typeof registerFormSchema>

export const loginFormSchema = z.object({
  email:z.string().email().min(1),
  password:z.string().min(1)
})
export type LoginForm = z.infer<typeof loginFormSchema>
