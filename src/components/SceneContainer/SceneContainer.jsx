// src/components/SceneContainer/SceneContainer.jsx
import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import './SceneContainer.css';

const SceneContainer = () => {
  const mapRef = useRef();

  useEffect(() => {
    const options = {
      css: true,
      // Use CDN for ArcGIS API if not using a local version
      url: 'https://js.arcgis.com/4.24/'
    };

    loadModules(['esri/Map', 'esri/views/SceneView'], options)
      .then(([ArcGISMap, SceneView]) => {
        const map = new ArcGISMap({
          basemap: 'streets',
          ground: 'world-elevation'
        });

        const view = new SceneView({
          container: mapRef.current,
          map: map,
          center: [-100.33, 43.69],
          zoom: 4
        });

        return () => {
          if (view) {
            view.destroy();
          }
        };
      })
      .catch(err => {
        console.error("ArcGIS load error:", err);
      });
  }, []);

  return (
    <div className="scene-container" ref={mapRef}></div>
  );
};

export default SceneContainer;
