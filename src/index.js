import express from "express";
import path from "path";
import cors from "cors";
import auth from "./routes/auth";
import store from "./routes/store";
import * as admin from "firebase-admin";
import { authJson } from "./util/auth-firebase";
import { connectToDb } from "./repository/connect";

admin.initializeApp({
	credential: admin.credential.cert(authJson),
});

connectToDb();

const app = express();
const port = app.get("PORT") || 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/store", store);

export default app.listen(port, () =>
	console.log(`Server listening on port ${port}...`)
);
