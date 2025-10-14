declare module 'multer' {
  import { RequestHandler } from 'express';
  interface DiskStorageOptions {
    destination?: any;
    filename?: any;
  }
  export interface StorageEngine {}
  export function diskStorage(options?: DiskStorageOptions): StorageEngine;
  interface MulterOptions {
    storage?: StorageEngine;
  }
  interface Multer {
    single(fieldname: string): RequestHandler;
    array(fieldname: string, maxCount?: number): RequestHandler;
  }
  function multer(options?: MulterOptions): Multer;
  export default multer;
}