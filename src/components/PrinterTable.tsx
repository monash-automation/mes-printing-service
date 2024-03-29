import { AddPrinterButton } from '@/components/add-printer.tsx';
import { DataTable } from '@/components/data-table.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Printer, usePrinters } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<Printer>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'url',
    header: 'Printer URL',
  },
  {
    accessorKey: 'api',
    header: 'Printer API',
  },
  {
    accessorKey: 'opcua_name',
    header: 'OPC UA Object Name',
  },
  {
    accessorKey: 'is_active',
    header: 'Worker Working',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const printer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(printer.api_key)}
            >
              Copy Api Key
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PrinterTable() {
  const { printers, error, isLoading } = usePrinters();

  if (isLoading) {
    return <Skeleton className="container mx-auto" />;
  } else if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end">
        <AddPrinterButton />
      </div>
      {printers && (
        <div className="py-8">
          <DataTable columns={columns} data={printers} />
        </div>
      )}
    </div>
  );
}
