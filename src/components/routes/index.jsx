import { connect } from "react-redux";

import _AdminRoute from "./adminRoute";
import _AuthRoute from "./authRoute";
import _NoAuthRoute from "./noAuthRoute";

const mapStateToProps = (state) => {
	return {
		isAdmin: state.auth.user?.isAdmin,
		isAuth: state.auth.token ? true : false,
	};
};

export const AdminRoute = connect(mapStateToProps)(_AdminRoute);
export const AuthRoute = connect(mapStateToProps)(_AuthRoute);
export const NoAuthRoute = connect(mapStateToProps)(_NoAuthRoute);
