export default (state = {}, action) => {
  switch (action.type) {
    case "register":
      return {
        ...state,
        loggedIn: false
      };
    case "login":
      return {
        ...state,
        loggedIn: true,
        user: action.payload

      };
    case "getPermissions":
      return {
        ...state,
        permissions: action.payload
      }
    default:
      return state;
  }
};
