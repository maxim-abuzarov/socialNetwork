import {combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profileReducer";
import messagesReducer from "./reducers/messagesReducer";
import asideReducer from "./reducers/asideReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    aside: asideReducer,
});

let store = createStore(reducers);

export default store;
