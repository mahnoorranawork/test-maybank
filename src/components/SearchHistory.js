import React from 'react';
import { useSelector } from 'react-redux';

const SearchHistory = () => {
  const searchHistory = useSelector((state) => state.searchHistory);

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
