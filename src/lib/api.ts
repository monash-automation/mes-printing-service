import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

type PrinterId = Pick<Printer, 'id'>;


export class PrinterServerApi{

  accessToken: string | undefined;
  _axios: AxiosInstance;

  constructor(accessToken?: string){
    this.accessToken = accessToken;
    let headers = {};
    if (accessToken){
      headers = {
        Authorization: `Bearer ${accessToken}`,   
      };
    }

    this._axios = axios.create({
      baseURL: import.meta.env.VITE_PRINTER_SERVER_URL,
      headers: headers,
      
    });

  }

  async getPrinters():Promise<Printer[]>{
    const resp: AxiosResponse<Printer[], any> = await this._axios.get<Printer[]>("/api/v1/printers");
    return resp.data;
  }

  async addPrinter(printer: Omit<Printer, "id">): Promise<PrinterId>{
    const resp = await this._axios.postForm<PrinterId>(
      "/api/v1/printers",
      printer,
    );
    return resp.data;
  }
}

