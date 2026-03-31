// Gallery logic

const photosContainer = document.getElementById('photosContainer');
const searchInput = document.getElementById('searchInput');
const albumFilter = document.getElementById('albumFilter');

let allPhotos = [];
let allAlbums = [];

const loadPhotos = async () => {
  if (!window.app.currentToken) return;
  
  try {
    const photos = await window.app.apiFetch('/photos');
    allPhotos = photos;
    renderPhotos(photos);
  } catch (error) {
    console.error('Load photos error:', error);
  }
};

const loadAlbums = async () => {
  if (!window.app.currentToken) return;
  
  try {
    const albums = await window.app.apiFetch('/albums');
    allAlbums = albums;
    populateAlbumFilter(albums);
  } catch (error) {
    console.error('Load albums error:', error);
  }
};

const renderPhotos = (photos) => {
  photosContainer.innerHTML = photos.length ? '' : '<div class="no-photos">No photos match your search.</div>';
  
  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="/uploads/${photo.imagePath.split('/').pop()}" alt="${photo.title}" class="gallery-image" onclick="openModal('${photo.imagePath}', '${photo.title}', '${photo.description || ''}')">
      <div class="card-body">
        <h3 class="card-title">${photo.title}</h3>
        <p class="card-text">${photo.description || ''}</p>
        <div class="photo-actions">
          <button class="delete-btn" onclick="deletePhoto('${photo._id}')">Delete</button>
        </div>
      </div>
    `;
    photosContainer.appendChild(card);
  });
};

const populateAlbumFilter = (albums) => {
  albumFilter.innerHTML = '<option value="">All Albums</option>';
  albums.forEach(album => {
    const option = document.createElement('option');
    option.value = album._id;
    option.textContent = album.name;
    albumFilter.appendChild(option);
  });
};

const filterPhotos = () => {
  const search = searchInput.value.toLowerCase();
  const album = albumFilter.value;
  
  const filtered = allPhotos.filter(photo => {
    const matchesSearch = !search || photo.title.toLowerCase().includes(search);
    const matchesAlbum = !album || photo.albumId?._id === album;
    return matchesSearch && matchesAlbum;
  });
  
  renderPhotos(filtered);
};

const openModal = (imagePath, title, description) => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalBody = document.getElementById('modalBody');
  
  modalImage.src = `/uploads/${imagePath.split('/').pop()}`;
  modalImage.alt = title;
  modalBody.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;
  
  modal.style.display = 'block';
};

const closeModal = () => {
  document.getElementById('imageModal').style.display = 'none';
};

const deletePhoto = async (id) => {
  if (!confirm('Are you sure you want to delete this photo?')) return;
  
  try {
    await window.app.apiFetch(`/photos/${id}`, { method: 'DELETE' });
    loadPhotos();
  } catch (error) {
    alert('Delete failed');
  }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadAlbums();
  loadPhotos();
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });
});
