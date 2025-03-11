import {v2 as cloudinary} from "cloudinary"
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_API_SECRET } from '../constants.js';
import fs from "fs"


// Ensure Cloudinary is properly configured
cloudinary.config({
cloud_name: CLOUD_NAME,
api_key: CLOUD_API_KEY,
api_secret: CLOUD_API_SECRET,
secure: true,
});


const uploadFile = async (localePath) => {
    // const uploadResult = await cloudinary.uploader
    //     .upload(
    //         localePath, {
    //             public_id: 'shoes',
    //         }
    //     )
    //     .catch((error) => {
    //         console.log(error);
    //     });
    //     return uploadResult

    try {    
        if (!localePath) return null;

        const uploadResult = await cloudinary.uploader.upload(localePath,{
            resource_type :"auto"
        })
        console.log(uploadFile);
        
       fs.unlinkSync(localePath)
        
        return uploadResult
        

        
        
    } catch (error) {
        return localePath

    }


    };

export { uploadFile };
