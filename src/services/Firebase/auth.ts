import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// Add this type
type StudentData = {
  studentId: string;
  department: string;
  academicYear: number;
  currentSemester: number;
  dateOfBirth: string;
  registrationDate: string;
};

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// User submits signup request
export const requestSignup = async (email: string, password: string) => {
  try {
    const signupRequestsRef = collection(db, 'signupRequests');
    await addDoc(signupRequestsRef, {
      email,
      password,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Secretary fetches all pending requests
export async function getPendingSignupRequests() {
  const snapshot = await getDocs(collection(db, 'signupRequests'));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as { status: string }) }))
    .filter((req) => req.status === 'pending');
}

// Secretary approves a request and assigns a role
export const approveSignupRequest = async (
  requestId: string,
  email: string,
  role: 'student' | 'teacher' | 'secretary',
  studentData?: StudentData
) => {
  try {
    // 1. Store current secretary session
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No secretary is currently logged in.');
    }

    // 2. Get request data
    const requestDoc = await getDoc(doc(db, 'signupRequests', requestId));
    const data = requestDoc.data();

    if (!data || !data.password) {
      throw new Error('Invalid request data or missing password');
    }

    // 3. Create the new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, data.password);
    const newUser = userCredential.user;

    // 4. Still logged in as new user here — write to Firestore using secretary’s context
    // So we switch back ASAP

    if (currentUser) {
      await auth.updateCurrentUser(currentUser); // restore secretary
    }

    // 5. Write to /users collection while secretary is active
    await setDoc(doc(db, 'users', newUser.uid), {
      uid: newUser.uid,
      email: newUser.email,
      role,
      ...(studentData
        ? {
            studentId: studentData.studentId,
            department: studentData.department,
            academicYear: studentData.academicYear,
            currentSemester: studentData.currentSemester,
            dateOfBirth: studentData.dateOfBirth,
            registrationDate: studentData.registrationDate,
          }
        : {}),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Ensure student data is being saved correctly
    if (role === 'student' && studentData) {
      // Create a student profile document with the extra data
      const studentProfileRef = collection(db, 'studentProfiles');
      await addDoc(studentProfileRef, {
        userId: newUser.uid, // Make sure we're using the correct userId
        studentId: studentData.studentId,
        department: studentData.department,
        academicYear: studentData.academicYear,
        currentSemester: studentData.currentSemester,
        dateOfBirth: studentData.dateOfBirth,
        registrationDate: studentData.registrationDate,
        createdAt: serverTimestamp(),
      });
    }

    // 6. Update signup request status
    await updateDoc(doc(db, 'signupRequests', requestId), {
      status: 'approved',
      approvedAt: serverTimestamp(),
    });

    // 7. (Optional) Sign out new user if still signed in
    if (auth.currentUser?.uid === newUser.uid) {
      await signOut(auth);
    }

    // 8. Restore secretary again just to be safe
    if (currentUser) {
      await auth.updateCurrentUser(currentUser);
    }

    return true;
  } catch (error) {
    console.error('Error approving signup request:', error);
    throw error;
  }
};

// Secretary denies a request
export async function denySignupRequest(requestId: string) {
  const requestRef = doc(db, 'signupRequests', requestId);
  await updateDoc(requestRef, { status: 'denied', processedAt: Timestamp.now() });
}

export const updateStudentProfile = async (userId: string, studentData: Partial<StudentData>) => {
  try {
    const profileRef = doc(db, 'studentProfiles', userId);
    await updateDoc(profileRef, {
      ...studentData,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};