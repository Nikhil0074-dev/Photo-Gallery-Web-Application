const Photo = require('../models/Photo');
const { protect } = require('../middleware/authMiddleware');

const uploadPhoto = [protect, async (req, res) => {
  try {
    const { title, description, albumId } = req.body;
    const imagePath = req.file.path.replace(/\\/g, '/'); // Normalize path

    const photo = await Photo.create({
      title,
      description,
      imagePath,
      userId: req.user._id,
      albumId: albumId || null
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

const getPhotos = [protect, async (req, res) => {
  try {
    const { search, album } = req.query;
    let query = { userId: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (album) {
      query.albumId = album;
    }

    const photos = await Photo.find(query).populate('albumId', 'name').sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

const deletePhoto = [protect, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo || photo.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Todo: delete file from FS
    await photo.remove();
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

module.exports = {
  uploadPhoto,
  getPhotos,
  deletePhoto
};
