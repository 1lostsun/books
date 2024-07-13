import { NextFunction, Request, Response } from 'express';

export interface IModel {
	getInfo: (req: Request, res: Response, next: NextFunction) => Promise<object>;
	getAllBooks: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<object>;
	updateInfo: (req: Request, res: Response, next: NextFunction) => Promise<object>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
}

export type IBook = [
	{
		id?: number;
		title: string;
		genre: string;
		publicationDate: Date;
		author: string;
	},
];
