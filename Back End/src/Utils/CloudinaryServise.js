import cloudinary from "cloudinary"
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_API_SECRET } from '../constants.js';


// Ensure Cloudinary is properly configured
cloudinary.v2.config({
cloud_name: CLOUD_NAME,
api_key: CLOUD_API_KEY,
api_secret: CLOUD_API_SECRET,
secure: true,
});


const uploadFile = async (localePath) => {
    const uploadResult = await cloudinary.uploader
        .upload(
            localePath, {
                public_id: 'shoes',
            }
        )
        .catch((error) => {
            console.log(error);
        });
        return uploadResult

    };

export { uploadFile };
