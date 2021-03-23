import './app.css'

import { HashRouter, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'

import Database from './app/util/database'
import { Header } from './app/components/header/header'
import Materials from './app/pages/materials/materials'
import { NotFound } from './app/pages/404/NotFound'
import Syllektions from './app/pages/syllektions/syllektions'
import Syllektors from './app/pages/syllektors/syllektors'
import dialogs from 'electron-dialogs'

let database = new Database()


function App() {
    useEffect(() => {
        database.backup()
        database.init()

        dialogs.renderer('app-updates')
    }, [])

    return (
        <>
            <div className="background-paper" />
            <div className="app">
                <HashRouter>
                    <Header />

                    <Switch>
                        <Route exact path="/" />
                        <Route path="/syllektions" component={Syllektions} />
                        <Route path="/syllektors" component={Syllektors} />
                        <Route path="/materials" component={Materials} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </HashRouter>
            </div>
        </>
    )
}

export default App
