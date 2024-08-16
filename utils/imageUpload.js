const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const [name, ext] = file.originalname.split('.');
        cb(null, `${name} -${Date.now()}.${ext}`);
    }
});

const limits = {
    fileSize: 5 * 1024 * 1024
};

const imageUpload = multer({ storage, limits });

module.exports = imageUpload;