import React, { FC } from 'react';
import classNames from 'classnames';
import { FilterState, filterTodos, selectFilter, selectIsDarkMode, useAppDispatch, useAppSelector } from '../state';

const supportedFilters: { label: string; filter: FilterState }[] = [
	{ label: 'All', filter: FilterState.All },
	{ label: 'Active', filter: FilterState.Active },
	{ label: 'Completed', filter: FilterState.Completed },
];

export const TodoListFilters: FC = () => {
	const dispatch = useAppDispatch();

	const darkMode = useAppSelector(selectIsDarkMode);
	const filter = useAppSelector(selectFilter);

	return (
		<>
			<div className={classNames('filters-container', { dark: darkMode })}>
				{supportedFilters.map((item) => (
					<button
						key={item.filter}
						className={classNames({ active: filter === item.filter })}
						onClick={() => dispatch(filterTodos(item.filter))}
					>
						{item.label}
					</button>
				))}
			</div>
			<style jsx>
				{`
					.filters-container {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 18px;

						margin: 0 24px;
						height: 48px;

						background-color: white;

						border-radius: 5px;
						box-shadow: 0 35px 50px -15px rgba(194, 195, 214, 0.5);
					}

					.filters-container button {
						border: none;
						outline: none;
						background: none;
						cursor: pointer;
						padding: 0;

						font: 700 14px/1 'Josefin Sans';
						color: #9495a5;
					}

					.filters-container button:not(.active):hover {
						color: #494c6b;
					}

					.filters-container button.active {
						color: #3a7cfd;
					}

					@media (min-width: 592px) {
						.filters-container {
							margin-left: 0;
							margin-right: 0;
						}
					}

					// Dark theme

					.dark.filters-container {
						background-color: #25273d;
						box-shadow: none;
					}

					.dark.filters-container button:not(.active):hover {
						color: #e3e4f1;
					}

					.dark .items-remaining,
					.dark .clear-completed {
						color: #5b5e7e;
					}
				`}
			</style>
		</>
	);
};
