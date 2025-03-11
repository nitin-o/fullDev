import multer from "multer";
import fs from "fs"


const uploadDir = "./public/temp";
    
    const storage = multer.diskStorage({
        
        destination: function (req, file, cb) {

        // ✅ Ensure upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {  
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});


export const body_form = multer()



export const upload = multer({ storage: storage });