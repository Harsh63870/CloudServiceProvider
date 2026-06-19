# CloudServiceProvider

A simple full-stack learning project built to understand backend development concepts such as REST APIs, file uploads, MongoDB Atlas, and cloud image storage.

Users can upload images with captions, store images on ImageKit, and manage posts through a simple web interface.

## Features

- Create, Read, Update, and Delete posts
- Upload images using Multer
- Store images on ImageKit
- Store post data in MongoDB Atlas
- RESTful API design
- Basic frontend using HTML, CSS, and JavaScript

## Tech Stack

| Layer | Technology |
| ------- | ---------- |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Storage | ImageKit |
| Frontend | HTML, CSS, JavaScript |

## Project Structure

```text
CloudServiceProvider
│
├── server.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── src/
    ├── app.js
    ├── database/
    ├── model/
    ├── routes/
    ├── controllers/
    ├── services/
    └── middleware/
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CloudServiceProvider.git
cd CloudServiceProvider
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
PORT=3000
```

### Run the Application

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
| -------- | -------- | ----------- |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get a single post |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id` | Update a post caption |
| DELETE | `/api/posts/:id` | Delete a post |

### Create Post

Send a `multipart/form-data` request with:

| Field | Type |
| ------- | ---- |
| image | File |
| caption | Text |

## Learning Objectives

This project was created to practice:

- Express.js fundamentals
- REST API development
- MongoDB and Mongoose
- File uploads with Multer
- Cloud storage integration using ImageKit
- Frontend and backend communication using the Fetch API
