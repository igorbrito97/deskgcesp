import firebase from "firebaseConfig";
import {getUserPermissions} from "services/superadmService.js"; 
const databaseRef = firebase.database().ref();
const userDetailsRef = databaseRef.child("user-details");

const registerAction = (name, email, password) => async dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      userDetailsRef.push().set({
        userId: user.user.uid, 
        userName: name,
        userEmail: email,
        userRole: 'Usuario'
      })
      .then(() => {//login
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
      })
      dispatch({ type: "register", payload: true });
    })
    .catch(function(error) {
      alert('Erro ao criar conta! Erro' + error);
    });
};
export default registerAction;
