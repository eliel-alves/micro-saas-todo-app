"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "../types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { upsertTodo } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTodoSchema } from "../schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface TodoUpsertSheetProps {
  children?: React.ReactNode;
  defaultValue?: Todo;
}

export const TodoUpsertSheet = ({ children }: TodoUpsertSheetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(upsertTodoSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data);
    router.refresh();
    ref.current?.click();
    toast({
      title: "Tarefa criada",
      description: "Sua tarefa foi criada com sucesso.",
    });
    form.reset();
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col h-full space-y-8">
            <div className="space-y-8">
              <SheetHeader>
                <SheetTitle>{`Criar nova tarefa`}</SheetTitle>
                <SheetDescription>
                  Adicione ou edite as informações da sua tarefa. Clique em
                  salvar assim que terminar.
                </SheetDescription>
              </SheetHeader>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o título da sua tarefa"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Este será o nome exibido publicamente para a tarefa.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <Button className="w-full" type="submit">
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
