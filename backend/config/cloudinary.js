import cloudinaryModule from 'cloudinary';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinaryStorage = require('multer-storage-cloudinary');
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary: cloudinaryModule,
  folder: 'tognon_portfolio_v2',
  allowedFormats: ['jpg', 'png', 'webp', 'jpeg'],
  transformation: [{ width: 1000, height: 600, crop: 'limit' }],
});

export const upload = multer({ storage: storage });
export default cloudinary;
