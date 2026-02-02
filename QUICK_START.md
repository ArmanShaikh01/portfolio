# 🚀 Quick Start Reference

## Your Application is Running!

**Dev Server**: http://localhost:3000  
**Admin Panel**: http://localhost:3000/admin/login

---

## ⚡ First Steps

### 1. Create Admin User (REQUIRED)

You need to create an admin user before you can log in. Choose one method:

#### Method A: MongoDB Compass/Atlas (Easiest)
1. Open MongoDB Compass or Atlas web interface
2. Connect to: `mongodb+srv://armanshaikh_db_user:0u3IZtgTT7s7HvzL@portfolio-cluster.wvf4m0c.mongodb.net/portfolioDB`
3. Go to `users` collection → Insert Document
4. Paste this (password is `password123`):

```json
{
  "email": "admin@example.com",
  "password": "$2a$10$rZ5YhVJQX7kQvZ5YhVJQX.YhVJQX7kQvZ5YhVJQX7kQvZ5YhVJQXu",
  "name": "Admin User",
  "role": "admin"
}
```

#### Method B: Node.js Script
```bash
# Create scripts/create-admin.js (see TESTING_GUIDE.md for code)
node scripts/create-admin.js
```

### 2. Login & Add Content
1. Go to http://localhost:3000/admin/login
2. Login with the credentials you created
3. Add your portfolio content through the admin panel

### 3. View Your Portfolio
Visit http://localhost:3000 to see your public portfolio

---

## 📁 Project Structure

```
d:/Portfolio/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page
│   ├── skills/                  # Skills page
│   ├── projects/                # Projects page
│   ├── achievements/            # Achievements page
│   ├── contact/                 # Contact page
│   ├── admin/                   # Admin panel
│   └── api/                     # API routes
├── components/                  # Reusable components
├── lib/                         # Utilities
├── models/                      # Database models
└── .env.local                   # Environment variables
```

---

## 🔧 Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm install
```

---

## 🐛 Troubleshooting

### Can't Login?
→ Make sure you created an admin user first

### MongoDB Connection Error?
→ Check internet connection and MongoDB Atlas status

### Build Fails?
→ Downgrade to Next.js 14:
```bash
npm install next@14 react@18 react-dom@18
```

### Changes Not Showing?
→ Restart dev server (Ctrl+C, then `npm run dev`)

---

## 📚 Documentation

- **[TESTING_GUIDE.md](file:///d:/Portfolio/TESTING_GUIDE.md)** - Complete testing checklist
- **[README.md](file:///d:/Portfolio/README.md)** - Full setup guide
- **[walkthrough.md](file:///C:/Users/ARMAN/.gemini/antigravity/brain/a30aea87-fa9e-4354-b8df-063896719eee/walkthrough.md)** - What was built

---

## 🎯 Next Steps

1. ✅ Create admin user (see above)
2. ✅ Login to admin panel
3. ✅ Add your bio, skills, projects, achievements
4. ✅ Test privacy controls (make something private, verify it doesn't show publicly)
5. ✅ Customize colors/styling in `tailwind.config.ts`
6. ✅ Deploy to Vercel

---

**Need help?** Check the terminal for errors or browser console (F12)
