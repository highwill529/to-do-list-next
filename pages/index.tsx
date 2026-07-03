import Head from 'next/head';
import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';

import { TodoList } from '../components/todo-list';
import bgMobileDark from '../assets/bg-mobile-dark.jpg';
import bgMobileLight from '../assets/bg-mobile-light.jpg';
import bgDesktopDark from '../assets/bg-desktop-dark.jpg';
import bgDesktopLight from '../assets/bg-desktop-light.jpg';
import { AppContext, appReducer, initialAppState, SupportedTheme } from '../state';
import { ThemeSwitch } from '../components/theme-switch';

export default function Home() {
	const initialTodos = [
		{
			userId: 1,
			id: 1,
			title: 'Complete online JavaScript course',
			completed: true,
		},
		{
			userId: 1,
			id: 2,
			title: 'Jog around the park 3x',
			completed: false,
		},
		{
			userId: 1,
			id: 3,
			title: '10 minutes meditation',
			completed: false,
		},
		{
			userId: 1,
			id: 4,
			title: 'Read for 1 hour',
			completed: false,
		},
		{
			userId: 1,
			id: 5,
			title: 'Pick up groceries',
			completed: false,
		},
		{
			userId: 1,
			id: 6,
			title: 'Complete Todo App on Frontend Mentor',
			completed: false,
		},
	];
	const [state, dispatch] = useReducer(appReducer, {
		...initialAppState,
		todos: { ...initialAppState.todos, todos: initialTodos },
	});
	const darkMode = state.theme.current === SupportedTheme.Dark;

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			console.log('App state:', state);
		}
	}, [state]);

	return (
		<>
			<Head>
				<title>{'Todo App'}</title>
				<meta name="description" content="Todo App" />
				<link rel="icon" href="/favicon-32x32.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap" rel="stylesheet" />
			</Head>
			<AppContext.Provider value={{ state, dispatch }}>
				<div className={classNames('container', { dark: darkMode })}>
					<header className="header">
						<div className="title-wrapper">
							<span className="title">TODO</span>
							<ThemeSwitch />
						</div>
					</header>
					<main className="todo-list-wrapper">
						<TodoList />
					</main>
				</div>
			</AppContext.Provider>
			<style jsx>
				{`
					.container {
						max-width: 1440px;
						min-height: 100vh;

						margin: 0 auto;

						background-color: #fafafa;
					}

					.todo-list-wrapper {
						max-width: 540px;
						margin: 0 auto;
					}

					.title-wrapper {
						margin: 48px 24px 40px;

						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.title-wrapper .title {
						font-size: 20px;
						font-weight: 700;
						line-height: 100%;
						letter-spacing: 12px;
					}

					.header {
						display: flex;
						flex-direction: column;
						height: 200px;

						background: transparent url(${bgMobileLight.src}) 0 0 / cover no-repeat;
						color: white;
					}

					.dark .header {
						background-image: url(${bgMobileDark.src});
					}

					.dark.container {
						background-color: #161721;
					}

					@media all and (min-width: 592px) {
						.header {
							height: 300px;
							background: transparent url(${bgDesktopLight.src}) 0 0 / cover no-repeat;
						}

						.dark .header {
							background-image: url(${bgDesktopDark.src});
						}

						.title-wrapper {
							width: 540px;

							margin-left: auto;
							margin-right: auto;
							margin-top: 70px;

							display: flex;
							justify-content: space-between;
						}

						.title-wrapper .title {
							font-size: 40px;
							letter-spacing: 15px;
						}
					}
				`}
			</style>
		</>
	);
}
