const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "-" + Date.now());
  },
  onFileUploadStart:  (file) => {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: (file) => {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
});
const upload = multer({storage: storage});

import * as images from '../controller/upload';

router.post('/images', upload.single('image'), images.upload);
router.get('/images', images.renderUpload);

export {router};