import {combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profileReducer";
import messagesReducer from "./reducers/messagesReducer";
import asideReducer from "./reducers/asideReducer";
import usersReducer from "./reducers/usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    aside: asideReducer,
    usersPage: usersReducer,
});

let store = createStore(reducers);

export default store;
