import multer from "multer";
import path from 'path';
import __dirname from "../dirname.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/images/products');
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split('.')[0].replace(/\s+/g, '-');
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${name}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no permitido'), false);
  }
};

export const multerUploaderMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

