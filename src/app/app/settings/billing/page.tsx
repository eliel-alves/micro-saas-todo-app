import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createCheckoutSessionAction } from "./actions";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";

const BillingSettingsPage = async () => {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);

  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Uso do plano</CardTitle>
          <CardDescription>
            Você está atualmente no plano{" "}
            <span className="font-bold uppercase text-primary">
              {plan.name}
            </span>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="flex text-sm">
                <span className="font-bold">{plan.quota.TASKS.current}</span>
                <span className="text-muted-foreground">
                  /{plan.quota.TASKS.available}
                </span>
              </div>
              <span className="text-sm font-bold">
                {plan.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-6">
          <span className="text-muted-foreground text-sm">
            Para um maior limite, assine o plano PRO
          </span>
          <Button type="submit">Assine por R$9/mês</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BillingSettingsPage;
