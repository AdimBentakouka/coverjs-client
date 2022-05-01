import * as types from "./appActionType";

export const setLuminosity = (value) => ({
	type: types.SET_LUMINOSITY,
	value,
});
