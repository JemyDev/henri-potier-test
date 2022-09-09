/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_API: string;
    // plus de variables d'environnement...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }