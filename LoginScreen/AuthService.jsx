import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../Firebase';

firebase.initializeApp(firebaseConfig);
// Function to authenticate user
export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // User is authenticated
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

// Function to update user data in the database
export const updateUserProfile = (uid, userData) => {
  firebase.database().ref(`users/${uid}`).set(userData);
};

// Example: Check user role before allowing access to certain screens or features
export const checkUserRole = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const snapshot = await firebase.database().ref(`users/${currentUser.uid}`).once('value');
    const userData = snapshot.val();
    if (userData && userData.role === 'student') {
      // Allow access to student-specific features
    } else if (userData && userData.role === 'teacher') {
      // Allow access to teacher-specific features
    } else if (userData && userData.role === 'admin') {
      // Allow access to admin-specific features
    }
  }
};
