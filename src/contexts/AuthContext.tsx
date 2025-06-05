import { auth, db } from '@/services/Firebase/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'student' | 'teacher' | 'secretary' | 'admin' | null;

// Define a complete user profile type
interface UserProfile extends DocumentData {
  id?: string;
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  createdAt?: any;
  // Add any other fields you store in your user documents
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null; // Add user profile data
  userRole: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null, // Initialize as null
  userRole: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State for user profile
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          // Get user role and profile from Firestore
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const docId = querySnapshot.docs[0].id;

            // Set complete user profile including firstName and lastName
            setUserProfile({
              id: docId,
              ...userData,
            } as UserProfile);

            setUserRole(userData.role as UserRole);
          } else {
            setUserProfile(null);
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
          setUserRole(null);
        }
      } else {
        setUserProfile(null);
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile, // Include user profile in context value
    userRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
