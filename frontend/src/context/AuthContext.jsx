  import React, { createContext, useState, useEffect } from 'react';
  import { auth } from '../firebase/firebase';
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';

  export const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    }, []);

    const register = async (email, password) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error('Registration error:', error.message);
        throw error; // Throw the error to handle it in the calling component
      }
    };

    const login = async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error('Login error:', error.message);
        throw error; // Throw the error to handle it in the calling component
      }
    };

    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Logout error:', error.message);
        throw error; // Throw the error to handle it in the calling component
      }
    };

    const value = {
      currentUser,
      register,
      login,
      logout,
    };

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;
