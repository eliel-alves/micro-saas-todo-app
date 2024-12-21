"use server";

import { z } from "zod";
import { auth } from "@/services/auth";
import { updateProfileSchema } from "./schema";
import { prisma } from "@/services/database";

export const updateProfile = async (
  input: z.infer<typeof updateProfileSchema>
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized.",
      data: null,
    };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
    },
  });
};
