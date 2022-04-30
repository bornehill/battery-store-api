import Mongoose from "mongoose";
import moment from "moment";

Mongoose.Promise = global.Promise;

export const connectToDb = async () => {
	let url = process.env.mongo_url;
	const connectStr = url
		.replace("<password>", process.env.mongodb_pass)
		.replace("myFirstDatabase", "batterystoredb");
	try {
		await Mongoose.connect(connectStr, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.info("Connected to mongo!!!");
	} catch (err) {
		console.error(`Could not connect to MongoDB: ${err}`);
	}
};

const brandSchema = Mongoose.Schema({
	name: { type: String, required: true },
});

const groupSchema = Mongoose.Schema({
	name: { type: String, required: true },
	size: { type: String },
});

const locationSchema = Mongoose.Schema(
	{
		name: { type: String, required: true, unique: true, index: true },
		address: { type: String, required: true },
	},
	{ collection: "locations" }
);

const productSchema = Mongoose.Schema(
	{
		brand: { type: String, required: true },
		description: { type: String },
		group: { type: String, required: true },
		amp: { type: String },
		price: { type: Number, require: true },
		logo: { type: String },
		logoSize: { type: Number },
	},
	{ collection: "products" }
);

const inventorySchema = Mongoose.Schema(
	{
		product: productSchema,
		location: { type: String, require: true },
		amount: { type: Number, require: true },
	},
	{ collection: "inventory" }
);

const inventoryMovSchema = Mongoose.Schema(
	{
		current: inventorySchema,
		mov: { type: String, require: true },
		amount: { type: Number, require: true },
		date: { type: Date, require: true },
	},
	{ collection: "inventoryMov" }
);

const employeeSchema = Mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		position: { type: String, required: true },
		phone: { type: String },
	},
	{ collection: "employees" }
);

const profileSchema = Mongoose.Schema(
	{
		nickName: { type: String, required: true },
		role: { type: String, required: true },
		phone: { type: String, required: true },
		userUid: { type: String, required: true, index: true },
	},
	{ collection: "profiles" }
);

const orderSchema = Mongoose.Schema(
	{
		orderId: { type: Number },
		sellerName: { type: String, require: true },
		detail: [
			{ product: productSchema, amount: { type: Number, require: true } },
		],
		date: { type: Date, require: true },
		status: { type: String, require: true },
	},
	{ collection: "orders" }
);

const noteSchema = Mongoose.Schema(
	{
		noteId: { type: Number },
		orderId: { type: Number },
		clientName: { type: String, require: true },
		discount: { type: Number },
		date: { type: Date, require: true },
		status: { type: String, require: true },
		payment: { type: String, require: true },
		authorizationId: { type: Number },
	},
	{ collection: "notes" }
);

let brandModel = Mongoose.model("brands", brandSchema);
let locationModel = Mongoose.model("locations", locationSchema);
let productModel = Mongoose.model("products", productSchema);
let profileModel = Mongoose.model("profiles", profileSchema);
let employeeModel = Mongoose.model("employees", employeeSchema);
let groupModel = Mongoose.model("groups", groupSchema);
let inventoryModel = Mongoose.model("inventory", inventorySchema);
let inventoryMovModel = Mongoose.model("inventoryMov", inventoryMovSchema);
let orderModel = Mongoose.model("orders", orderSchema);
let noteModel = Mongoose.model("notes", noteSchema);

brandModel.getAll = () => {
	return brandModel.find({});
};

brandModel.addBrand = (brandToAdd) => {
	return brandToAdd.save();
};

locationModel.getAll = () => {
	return locationModel.find({});
};

locationModel.addLocation = (locationToAdd) => {
	return locationToAdd.save();
};

locationModel.removeLocation = (locationName) => {
	return locationModel.remove({ name: locationName });
};

locationModel.updateLocation = async (location) => {
	const doc = await locationModel.findById(location._id);

	doc.name = location.name;
	doc.address = location.address;

	return doc.save();
};

inventoryMovModel.add = (mov) => {
	return mov.save();
};

inventoryModel.geyByLocation = (location) => {
	return inventoryModel.find({ location });
};

inventoryModel.inputOutput = async ({ products, location, typeMov }) => {
	for (var mov of products) {
		const amount = typeMov === "1" ? +mov.amount : +mov.amount * -1;

		await inventoryModel.updateInventory({
			product: mov.product,
			location,
			amount,
		});
	}
	return "Success";
};

