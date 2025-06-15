# 📝 Simple Blog API

A basic RESTful API for a blogging platform built using:

- **Express** (Node.js) – For routing and server handling
- **Prisma ORM** – For type-safe database access
- **PostgreSQL** – As the relational database
- **Render** – For cloud deployment

This API supports creating users and blog posts, fetching them, updating, and deleting posts.

---

## 📦 Technologies Used

- Node.js (Express)
- Prisma ORM
- PostgreSQL
- Railway or Render (for deployment)

---

## 🚀 API Endpoints

### Users

#### `GET /users`

- **Description**: Get all users

---

#### `GET /users/:id`

- **Description**: Get a single user by ID, including all blog posts authored by that user

---

#### `POST /users`

- **Description**: Create a new user
- **Request Body**:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "emailAddress": "jane@example.com",
  "username": "janedoe"
}
```

---

### Posts

#### `GET /posts`

- **Description**: Get all blog posts, including author details

---

#### `GET /posts/:id`

- **Description**: Get a single blog post by ID, including author details

---

#### `POST /posts`

- **Description**: Create a new blog post
- **Request Body**:

```json
{
  "title": "My First Blog",
  "content": "This is my first blog post.",
  "usersId": "uuid-of-the-user"
}
```

---

#### `PUT /posts/:id`

- **Description**: Update an existing blog post
- **Request Body**:

```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content",
  "usersId": "uuid-of-the-user"
}
```

---

#### `DELETE /posts/:id`

- **Description**: Soft-delete a blog post (sets `isDeleted` to true)

---

## 📁 Setup & Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-blog-api.git
cd simple-blog-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the Server

```bash
npm run dev
```

---

## ✅ Future Improvements

- Add authentication (JWT or session-based)
- Pagination and search functionality
- Image uploads for posts
- Post categories and tags

---
