import { FC, useState } from 'react';
import { TodoCheckmark } from './todo-checkmark';
import classNames from 'classnames';
import { addTodo, selectIsDarkMode, useAppDispatch, useAppSelector } from '../state';

export const NewTodoForm: FC = () => {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector(selectIsDarkMode);

	const [title, setTitle] = useState('');

	return (
		<>
			<div className={classNames('form-container', { dark: darkMode })}>
				<TodoCheckmark checked={false} />
				<input
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
					className="todo-title"
					placeholder={'Create a new todo...'}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							const value = title.trim();
							if (value.length > 0) {
								dispatch(addTodo(value));
								setTitle('');
							}
						}
					}}
				/>
			</div>
			<style jsx>
				{`
					.form-container {
						margin: -102px 24px 24px;
						padding: 14px 20px;

						display: flex;
						align-items: center;
						gap: 12px;

						border-radius: 5px;
						background-color: white;
					}

					.todo-status {
						border: 1px solid #e3e4f1;
						border-radius: 50%;

						height: 20px;
						width: 20px;
					}

					.todo-title {
						flex-grow: 1;
						height: 100%;
						margin-top: 2px;

						border: 0;
						background: none;

						color: #393a4b;
						caret-color: #3a7cfd;
						outline: none;

						font: 400 12px/1 Josefin Sans, sans-serif;
					}

					.dark.form-container {
						background-color: #25273d;
						color: #767992;
					}

					.dark .todo-title {
						color: #c8cbe7;
					}

					// Media
					@media all and (min-width: 592px) {
						.form-container {
							margin-top: -142px;
							height: 64px;
							gap: 24px;
						}

						.todo-title {
							font-size: 18px;
						}
					}

					@media (min-width: 592px) {
						.form-container {
							margin-left: 0;
							margin-right: 0;
						}
					}
				`}
			</style>
		</>
	);
};
