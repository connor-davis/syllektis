import './app.css'

import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom'

import { Header } from './components/header/header'
import { NotFound } from './pages/404/NotFound'
import Syllektions from './pages/syllektions/syllektions'
import Syllektors from './pages/syllektors/syllektors'
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
