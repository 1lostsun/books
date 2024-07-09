import { App } from './app';

function bootstrap(): void {
	const myApp = new App();
	myApp.useRoutes();
}

bootstrap();
