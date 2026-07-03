import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LoaderElement = () => {
	return (
		<>
			<div className="loading-indicator" />
			<style jsx>
				{`
					@keyframes pendingAction {
						0% {
							background-position-x: 0;
						}

						100% {
							background-position-x: 1200em;
						}
					}

					.loading-indicator {
						animation-name: pendingAction;
						animation-iteration-count: infinite;
						animation-duration: 30s;
						animation-timing-function: linear;
						animation-fill-mode: forwards;

						position: absolute;
						left: 50%;
						top: 0;
						width: 100%;
						max-width: 1440px;
						transform: translateX(-50%);
						height: 5px;
						background: linear-gradient(135deg, #8807fe 0%, #e445b7 5%, #ed00aa 15%, #2fe3fe 50%, #8900ff 100%);
					}
				`}
			</style>
		</>
	);
};
export const Loader: FC<{}> = () => {
	const [element, setElement] = useState<React.ReactElement | null>(null);
	useEffect(() => {
		setElement(createPortal(<LoaderElement />, window.document.body));
	}, []);

	return <>{element}</>;
};
