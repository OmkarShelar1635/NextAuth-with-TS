# NextAuth Authentication 

A practice project built with **Next.js**, **TypeScript**, **NextAuth.js**, **MongoDB**, and **Cloudinary** to implement secure authentication using both **Google OAuth** and **Credentials (Email & Password)** providers.

## 🚀 Features

- 🔐 Authentication using NextAuth.js
- 📧 Email & Password (Credentials Provider)
- 🌐 Google OAuth Sign-In
- 🔑 JWT-based Session Management
- 🛡️ Protected Routes with Middleware
- 👤 User Profile Management
- ☁️ Image Upload with Cloudinary
- 💾 MongoDB Database Integration
- ⚡ Built with TypeScript
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

- Next.js
- TypeScript
- NextAuth.js
- MongoDB
- Cloudinary
- Tailwind CSS
- bcryptjs
- JWT



---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### Navigate to the project

```bash
cd your-repository
```

### Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root and add:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🔄 Authentication Flow

### Credentials Authentication

- User registers with name,email and password.
- Password is securely hashed using **bcryptjs**.
- User logs in using email and password.
- JWT session is generated and maintained by NextAuth.

### Google Authentication

- User signs in using a Google account.
- Google OAuth verifies the user.
- User information is stored in MongoDB (if not already present).
- Session is managed by NextAuth.

---

## ☁️ Cloudinary Integration

- Upload profile images securely to Cloudinary.
- Store image URLs in MongoDB.
- Optimized cloud-based image storage.

---

## 🔒 Protected Routes

- Middleware verifies authentication.
- Unauthorized users are redirected to the login page.
- JWT tokens are validated before allowing access to protected pages.

---

## 📚 Learning Outcomes

This project helped me understand:

- Next.js App Router
- TypeScript in Next.js
- NextAuth.js Authentication
- Google OAuth Integration
- Credentials Authentication
- JWT Callbacks and Session Callbacks
- Protected Routes using Middleware
- MongoDB with Mongoose
- Password Hashing using bcryptjs
- Cloudinary Image Upload
- Environment Variable Management



---



## 📄 License

This project is created for learning and practice purposes.
