import { NextFunction, Request, Response } from 'express';

export interface IAppController {
	validateBook: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	bookInfo: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	createBook: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
