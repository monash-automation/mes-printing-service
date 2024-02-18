import axios, { AxiosInstance } from 'axios';
import useSWR from 'swr';

export enum PrinterApi {
  Mock = 'Mock',
  OctoPrint = 'OctoPrint',
  Prusa = 'Prusa',
}

export interface Printer {
  id: number;
  url: string;
  api_key: string;
  opcua_name: string;
  api: PrinterApi;
  is_active: boolean;
}

export type PrinterId = Pick<Printer, 'id'>;
export type CreatePrinter = Pick<
  Printer,
  'url' | 'api_key' | 'opcua_name' | 'api'
>;

const _axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRINTER_SERVER_URL,
});

const getFetcher = (url: string) => _axios.get(url).then((resp) => resp.data);

async function createPrinter(accessToken: string, printer: CreatePrinter) {
  const resp = await _axios.postForm<PrinterId>('/api/v1/printers', printer, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data;
}

export function usePrinters() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/v1/printers',
    getFetcher,
  );

  return {
    printers: data,
    isLoading,
    error,
    createPrinter: async (token: string, printer: CreatePrinter) =>
      await mutate(createPrinter(token, printer)),
  };
}
