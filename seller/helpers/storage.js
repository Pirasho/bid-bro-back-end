const multer = require('multer');

const diskStorage = multer.diskStorage(
    {

    });

const storage = multer({storage: diskStorage}).single();

module.exports = storage;