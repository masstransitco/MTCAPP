// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import MapContainer from './components/MapContainer/MapContainer.jsx';
import SceneContainer from './components/SceneContainer/SceneContainer.jsx';
import Footer from './components/Footer/Footer.jsx';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showStations, setShowStations] = useState(true);
  const [showCars, setShowCars] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleStations = () => {
    setShowStations(prev => !prev);
  };

  const toggleCars = () => {
    setShowCars(prev => !prev);
  };

  return (
    <div className="App">
      <Header 
        user={user} 
        setUser={setUser} 
        toggleStations={toggleStations} 
        toggleCars={toggleCars} 
      />
      <main className="main-content">
        <MapContainer showStations={showStations} showCars={showCars} />
        <SceneContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
