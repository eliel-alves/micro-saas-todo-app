import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string({
    message: "O nome é obrigatório.",
  }),
  email: z
    .string({
      message: "O email é obrigatório.",
    })
    .email({
      message: "O email inserido deve ser válido.",
    }),
});
