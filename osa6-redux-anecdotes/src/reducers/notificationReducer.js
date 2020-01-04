const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification.text;
    default:
      return state;
  }
};

export const showNotification = text => {
  return {
    type: "SET_NOTIFICATION",
    notification: { text }
  };
};

export default notificationReducer;
