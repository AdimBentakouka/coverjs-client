import { Navigate, Outlet, useLocation } from "react-router-dom";

import Navbar from "Components/navbar/";

const AuthRoute = ({ isAuth }) => {
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to="/auth/login" state={{ from: location }} />;
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default AuthRoute;
