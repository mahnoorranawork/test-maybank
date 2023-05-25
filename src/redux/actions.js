import axios from 'axios'

export const setPlace = (place) => {
    return {
      type: 'SET_PLACE',
      payload: place,
    };
  };
  
  export const addSearchHistory = (search) => {
    return {
      type: 'ADD_SEARCH_HISTORY',
      payload: search,
    };
  };
  // placesActions.js

export const fetchPlaces = (places) => {
  return (dispatch) => {
    // You can perform any necessary preprocessing or data manipulation here before dispatching the action

    // Assuming you are using a library like axios to make the API request
    // Replace 'YOUR_API_KEY' with your actual Google Maps API key
    const apiKey = 'YOUR_API_KEY';
    const searchQuery = places[0]?.formatted_address; // Assuming you want to use the first place from the results

    // Perform the API request to fetch places
    axios
      .get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`)
      .then((response) => {
        // Handle the response and extract the necessary data
        const placesData = response.data.results.map((place) => ({
          name: place.name,
          address: place.formatted_address,
          // Extract any other relevant information from the place object
        }));

        // Dispatch the action to store the fetched places in the Redux store
        dispatch({ type: 'PLACES_FETCHED', payload: placesData });
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        dispatch({ type: 'FETCH_PLACES_ERROR', payload: error.message });
      });
  };
};
