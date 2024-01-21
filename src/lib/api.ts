import axios from 'axios';

type PrinterApi = 'Mock' | 'OctoPrint' | 'Prusa';

export interface Printer {
  id: number;
  url: string;
  api_key: string;
  opcua_ns: number;
  api: PrinterApi;
}

type PinterId = Pick<Printer, 'id'>;

const instance = axios.create({
  baseURL: import.meta.env.VITE_PRINTER_SERVER_URL,
});

export async function getPrinters(): Promise<Printer[]> {
  const resp = await instance.get<Printer[]>('/api/v1/printers');
  return resp.data;
}

export async function addPrinter(
  printer: Omit<Printer, 'id'>,
): Promise<PinterId> {
  const resp = await axios.postForm<PinterId>('/api/v1/printers', printer);
  return resp.data;
}
