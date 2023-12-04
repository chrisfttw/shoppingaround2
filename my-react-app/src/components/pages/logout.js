import React from 'react';
import { auth } from '../../googledatebase/config';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
