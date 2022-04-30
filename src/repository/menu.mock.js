export default {
	getMenu() {
		return new Promise((resolve) => {
			setTimeout(() => {
				const menu = [
					{
						id: 1,
						label: "Caja",
						icon: "FaCashRegister",
						path: "/cash",
					},
					{
						id: 9,
						label: "Corte",
						icon: "FaFileInvoiceDollar",
						path: "/cutoff",
					},
					{
						id: 2,
						label: "Entradas/Salidas",
						icon: "AiFillEdit",
						path: "/inventorymov",
					},
					{
						id: 3,
						label: "Inventario",
						icon: "FaClipboardList",
						path: "/inventory",
					},
					{
						id: 4,
						label: "Productos",
						icon: "FaStore",
						path: "/products",
					},
					{
						id: 5,
						label: "Marcas",
						icon: "SiBrandfolder",
						path: "/brands",
					},
					{
						id: 6,
						label: "Locales",
						icon: "MdLocationOn",
						path: "/locations",
					},
					{
						id: 7,
						label: "Empleados",
						icon: "MdPeople",
						path: "/employee",
					},
					{
						id: 8,
						label: "Orden",
						icon: "AiOutlineBook",
						path: "/order",
					},
				];
				resolve(menu);
			}, 1000);
		});
	},
};
