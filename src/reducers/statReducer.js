const defaultStats = {
  questionCount: 0,
  completeCount: 0,
  onlineCount: 1
}

const statReducer = (state = defaultStats, action) => {

  switch (action.type) {
    case "UPDATE_STATS":
      return action.statInfo;
    default:
        return state;
  }
}

export default statReducer;
