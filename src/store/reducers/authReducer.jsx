import { jwtDecode } from "Utils/token";

import * as types from "../actions/authActionType";

const TOKEN = "TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

const initialState = {
	token: window.localStorage.getItem(TOKEN),
	refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
	user: jwtDecode(window.localStorage.getItem(TOKEN)),
};

export default function authReducer(state = initialState, { type, payload }) {
	switch (type) {
		case types.LOGIN: {
			const { token, refreshToken } = payload;

			window.localStorage.setItem(TOKEN, token);
			window.localStorage.setItem(REFRESH_TOKEN, refreshToken);

			return {
				...state,
				token,
				refreshToken,
				user: jwtDecode(token),
			};
		}

		case types.REFRESH_TOKEN: {
			const { token } = payload;

			window.localStorage.setItem(TOKEN, token);

			return {
				...state,
				token,
				user: jwtDecode(token),
			};
		}

		case types.LOGOUT: {
			window.localStorage.removeItem(TOKEN);
			window.localStorage.removeItem(REFRESH_TOKEN);

			return {
				...state,
				token: null,
				refreshtoken: null,
				user: null,
			};
		}

		default:
			return state;
	}
}
