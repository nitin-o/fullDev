import { v2 as cloudinary } from 'cloudinary';
import path from "path";
import crypto from "crypto";
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_API_SECRET } from '../constants.js';

// Ensure Cloudinary is properly configured
cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET,
});

const uploadResult = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("No file path provided");
        }

        const absolutePath = path.resolve(filePath); // Convert to absolute path
        console.log("Uploading file:", absolutePath);

        // Generate timestamp and signature
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = crypto.createHash("sha256")
            .update(`timestamp=${timestamp}${CLOUD_API_SECRET}`)
            .digest("hex");

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type: "auto",
            timestamp: timestamp,
            api_key: CLOUD_API_KEY,
            signature: signature,
        });

        console.log("Upload successful:", response.secure_url);
        return response;
        
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message);
        return { error: error.message };
    }
};

export { uploadResult };
