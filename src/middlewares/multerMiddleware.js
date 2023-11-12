const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var folder = new String();
        if (file.fieldname.includes("product-img")) {
            folder = path.join(__dirname, '../public/images/products');
        } else {
            folder = path.join(__dirname, '../public/images/users');
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
      }
    });
    
    const fileFilter = (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        cb(null, true);
      } else {
        cb(new Error('Solo se admiten imágenes JPEG o PNG'), false);
      }
    };

const uploadFile = multer({ storage });

module.exports = uploadFile;

