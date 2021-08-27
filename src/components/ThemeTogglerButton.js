import React from 'react';
import {ThemeContext} from "../features/context/theme-context";

const ThemeTogglerButton = () => {
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => (
                <button
                    onClick={toggleTheme}
                    style={{backgroundColor: theme.background, color: theme.foreground, border: 'none'}}
                className='my-2 shadow rounded'>
                    {theme.background === '#eeeeee'?<i className="bi bi-toggle-off"></i>:<i className="bi bi-toggle-on"></i>}
                     <span className='mx-1'>dark theme</span>
                </button>
            )}
        </ThemeContext.Consumer>
    );
};

export default ThemeTogglerButton;