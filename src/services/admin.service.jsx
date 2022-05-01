import api from "./api";

export const getAllAccount = () => {
	return new Promise(function (resolve, reject) {
		api.get("/user/admin/getusers/")
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

export const validAccount = (id) => {
	return new Promise(function (resolve, reject) {
		api.get("/user/admin/validaccount/" + id)
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

export const deleteAccount = (id) => {
	return new Promise(function (resolve, reject) {
		api.get("/user/admin/delete/" + id)
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
