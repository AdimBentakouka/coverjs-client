import api from "./api";

export const Login = ({ email, password }) => {
	return new Promise(function (resolve, reject) {
		api.post("/user/login", { email, password })
			.then((response) => {
				if (response.data?.token) {
					resolve(response.data);
				}

				reject(response.response);
			})
			.catch((err) => {
				reject(err.response);
			});
	});
};

export const Register = ({ email, username, password }) => {
	return new Promise(function (resolve, reject) {
		api.post("/user/", { email, username, password })
			.then((response) => {
				if (response.data) {
					resolve(response.data);
				}

				reject(response.response);
			})
			.catch((err) => {
				reject(err.response);
			});
	});
};

export const getNewToken = () => {
	return new Promise(function (resolve, reject) {
		api.get("/user/refreshtoken")
			.then((response) => {
				if (response.data?.token) {
					resolve(response.data);
				}
				reject(response.response);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
