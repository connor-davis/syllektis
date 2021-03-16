import './app.css'

import { HashRouter, Route, Switch } from 'react-router-dom'

import { Header } from './app/components/header/header'
import { NotFound } from './app/pages/404/NotFound'
import Syllektions from './app/pages/syllektions/syllektions'
import Syllektors from './app/pages/syllektors/syllektors'
import { useEffect } from 'react'

function App() {
    useEffect(() => {}, [])

    return (
        <div className="app">
            <HashRouter>
                <Header />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/syllektions" component={Syllektions} />
                    <Route path="/syllektors" component={Syllektors} />
                    <Route path="/materials" />
                    <Route path="*" component={NotFound} />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App
