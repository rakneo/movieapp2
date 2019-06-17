import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from '../components/NavBar';
import HomePage from '../components/HomePage';
import MovieDetailCard from '../components/MovieDetailCard';
import SearchPage from '../components/SearchPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import AuthRoute from './AuthRoute';



function AppRouter(){
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/:searchQuery/s' component={SearchPage}/>
                <Route path='/:imdbID/m' component={MovieDetailCard}/>
                <AuthRoute path='/login' component={LoginPage}/>
                <AuthRoute path='/register' component={RegisterPage}/>
            </Switch>
        </Router>
    )
}

export default AppRouter;