import React from "react";
import { Provider } from 'react-redux';
import store from './js/store';

import MainPageContainer from "./components/MainPageContainer";

function App() {
    return (
        <div>
            <Provider store={store}>
                < MainPageContainer />
            </Provider>
        </div>);
}


export default App;
