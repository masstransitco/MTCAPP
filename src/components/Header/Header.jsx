// src/components/Header/Header.jsx
import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { auth, provider } from '../../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import './Header.css';

const Header = ({ user, setUser, toggleStations, toggleCars }) => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <header className="header">
      <h1>Mass Transit App</h1>
      <ToggleSwitch 
        toggleStations={toggleStations} 
        toggleCars={toggleCars} 
      />
      <div className="auth-section">
        {user ? (
          <div className="dropdown">
            <img src={user.photoURL} alt="User Avatar" className="avatar" />
            <div className="dropdown-content">
              <button onClick={handleSignOut}>Logout</button>
            </div>
          </div>
        ) : (
          <button onClick={handleSignIn} className="signin-button">
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
