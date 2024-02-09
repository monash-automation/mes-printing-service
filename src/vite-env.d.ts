/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PRINTER_SERVER_URL: string;
  readonly VITE_AUTH0_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
