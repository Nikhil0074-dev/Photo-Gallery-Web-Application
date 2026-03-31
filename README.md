# Photo Gallery Web Application

Full-stack photo gallery app with user auth, photo/album management, search/filter, responsive UI.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: HTML, CSS (CSS Grid), JavaScript
- Auth: JWT + bcrypt
- Upload: Multer

## Quick Setup (Windows)

### 1. MongoDB (if not installed)
Download MongoDB Community: https://www.mongodb.com/try/download/community
- Install, add to PATH
REM MongoDB: Download/install MongoDB Community Server for Windows from https://www.mongodb.com/try/download/community

### 2. Project Setup
```bash
cd "C:/Users/dell/Desktop/photo-gallery"
copy .env.example .env
# Edit .env with notepad .env :
# MONGODB_URI=mongodb://localhost:27017/photogallery
# JWT_SECRET=mysecretkey123 (change this! use long random string)
npm install
```

### 3. Run
```bash
npm run dev
```
Open http://localhost:3000

### 4. Usage
- Register/Login
- Upload photos (5MB max images)
- Create albums via gallery page
- Search/filter photos
- Dark mode toggle
- Responsive mobile UI

## Features Complete
 Auth (register/login/logout)
 Photo CRUD + upload
 Album CRUD
 Search by title, filter by album
 Gallery grid + modal preview
 Responsive design
 Dark mode

## API Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/photos/upload (multipart)
GET /api/photos?search=&album=
DELETE /api/photos/:id
POST /api/albums
GET /api/albums
DELETE /api/albums/:id
```

## File Structure
```
photo-gallery/
├── client/ (frontend)
├── server/ (backend)
├── uploads/ (images)
└── package.json
