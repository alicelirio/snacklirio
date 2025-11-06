import multer, { diskStorage } from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = diskStorage({
  destination: (req: any, file: Express.Multer.File, cb: (err: any, destination: string) => void) => {
    cb(null, uploadsPath);
  },
  filename: (req: any, file: Express.Multer.File, cb: (err: any, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({ storage });
