import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import InitModal from "../views/InitModal";
import Processo from "../views/processo/Processo";

const history = createBrowserHistory();

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={InitModal} exact/>
                <Route path="/processo/:id" component={Processo}/>
            </Switch>
        </Router>
    )
}

export {history}
export default Routes;
