import React from 'react';
import { auth } from '../../googledatebase/config.js';

//---SIGN OUT LOGIC---
const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  //---SIGN OUT BUTTON---
  return (
    <button onClick={handleSignOut} className='signOutButton'>
      Sign Out
    </button>
  );
};

export default SignOutButton;
