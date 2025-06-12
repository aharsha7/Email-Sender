const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { sendMail } = require('../controllers/mailController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/send', upload.single('attachment'), sendMail);

module.exports = router;
