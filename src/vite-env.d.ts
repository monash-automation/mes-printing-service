/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PRINTER_SERVER_URL: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
