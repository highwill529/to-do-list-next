import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = matchMedia(query);
		const onMediaChange = (e: MediaQueryListEvent) => setMatches(e.matches);
		media.addEventListener('change', onMediaChange);
		setMatches(media.matches);
		return () => media.removeEventListener('change', onMediaChange);
	}, []);

	return matches;
}
