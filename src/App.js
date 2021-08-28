import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import React from "react";
import Greetings from "./page/Greetings";
import {ThemeContext, themes } from "./features/context/theme-context"


class App extends React.Component {

    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        // Состояние хранит функцию для обновления контекста,
        // которая будет также передана в Provider-компонент.
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
            greetings: true
        };
    }

    render(){

        return (

            <ThemeContext.Provider value={this.state}>
                <BrowserRouter className='bg-info'>

                    <AppRouter/>
                    <Greetings />

                </BrowserRouter>
            </ThemeContext.Provider>


        );
    }


}

export default App;
