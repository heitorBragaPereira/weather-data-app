import { z } from "zod";

export const formNetwork = z.object({
  network: z
    .string({ message: "Campo obrigatório" })
    .min(6, "O campo deve ter no mínimo 6 caracteres"),
  password: z
    .string({ message: "Campo obrigatório" })
    .min(6, "O campo deve ter no mínimo 6 caracteres"),
});

export type FormNetwork = z.infer<typeof formNetwork>;
