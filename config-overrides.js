const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
	alias({
		Components: "src/components",
		Views: "src/views/",
		Services: "src/services",
		Config: "src/config",
		Store: "src/store",
		Utils: "src/utils",
	})(config);

	return config;
};
