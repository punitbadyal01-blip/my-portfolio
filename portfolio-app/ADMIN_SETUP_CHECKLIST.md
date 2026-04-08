# Admin Portal - Setup & Testing Checklist

## ✅ Pre-Setup Checklist

### Firebase Configuration
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Cloud Storage enabled
- [ ] Firebase credentials obtained from Console > Settings

### Project Setup
- [ ] `.env.local` created with Firebase credentials
- [ ] Environment variables are correct:
  ```
  VITE_FIREBASE_API_KEY=✓
  VITE_FIREBASE_AUTH_DOMAIN=✓
  VITE_FIREBASE_PROJECT_ID=✓
  VITE_FIREBASE_STORAGE_BUCKET=✓
  VITE_FIREBASE_MESSAGING_SENDER_ID=✓
  VITE_FIREBASE_APP_ID=✓
  ```

## 🚀 Installation Checklist

### Step 1: Update Admin Password ⚠️
- [ ] Open: `src/components/Admin/AdminPortal.jsx`
- [ ] Find line 21: `const ADMIN_PASSWORD = 'admin123';`
- [ ] Replace with a strong password: `const ADMIN_PASSWORD = 'your-secure-password';`
- [ ] Save file

### Step 2: Configure Firebase Rules (Security)
- [ ] Go to Firebase Console > Firestore > Rules
- [ ] Set up security rules (see ADMIN_PORTAL_SETUP.md)
- [ ] Test rules are working
- [ ] Deploy rules

### Step 3: Create Firestore Collections
Collections are auto-created, but you can pre-create for testing:
- [ ] Create collection: `projects`
- [ ] Create collection: `certificates`

### Step 4: Dependency Check
- [ ] `firebase` package installed (check `package.json`)
- [ ] `react-router-dom` package installed
- [ ] `react-icons` package installed
- [ ] All dependencies: `npm install`

### Step 5: Start Development Server
- [ ] Run: `npm run dev`
- [ ] Server running on: `http://localhost:5173`
- [ ] No console errors visible

## 🧪 Testing Checklist

### Admin Portal Access
- [ ] Navigate to: `http://localhost:5173/admin`
- [ ] Login page displays correctly
- [ ] Error message appears with wrong password
- [ ] Correct password logs in successfully

### Projects Upload
- [ ] Fill project form with test data
- [ ] Upload project image (check file exists)
- [ ] Submit form
- [ ] Success message appears
- [ ] Form resets after submission
- [ ] Project appears in "Projects List"
- [ ] Project visible on portfolio (refresh page)

### Certificates Upload
- [ ] Fill certificate form with test data
- [ ] Upload certificate image
- [ ] Submit form
- [ ] Success message appears
- [ ] Form resets after submission
- [ ] Certificate appears in "Certificates List"
- [ ] Certificate visible on portfolio (refresh page)

### Data Management
- [ ] View all projects in "Projects List"
- [ ] View all certificates in "Certificates List"
- [ ] Delete a project (confirm before delete)
- [ ] Delete a certificate (confirm before delete)
- [ ] Deleted items removed from list
- [ ] Portfolio updates after deletion

### Mobile Responsiveness
- [ ] Test on mobile browser
- [ ] Forms are readable and usable
- [ ] Images display correctly
- [ ] Buttons are clickable (not too small)
- [ ] No horizontal scrolling

### Dark/Light Mode
- [ ] Test with dark mode enabled
- [ ] Test with light mode enabled
- [ ] Admin portal displays correctly in both
- [ ] Text contrast is readable

### Fallback Data
- [ ] Clear Firestore collections
- [ ] Refresh portfolio page
- [ ] Static data from `data.js` displays
- [ ] Portfolio doesn't break without Firebase data

### Firebase Integration
- [ ] Images upload to Storage successfully
- [ ] Firestore documents created with correct structure
- [ ] Image URLs in Firestore are valid
- [ ] Firebase logs show no errors

## 🔐 Security Checklist

### Before Production Deployment
- [ ] Admin password changed from default
- [ ] Firebase Security Rules configured
- [ ] HTTPS enabled on domain
- [ ] `.env.local` NOT committed to git
- [ ] `.env.local` added to `.gitignore`
- [ ] Firebase credentials never exposed in code
- [ ] admin access logs checked

