import { NextFunction, Request, Response } from 'express';

export interface IAppController {
	validateBookID: (
		req: Request,
		res: Response,
		next: NextFunction,
		func: Function,
	) => Promise<Response>;
	validateBooks: (
		req: Request,
		res: Response,
		next: NextFunction,
		func: Function,
	) => Promise<Response>;
	bookInfo: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	createBook: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
	updateBook: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
	deleteBook: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
}
