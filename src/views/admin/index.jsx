import { FormButton } from "Components/form/button";
import { Input, useInput } from "Components/form/input";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { deleteAccount, getAllAccount, validAccount } from "Services/admin.service";
import "./table.css";

const Admin = () => {
	const [searchUser, setSearch] = useInput();
	const [listUsers, setListUsers] = useState([]);

	const loadUser = async () => {
		setListUsers(await getAllAccount());
	};

	const onDelete = async (id, name) => {
		if (window.confirm('Etes de vous sûr de supprimer le compte "' + name + '"')) {
			await deleteAccount(id);
			loadUser();
		}
	};

	const onValid = async (id, name) => {
		if (window.confirm('Etes de vous sûr de valider le compte "' + name + '"')) {
			await validAccount(id);
			loadUser();
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	let users = listUsers;
	if (searchUser.value.length > 0) {
		users = listUsers.filter(
			(user) =>
				user.id.includes(searchUser.value) ||
				user.name.includes(searchUser.value) ||
				user.email.includes(searchUser.value) ||
				user.accountValid.includes(searchUser.value)
		);
	}

	return (
		<div className="admin-user">
			<Input
				name="admin-search"
				value={searchUser.value}
				label="Rechercher un utilisateur"
				msg="Mot clé présent dans un ou plusieurs champs"
				state="info"
				autoComplete="off"
				onChange={setSearch}
			/>
			<table>
				<thead>
					<tr>
						<th>Nom de compte</th>
						<th>Adresse e-mail</th>
						<th>Date de création</th>
						<th>Valider</th>
						<th>Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, key) => (
						<tr key={user.id + "-" + key}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.createdAt}</td>
							<td>
								{user.accountValid ? (
									user.accountValid
								) : (
									<FormButton label="Valider" className="btn-valid" onClick={() => onValid(user.id, user.name)} />
								)}
							</td>
							<td>
								<FormButton
									label="Supprimer"
									disabled={user.isAdmin}
									className="btn-delete"
									onClick={() => onDelete(user.id, user.name)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const ValidAccount = () => {
	const { id } = useParams();

	useEffect(() => {
		validAccount(id);
	}, [id]);

	return <Navigate to="/admin/" />;
};

export default Admin;
