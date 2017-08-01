const fetchingReducer = (state = false, action) => {

  switch (action.type) {
    case "FETCH":

        return action.isFetching
        // return true
        break;

    default:
        return state;
  }
}

export default fetchingReducer;
