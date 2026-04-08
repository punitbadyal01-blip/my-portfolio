# Admin Portal - Quick Reference

## 🔗 Access
```
URL: http://localhost:5173/admin
Default Password: admin123
```

## 📝 File Locations

### Main Admin Components
- `src/components/Admin/AdminPortal.jsx` - Login & main entry
- `src/components/Admin/AdminPanel.jsx` - Dashboard
- `src/components/Admin/ProjectForm.jsx` - Add projects
- `src/components/Admin/CertificateForm.jsx` - Add certificates
- `src/components/Admin/ProjectsList.jsx` - Manage projects
- `src/components/Admin/CertificatesList.jsx` - Manage certificates
- `src/components/Admin/AdminPage.jsx` - Page wrapper

### Configuration
- `src/firebase.js` - Firebase setup
- `src/utils/dataService.js` - Firestore utilities
- `src/App.jsx` - Routing configuration

### Setup Guides
- `ADMIN_PORTAL_SETUP.md` - Complete setup guide

## 🔐 Change Password

Edit: `src/components/Admin/AdminPortal.jsx`

**Line 21:**
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this!
```

## 📊 Firebase Collections

### projects
```
- title (string)
- description (string)
- longDescription (string)
- image (string - URL)
- technologies (array)
- github (string - URL)
- demo (string - URL)
- featured (boolean)
- createdAt (timestamp)
```

### certificates
```
- title (string)
- issuer (string)
- description (string)
- date (string)
- icon (string - emoji)
- image (string - URL)
- link (string - URL)
- createdAt (timestamp)
```

## 🎯 Features

✅ **Upload Projects**
- Title, description, technologies
- GitHub & demo links
- Project image
- Mark as featured

✅ **Upload Certificates**
- Title, issuer, description
- Year/date and emoji
- Certificate image
- Certificate link

✅ **Manage Items**
- View all uploads
- Delete items
- Real-time updates

✅ **Auto Display**
- Projects fetch from Firebase
- Certificates fetch from Firebase
- Falls back to static data

## 📱 Responsive
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🚀 Routes

- **Portfolio**: `/` or `/index.html`
- **Admin Portal**: `/admin`

## ⚙️ Environment Setup

Create `.env.local` with:
```
VITE_FIREBASE_API_KEY=***
VITE_FIREBASE_AUTH_DOMAIN=***
VITE_FIREBASE_PROJECT_ID=***
VITE_FIREBASE_STORAGE_BUCKET=***
VITE_FIREBASE_MESSAGING_SENDER_ID=***
VITE_FIREBASE_APP_ID=***
```

## 🔄 Data Flow

1. Admin uploads image + form data
2. Image uploaded to Firebase Storage
3. Data saved to Firestore
4. Portfolio fetches from Firestore
5. Portfolio displays new items

## 💾 Local Storage

Authentication token stored in `adminAuth` key:
```javascript
localStorage.getItem('adminAuth'); // 'true' if logged in
localStorage.removeItem('adminAuth'); // Logout
```

## 🎨 Styling

Admin styles in: `src/components/Admin/Admin.css`
- Mobile responsive
- Dark mode compatible
- Gradient buttons
- Smooth transitions

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Can't access admin | Check URL: `/admin` |
| Login password wrong | Check AdminPortal.jsx line 21 |
| Images not uploading | Check Firebase Storage rules |
| Data not appearing | Refresh page, clear cache |
| Firestore empty | Add first item from admin |

## 📖 Documentation

For detailed setup: See `ADMIN_PORTAL_SETUP.md`

---

**Version**: 1.0 | **Updated**: Apr 2026
