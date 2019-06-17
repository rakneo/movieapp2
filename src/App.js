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
      store.dispatch(login(user.uid));
      store.dispatch(getUserFromDB());
   }else{
      store.dispatch(logout());
   }
})

export default App
