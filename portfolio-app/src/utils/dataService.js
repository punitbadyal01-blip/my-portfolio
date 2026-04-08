// ==============================================================
// dataService.js — Utility to fetch data from Firestore
// ==============================================================
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch all projects from Firestore
 */
export const fetchProjectsFromFirebase = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projects = querySnapshot.docs.map((doc, index) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return projects.sort((a, b) => {
            // Sort by featured first, then by date
            if (a.featured === b.featured) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.featured ? -1 : 1;
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

/**
 * Fetch all certificates from Firestore
 */
export const fetchCertificatesFromFirebase = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'certificates'));
        const certificates = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return certificates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
};
