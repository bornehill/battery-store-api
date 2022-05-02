import ApiResponse from "../util/ApiResponse";
import * as admin from "firebase-admin";

export async function isAuthenticated(req, res, next) {
	const authorization = req.headers["x-auth-token"];

	if (!authorization) return ApiResponse.Unauthorized(res, "Unauthorized");

	if (!authorization.startsWith("Bearer"))
		return ApiResponse.Unauthorized(res, "Unauthorized");

	const split = authorization.split("Bearer ");
	if (split.length !== 2) return ApiResponse.Unauthorized(res, "Unauthorized");

	const token = split[1];

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		res.locals = {
			...res.locals,
			uid: decodedToken.uid,
			role: decodedToken.role,
			email: decodedToken.email,
		};
		return next();
	} catch (err) {
		console.error(`${err.code} -  ${err.message}`);
		return ApiResponse.Unauthorized(res, "Unauthorized");
	}
}

export async function getUsers() {
	try {
		const resp = await admin.auth().listUsers();

		return resp.users.map((u) => {
			return { uid: u.uid, email: u.email };
		});
	} catch (err) {
		console.error(`${err.code} -  ${err.message}`);
		return ApiResponse.InternalServerError(res, "Internal Error getting users");
	}
}
