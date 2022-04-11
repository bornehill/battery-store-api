import Menu from "../repository/menu.mock";

export default {
	async getMenu() {
		const menu = await Menu.getMenu();
		return menu;
	},
};
