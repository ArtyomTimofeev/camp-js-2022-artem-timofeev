/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

/**
 * This interface discribes types for the env variables.
 */
interface ImportMetaEnv {

  /** Api key for the firebase. */
  readonly VITE_API_KEY: string;

  /** Auth domain for the firebase. */
  readonly VITE_AUTH_DOMAIN: string;

  /** Firebase project id. */
  readonly VITE_PROJECT_ID: string;

  /** Firebase storage bucket. */
  readonly VITE_STORAGE_BUCKET: string;

  /** Firebase messanging sender id. */
  readonly VITE_MESSANGING_SENDER_ID: string;

  /** Firebase app id. */
  readonly VITE_APP_ID: string;
}

/**
 * The type of import.meta.
 */
interface ImportMeta {

  /** Environment. */
  readonly env: ImportMetaEnv;
}
