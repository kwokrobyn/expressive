const questionReducer = (state = {}, action) => {

  switch (action.type) {
    case "GET_QUESTIONS":
      return action.questions;

    case "CLEAR_QUESTIONS":
      return {};

    default:
        return state;
  }
}

export default questionReducer;
