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
                <Route path="/" exact>
                    <InitModal/>
                </Route>
                <Route
                    path="/processo/:id"
                    component={(props: any) => (<Processo {...props} key={props.match.params.id}/>)}
                    exact
                />
            </Switch>
        </Router>
    )
}

export {history}
export default Routes;
