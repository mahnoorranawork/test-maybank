import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlace } from '../redux/actions';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';

const AutocompleteInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const handlePlaceSelect = (place) => {
    dispatch(setPlace(place));
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const loadPlaces = async (inputValue) => {
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: inputValue },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const places = predictions.map((prediction) => ({
            description: prediction.description,
            place_id: prediction.place_id,
          }));
          setOptions(places);
        }
      }
    );
  };

  const handleOpen = () => {
    if (inputValue) {
      loadPlaces(inputValue);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.description}
      autoHighlight
      value={null}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => {
        setInputValue(newValue ? newValue.description : '');
        handlePlaceSelect(newValue);
      }}
      onOpen={handleOpen}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a place"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default AutocompleteInput;
