import { useReducer } from 'react';

export function useCustomState<T>(initialState: T): [T, React.Dispatch<Partial<T>>] {
	const [state, dispatch] = useReducer(
		(prevState: T, currentState: Partial<T>) => ({
			...prevState,
			...currentState,
		}),
		initialState,
	);

	return [state, dispatch];
}
