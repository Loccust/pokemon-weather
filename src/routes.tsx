import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Home from './pages/home';

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastProvider>
                <Switch>
                    <Route path="/" exact={true} component={() => <Home />} />
                    {/* <Route path="/activities" component={Activities}/> */}
                </Switch>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default Routes;