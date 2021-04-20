import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../navBar/Navbar';
import HomePage from '../homePage/HomePage';
import AddNews from '../News/AddNews';
import NewsDetails from '../News/NewsDetails';
import EditNews from '../News/EditNews'


export default function MainComponent(props) {

    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={HomePage}>
                    </Route>
                    <Route exact path='/home' component={HomePage}>
                    </Route>
                    <Route path='/addNews' component={AddNews}>
                    </Route>
                    <Route path='/:id' component={EditNews}>
                    </Route>
                    < Route path='/:newsId' component={NewsDetails}>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}