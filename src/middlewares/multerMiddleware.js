const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var folder = new String();
        if (file.fieldname.includes("pitch")) {
            folder = path.join(__dirname, '../public/img/pitchs');
        } else {
            folder = path.join(__dirname, '../public/img/users');
        }
        cb(null, folder);
    },
    
    filename: (req, file, cb) => {
        var fileName = new String();
        let field = file.fieldname
        if (field.includes("pitch")) {
            fileName = Date.now() + '_pitch_' + (path.extname(file.originalname));
        } else {
            fileName = Date.now() + '_user_' + (path.extname(file.originalname));
        }
        cb(null, fileName);
    },
    
    fileFilter: (req, file, cb) => {
        console.log("El tipo de archivo es " + file.mimetype);
        let mimetypes = ["image/png", "image/jpg","image/jpeg", "image/gif"]
        if (mimetypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Formato de archivo invalido'));
        }
    }
})

const uploadFile = multer({ storage });

module.exports = uploadFile;

