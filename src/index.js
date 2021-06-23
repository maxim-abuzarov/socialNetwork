import React from 'react';
import store from './redux/store';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
