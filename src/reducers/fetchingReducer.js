const fetchingReducer = (state = true, action) => {

  switch (action.type) {
    case "FETCH":

        return action.isFetching

        break;

    default:
        return state;
  }
}

export default fetchingReducer;
