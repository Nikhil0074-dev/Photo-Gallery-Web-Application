const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadPhoto, getPhotos, deletePhoto } = require('../controllers/photoController');

const router = express.Router();

router.post('/upload', upload.single('image'), uploadPhoto);
router.get('/', getPhotos);
router.delete('/:id', deletePhoto);

module.exports = router;
