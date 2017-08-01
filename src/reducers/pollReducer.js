const defaultPoll = {
  isActive: false,
  question: "",
  options: {}
}

const pollReducer = (state = defaultPoll, action) => {
  switch (action.type) {

    case "CREATE_POLL":
      return {
        isActive: true,
        question: action.pollInfo.question, 
        options: action.pollInfo.options
      }

    default:
        return state;
  }
}

export default pollReducer;
