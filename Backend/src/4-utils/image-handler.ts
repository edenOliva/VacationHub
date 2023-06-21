import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import path from "path";

const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

// Get image path
function getImagePath(imageName: string): string {

    return imagesFolder + "/" + imageName;
}

// Save image and return image name
async function saveImage(image: UploadedFile): Promise<string> {

    // Take original extension
    const extension = image.name.substring(image.name.lastIndexOf("."));

    // Create unique name
    const uniqueName = uuid() + extension;

    // Get absolute path
    const absolutePath = getImagePath(uniqueName);

    // Save image
    await image.mv(absolutePath); // Move image to that location.

    return uniqueName;
}

async function updateImage(image: UploadedFile, existingName: string): Promise<string> {

    // Delete old image
    await deleteImage(existingName);

    // Save new image
    const uniqueName = await saveImage(image);

    // Return unique name
    return uniqueName;
}

// Delete image
async function deleteImage(imageName: string): Promise<void> {

    try {

        // Get absolute path
        const absolutePath = getImagePath(imageName);

        // Delete image
        await fsPromises.unlink(absolutePath);
    }
    catch (err: any) {
        console.error(err.message);
    }

}

export default {
    getImagePath,
    saveImage,
    updateImage,
    deleteImage
}