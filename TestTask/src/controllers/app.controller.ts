import { NextFunction, Request, Response } from 'express';
import { model } from '../models/model';
import { db } from '../database/db';
import { IAppController } from './app.controller.interface';

class AppController implements IAppController {
	async validateBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		console.log(req);
		const { id } = req.params;
		const booksId = id.split(':');
		const [result] = await db.query(`SELECT EXISTS (SELECT FROM books where id = $1)`, [
			booksId[1],
		]);
		if (!result.exists) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const [book] = await model.getInfo(req, res, next);
			return res.json(book);
		}
	}

	async createBook(req: Request, res: Response, next: NextFunction): Promise<any> {}
}

export const appController = new AppController();
