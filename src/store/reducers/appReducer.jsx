import * as types from "../actions/appActionType";

const LUMINOSITY = "luminosity";

const initialState = {
	luminosity: window.localStorage.getItem(LUMINOSITY) || 100,
};

export default function ModalReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_LUMINOSITY:
			const { value } = action;

			window.localStorage.setItem(LUMINOSITY, value);

			return {
				...state,
				luminosity: value,
			};

		default:
			return state;
	}
}