inventoryModel.updateInventory = async ({
	product: prod,
	location,
	amount,
}) => {
	const doc = await inventoryModel.findOne({
		$and: [{ "product._id": Mongoose.Types.ObjectId(prod.id) }, { location }],
	});

	const mov = inventoryMovModel({
		current: doc?._id
			? { ...doc }
			: { product: { ...prod }, location, amount: 0 },
		mov: amount < 0 ? "out" : "in",
		amount,
		date: new Date(),
	});
	inventoryMovModel.add(mov);

	if (!doc?._id) {
		const added = inventoryModel({
			product: { ...prod },
			location,
			amount,
		});
		return added.save();
	}

	doc.amount = doc.amount + amount;
	return doc.save();
};

groupModel.getAll = () => {
	return groupModel.find({});
};

groupModel.addGroup = (groupToAdd) => {
	return groupToAdd.save();
};

groupModel.removeGroup = (groupName) => {
	return groupModel.remove({ name: groupName });
};

groupModel.updateGroup = async (group) => {
	const doc = await groupModel.findById(group._id);

	doc.size = group.size;

	return doc.save();
};

productModel.getProducts = (query) => {
	return productModel.find(query);
};

productModel.addProduct = (productToAdd) => {
	return productToAdd.save();
};

productModel.updateProduct = async (product) => {
	const doc = await productModel.findById(product.id);

	doc.description = product.description;
	doc.price = product.price;
	doc.amp = product.amp;
	doc.logo = product.logo;
	doc.logoSize = product.logoSize;
	doc.group = product.group;

	return doc.save();
};

profileModel.getByUserUid = (userUid) => {
	return profileModel.find({ userUid });
};

profileModel.addProfile = (profileToAdd) => {
	return profileToAdd.save();
};

profileModel.updateProfile = (profile, doc) => {
	doc.phone = profile.phone;
	doc.role = profile.role;

	return doc.save();
};

employeeModel.getAll = () => {
	return employeeModel.find({});
};

employeeModel.addEmployee = (employeeToAdd) => {
	return employeeToAdd.save();
};

employeeModel.updateEmployee = async (employee) => {
	const doc = await employeeModel.findById(employee._id);

	doc.phone = employee.phone;
	doc.position = employee.position;

	return doc.save();
};

orderModel.addOrder = (order) => {
	return order.save();
};

orderModel.getOrders = (filter) => {
	return orderModel.find(filter);
};

orderModel.searchByOrderId = (orderId) => {
	return orderModel.findOne({ orderId });
};

orderModel.updateOrderStatus = async (orderId, status) => {
	const doc = await orderModel.findOne({ orderId });

	doc.status = status;

	return doc.save();
};

noteModel.getNotes = async (start, end) => {
	const sdate = moment(`${start}T00:00`);
	const edate = moment(`${end}T00:00`);
	const notes = await noteModel.find({
		date: { $gte: sdate.format(), $lt: edate.format() },
	});

	const notesWithOrder = [];
	for (var note of notes) {
		const order = await orderModel.searchByOrderId(note.orderId);
		notesWithOrder.push({ ...note._doc, order });
	}

	return notesWithOrder;
};

noteModel.addNote = async (note, location) => {
	const orderDoc = await orderModel.findOne({ orderId: note.orderId });
	const noteDoc = noteModel({ ...note, date: new Date() });

	orderDoc.detail.forEach(async (item) => {
		const prod = { ...item.product._doc, id: item.product._doc._id };

		const save = await inventoryModel.updateInventory({
			product: prod,
			location,
			amount: item.amount * -1,
		});
	});

	orderDoc.status = "Closed";
	orderDoc.save();

	return noteDoc.save();
};

noteModel.updateNoteStatus = async (noteId, status) => {
	const doc = await noteModel.findOne({ noteId });
	const orderDoc = await orderModel.findOne({ orderId: doc.orderId });

	orderDoc.detail.forEach(async (item) => {
		const prod = { ...item.product._doc, id: item.product._doc._id };

		const save = await inventoryModel.updateInventory({
			product: prod,
			location: "San felipe acumuladores",
			amount: item.amount,
		});
	});

	doc.status = status;
	return doc.save();
};

export {
	brandModel,
	locationModel,
	orderModel,
	productModel,
	profileModel,
	groupModel,
	inventoryModel,
	noteModel,
	employeeModel,
};
