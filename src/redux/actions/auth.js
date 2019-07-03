import firebase from '../../firebase/firebase';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const login = (userData) => ({
  type: 'LOGIN',
  ...userData
});

export const startLogin = (email, password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
};

export const startLoginGoogle = () =>{
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};