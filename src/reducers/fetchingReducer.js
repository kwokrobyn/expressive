const fetchingReducer = (state = false, action) => {

  switch (action.type) {
    case "FETCH":
        return action.isFetching;

    default:
        return state;
  }
}

export default fetchingReducer;
