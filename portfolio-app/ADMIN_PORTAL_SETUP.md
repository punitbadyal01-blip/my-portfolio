# 🔐 Admin Portal Setup Guide

## Overview
The Admin Portal allows you to upload projects and certificates directly with details, which are stored in Firebase Firestore and displayed dynamically on your portfolio.

## 🚀 Quick Start

### 1. **Access the Admin Portal**
Navigate to: `http://localhost:5173/admin` (or your app's URL + `/admin`)

### 2. **Default Login Credentials**
- **Password**: `admin123`

⚠️ **IMPORTANT: Change this password immediately!**

### 3. **Change the Admin Password**
Edit the file: `src/components/Admin/AdminPortal.jsx`

Find this line:
```javascript
const ADMIN_PASSWORD = 'admin123'; // ⚠️ Change this to a secure password
```

Replace it with your own secure password:
```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

## 📋 Features

### Projects Tab
Upload and manage your projects with:
- **Project Title** - Name of the project
- **Short Description** - Brief overview
- **Long Description** - Detailed explanation
- **Technologies** - Comma-separated list (e.g., `React.js, Python, Firebase`)
- **GitHub Link** - Link to your GitHub repository
- **Demo Link** - Link to live demo
- **Project Image** - Cover image for the project
- **Featured** - Mark as featured project (appears at top)

### Certificates Tab
Upload and manage your certificates with:
- **Certificate Title** - Name of the certificate/course
- **Issuer** - Organization that issued it (e.g., Udemy, Coursera)
- **Description** - Certificate description and skills learned
- **Year/Date** - Year or date earned (e.g., 2024)
- **Icon/Emoji** - Icon representation (e.g., ⚛️, 🐍)
- **Certificate Link** - Link to certificate or course
- **Certificate Image** - Image of the certificate

## 🔥 Firebase Setup

### Prerequisites
Ensure you have Firebase configured in `src/firebase.js` with:
- Firestore Database (for storing project/certificate data)
- Cloud Storage (for storing images)

### Environment Variables
Create a `.env.local` file in `portfolio-app/` directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Get these values from Firebase Console > Project Settings > General.

### Firestore Collections
Two collections are automatically created:
- **projects** - Stores all project data
- **certificates** - Stores all certificate data

## 🎨 How It Works

1. **Upload via Admin Portal**
   - Fill in the form with project/certificate details
   - Images are uploaded to Firebase Cloud Storage
   - Data is saved to Firestore collections

2. **Display on Portfolio**
   - Projects component fetches from Firestore
   - Certificates component fetches from Firestore
   - Falls back to static data if Firestore is empty

3. **Data Priority**
   - Firebase data is displayed if available
   - Static data from `data.js` is used as fallback
   - Refreshing portfolio automatically shows new uploads

## 📂 Data Structure

### Projects in Firestore
```javascript
{
  title: "Project Name",
  description: "Short description",
  longDescription: "Long description",
  image: "https://...", // Firebase Storage URL
  technologies: ["Tech1", "Tech2"],
  github: "https://github.com/...",
  demo: "https://...",
  featured: true/false,
  createdAt: timestamp
}
```

### Certificates in Firestore
```javascript
{
  title: "Certificate Name",
  issuer: "Issuer Name",
  description: "Certificate description",
  date: "Year/Date",
  icon: "📜",
  image: "https://...", // Firebase Storage URL
  link: "https://...",
  createdAt: timestamp
}
```

## 🛡️ Security Notes

1. **Password Protection**
   - Portal is protected with a simple password
   - Change the default password in AdminPortal.jsx
   - Consider implementing Firebase Authentication for better security

2. **Firebase Rules**
   - Set up proper Firestore rules to restrict access
   - Example rules for development:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /projects/{document=**} {
           allow read: if true;
           allow write: if request.auth.uid != null;
         }
         match /certificates/{document=**} {
           allow read: if true;
           allow write: if request.auth.uid != null;
         }
       }
     }
     ```

## 🖼️ Image Guidelines

- **Recommended format**: PNG, JPG, JPEG, WEBP
- **Project images**: 800x600px or similar (landscape)
- **Certificate images**: 400x300px or similar (landscape)
- **Max file size**: 5MB (Firebase default)

## 🗑️ Deleting Projects/Certificates

In the Admin Portal:
1. Go to "Projects List" or "Certificates List"
2. Click the "🗑️ Delete" button next to the item
3. Confirm the deletion in the popup dialog

## 🔄 Real-time Updates

The portfolio updates in real-time:
- After uploading a project/certificate, refresh the page
- New items appear in the Projects/Certificates section
- Featured projects appear at the top

## 📱 Responsive Design

The Admin Portal is fully responsive:
- Works on desktop, tablet, and mobile
- Forms stack on smaller screens
- Lists are scrollable on mobile

## 🆘 Troubleshooting

### Images not uploading?
- Check Firebase Storage bucket configuration
- Verify Firebase credentials in `.env.local`
- Check browser console for error messages

### Projects/Certificates not appearing?
- Ensure Firestore collections exist
- Refresh the portfolio page
- Check browser cache (Ctrl+Shift+Delete)

### Can't access admin portal?
- Verify URL: `http://localhost:5173/admin`
- Ensure React Router is properly configured
- Check browser console for errors

### Password not working?
- Verify password in `AdminPortal.jsx`
- Clear localStorage: `localStorage.removeItem('adminAuth')`
- Check browser console for errors

## 📖 File Structure

```
src/
├── components/
│   ├── Admin/
│   │   ├── AdminPortal.jsx       (Login page)
│   │   ├── AdminPanel.jsx        (Main dashboard)
│   │   ├── AdminPage.jsx         (Wrapper)
│   │   ├── ProjectForm.jsx       (Project upload form)
│   │   ├── CertificateForm.jsx   (Certificate upload form)
│   │   ├── ProjectsList.jsx      (Project management)
│   │   ├── CertificatesList.jsx  (Certificate management)
│   │   └── Admin.css             (Styling)
│   ├── Projects/
│   │   └── Projects.jsx          (Updated to fetch from Firebase)
│   ├── Certificates/
│   │   └── Certificates.jsx      (Updated to fetch from Firebase)
├── utils/
│   └── dataService.js            (Firebase fetch utilities)
└── App.jsx                       (Updated with routing)
```

## 🚀 Deployment

When deploying to production:

1. **Update admin password** - Use a strong, unique password
2. **Configure Firebase Rules** - Implement proper security rules
3. **Set environment variables** - Add `.env` to deployment platform
4. **Test admin access** - Verify authentication works
5. **Monitor Firebase usage** - Watch storage and bandwidth costs

## 💡 Tips & Best Practices

1. **Organize technologies** - Use consistent naming for technologies
2. **Optimize images** - Compress before uploading to save storage
3. **Add descriptions** - Write detailed descriptions for better SEO
4. **Use featured flag** - Mark important projects as featured
5. **Keep dates up to date** - Use consistent date formats

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Firebase Console logs
3. Check browser console for JavaScript errors
4. Review project documentation

---

**Last Updated**: April 2026
**Version**: 1.0
