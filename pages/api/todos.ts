import https from 'https';
import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '../../state';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Todo[]>) {
	return new Promise<void>((resolve) => {
		https
			.get('https://jsonplaceholder.typicode.com/todos', (msg) => {
				if (msg.statusCode === 200) {
					res.status(200);
					msg.pipe(res, { end: true });
				} else {
					res.status(500).json([]);
				}
				resolve();
			})
			.once('error', (err) => {
				res.status(500).end(err.toString());
				resolve();
			});
	});
}
