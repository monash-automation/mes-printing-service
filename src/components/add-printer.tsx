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
import { addPrinter } from '@/lib/api.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  octo_url: z.string().url(),
  octo_api_key: z.string().min(4).max(36),
  opcua_ns: z.coerce.number().gt(0).lte(9999),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
  addPrinter(values).then((id) => {
    console.log(id);
  });
}

export function AddPrinterButton() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      octo_url: 'http://localhost:5000',
      octo_api_key: '79ED0684040E4B96A34C3ABF4EA0A96A',
      opcua_ns: 42,
    },
  });

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
              name="octo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OctoPrint Server URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="http://localhost:5000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL of the OctoPrint server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="octo_api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OctoPrint API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="79ED0684040E4B96A34C3ABF4EA0A96A"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    API key of the OctoPrint server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="opcua_ns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OPC UA Object Namespace</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="42" {...field} />
                  </FormControl>
                  <FormDescription>
                    Namespace index of the corresponding printer object.
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
