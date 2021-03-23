import { HashRouter, Route, Switch } from 'react-router-dom'

import React from 'react'

let UpdateRoutes = () => {
    return (
        <>
            <h1>Updates</h1>
            <HashRouter>
                <Switch>
                    <Route exact path="/update" />
                </Switch>
            </HashRouter>
        </>
    )
}

export default UpdateRoutes
