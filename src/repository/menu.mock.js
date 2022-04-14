export default {
	getMenu() {
		return new Promise((resolve) => {
			setTimeout(() => {
				const menu = [
					// {
					// 	id: 1,
					// 	label: "Caja",
					// 	icon: "FaCashRegister",
					// 	path: "/cash",
					// },
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
				];
				resolve(menu);
			}, 1000);
		});
	},
};
