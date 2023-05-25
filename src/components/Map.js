import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, Marker, InfoWindow, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { fetchPlaces } from '../redux/actions';

const Map = () => {
  const [searchBox, setSearchBox] = useState(null);
  const selectedPlace = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Initial center coordinates

  useEffect(() => {
    if (selectedPlace.lat && selectedPlace.lng) {
      setMapCenter({ lat: selectedPlace.lat, lng: selectedPlace.lng });
    }
  }, [selectedPlace]);

  const handleLoad = (ref) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      dispatch(fetchPlaces(places));
    }
  };

  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCLM4F1os4AJCCgA-Uqre-pcoU12WST2Rs" libraries={["places"]}>
        <GoogleMap
          center={mapCenter}
          zoom={14}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {selectedPlace.lat && selectedPlace.lng && (
            <Marker
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onClick={handleMarkerClick}
            />
          )}
          {infoWindowOpen && selectedPlace.lat && selectedPlace.lng && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>{selectedPlace.name}</div>
            </InfoWindow>
          )}
          <StandaloneSearchBox onLoad={handleLoad} onPlacesChanged={handlePlacesChanged}>
            <input type="text" placeholder="Search places" />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
