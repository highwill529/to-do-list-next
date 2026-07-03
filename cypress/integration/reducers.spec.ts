import {
	appReducer,
	FilterState,
	initialAppState,
	SupportedTheme,
	themeInitialState,
	themeReducer,
	todosInitialState,
	todosReducer,
} from '../../state/index';
import { produce } from 'immer';

describe('Todos Reducer', () => {
	it('should return initial state', () => {
		const actual = todosReducer(undefined, { type: 'INIT' } as any);
		expect(actual).to.deep.equal(todosInitialState);
	});

	it('should add todo', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({ id: 1, userId: 0, completed: false, title: 'Write tests' });
			draft.todos.push({ id: 2, userId: 0, completed: true, title: 'Clean Code' });
		});
		const state = todosReducer(initialState, { type: '@todos/add', payload: { title: 'Write clean code' } });

		const [firstTodo] = state.todos;
		expect(state.todos).to.have.length(3);
		expect(firstTodo).to.have.property('id').to.exist;
		expect(firstTodo).to.include({ title: 'Write clean code', completed: false, userId: 0 });
	});

	it('should toggle todo', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({
				id: 42,
				userId: 0,
				completed: false,
				title: 'Write tests',
			});
		});

		const state = todosReducer(initialState, { type: '@todos/toggle', payload: { id: 42, completed: true } });
		expect(state.todos[0]).to.include({ completed: true });
	});

	it('should remove todo', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({
				id: 99,
				userId: 0,
				completed: false,
				title: 'Write tests',
			});
		});

		const state = todosReducer(initialState, { type: '@todos/remove', payload: { id: 99 } });
		expect(state.todos).to.have.length(0);
	});

	it('should update todo', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({ id: 1024, userId: 0, completed: false, title: 'Write tests' });
		});
		const state = todosReducer(initialState, { type: '@todos/update', payload: { id: 1024, title: 'Clean code' } });
		expect(state.todos[0]).property('title').to.equal('Clean code');
	});

	it('should remove completed todos', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({ id: 1 << 1, userId: 0, completed: false, title: 'Write tests' });
			draft.todos.push({ id: 1 << 2, userId: 0, completed: true, title: 'Clean Code' });
			draft.todos.push({ id: 1 << 3, userId: 0, completed: true, title: 'Improve design' });
		});
		const state = todosReducer(initialState, { type: '@todos/remove-completed' });
		expect(state.todos).to.deep.equal([{ id: 1 << 1, userId: 0, completed: false, title: 'Write tests' }]);
	});

	it('should set filter', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos.push({ id: 1, userId: 0, completed: false, title: 'Write tests' });
			draft.todos.push({ id: 2, userId: 0, completed: true, title: 'Clean Code' });
			draft.todos.push({ id: 3, userId: 0, completed: true, title: 'Improve design' });
		});

		const state = todosReducer(initialState, {
			type: '@todos/filter',
			payload: { filter: { state: FilterState.Active } },
		});
		expect(state.filter).to.deep.equal({ state: FilterState.Active });
		expect(state.todos).to.deep.equal([
			{ id: 1, userId: 0, completed: false, title: 'Write tests' },
			{ id: 2, userId: 0, completed: true, title: 'Clean Code' },
			{ id: 3, userId: 0, completed: true, title: 'Improve design' },
		]);
	});

	it('should set fetch todos pending state', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos = [{ id: 1, userId: 0, completed: false, title: 'Write tests' }];
			draft.error = 'Something went wrong';
			draft.filter = FilterState.Active;
		});
		const state = todosReducer(initialState, { type: '@todos/fetch/pending' });

		expect(state.todos).to.have.length(1);
		expect(state.loading).to.be.true;
		expect(state.error).to.equal('');
	});

	it('should set fetch todos fulfilled state', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos = [{ id: 1, userId: 0, completed: false, title: 'Write tests' }];
			draft.filter = FilterState.Active;
		});
		const state = todosReducer(initialState, {
			type: '@todos/fetch/fulfilled',
			payload: { todos: [{ id: 2, userId: 0, completed: false, title: 'Improve design' }] },
		});

		expect(state.loading).to.be.false;
		expect(state.error).to.equal('');
		expect(state.todos).to.deep.equal([{ id: 2, userId: 0, completed: false, title: 'Improve design' }]);
	});

	it('should set fetch todos rejected state', () => {
		const initialState = produce(todosInitialState, (draft) => {
			draft.todos = [{ id: 1, userId: 0, completed: false, title: 'Write tests' }];
			draft.filter = FilterState.Active;
		});
		const state = todosReducer(initialState, {
			type: '@todos/fetch/rejected',
			error: true,
			payload: 'The server cannot be reached',
		});

		expect(state.loading).to.be.false;
		expect(state.error).to.equal('The server cannot be reached');
		expect(state.filter).to.equal(FilterState.Active);
		expect(state.todos).to.have.length(1);
	});
});

describe('Theme Reducer', () => {
	it('should return initial state', () => {
		const state = themeReducer(undefined, { type: 'INIT' } as any);
		expect(state).to.equal(themeInitialState);
	});

	it('should change theme', () => {
		const initialState = produce(themeInitialState, (draft) => {
			draft.current = SupportedTheme.Light;
		});
		const state = themeReducer(initialState, {
			type: '@theme/change',
			payload: { theme: SupportedTheme.Dark },
		});
		expect(state.current).to.deep.equal(SupportedTheme.Dark);
	});
});

describe('App Reducer', () => {
	it('should return initial state', () => {
		const state = appReducer(undefined, { type: 'INIT' } as any);
		expect(state).to.deep.equal(initialAppState);
	});
});
