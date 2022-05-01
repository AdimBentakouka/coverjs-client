import { Navigate, Outlet } from "react-router-dom";

const NoAuthRoute = ({ isAuth }) => {
	if (isAuth) {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
};

export default NoAuthRoute;
