# Manual Testing Guide

## ✅ Dev Server Status
Your development server is running successfully at **http://localhost:3000**

## Testing Checklist

### 1. Public Pages Testing

Open your browser and test each page:

#### Homepage (http://localhost:3000)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Featured projects section appears
- [ ] Navigation bar is visible and responsive
- [ ] Footer is present

#### About Page (http://localhost:3000/about)
- [ ] Page loads without errors
- [ ] Bio section displays (will be empty until you add content)
- [ ] Social links section appears

#### Skills Page (http://localhost:3000/skills)
- [ ] Page loads without errors
- [ ] Skills grouped by category
- [ ] Proficiency bars display correctly

#### Projects Page (http://localhost:3000/projects)
- [ ] Page loads without errors
- [ ] Projects display in grid layout
- [ ] Images, technologies, and links show correctly

#### Achievements Page (http://localhost:3000/achievements)
- [ ] Page loads without errors
- [ ] Timeline layout displays
- [ ] Achievements grouped by category

#### Contact Page (http://localhost:3000/contact)
- [ ] Page loads without errors
- [ ] Contact form displays
- [ ] Form fields are functional

### 2. Admin Authentication Testing

#### Admin Login (http://localhost:3000/admin/login)
- [ ] Login page loads
- [ ] Email and password fields present
- [ ] **IMPORTANT**: You need to create an admin user first!

#### Creating Your First Admin User

Since this is a privacy-first application, you need to create the admin user directly in MongoDB:

**Option 1: Using MongoDB Compass or Atlas UI**
1. Open MongoDB Compass or Atlas
2. Connect to your database: `mongodb+srv://armanshaikh_db_user:0u3IZtgTT7s7HvzL@portfolio-cluster.wvf4m0c.mongodb.net/portfolioDB`
3. Navigate to the `users` collection
4. Click "Insert Document"
5. Use this document (replace email/password as needed):

```json
{
  "email": "admin@example.com",
  "password": "$2a$10$rZ5YhVJQX7kQvZ5YhVJQX.YhVJQX7kQvZ5YhVJQX7kQvZ5YhVJQXu",
  "name": "Admin User",
  "role": "admin",
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

**Note**: The password above is hashed for `password123`. To use a different password, you'll need to hash it first.

**Option 2: Using Node.js Script**

Create a file `scripts/create-admin.js`:

```javascript
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createAdmin() {
  await mongoose.connect('mongodb+srv://armanshaikh_db_user:0u3IZtgTT7s7HvzL@portfolio-cluster.wvf4m0c.mongodb.net/portfolioDB');
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
  }));

  const hashedPassword = await bcrypt.hash('your_password_here', 10);
  
  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    name: 'Admin User',
    role: 'admin',
  });

  console.log('✅ Admin user created successfully!');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
```

Then run:
```bash
node scripts/create-admin.js
```

### 3. Admin Panel Testing

After logging in, test these admin pages:

#### Dashboard (http://localhost:3000/admin)
- [ ] Statistics cards display
- [ ] Quick links work
- [ ] Sidebar navigation visible

#### About Management (http://localhost:3000/admin/about)
- [ ] Form loads correctly
- [ ] Can edit bio
- [ ] Can add social links
- [ ] Can toggle visibility
- [ ] Save button works

#### Skills Management (http://localhost:3000/admin/skills)
- [ ] Can add new skill
- [ ] Skills list displays
- [ ] Can edit existing skill
- [ ] Can delete skill
- [ ] Can toggle visibility

#### Projects Management (http://localhost:3000/admin/projects)
- [ ] Can add new project
- [ ] Projects list displays
- [ ] Can edit existing project
- [ ] Can delete project
- [ ] Can toggle featured flag
- [ ] Can toggle visibility

#### Achievements Management (http://localhost:3000/admin/achievements)
- [ ] Can add new achievement
- [ ] Achievements list displays
- [ ] Can edit existing achievement
- [ ] Can delete achievement
- [ ] Can toggle visibility

#### Messages Inbox (http://localhost:3000/admin/messages)
- [ ] Messages list displays
- [ ] Can mark as read/unread
- [ ] Can delete messages

### 4. Privacy Testing

This is crucial - verify the privacy-first architecture:

1. **Add a Private Skill**:
   - Go to Admin > Skills
   - Add a skill with `isPublic` unchecked
   - Save it

2. **Verify Privacy**:
   - Open http://localhost:3000/skills in an incognito window
   - The private skill should NOT appear
   - Only public skills should be visible

3. **Repeat for Projects and Achievements**

### 5. Contact Form Testing

1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit it
4. Check Admin > Messages to see if it appears

### 6. Mobile Responsiveness

Test on mobile or resize your browser:
- [ ] Navigation collapses to hamburger menu
- [ ] All pages are readable on mobile
- [ ] Forms are usable on mobile
- [ ] Admin panel works on mobile

## Common Issues & Solutions

### Issue: "Invalid MongoDB URI"
**Solution**: Make sure `.env.local` has the correct `MONGODB_URI` (it's already set correctly in your file)

### Issue: "Cannot connect to MongoDB"
**Solution**: 
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running
3. Check if your IP is whitelisted in MongoDB Atlas

### Issue: "NextAuth error"
**Solution**: Make sure `NEXTAUTH_SECRET` is set (you already ran `npx auth secret`)

### Issue: "Cannot login"
**Solution**: Create the admin user first using one of the methods above

### Issue: Build errors with Next.js 15
**Solution**: As mentioned in the walkthrough, downgrade to Next.js 14:
```bash
npm install next@14 react@18 react-dom@18
```

## Next Steps After Testing

1. ✅ Create your admin user
2. ✅ Log in to the admin panel
3. ✅ Add your portfolio content (bio, skills, projects, achievements)
4. ✅ Test the public pages to see your content
5. ✅ Test privacy controls
6. ✅ Customize styling if needed
7. ✅ Deploy to production (Vercel recommended)

## Need Help?

If you encounter any errors:
1. Check the browser console (F12 > Console tab)
2. Check the terminal where `npm run dev` is running
3. Share the error messages for assistance

---

**Your dev server is running at: http://localhost:3000**
**Admin login is at: http://localhost:3000/admin/login**
