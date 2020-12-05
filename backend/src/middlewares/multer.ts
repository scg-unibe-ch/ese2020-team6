const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req: Request, file: any, cb: any) {

        cb(null, 'assets');
    },
    filename: function(req: Request, file: any, cb: any) {
        cb(null, new Date().toISOString().replace(/:/, '-') + file.fieldname);
    }
});
const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpeg') {
            cb(null, true);
    } else {
        cb(null, false);
    }
};
export const savePicture = multer({
    storage: storage,
    fileFilter: fileFilter
});
