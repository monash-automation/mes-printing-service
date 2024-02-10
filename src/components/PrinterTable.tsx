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
import { Printer, PrinterServerApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

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
    header: 'OPC UA Object Namespace',
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
              onClick={() =>
                navigator.clipboard.writeText(printer.id.toString())
              }
            >
              Copy Printer Id
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
  const { getAccessTokenSilently } = useAuth0();

  const { data } = useQuery({
    queryKey: ['printers'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const printerApi = new PrinterServerApi(accessToken);
      return printerApi.getPrinters();
    },
    refetchInterval: 3000,
  });
  return (
    <div className="container mx-auto ">
      <div className="flex justify-end">
        <AddPrinterButton />
      </div>
      {data && (
        <div className="py-8">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
