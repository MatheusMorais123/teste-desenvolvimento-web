import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </BrowserRouter>
    );
}