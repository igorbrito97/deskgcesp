import firebase from "firebaseConfig";
import {getUserPermissions} from "services/superadmService.js"; 

const loginAction = (email, password) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user) {
      dispatch({ type: "login", payload: user });
      const response = getUserPermissions(user.user.uid);
      response.then(permissions => {
        if(permissions)
          dispatch({ type: "getPermissions", payload: permissions });
      })
    })
    .catch(function(error) {
      alert("Erro ao logar: " + error);
    });
};
export default loginAction;
