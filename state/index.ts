import { themeInitialState, themeReducer, ThemeState } from './theme';
import { todosInitialState, todosReducer, TodosState } from './todos';
import { Action } from './common';
import { createContext, useContext } from 'react';

export * from './common';
export * from './todos';
export * from './theme';

// Models
export interface AppState {
	theme: ThemeState;
	todos: TodosState;
}

export const initialAppState: AppState = {
	theme: themeInitialState,
	todos: todosInitialState,
};

// Reducer
export function appReducer(state = initialAppState, action: Action) {
	return {
		theme: themeReducer(state.theme, action as any),
		todos: todosReducer(state.todos, action as any),
	};
}

// Context
export const AppContext = createContext<{ state: AppState; dispatch: (action: Action) => void } | undefined>(undefined);
AppContext.displayName = 'AppContext';

// Helpers
export function useAppSelector<T>(selectorFn: (state: AppState) => T): T {
	const context = useContext(AppContext);

	if (context == null) throw new Error('App state is not defined');

	return selectorFn(context.state);
}

export function useAppDispatch() {
	const context = useContext(AppContext);

	if (context == null) throw new Error('App state is not defined');

	return context.dispatch;
}
