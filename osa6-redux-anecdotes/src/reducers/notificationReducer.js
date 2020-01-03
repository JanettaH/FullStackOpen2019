const initialState = "Tämä on notification";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const notificataionChange = notification => {
  return {
    type: "SET_NOTIFICATION",
    data: { notification }
  };
};

export default notificationReducer;
