// ============================================================
// data.js - Static JSON data for Projects and Certificates
// ============================================================

// Importing project images from src/assets (copied from /images)
import handGesture from '../assets/hand gesture.png';
import courierService from '../assets/courier service.png';
import watermark from '../assets/watermark.png';

// Importing certificate images
import cert1 from '../assets/WhatsApp Image 2026-02-27 at 22.32.51.jpeg';
import cert2 from '../assets/WhatsApp Image 2026-02-27 at 22.32.53.jpeg';
import cert3 from '../assets/WhatsApp Image 2026-02-27 at 22.32.55.jpeg';
import cert4 from '../assets/WhatsApp Image 2026-02-27 at 22.33.03.jpeg';
import cert5 from '../assets/WhatsApp Image 2026-02-27 at 22.33.04.jpeg';
import cert6 from '../assets/WhatsApp Image 2026-02-27 at 22.33.05.jpeg';
import cert7 from '../assets/WhatsApp Image 2026-02-27 at 22.33.06.jpeg';
import cert8 from '../assets/WhatsApp Image 2026-02-27 at 22.33.07.jpeg';
import cert9 from '../assets/WhatsApp Image 2026-02-27 at 22.33.09.jpeg';
import cert10 from '../assets/WhatsApp Image 2026-02-27 at 22.33.10.jpeg';

/**
 * Projects data - displayed in the Projects section
 */
export const projectsData = [
    {
        id: 1,
        title: 'AI-Based Hand Gesture Controlled Game System',
        description:
            'A cutting-edge computer vision system that allows users to control games using real-time hand gesture recognition. Utilizes advanced ML models for accurate gesture detection.',
        longDescription:
            'Built with Python, OpenCV, and MediaPipe, the system tracks hand landmarks in real time and maps specific gestures to game controls, enabling a fully touchless gaming experience. Used for controlling games like Subway Surfers.',
        image: handGesture,
        technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'ML'],
        github: 'https://github.com/punitbadyal01-blip',
        demo: '#',
        featured: true,
    },
    {
        id: 2,
        title: 'Online Courier Service Management System',
        description:
            'A modern web-based courier booking and tracking interface with clean UI, real-time status updates, and an intuitive dashboard for managing shipments.',
        longDescription:
            'Full-stack web application for booking and tracking courier services. Developed using React.js and JavaScript with a component-driven architecture. Features include booking forms, tracking dashboards, and responsive UI design.',
        image: courierService,
        technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5'],
        github: 'https://github.com/punitbadyal01-blip',
        demo: '#',
        featured: true,
    },
    {
        id: 3,
        title: 'Image Watermark Adder',
        description:
            'A powerful web application that allows users to upload images and apply fully customizable text watermarks with options for font, size, opacity, and position.',
        longDescription:
            'A project that adds customizable watermarks to images using Python backend and HTML/CSS frontend. Developed using React.js and the HTML5 Canvas API. Users can preview, customize, and download watermarked images instantly in the browser.',
        image: watermark,
        technologies: ['React.js', 'Python', 'JavaScript', 'Canvas API', 'CSS3'],
        github: 'https://github.com/punitbadyal01-blip',
        demo: '#',
        featured: false,
    },
];

/**
 * Certificates data - displayed in the Certificates section
 */
export const certificatesData = [
    {
        id: 1,
        title: 'Certificate 1',
        image: cert1,
        link: '#',
    },
    {
        id: 2,
        title: 'Certificate 2',
        image: cert2,
        link: '#',
    },
    {
        id: 3,
        title: 'Certificate 3',
        image: cert3,
        link: '#',
    },
    {
        id: 4,
        title: 'Certificate 4',
        image: cert4,
        link: '#',
    },
    {
        id: 5,
        title: 'Certificate 5',
        image: cert5,
        link: '#',
    },
    {
        id: 6,
        title: 'Certificate 6',
        image: cert6,
        link: '#',
    },
    {
        id: 7,
        title: 'Certificate 7',
        image: cert7,
        link: '#',
    },
    {
        id: 8,
        title: 'Certificate 8',
        image: cert8,
        link: '#',
    },
    {
        id: 9,
        title: 'Certificate 9',
        image: cert9,
        link: '#',
    },
    {
        id: 10,
        title: 'Certificate 10',
        image: cert10,
        link: '#',
    },
];

/**
 * Skills data - organized by category
 */
export const skillsData = {
    technical: [
        { name: 'Java', level: 85, icon: '☕' },
        { name: 'Python', level: 82, icon: '🐍' },
        { name: 'JavaScript', level: 85, icon: '⚡' },
        { name: 'React.js', level: 80, icon: '⚛️' },
        { name: 'HTML5', level: 90, icon: '🌐' },
        { name: 'CSS3', level: 85, icon: '🎨' },
        { name: 'C Programming', level: 75, icon: '💻' },
    ],
    tools: [
        { name: 'Spring Boot', icon: '🍃' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'Git & GitHub', icon: '📦' },
        { name: 'VS Code', icon: '💡' },
        { name: 'OpenCV', icon: '👁️' },
        { name: 'MediaPipe', icon: '🎥' },
    ],
    core: [
        { name: 'Data Structures & Algorithms', icon: '🧠' },
        { name: 'DBMS', icon: '🗄️' },
        { name: 'OOP', icon: '🔷' },
        { name: 'Operating Systems', icon: '💻' },
        { name: 'Computer Networks', icon: '🌐' },
    ],
    soft: [
        { name: 'Problem Solving', icon: '🧩' },
        { name: 'Team Collaboration', icon: '🤝' },
        { name: 'Communication', icon: '💬' },
        { name: 'Quick Learner', icon: '⚡' },
        { name: 'Adaptability', icon: '🔄' },
        { name: 'Leadership', icon: '🚀' },
    ],
};

/**
 * Navigation links
 */
export const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
];
