export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export function toggleDrawer(open) {
	return {
		type: TOGGLE_DRAWER,
		drawer: {
			open: open
		}
	};
}