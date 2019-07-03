import React from 'react';
import {Router, Route, Switch} from "react-router-dom"
import createHistory from 'history/createBrowserHistory';
import Navbar from '../components/NavBar';
import HomePage from '../components/HomePage';
import MovieDetailCard from '../components/MovieDetailCard';
import SearchPage from '../components/SearchPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ProfilePage from '../components/ProfilePage';
import AuthRoute from './AuthRoute';

export const history = createHistory();


function AppRouter(){
    return (
        <Router history={history}>
            <Navbar/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/search' component={SearchPage}/>
                <Route path='/:imdbID/m' component={MovieDetailCard}/>
                <Route path='/profile' component={ProfilePage}/>
                <AuthRoute path='/login' component={LoginPage}/>
                <AuthRoute path='/register' component={RegisterPage}/>
            </Switch>
        </Router>
    )
}

export default AppRouter;