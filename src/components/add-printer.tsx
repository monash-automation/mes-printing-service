import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PrinterApi, createPrinter } from '@/lib/api.ts';
import { useUserStore } from '@/lib/states.ts';
import { useAuth0 } from '@auth0/auth0-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import * as z from 'zod';

const formSchema = z.object({
  url: z.string().url(),
  api: z.nativeEnum(PrinterApi),
  api_key: z.string().min(4).max(36),
  opcua_name: z.string().min(1),
});

export function AddPrinterButton() {
  const { loginWithRedirect } = useAuth0();
  const { mutate } = useSWRConfig();
  const token = useUserStore((state) => state.accessToken);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'http://localhost:5000',
      api_key: '79ED0684040E4B96A34C3ABF4EA0A96A',
      api: PrinterApi.Prusa,
      opcua_name: 'Printer1',
    },
  });

  if (!token) {
    return (
      <Button variant="outline" onClick={() => loginWithRedirect()}>
        Add Printer
      </Button>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPrinter(token!, values).then(() => mutate('/api/v1/printers'));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Printer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add Printer</DialogTitle>
          <DialogDescription>
            Let the printer server manage the new printer. Please make sure a
            printer object for the new printer has been created in the OPC UA
            server.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="api"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Printer Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PrinterApi.Prusa}>Prusa</SelectItem>
                      <SelectItem value={PrinterApi.OctoPrint}>
                        OctoPrint
                      </SelectItem>
                      <SelectItem value={PrinterApi.Mock}>Mock</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Type of the printer.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Printer URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="http://localhost:5000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>URL of the Printer server.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="79ED0684040E4B96A34C3ABF4EA0A96A"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    API key is required to call Printer APIs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="opcua_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OPC UA Object Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Printer1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name of the corresponding OPC UA printer object.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
