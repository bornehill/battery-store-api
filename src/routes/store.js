import express from "express";
import ApiResponse from "../util/ApiResponse";
import { isAuthenticated } from "../util/authenticated";
import {
	brandModel,
	groupModel,
	inventoryModel,
	inventoryRequestModel,
	locationModel,
	orderModel,
	productModel,
	noteModel,
	employeeModel,
} from "../repository/connect";

const router = express.Router();

router
	.get("/", isAuthenticated, async (req, res) => {
		try {
			const locations = await locationModel.getAll();
			ApiResponse.Ok(res, locations, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get All Locations"
			);
		}
	})
	.post("/locations", isAuthenticated, async (req, res) => {
		const centre = locationModel({ ...req.body });
		try {
			const saved = await locationModel.addLocation(centre);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Location");
		}
	})
	.put("/locations", isAuthenticated, async (req, res) => {
		try {
			const saved = await locationModel.updateLocation(req.body);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Update Location");
		}
	})
	.get("/brands", isAuthenticated, async (req, res) => {
		try {
			const brands = await brandModel.getAll();
			ApiResponse.Ok(res, brands, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get All Brands");
		}
	})
	.post("/brands", isAuthenticated, async (req, res) => {
		const brand = brandModel({ ...req.body });
		try {
			const saved = await brandModel.addBrand(brand);
			ApiResponse.Created(res, brand, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Brand");
		}
	})
	.get("/groups", isAuthenticated, async (req, res) => {
		try {
			const groups = await groupModel.getAll();
			ApiResponse.Ok(res, groups, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get Groups");
		}
	})
	.post("/groups", isAuthenticated, async (req, res) => {
		const group = groupModel({ ...req.body });
		try {
			const saved = await groupModel.addGroup(group);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Group");
		}
	})
	.put("/groups", isAuthenticated, async (req, res) => {
		try {
			const saved = await groupModel.updateGroup(req.body);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Update Group");
		}
	})
	.get("/products", isAuthenticated, async (req, res) => {
		try {
			const products = await productModel.getProducts(req.query);
			const myProducts = products.map((l) => {
				return { ...l._doc, id: l._id };
			});

			ApiResponse.Ok(res, myProducts, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get Products by Group"
			);
		}
	})
	.post("/products", isAuthenticated, async (req, res) => {
		const product = productModel({ ...req.body });
		try {
			const saved = await productModel.addProduct(product);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Product");
		}
	})
	.put("/products", isAuthenticated, async (req, res) => {
		try {
			const saved = await productModel.updateProduct(req.body);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Update Product");
		}
	})
	.get("/inventory/:location", isAuthenticated, async (req, res) => {
		try {
			const inventory = await inventoryModel.geyByLocation(req.params.location);
			ApiResponse.Ok(res, inventory, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get Inventory");
		}
	})
	.post("/inventory", isAuthenticated, async (req, res) => {
		try {
			const saved = await inventoryModel.updateInventory({ ...req.body });
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Update Inventory"
			);
		}
	})
	.put("/inventory", isAuthenticated, async (req, res) => {
		try {
			const saved = await inventoryModel.inputOutput({ ...req.body });
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Input/Output Inventory"
			);
		}
	})
	.get("/invrequest", isAuthenticated, async (req, res) => {
		try {
			const movs = await inventoryRequestModel.getRequests();
			ApiResponse.Ok(res, movs, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get Input/Output Request"
			);
		}
	})
	.post("/invrequest", isAuthenticated, async (req, res) => {
		const mov = inventoryRequestModel({ ...req.body });
		try {
			const saved = await inventoryRequestModel.add(mov);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			console.log(err);
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Input/Output Request"
			);
		}
	})
	.get("/order", isAuthenticated, async (req, res) => {
		try {
			const orders = await orderModel.getOrders(req.query);
			ApiResponse.Ok(res, orders, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get Orders by filter"
			);
		}
	})
	.get("/orders", isAuthenticated, async (req, res) => {
		try {
			const orders = await orderModel.getOrdersBySeller(
				req.query.seller,
				req.query.start,
				req.query.end
			);
			ApiResponse.Ok(res, orders, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Get Orders by seller"
			);
		}
	})
	.get("/order/:orderId", isAuthenticated, async (req, res) => {
		try {
			const order = await orderModel.searchByOrderId(req.params.orderId);
			ApiResponse.Ok(res, order, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get Order by Id");
		}
	})
	.put("/order/:orderId", isAuthenticated, async (req, res) => {
		try {
			const saved = await orderModel.updateOrderStatus(
				req.params.orderId,
				req.body.status
			);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Update Order Status"
			);
		}
	})
	.post("/order/:orderId", isAuthenticated, async (req, res) => {
		try {
			const saved = await orderModel.updateOrderStatus(
				req.params.orderId,
				req.body.status
			);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(
				res,
				err,
				"Got error in Update Order Status"
			);
		}
	})
	.post("/order", isAuthenticated, async (req, res) => {
		try {
			const order = orderModel({ ...req.body, date: new Date() });
			const saved = await orderModel.addOrder(order);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Order");
		}
	})
	.get("/notes", isAuthenticated, async (req, res) => {
		try {
			const notes = await noteModel.getNotes(req.query.start, req.query.end);
			ApiResponse.Ok(res, notes, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get notes");
		}
	})
	.post("/note", isAuthenticated, async (req, res) => {
		try {
			const saved = await noteModel.addNote(req.body.note, req.body.location);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add Note");
		}
	})
	.post("/note/:noteId", isAuthenticated, async (req, res) => {
		try {
			const saved = await noteModel.cancelNote(req.params.noteId);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Cancel Note");
		}
	})
	.get("/employee", isAuthenticated, async (req, res) => {
		try {
			const employees = await employeeModel.getAll();
			ApiResponse.Ok(res, employees, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Get employees");
		}
	})
	.post("/employee", isAuthenticated, async (req, res) => {
		try {
			const employee = employeeModel({ ...req.body });
			const saved = await employeeModel.addEmployee(employee);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add employee");
		}
	})
	.put("/employee", isAuthenticated, async (req, res) => {
		try {
			const saved = await employeeModel.updateEmployee(req.body);
			ApiResponse.Created(res, saved, "Process performed successfully");
		} catch (err) {
			ApiResponse.InternalServerError(res, err, "Got error in Add employee");
		}
	});

export default router;
