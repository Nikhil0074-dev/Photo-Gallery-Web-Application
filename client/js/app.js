// Common utilities and theme management

let currentToken = localStorage.getItem('token');
let currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const API_BASE = '/api';

const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (currentToken) {
    headers.Authorization = `Bearer ${currentToken}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  return response.json();
};

// Theme toggle
const toggleTheme = () => {
  const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Load theme on startup
if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}

// Check auth status
if (currentToken && currentUser) {
  // User is logged in
  document.getElementById('authSection')?.style.setProperty('display', 'none');
  document.getElementById('gallerySection')?.style.setProperty('display', 'block');
  document.getElementById('logoutBtn')?.style.setProperty('display', 'inline-block');
} else {
  // Show login/register
  document.getElementById('gallerySection')?.style.setProperty('display', 'none');
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentToken = null;
  currentUser = null;
  window.location.href = 'index.html';
};

// Export for other modules
window.app = { apiFetch, logout, currentToken, currentUser };
