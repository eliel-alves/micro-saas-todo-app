"use server";

import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import {
  createCheckoutSession,
  createSubscriptionCancelSession,
} from "@/services/stripe";

export async function createCheckoutSessionAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const checkoutSession = await createCheckoutSession(
    session.user.email as string,
    session.user.stripeSubscriptionId as string
  );

  if (!checkoutSession.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(checkoutSession.url);
}

export async function createSubscriptionCancelSessionAction(
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const checkoutSession = await createSubscriptionCancelSession(
    session.user.email as string,
    session.user.stripeSubscriptionId as string
  );

  if (!checkoutSession.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(checkoutSession.url);
}
