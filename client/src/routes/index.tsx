import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={() => <h1>Hello</h1>} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
