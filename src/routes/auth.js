import express from "express";
import authService from "../services/auth.service";
import ApiResponse from "../util/ApiResponse";
import { isAuthenticated } from "../util/authenticated";
import { profileModel } from "../repository/connect";

const router = express.Router();

router
	.get("/menu", isAuthenticated, async (req, res) => {
		try {
			const menu = await authService.getMenu();
			ApiResponse.Ok(res, menu, "Succeded");
		} catch (err) {
			ApiResponse.Unauthorized(res, "Invalid token");
		}
	})
	.get("/profile/:id", isAuthenticated, async (req, res) => {
		try {
			const profile = await profileModel.getByUserUid(req.params.id);

			const myProfile =
				profile?.length > 0 ? { ...profile[0]._doc, id: profile._id } : null;

			ApiResponse.Ok(res, myProfile, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get Profile by Id"
			);
		}
	})
	.put("/profile/:id/update", isAuthenticated, async (req, res) => {
		let profile = await profileModel.getByUserUid(req.params.id);

		if (profile?.length > 0) {
			try {
				const updated = await profileModel.updateProfile(req.body, profile[0]);
				ApiResponse.Created(res, updated, "Process performed successfully");
			} catch (err) {
				ApiResponse.InternalServerError(
					res,
					err,
					"Got error in Update Profile"
				);
			}
			return;
		}

		profile = profileModel({
			...req.body,
			userUid: req.params.id,
		});

		try {
			const saved = await profileModel.addProfile(profile);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Profile");
		}
	});

export default router;
