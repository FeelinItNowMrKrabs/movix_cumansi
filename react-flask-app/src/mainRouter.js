import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/homePage'
import UserPage from './pages/userPage'
import General from './pages/generalPage'
import StartPage from './pages/startPage'

export default function Main() {
    return (
        <Switch >
            <Route path='/general' component={General} />
            <Route path='/user/:id' component={UserPage} />
            <Route path='/:id' component={Home} />
            <Route path='' component={StartPage}/>
        </Switch>
    )
}