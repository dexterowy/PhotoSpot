import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { config } from 'src/config/config.dev';
import { v4 as uuid } from 'uuid';

export const allowedImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const imageStorageHelper: MulterModuleOptions = {
  storage: diskStorage({
    destination: `${config.filesPath}/temp`,
    filename: async (req, file, cb) => {
      // console.log(file);
      const fileExt = extname(file.originalname);
      if (fileExt) {
        cb(null, `${uuid()}${fileExt}`);
      } else {
        cb(new Error('Wrong file type'), null);
      }
    },
  }),
  fileFilter: async (req, file, cb) => {
    const allowedMimeTypes = allowedImageMimeTypes;
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('Mimetype not match');
      cb(new Error('Mimetype not match'), null);
    }
  },
};
