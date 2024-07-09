import express, { Express, Router } from 'express';
import { router } from './routes/app.router';
import { Server } from 'http';

export class App {
	app: Express;
	port: number;
	server: Server;
	router: Router = router;

	constructor() {
		this.app = express();
		this.port = 8000;
	}

	async useRoutes(): Promise<void> {
		this.app.use(express.json());
		this.app.listen(this.port, () => {
			console.log(`server starts on the port ${this.port}`);
		});
		this.app.use('/api', this.router);
	}
}
