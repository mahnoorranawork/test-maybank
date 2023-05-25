import React from 'react';
import AutocompleteInput from './components/AutocompleteInput';
import Map from './components/Map';
import SearchHistory from './components/SearchHistory';

const App = () => {
  return (
    <div>
      <h1>Google Place Autocomplete</h1>
      <AutocompleteInput />
      <Map />
      <SearchHistory />
    </div>
  );
};

export default App;
