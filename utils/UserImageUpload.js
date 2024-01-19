const multer = require('multer');
const path = require('path');


const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/UserImages'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const upload1 = multer({ storage: storage1 }).fields([{ name: 'ProfileImage', maxCount: 1 }]);


module.exports = upload1;
