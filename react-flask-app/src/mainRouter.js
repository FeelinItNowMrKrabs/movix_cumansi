import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/homePage'
import UserPage from './pages/userPage'
import General from './pages/generalPage'

export default function Main() {
    return (<main >
        <Switch >
            <Route path='/:id' component={Home} />
            <Route path='/user/:id' component={UserPage} />
            <Route path='/general' component={General} />
        </Switch>
    </main>)
}