import axios, { AxiosInstance } from 'axios';

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
}

type PinterId = Pick<Printer, 'id'>;

export class PrinterServer {
  private _axios: AxiosInstance;
  constructor(accessToken: string | undefined = undefined) {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};
    this._axios = axios.create({
      baseURL: import.meta.env.VITE_PRINTER_SERVER_URL,
      headers: headers,
    });
  }

  async getPrinters(): Promise<Printer[]> {
    const resp = await this._axios.get<Printer[]>('/api/v1/printers');
    return resp.data;
  }

  async addPrinter(printer: Omit<Printer, 'id'>): Promise<PinterId> {
    const resp = await this._axios.postForm<PinterId>(
      '/api/v1/printers',
      printer,
    );
    return resp.data;
  }
}