### Ongoing Security
- [ ] Monitor Firebase usage (quota overages)
- [ ] Review Firebase Security Alerts
- [ ] Update packages regularly (`npm update`)
- [ ] Monitor admin access attempts
- [ ] Rotate credentials periodically if needed

## 📦 File Verification

### Admin Components Created
- [ ] `src/components/Admin/AdminPortal.jsx` exists
- [ ] `src/components/Admin/AdminPanel.jsx` exists
- [ ] `src/components/Admin/AdminPage.jsx` exists
- [ ] `src/components/Admin/ProjectForm.jsx` exists
- [ ] `src/components/Admin/CertificateForm.jsx` exists
- [ ] `src/components/Admin/ProjectsList.jsx` exists
- [ ] `src/components/Admin/CertificatesList.jsx` exists
- [ ] `src/components/Admin/Admin.css` exists

### Utility Files Created
- [ ] `src/utils/dataService.js` exists
- [ ] Contains `fetchProjectsFromFirebase()` function
- [ ] Contains `fetchCertificatesFromFirebase()` function

### Files Updated
- [ ] `src/App.jsx` - React Router configured
- [ ] `src/components/Projects/Projects.jsx` - Fetches from Firestore
- [ ] `src/components/Certificates/Certificates.jsx` - Fetches from Firestore

### Documentation Files
- [ ] `ADMIN_PORTAL_SETUP.md` exists
- [ ] `ADMIN_QUICK_REFERENCE.md` exists
- [ ] `ADMIN_SETUP_CHECKLIST.md` exists (this file)

## 🐛 Troubleshooting Steps

### If Admin Portal Won't Load
1. [ ] Check URL: `http://localhost:5173/admin`
2. [ ] Check console for JavaScript errors
3. [ ] Verify React Router is imported in App.jsx
4. [ ] Clear browser cache (Ctrl+Shift+Delete)
5. [ ] Restart dev server (`npm run dev`)

### If Login Doesn't Work
1. [ ] Verify password in AdminPortal.jsx
2. [ ] Check browser console for errors
3. [ ] Clear localStorage: `localStorage.clear()`
4. [ ] Check for typos in password

### If Images Won't Upload
1. [ ] Verify Firebase Storage credentials
2. [ ] Check `.env.local` variables are correct
3. [ ] Test image file size (must be < 5MB)
4. [ ] Check Firebase Storage Rules allow write
5. [ ] Check browser console for upload errors

### If Projects/Certificates Don't Appear
1. [ ] Verify Firestore collections created
2. [ ] Check Firestore Security Rules
3. [ ] Refresh portfolio page
4. [ ] Clear browser cache
5. [ ] Check browser console for fetch errors

### If Styles Look Wrong
1. [ ] Verify Admin.css file exists
2. [ ] Check CSS import in Admin components
3. [ ] Verify theme variables in global CSS
4. [ ] Check browser dev tools for CSS errors
5. [ ] Hard refresh browser (Ctrl+F5)

## 📊 Testing Data Examples

### Sample Project Data
```
Title: Test AI Project
Description: A test project for the admin portal
Long Description: This is a longer description for testing purposes
Technologies: React, Python, Firebase, Machine Learning
GitHub: https://github.com/your-repo
Demo: https://your-demo-link.com
Featured: Yes (checked)
Image: [Upload test-project.png]
```

### Sample Certificate Data
```
Title: Full Stack Development Certification
Issuer: Udemy
Description: Learned React, Node.js, MongoDB, and web development best practices
Date: 2024
Icon: 🏆
Link: https://www.udemy.com/course/...
Image: [Upload test-certificate.jpg]
```

## ✨ Post-Setup

Once everything is set up:
- [ ] Document your admin password securely
- [ ] Share admin URL with yourself (bookmark it)
- [ ] Test uploading real projects
- [ ] Test uploading real certificates
- [ ] Share portfolio link publicly
- [ ] Monitor Firestore usage in Firebase Console

## 🎉 Success Indicators

You'll know everything is working when:
✅ Admin portal login works
✅ Projects upload successfully and appear on portfolio
✅ Certificates upload successfully and appear on portfolio
✅ Images display correctly
✅ Delete functionality works
✅ Responsive design works on mobile
✅ No console errors

---

**Status**: Ready for testing
**Last Updated**: April 2026
**Next Step**: Follow checklist above ⬆️
