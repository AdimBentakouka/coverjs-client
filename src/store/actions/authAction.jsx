import * as types from "./authActionType";

export const setLogin = ({ token, refreshToken }) => ({
	type: types.LOGIN,
	payload: { token, refreshToken },
});

export const refreshToken = ({ token }) => ({
	type: types.REFRESH_TOKEN,
	payload: { token },
});

export const logout = () => ({
	type: types.LOGOUT,
});
