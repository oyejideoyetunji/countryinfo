import React from "react";
import Header from './header';


const Layout = ({ theme, setThemeState, children, isDarkTheme }) => {

    return (
        <main className={`w-full h-min-full ${theme.gridBg}`}>
            <Header theme={theme} isDarkTheme={isDarkTheme} setThemeState={setThemeState} />
            {children}
        </main>
    )
}


export default Layout;