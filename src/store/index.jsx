import { combineReducers, createStore, compose } from "redux";

import authReducer from "./reducers/authReducer";
import AppReducer from "./reducers/appReducer";

let enhancers = [];

if (process.env.NODE_ENV === "development") {
	enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
	combineReducers({
		app: AppReducer,
		auth: authReducer,
	}),
	compose(...enhancers)
);

export default store;
