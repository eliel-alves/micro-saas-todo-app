import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRef } from "react";
import { Todo } from "../types";

interface DeleteDialogButtonProps {
  children?: React.ReactNode;
  handleDeleteTodo: (todo: Todo) => void;
  todo: Todo;
}

const DeleteDialogButton = ({
  children,
  todo,
  handleDeleteTodo,
}: DeleteDialogButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex gap-2 items-center" ref={ref}>
          {children}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir a tarefa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTodo(todo)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialogButton;
