import React, {Component} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { login, logout } from './redux/actions/auth';
import {getUserFromDB} from './redux/actions/user';
import configureStore from './redux/store/configureStore';
import firebase from './firebase/firebase';



const store = configureStore();
class App extends Component{

   render(){
        return (
         <Provider store= {store}> 
            <AppRouter/>
         </Provider>
        );
   }
   
} 

firebase.auth().onAuthStateChanged((user)=>{
   if(user){

      const userData = {
         uid:user.uid,
         token:user.getIdToken,
         isAnonymous:user.isAnonymous,
         displayName: user.displayName,
         email: user.email,
         photoURL: user.photoURL,
         providerId:user.providerId,
         providerData:user.providerData
      }

      store.dispatch(login(userData));
      store.dispatch(getUserFromDB());
   }else{
      store.dispatch(logout());
   }
})

export default App
