import React, { FC } from 'react';
import { IconMoon, IconSun } from './icons';
import { changeTheme, selectIsDarkMode, SupportedTheme, useAppDispatch, useAppSelector } from '../state';

export const ThemeSwitch: FC = () => {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector(selectIsDarkMode);

	const onToggleTheme = () => {
		dispatch(changeTheme(darkMode ? SupportedTheme.Light : SupportedTheme.Dark));
	};

	return (
		<>
			<button className="theme-switch" onClick={onToggleTheme}>
				{darkMode ? <IconSun /> : <IconMoon />}
			</button>
			<style jsx>
				{`
					.theme-switch {
						border: none;
						background: none;
						outline: none;
						cursor: pointer;
						padding: 0;
						line-height: 0;
						width: 20px;
						height: 20px;
					}

					@media all and (min-width: 592px) {
						.theme-switch {
							width: 26px;
							height: 26px;
						}
					}
				`}
			</style>
		</>
	);
};
