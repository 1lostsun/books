import { NextFunction, Request, Response } from 'express';

export interface IAppController {
	validateBookID: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	validateBooks: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	bookInfo: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	createBook: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	updateBook: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	deleteBook: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
