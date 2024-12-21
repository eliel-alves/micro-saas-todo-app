"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Circle,
  CircleCheck,
  Clipboard,
  Loader,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Todo } from "../types";
import { useRouter } from "next/navigation";
import { deleteTodo, upsertTodo } from "../actions";
import { cn } from "@/lib/utils";
import DeleteDialogButton from "./delete-dialog-button";

const statusOptions = {
  done: "Concluído",
  waiting: "Em Aberto",
};

interface TodoDataTableProps {
  data: Todo[];
}

export function TodoDataTable({ data }: TodoDataTableProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteTodo = async (todo: Todo) => {
    await deleteTodo({ id: todo.id });
    router.refresh();

    toast({
      title: "Tarefa excluída",
      description: "Sua tarefa foi excluída com sucesso",
    });
  };

  const handleToggleDone = async (todo: Todo) => {
    const doneAt = todo.doneAt ? null : new Date().toISOString();

    await upsertTodo({ id: todo.id, doneAt });
    router.refresh();

    toast({
      title: "Tarefa atualizada",
      description: "Sua tarefa foi atualizada com sucesso",
    });
  };

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { doneAt } = row.original;
        const status: "done" | "waiting" = doneAt ? "done" : "waiting";
        const variant: "outline" | "default" = doneAt ? "outline" : "default";
        const classname = doneAt
          ? "bg-green-500 text-white border-green-500/30"
          : "bg-zinc-950 text-white border-zinc-950";

        return (
          <Badge
            className={cn([
              "flex-none gap-1 items-center justify-center",
              classname,
            ])}
            variant={variant}
          >
            {doneAt ? <CircleCheck size={12} /> : <Loader size={12} />}
            {statusOptions[status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Título
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <div className="text-right">Criado</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.original.createdAt.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original;
        const { toast } = useToast();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(todo.id);
                  toast({
                    title: "ID copiado!",
                    description:
                      "O ID da tarefa selecionada foi copiado para sua área de transferência.",
                  });
                }}
              >
                <Clipboard />
                Copiar ID da tarefa
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleDone(todo)}>
                {todo.doneAt ? (
                  <>
                    <Circle />
                    Colocar em aberto
                  </>
                ) : (
                  <>
                    <CircleCheck />
                    Concluir tarefa
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTodo(todo)}>
                <Trash2 />
                Excluir tarefa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div> */}
        <div className="flex-1 text-sm text-muted-foreground">
          Total: {table.getFilteredRowModel().rows.length} tarefas
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
