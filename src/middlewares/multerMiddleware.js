const path = require("path");
const multer = require("multer");

const uploadUserImages = path.join(__dirname.replace("\src", ""),"../public/assets/images/avatars/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadUserImages);
  },

  filename: (req, file, cb) => {
    let filename = "image" + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;
