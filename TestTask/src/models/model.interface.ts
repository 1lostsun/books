import { NextFunction, Request, Response } from 'express';

export interface IModel {
	getInfo: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	getAllBooks: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	updateInfo: (req: Request, res: Response, next: NextFunction) => Promise<any>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
