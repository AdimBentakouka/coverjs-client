import { Route, Routes } from "react-router-dom";

import { AdminRoute, AuthRoute, NoAuthRoute } from "Components/routes/";

import Admin, { ValidAccount } from "Views/admin";
import { ForgotPassword, Login, Register } from "Views/auth";
import Collection from "Views/collections";
import Home from "Views/home";
import Reader from "Views/reader";
import "./app.css";

export default function App() {
	return (
		<Routes>
			<Route path="auth" element={<NoAuthRoute />}>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Register />} />
				<Route path="reset" element={<ForgotPassword />} />
			</Route>

			<Route element={<AuthRoute />}>
				<Route path="/" element={<Home />} />

				<Route path="/collection/:collectionName" element={<Collection />} />

				<Route path="/reader/:collectionName/:volumeName">
					<Route path=":page" element={<Reader />} />
					<Route path="" element={<Reader />} />
				</Route>

				<Route path="admin" element={<AdminRoute />}>
					<Route path="validaccount/:id" element={<ValidAccount />} />
					<Route path="" element={<Admin />} />
				</Route>

				<Route path="*" element={<Home />} />
			</Route>
		</Routes>
	);
}
