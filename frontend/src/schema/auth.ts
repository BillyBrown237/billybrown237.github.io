import {z} from "zod";

export const normalLoginSchema = z.object({
  username:  z.string().min(2).max(50),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const tempTokenLoginSchema = z.object({
  tempToken: z.string().min(1, "Temporary token is required"),
});

export type NormalLoginType = z.infer<typeof normalLoginSchema>;
export type TempTokenLoginType = z.infer<typeof tempTokenLoginSchema>;