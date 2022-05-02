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
						role: ["admin", "desktop"],
					},
					{
						id: 9,
						label: "Corte",
						icon: "FaFileInvoiceDollar",
						path: "/cutoff",
						role: ["admin", "desktop"],
					},
					{
						id: 2,
						label: "Entradas/Salidas",
						icon: "AiFillEdit",
						path: "/inventorymov",
						role: ["admin", "desktop"],
					},
					{
						id: 3,
						label: "Inventario",
						icon: "FaClipboardList",
						path: "/inventory",
						role: ["admin", "desktop"],
					},
					{
						id: 4,
						label: "Productos",
						icon: "FaStore",
						path: "/products",
						role: ["admin", "desktop"],
					},
					{
						id: 5,
						label: "Marcas",
						icon: "SiBrandfolder",
						path: "/brands",
						role: ["admin", "desktop"],
					},
					{
						id: 6,
						label: "Locales",
						icon: "MdLocationOn",
						path: "/locations",
						role: ["admin", "desktop"],
					},
					{
						id: 7,
						label: "Empleados",
						icon: "MdPeople",
						path: "/employee",
						role: ["admin", "desktop"],
					},
					{
						id: 8,
						label: "Orden",
						icon: "AiOutlineBook",
						path: "/order",
						role: ["admin", "desktop"],
					},
					{
						id: 10,
						label: "Consulta Ordenes",
						icon: "FaBookReader",
						path: "/checkorders",
						role: ["admin", "desktop"],
					},
					{
						id: 11,
						label: "Perfil Usuario",
						icon: "FaUsersCog",
						path: "/profile",
						role: ["admin"],
					},
					{
						id: 12,
						label: "Autorizar E/S",
						icon: "FaUnlockAlt",
						path: "/invrequest",
						role: ["admin"],
					},
				];
				resolve(menu);
			}, 1000);
		});
	},
};
