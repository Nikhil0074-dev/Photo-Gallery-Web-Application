const Album = require('../models/Album');
const { protect } = require('../middleware/authMiddleware');

const createAlbum = [protect, async (req, res) => {
  try {
    const { name } = req.body;

    const album = await Album.create({
      name,
      userId: req.user._id
    });

    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

const getAlbums = [protect, async (req, res) => {
  try {
    const albums = await Album.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

const deleteAlbum = [protect, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album || album.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Album not found' });
    }

    await album.remove();
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

module.exports = {
  createAlbum,
  getAlbums,
  deleteAlbum
};
