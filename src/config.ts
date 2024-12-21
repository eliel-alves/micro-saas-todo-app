export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: "price_1QYDZxARoC6Zn4iGR8SY8VdS",
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: "price_1QYDa5ARoC6Zn4iGXlT5GcVX",
        quota: {
          TASKS: 100,
        },
      },
    },
  },
};
