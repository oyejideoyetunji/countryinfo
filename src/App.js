import React, { useState } from 'react'
import {
    BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { darkTheme, lightTheme } from './lib/theme'
import Layout from './components/layout';
import Countries from './screens/countries';
import { routes } from './lib/routes';
import Country from './screens/country';


const App = () => {

    const [isDarkTheme, setIsDarktheme] = useState(false);
    const setThemeState = () => { setIsDarktheme(!isDarkTheme) };
    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <Router>
            <Layout theme={theme} isDarkTheme={isDarkTheme} setThemeState={setThemeState}>
                <Switch>
                    <Route
                        exact path={routes.Home}
                        render={(routeProps) => <Countries {...routeProps} theme={theme} />}
                    />
                    <Route
                        exact path={routes.Country}
                        render={(routeProps) => <Country {...routeProps} theme={theme} />}
                    />
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
