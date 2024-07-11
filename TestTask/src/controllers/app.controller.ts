import { NextFunction, Request, Response } from 'express';
import { model } from '../models/model';
import { db } from '../database/db';
import { IAppController } from './app.controller.interface';

class AppController implements IAppController {
	constructor() {
		this.validateBook = this.validateBook.bind(this);
		this.bookInfo = this.validateBook.bind(this);
		this.createBook = this.validateBook.bind(this);
	}
	async validateBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { id } = req.params;
		const booksId = id.split(':');
		const [Result] = await db.query(`SELECT EXISTS (SELECT FROM books where id = $1)`, [
			booksId[1],
		]);
		return Result.exists;
	}

	async bookInfo(req: Request, res: Response, next: NextFunction): Promise<any> {
		const result = this.validateBook(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const [book] = await model.getInfo(req, res, next);
			return res.json(book);
		}
	}

	async createBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		return true;
	}
}

export const appController = new AppController();
