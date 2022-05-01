import axios from "axios";
import { API_URL } from "Config/";

import store from "Store";
import { refreshToken } from "Store/actions/authAction";
import { getNewToken } from "./auth.service";

const ERROR_NAME_EXPIRED_TOKEN = "TokenExpiredError";
const ERROR_NAME_TOKEN_ERROR = "JsonWebTokenError";

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Injection du token & refresh token dans les requpetes axios
instance.interceptors.request.use(
	(config) => {
		const { token, refreshToken } = store.getState().auth;

		config.headers["token"] = token;
		config.headers["refreshtoken"] = refreshToken;

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

let isRefreshing = false;

// Gestions des erreurs API
instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const { config } = err;

		if (err.response.status === 401) {
			if (!isRefreshing) {
				isRefreshing = true;
				if (
					err.request.responseType === "blob" ||
					(!config?._retry &&
						(err.response.data.name === ERROR_NAME_EXPIRED_TOKEN || err.response.data.name === ERROR_NAME_TOKEN_ERROR))
				) {
					config._retry = true;

					const retryOrigReq = new Promise((resolve, reject) => {
						getNewToken()
							.then((newToken) => {
								isRefreshing = false;
								store.dispatch(refreshToken(newToken));
								resolve(instance(config));
							})
							.catch((err) => reject(err));
					});

					return retryOrigReq;
				}
			}
		}

		return Promise.reject(err);
	}
);

export default instance;
