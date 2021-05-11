import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";


const Header = ({ theme, setThemeState, isDarkTheme }) => {
    return(
        <header 
            className={
                `header w-full px-2 shadow-md
                flex items-center justify-between 
                ${theme.cardBg} ${theme.primaryText}`
            }
        >
            <h2 className={`${theme.primaryText} logo-name`}>Where in the world?</h2>
            <div onClick={setThemeState} className={`mode-switch cursor-pointer`}>
                {
                    isDarkTheme ? (
                        <span>
                            <FontAwesomeIcon icon={faSun} />
                        </span>
                    ) : (
                        <span>
                            <FontAwesomeIcon icon = { faMoon } />    
                        </span>
                    )
                }
            </div>
        </header>
    )
}

export default Header;