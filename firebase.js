import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getFirestore, doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyd3-u_uHofFbR49UGUUV5CiPDLRudXNI",
  authDomain: "m2mnm2ir.firebaseapp.com",
  projectId: "m2mnm2ir",
  storageBucket: "m2mnm2ir.firebasestorage.app",
  messagingSenderId: "329607977778",
  appId: "1:329607977778:web:373fd066dcb0e7c157552b",
  measurementId: "G-B9XGT1HZC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Automatically track a new visitor when this file loads
const recordVisit = async () => {
    try {
        const statsRef = doc(db, 'stats', 'visitors');
        await setDoc(statsRef, { count: increment(1) }, { merge: true });
        console.log("Visitor recorded!");
    } catch (e) {
        console.error("Error updating visitor count: ", e);
    }
};

// Call the visitor tracking
recordVisit();

// Expose a global function to be called from script.js to record the test result
window.recordResult = async (category) => {
    try {
        const statsRef = doc(db, 'stats', 'results');
        const updateData = {};
        updateData[category] = increment(1);
        
        await setDoc(statsRef, updateData, { merge: true });
        console.log(`Result recorded for: ${category}`);
    } catch (e) {
        console.error("Error updating result count: ", e);
    }
};

// Expose a function to track clicks to the IR Web
window.recordIRClick = async () => {
    try {
        const statsRef = doc(db, 'stats', 'ir_clicks');
        await setDoc(statsRef, { count: increment(1) }, { merge: true });
        console.log("IR Click recorded!");
    } catch (e) {
        console.error("Error updating IR click count: ", e);
    }
};
