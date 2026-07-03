import { AppState } from './index';

// Models
export enum SupportedTheme {
	System = 'system',
	Light = 'light',
	Dark = 'dark',
}

export type ThemeState = {
	current: SupportedTheme;
	available: SupportedTheme[];
};

export interface ChangeThemeAction {
	type: '@theme/change';
	payload: {
		theme: SupportedTheme;
	};
}

export const themeInitialState: ThemeState = {
	current: SupportedTheme.System,
	available: [SupportedTheme.System, SupportedTheme.Light, SupportedTheme.Dark],
};

// Reducer
export function themeReducer(state = themeInitialState, action: ChangeThemeAction): ThemeState {
	switch (action.type) {
		case '@theme/change':
			return { ...state, current: action.payload.theme };
		default:
			return state;
	}
}

// Selectors
export const selectIsDarkMode = (state: AppState) => {
	return state.theme.current === SupportedTheme.Dark;
};

// Actions
export const changeTheme = (theme: SupportedTheme): ChangeThemeAction => {
	return {
		type: '@theme/change',
		payload: { theme },
	};
};
