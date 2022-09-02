const path = require("path");
const multer = require("multer");

// const uploadProductImages = path.join(__dirname, "../public/assets/images/uploads/");
const uploadProductImages = path.join(__dirname.replace("\src", ""), "../public/assets/images/uploads/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadProductImages)
  },
  filename: function (req, file, cb) {
    cb(null, "image" + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });

module.exports = upload;
