import fs from 'fs';

const uploadImage = (req) => {
    const base64Data = req.body.profileimage.split(',')[1]; // Extract base64 part
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFile(`uploads/${req.body.email}-profile.png`, buffer, (err) => {
        if (err) {
            console.error('Error saving image', err);
            return { error: 'Error saving image' };
        }
        return { message: 'Image saved successfully' };
    });
};

// Get user profile image by email
const getUserProfileImage =  (req) => {
    const { email } = req.body;
    return `http://localhost:5002/uploads/${email}-profile.png`;
};

export { uploadImage, getUserProfileImage };