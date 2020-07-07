import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import InitModal from "../views/InitModal";

const history = createBrowserHistory();

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={InitModal} exact/>
                <Route path="/hello" component={() => <h1>Hello</h1>}/>
            </Switch>
        </Router>
    )
}

export {history}
export default Routes;
