import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

/** тип коллбэка */
export type Callback<T> = (value?: T) => void;
/** тип возвращаемого значения и коллбэка */
export type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;

/**
 * хук для передачи коллбэк функции в хук useState
 * замена передачи коллбэк функции в this.setState классовогокомпонента
 * она будет фиксировать значение state после обновления состояния.
 * */
export const useCallbackState = <T,>(initialState: T | (() => T)): [T, DispatchWithCallback<SetStateAction<T>>] => {
	const [state, _setState] = useState(initialState);

	const callbackRef = useRef<Callback<T>>();
	const isFirstCallbackCall = useRef<boolean>(true);

	const setState = useCallback((setStateAction: SetStateAction<T>, callback?: Callback<T>): void => {
		callbackRef.current = callback;
		_setState(setStateAction);
	}, []);

	useEffect(() => {
		if (isFirstCallbackCall.current) {
			isFirstCallbackCall.current = false;
			return;
		}
		callbackRef.current?.(state);
	}, [state]);

	return [state, setState];
};