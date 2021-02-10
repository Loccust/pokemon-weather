import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Location from './pages/location';
import PokemonWeather from './pages/pokemon-weather';

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastProvider>
                <Switch>
                    <Route path="/" exact={true} component={() => <Location/>} />
                    <Route path="/pokeweather" component={() => <PokemonWeather/>}/>
                </Switch>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default Routes;