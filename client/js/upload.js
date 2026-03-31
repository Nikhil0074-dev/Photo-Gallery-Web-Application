// Upload logic

document.addEventListener('DOMContentLoaded', async () => {
  if (!window.app.currentToken) {
    window.location.href = 'index.html';
    return;
  }

  await loadAlbumsForUpload();
  
  const uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', handleUpload);
});

const loadAlbumsForUpload = async () => {
  try {
    const albums = await window.app.apiFetch('/albums');
    const albumSelect = document.getElementById('albumId');
    albums.forEach(album => {
      const option = document.createElement('option');
      option.value = album._id;
      option.textContent = album.name;
      albumSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Load albums error:', error);
  }
};

const handleUpload = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  try {
    const photo = await window.app.apiFetch('/photos/upload', {
      method: 'POST',
      body: formData
    });
    
    alert('Photo uploaded successfully!');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Upload failed: ' + (error.message || 'Try again'));
  }
};
