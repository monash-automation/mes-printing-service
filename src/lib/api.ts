import axios from 'axios';

export interface Printer {
  id: number;
  octo_url: string;
  octo_api_key: string;
  opcua_ns: number;
}

type PinterId = Pick<Printer, 'id'>;

export async function getPrinters(): Promise<Printer[]> {
  const resp = await axios.get<Printer[]>(
    'http://localhost:8000/api/v1/printers/',
  );
  return resp.data;
}

export async function addPrinter(
  printer: Omit<Printer, 'id'>,
): Promise<PinterId> {
  const resp = await axios.postForm<PinterId>(
    'http://localhost:8000/api/v1/printers',
    printer,
  );
  return resp.data;
}
