import './app.css'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Header } from './components/header/header'
import { NotFound } from './pages/404/NotFound'
import { Syllektions } from './pages/syllektions/syllektions'
import { useEffect } from 'react'

function App() {
    useEffect(() => {}, [])

    return (
        <div className="app">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/syllektions" component={Syllektions} />
                    <Route path="/syllektors" />
                    <Route path="/materials" />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
