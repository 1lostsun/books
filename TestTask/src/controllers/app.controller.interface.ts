import { NextFunction, Request, Response } from 'express';

export interface IAppController {
	validateBookID: (req: Request, res: Response, next: NextFunction) => Promise<boolean>;
	validateBooks: (req: Request, res: Response, next: NextFunction) => Promise<boolean>;
	bookInfo: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
	createBook: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
	updateBook: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
	deleteBook: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
}
