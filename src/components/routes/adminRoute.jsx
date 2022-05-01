const { Navigate, Outlet } = require("react-router-dom");

const AdminRoute = ({ isAdmin }) => {
	if (!isAdmin) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default AdminRoute;
