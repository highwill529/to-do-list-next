import { produce } from 'immer';
import { Action } from './common';
import { AppState } from './index';

// Models

export enum FilterState {
	All = 'all',
	Active = 'active',
	Completed = 'completed',
}

export interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

export interface TodosState {
	todos: Todo[];
	filter: { state?: FilterState };
	error: string;
	loading: boolean;
}

export interface AddTodoAction extends Action {
	type: '@todos/add';
	payload: {
		title: string;
	};
}

export interface ToggleTodoAction extends Action {
	type: '@todos/toggle';
	payload: {
		id: number;
		completed: boolean;
	};
}

export interface RemoveTodoAction extends Action {
	type: '@todos/remove';
	payload: {
		id: number;
	};
}

export interface UpdateTodoAction extends Action {
	type: '@todos/update';
	payload: {
		id: number;
		title: string;
	};
}

export interface RemoveCompletedTodosAction extends Action {
	type: '@todos/remove-completed';
}

export interface FilterTodosActions extends Action {
	type: '@todos/filter';
	payload: {
		filter: {
			state?: FilterState;
		};
	};
}

export interface FetchTodosPendingAction extends Action {
	type: '@todos/fetch/pending';
}

export interface FetchTodosFulfilledAction extends Action {
	type: '@todos/fetch/fulfilled';
	payload: {
		todos: Todo[];
	};
}

export interface FetchTodosRejectedAction extends Action {
	type: '@todos/fetch/rejected';
	error: boolean;
	payload: string;
}

// Reducer
export const todosInitialState: TodosState = {
	todos: [],
	filter: { state: FilterState.All },
	error: '',
	loading: false,
};

export function todosReducer(
	state = todosInitialState,
	action:
		| AddTodoAction
		| ToggleTodoAction
		| RemoveTodoAction
		| UpdateTodoAction
		| RemoveCompletedTodosAction
		| FilterTodosActions
		| FetchTodosPendingAction
		| FetchTodosFulfilledAction
		| FetchTodosRejectedAction
): TodosState {
	switch (action.type) {
		case '@todos/add':
			return produce(state, (draft) => {
				draft.todos.unshift({
					id: Date.now(),
					userId: 0,
					completed: false,
					title: action.payload.title,
				});
			});
		case '@todos/toggle':
			return produce(state, (draft) => {
				const todo = draft.todos.find((item) => item.id === action.payload.id);
				if (todo) todo.completed = action.payload.completed;
			});
		case '@todos/remove':
			return produce(state, (draft) => {
				const index = draft.todos.findIndex((item) => item.id === action.payload.id);
				if (index > -1) draft.todos.splice(index, 1);
			});
		case '@todos/update':
			return produce(state, (draft) => {
				const todo = draft.todos.find((item) => item.id === action.payload.id);
				if (todo) todo.title = action.payload.title;
			});
		case '@todos/remove-completed':
			return produce(state, (draft) => {
				draft.todos = draft.todos.filter((todo) => !todo.completed);
			});
		case '@todos/filter':
			return produce(state, (draft) => {
				draft.filter = action.payload.filter;
			});
		case '@todos/fetch/pending':
			return produce(state, (draft) => {
				draft.error = '';
				draft.loading = true;
			});
		case '@todos/fetch/fulfilled':
			return produce(state, (draft) => {
				draft.error = '';
				draft.loading = false;
				draft.todos = action.payload.todos;
			});
		case '@todos/fetch/rejected':
			return produce(state, (draft) => {
				draft.error = action.payload;
				draft.loading = false;
			});
		default:
			return state;
	}
}

// Selectors
export const selectFilter = (state: AppState) => {
	return state.todos.filter.state;
};

export const selectFilteredTodos = (state: AppState) => {
	return state.todos.todos.filter((todo) => {
		const filter = state.todos.filter.state;
		let includeInResults = true;

		switch (filter) {
			case FilterState.Active:
				includeInResults = !todo.completed;
				break;
			case FilterState.Completed:
				includeInResults = todo.completed;
				break;
		}
		return includeInResults;
	});
};

export const selectItemsRemaining = (state: AppState) => {
	return state.todos.todos.reduce((count, todo) => count + (todo.completed ? 0 : 1), 0);
};

export const selectFetchTodosState = (state: AppState) => {
	return {
		error: state.todos.error,
		loading: state.todos.loading,
	};
};

// Actions
export const addTodo = (title: string): AddTodoAction => {
	return {
		type: '@todos/add',
		payload: {
			title,
		},
	};
};

export const filterTodos = (filter: FilterState): FilterTodosActions => {
	return {
		type: '@todos/filter',
		payload: {
			filter: {
				state: filter,
			},
		},
	};
};

export const removeTodo = (id: number): RemoveTodoAction => {
	return {
		type: '@todos/remove',
		payload: {
			id,
		},
	};
};

export const removeCompletedTodos = (): RemoveCompletedTodosAction => {
	return {
		type: '@todos/remove-completed',
	};
};

export const toggleTodo = (id: number, completed: boolean): ToggleTodoAction => {
	return {
		type: '@todos/toggle',
		payload: {
			id,
			completed,
		},
	};
};

export const updateTodo = (id: number, patch: { title: string }): UpdateTodoAction => {
	return {
		type: '@todos/update',
		payload: {
			id,
			...patch,
		},
	};
};

export const fetchTodosPending = (): FetchTodosPendingAction => {
	return {
		type: '@todos/fetch/pending',
		payload: true,
	};
};

export const fetchTodosFulfilled = (todos: Todo[]): FetchTodosFulfilledAction => {
	return {
		type: '@todos/fetch/fulfilled',
		payload: {
			todos,
		},
	};
};

export const fetchTodosRejected = (error: any): FetchTodosRejectedAction => {
	return {
		type: '@todos/fetch/rejected',
		error: true,
		payload: String(error),
	};
};
