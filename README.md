# Privacy-First Portfolio Website

A production-ready Next.js portfolio application with a complete admin panel for managing all content dynamically. Built with privacy-first principles, ensuring sensitive information is never exposed to public users.

## Features

### Public Portfolio
- **Home Page**: Hero section with featured projects
- **About Page**: Bio, profile image, and social links
- **Skills Page**: Organized by categories with proficiency levels
- **Projects Page**: Showcase with images, technologies, and links
- **Achievements Page**: Timeline of accomplishments
- **Contact Page**: Form for visitors to send messages

### Admin Panel
- **Dashboard**: Statistics and quick access links
- **About Management**: Edit bio and social links
- **Skills Management**: Full CRUD operations with visibility control
- **Projects Management**: Full CRUD with featured flag and visibility
- **Achievements Management**: Full CRUD with categories and dates
- **Messages Inbox**: View and manage contact form submissions
- **Authentication**: Secure JWT-based login

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (JWT)
- **File Uploads**: Cloudinary (configured but not fully implemented)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Cloudinary (optional for now)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Create Initial Admin User

Since this is a privacy-first application, you'll need to create the first admin user directly in MongoDB.

**Option A: Using MongoDB Compass or Atlas UI**
1. Connect to your MongoDB database
2. Create a new document in the `users` collection:

```json
{
  "email": "admin@example.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "name": "Admin User",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Option B: Using Node.js Script**

Create a file `scripts/create-admin.js`:

```javascript
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createAdmin() {
  await mongoose.connect('your_mongodb_uri');
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
  }));

  const hashedPassword = await bcrypt.hash('your_password', 10);
  
  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    name: 'Admin User',
    role: 'admin',
  });

  console.log('Admin user created!');
  process.exit(0);
}

createAdmin();
```

Run it:
```bash
node scripts/create-admin.js
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

### 5. Build for Production

```bash
npm run build
npm start
```

## Privacy-First Design

### Server-Side Filtering
All public routes automatically filter content marked as `isPublic: false`. This filtering happens at the database query level, ensuring private content never leaves the server.

### Authentication
- Admin routes are protected by NextAuth middleware
- JWT-based sessions for security
- No sensitive data in client-side code

### Visibility Controls
Every content type (Skills, Projects, Achievements, About) has an `isPublic` flag that you can toggle in the admin panel.

## Project Structure

```
d:/Portfolio/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx        # About
│   │   ├── skills/page.tsx       # Skills
│   │   ├── projects/page.tsx     # Projects
│   │   ├── achievements/page.tsx # Achievements
│   │   └── contact/page.tsx      # Contact
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout with auth
│   │   ├── page.tsx              # Dashboard
│   │   ├── about/page.tsx        # About management
│   │   ├── skills/page.tsx       # Skills CRUD
│   │   ├── projects/page.tsx     # Projects CRUD
│   │   ├── achievements/page.tsx # Achievements CRUD
│   │   ├── messages/page.tsx     # Messages inbox
│   │   └── login/page.tsx        # Login
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth
│   │   ├── messages/             # Contact messages
│   │   ├── skills/               # Public skills API
│   │   └── admin/                # Admin-only APIs
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── Navbar.tsx                # Public navigation
│   ├── Footer.tsx                # Footer
│   └── AdminSidebar.tsx          # Admin navigation
├── lib/
│   ├── mongodb.ts                # Database connection
│   ├── cloudinary.ts             # File uploads
│   └── auth.ts                   # Auth helpers
├── models/                       # Mongoose models
├── types/                        # TypeScript types
└── middleware.ts                 # Route protection
```

## Next Steps

1. **Add Content**: Log in to the admin panel and start adding your portfolio content
2. **Customize Styling**: Modify Tailwind classes to match your brand
3. **Configure Cloudinary**: Set up file uploads for images
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform
5. **SEO**: Add metadata to individual pages for better SEO

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Make sure to:
- Set all environment variables
- Use Node.js 18+
- Configure MongoDB connection string
- Set NEXTAUTH_URL to your production domain

## Support

For issues or questions:
1. Check the implementation plan in the artifacts
2. Review the task breakdown
3. Verify environment variables are set correctly
4. Ensure MongoDB connection is working

## License

MIT
