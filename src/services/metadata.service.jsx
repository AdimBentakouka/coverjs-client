import api from "./api";

export const GetSearch = (signal) => {
	return new Promise(function (resolve, reject) {
		api.get("/metadata/getSearchCollection/", { signal })
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

export const getReadingVolumes = (signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/getcurrentvolumes`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};

export const getCollections = (signal) => {
	return new Promise((resolve, reject) => {
		api.get("/metadata/", { signal })
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getVolumes = (nameCollection, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/${nameCollection}`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};

export const markRead = (id, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/markRead/${id}`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};

export const markUnread = (id, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/markUnread/${id}`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};

export const markCollectionRead = (id, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/markCollectionRead/${id}`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};

export const markCollectionUnread = (id, signal) => {
	return new Promise((resolve, reject) => {
		api.get(`/metadata/markCollectionUnread/${id}`, { signal })
			.then((response) => resolve(response.data))
			.catch((err) => reject(err));
	});
};
