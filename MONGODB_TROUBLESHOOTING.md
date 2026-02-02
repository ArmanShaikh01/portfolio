# MongoDB Connection Error - Troubleshooting Guide

## Error
```
MongoServerSelectionError: getaddrinfo ENOTFOUND ac-wbmghu-shard-00-00.wvf4m0c.mongodb.net
```

This error means your application cannot reach the MongoDB Atlas cluster.

## Quick Fixes

### 1. Check Internet Connection
- Make sure you have an active internet connection
- Try opening https://www.google.com in your browser
- If offline, connect to the internet and refresh the page

### 2. Whitelist Your IP Address in MongoDB Atlas

**This is the most common issue!**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Select your project
4. Click on "Network Access" in the left sidebar
5. Click "Add IP Address"
6. Choose one of these options:
   - **Option A (Recommended for Development):** Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Option B:** Click "Add Current IP Address" to whitelist only your current IP
7. Click "Confirm"
8. Wait 1-2 minutes for the changes to take effect
9. Refresh your portfolio page

### 3. Check MongoDB Cluster Status

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click on "Database" in the left sidebar
3. Make sure your cluster shows as "Active" (green status)
4. If it shows "Paused", click "Resume" button

### 4. Verify MongoDB URI

Your current URI in `.env.local`:
```
mongodb+srv://armanshaikh_db_user:0u3IZtgTT7s7HvzL@portfolio-cluster.wvf4m0c.mongodb.net/portfolioDB?appName=portfolio-cluster
```

To verify it's correct:
1. Go to MongoDB Atlas → Database
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password: `0u3IZtgTT7s7HvzL`
6. Compare with your `.env.local` file

### 5. Restart Development Server

After making changes:
```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### 6. Test Connection

Once you've whitelisted your IP, wait 1-2 minutes and then:
1. Refresh your browser at http://localhost:3000
2. The page should load without errors
3. You should see the sections (even if empty)

## Still Not Working?

### Check Firewall/Antivirus
- Some firewalls or antivirus software block MongoDB connections
- Temporarily disable them to test
- Add an exception for MongoDB Atlas if needed

### Use Different Network
- Try connecting from a different network (mobile hotspot, different WiFi)
- This helps identify if it's a network-specific issue

### Check MongoDB Atlas Status
- Visit https://status.mongodb.com/
- Check if there are any ongoing incidents

## Expected Behavior After Fix

Once connected successfully, you should see:
- ✅ Home page loads without errors
- ✅ Sections appear (may show "Add content from admin panel" messages)
- ✅ No red errors in browser console
- ✅ Admin panel accessible at http://localhost:3000/admin/login

## Next Steps After Connection Works

1. **Create Admin User** - Follow instructions in [QUICK_START.md](file:///d:/Portfolio/QUICK_START.md)
2. **Login to Admin Panel** - http://localhost:3000/admin/login
3. **Add Content** - Add your bio, skills, projects, achievements
4. **View Your Portfolio** - See your content on the home page

---

**Most Common Solution:** Whitelist your IP address in MongoDB Atlas Network Access settings!
