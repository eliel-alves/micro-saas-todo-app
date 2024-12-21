"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import Logo from "@/components/logo";

const AuthForm = () => {
  const form = useForm();
  const { toast } = useToast();

  const [email, setEmail] = useState("");

  const handleSignIn = form.handleSubmit(async (data) => {
    try {
      await signIn("nodemailer", { email: data.email, redirect: false });

      toast({
        title: "Magic Link Sent",
        description: "Check your email for the magic link to login",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again. " + error,
      });
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center flex flex-col items-center content-center">
          <Logo />
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-xl font-semibold">Login</h1>
                <p className="text-sm text-muted-foreground">
                  Digite seu e-mail no campo abaixo para receber o link mágico.
                </p>
              </div>
              <Input
                {...form.register("email")}
                type="email"
                placeholder="Seu endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle size={20} className="animate-spin" />
              )}
              {form.formState.isSubmitting
                ? "Enviando..."
                : "Enviar Link Mágico"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;
