import './app.css'

import { HashRouter, Route, Switch } from 'react-router-dom'

import { Header } from './app/components/header/header'
import { NotFound } from './app/pages/404/NotFound'
import Syllektions from './app/pages/syllektions/syllektions'
import Syllektors from './app/pages/syllektors/syllektors'
import { useEffect } from 'react'

/**
 * Momentum: Momentum of an object is the product of the mass and velocity of a moving body.
 * Newtons Second Law Of Motion: The net or resultant force acting on an object is equal to the rate of change in momentum.
 * The Conservation Of Linear Momentum: If two objects collide, then the total momentum before and after the collision will be the same if there is no external force acting on the colliding objects.
 */


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
