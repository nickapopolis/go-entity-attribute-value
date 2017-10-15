export const PUSH_ERROR = 'PUSH_ERROR';
export function pushError(err) {
	return {
		type: PUSH_ERROR,
		err
	};
}