const express = require('express');
const { createAlbum, getAlbums, deleteAlbum } = require('../controllers/albumController');

const router = express.Router();

router.post('/', createAlbum);
router.get('/', getAlbums);
router.delete('/:id', deleteAlbum);

module.exports = router;
