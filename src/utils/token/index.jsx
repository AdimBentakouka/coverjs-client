import jwt_decode from "jwt-decode";

export const jwtDecode = (token) => {
	try {
		const decoded = jwt_decode(token);
		return decoded;
	} catch (err) {
		return null;
	}
};
