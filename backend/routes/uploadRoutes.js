import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Cấu hình lưu file upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Kiểm tra file ảnh
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Ảnh phải là file JPG/PNG!');
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// API upload ảnh
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

export default router;
