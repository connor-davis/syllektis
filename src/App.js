import './app.css'

import { Card, CardBody, Spinner } from 'reactstrap'
import { HashRouter, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'

import Database from './app/util/database'
import { Header } from './app/components/header/header'
import Materials from './app/pages/materials/materials'
import { NotFound } from './app/pages/404/NotFound'
import Syllektions from './app/pages/syllektions/syllektions'
import Syllektors from './app/pages/syllektors/syllektors'
import { isLoading } from './app/util/slices/loading.slice'
import { useSelector } from 'react-redux'

let database = new Database()

function App() {
    let loading = useSelector(isLoading)

    useEffect(() => {
        database.backup()
        database.init()
    }, [])

    return (
        <>
            <div className="background-paper" />
            <div className="app">
                <HashRouter>
                    <Header />

                    {loading ? (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Card>
                                <CardBody>
                                    <Spinner color="primary" />
                                </CardBody>
                            </Card>
                        </div>
                    ) : (
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    ></div>
                                )}
                            />
                            <Route
                                path="/syllektions"
                                component={Syllektions}
                            />
                            <Route path="/syllektors" component={Syllektors} />
                            <Route path="/materials" component={Materials} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    )}
                </HashRouter>
            </div>
        </>
    )
}

export default App
