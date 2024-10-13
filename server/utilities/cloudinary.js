import { cloudinaryInstance } from "../config/cloudinaryConfig.js"

export const handleImageUpload = async(path,next) =>{
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path);
        return uploadResult.url;
        
    } catch (error) {
        console.log(error);
        
        next(error);
    }
}