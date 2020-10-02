import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/homePage'
import UserPage from './pages/userPage'

export default function Main() {
    return ( <
        main >
        <
        Switch >
        <
        Route exact path = '/'
        component = { Home }
        /> <
        Route path = '/user/:id'
        component = { UserPage }
        /> <
        /Switch> <
        /main>)
    }