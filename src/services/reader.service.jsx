import api from "./api";

export const getVolumePage = (volumeId, currentPage, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/reader/${volumeId}/${currentPage}`, { responseType: "blob", signal })
			.then((response) => {
				if (response.data) {
					resolve(URL.createObjectURL(response.data));
				}
				reject(response.response);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
