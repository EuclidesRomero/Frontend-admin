/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    // otras variables de entorno que estés utilizando
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  