const multer = require('multer');
const path = require('path');


const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/Event_Images'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const upload3 = multer({ storage: storage3 }).fields([{ name: 'EventPhoto', maxCount: 1 }]);


module.exports = upload3;
