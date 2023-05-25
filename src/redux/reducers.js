const initialState = {
    place: {},
    searchHistory: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PLACE':
        return {
          ...state,
          place: action.payload,
        };
      case 'ADD_SEARCH_HISTORY':
        return {
          ...state,
          searchHistory: [...state.searchHistory, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  