// Authentication logic

const handleAuthForm = async (formId, isRegister = false) => {
  const form = document.getElementById(formId);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const userData = await window.app.apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      window.app.currentToken = userData.token;
      window.app.currentUser = userData;
      
      window.location.href = 'index.html';
    } catch (error) {
      alert(error.message || 'Authentication failed');
    }
  });
};

// Login and Register form handlers
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loginForm')) {
    handleAuthForm('loginForm', false);
  }
  if (document.getElementById('registerForm')) {
    handleAuthForm('registerForm', true);
  }
  if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').onclick = () => window.location.href = 'login.html';
  }
  if (document.getElementById('registerBtn')) {
    document.getElementById('registerBtn').onclick = () => window.location.href = 'register.html';
  }
});
