import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'remixicon/fonts/remixicon.css'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore } from 'redux'
import rootReducer from './Reducers'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import 'aos/dist/aos.css';
// import {GA_key} from "./serviceApi";
import RoutesComponent from "./RoutesComponent";
import {BrowserRouter as Router} from "react-router-dom";
// import ReactPixel from 'react-facebook-pixel';

const persistConfig = {
    key: 'root',
    blacklist: ['imageReducer'],
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

// ReactGA.initialize(GA_key);
// ReactGA.plugin.require('ec');

// Facebook tracking
const options = {
    autoConfig: true, 	// set pixel's autoConfig
    debug: true, 		// enable logs
};
// ReactPixel.init('612688249165594', options);
//
// ReactPixel.pageView();




// Sentry.init({
//     dsn: 'https://6f376bdfd9d44929880e60c4088bd43b@sentry.io/1783822',
//     integrations: [
//         new Integrations.CaptureConsole({
//             levels: ['error']
//         })
//     ],
//     release: '1.0.0',
//     environment: 'prod',
//     // maxBreadcrumbs: 50,
// });


const routing = (

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router >
                    <RoutesComponent />
            </Router>
        </PersistGate>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
