import multer from 'multer';

// Configure disk storage for multer
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Use original filename
    },
});

// Create multer storage instance
const storage = multer({ storage: diskStorage }).single('Image'); // Specify the field name for the uploaded file

export default storage;  // Export the storage instance
