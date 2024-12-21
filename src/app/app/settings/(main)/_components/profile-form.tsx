"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import { updateProfileSchema } from "../schema";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileFormProps {
  defaultValues: Session["user"];
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data);

    router.refresh();

    toast({
      title: "Perfil atualizado",
      description: "Seus dados de perfil foram atualizados com sucesso.",
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col h-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Seu nome</CardTitle>
            <CardDescription>
              Este será o nome exibido na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o seu nome completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seu e-mail</CardTitle>
            <CardDescription>
              Por favor entre em contato com o e-mail do administrador para
              alterar o endereço de e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="Digite o seu endereço de e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button
          disabled={form.formState.isSubmitting}
          className="self-end"
          type="submit"
        >
          {form.formState.isSubmitting ? "Salvando..." : "Salvar configurações"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
