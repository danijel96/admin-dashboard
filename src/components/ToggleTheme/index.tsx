import {
	SunIcon,
	MoonIcon,
	ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export type AppThemeOptions = 'system' | 'light' | 'dark';

interface ToggleThemeProps {
	//appTheme: AppThemeOptions;
	//toggleAppThemeMode: (mode: AppThemeOptions) => void;
}

export const ToggleTheme = ({}: //toggleAppThemeMode,
//appTheme,
ToggleThemeProps) => {
	const [appTheme, setAppTheme] = useState<AppThemeOptions>(
		(typeof window !== 'undefined' &&
			(localStorage.getItem('theme') as AppThemeOptions)) ||
			'system'
	);

	const toggleAppThemeMode = (mode: AppThemeOptions) => {
		setAppTheme(mode);
	};

	const darkQuery =
		typeof window !== 'undefined' &&
		window?.matchMedia('(prefers-color-scheme: dark)');

	console.log(darkQuery, 'darkQuery');

	const onWindowMatch = () => {
		if (typeof window === 'undefined') return;

		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && darkQuery.matches)
		) {
			console.log(darkQuery.matches, 'darkQuery.matches');
			document.body.classList.add('dark');
		} else {
			console.log('theme' in localStorage, '(theme in localStorage)');
			document.body.classList.remove('dark');
		}
	};

	useEffect(() => {
		switch (appTheme) {
			case 'dark':
				localStorage.setItem('theme', 'dark');
				break;
			case 'light':
				localStorage.setItem('theme', 'light');
				break;
			default:
				localStorage.removeItem('theme');
				onWindowMatch();
				break;
		}

		onWindowMatch();
	}, [appTheme]);

	return (
		<div className="w-30 h-10 rounded-sm flex gap-3">
			<SunIcon
				width={24}
				className={clsx(
					appTheme === 'light'
						? 'fill-font-primary stroke-font-primary'
						: 'stroke-secondary',
					'cursor-pointer'
				)}
				onClick={() => toggleAppThemeMode('light')}
			/>
			<MoonIcon
				width={24}
				className={clsx(
					appTheme === 'dark' ? 'fill-font-primary stroke-font-primary' : '',
					'cursor-pointer'
				)}
				onClick={() => toggleAppThemeMode('dark')}
			/>
			<ComputerDesktopIcon
				width={24}
				className={clsx(
					appTheme === 'dark' ? 'stroke-secondary' : '',
					'cursor-pointer'
				)}
				onClick={() => toggleAppThemeMode('system')}
			/>
		</div>
	);
};
