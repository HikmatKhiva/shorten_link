import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(5).max(70),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});
