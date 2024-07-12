import { NextFunction, Request, Response } from 'express';
import { model } from '../models/model';
import { db } from '../database/db';
import { IAppController } from './app.controller.interface';

class AppController implements IAppController {
	constructor() {
		this.validateBookID = this.validateBookID.bind(this);
		this.validateBooks = this.validateBooks.bind(this);
		this.bookInfo = this.bookInfo.bind(this);
		this.createBook = this.createBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	async validateBooks(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { title, genre, author, publicationDate } = req.body;
		const [Result] = await db.query(
			`SELECT EXISTS (SELECT FROM books where title = $1 AND genre = $2 AND publicationDate = $3 AND author = $4)`,
			[title, genre, publicationDate, author],
		);
		return Result.exists;
	}

	async validateBookID(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { id } = req.params;
		const booksId = id.split(':');
		const [Result] = await db.query(`SELECT EXISTS (SELECT FROM books where id = $1)`, [
			booksId[1],
		]);
		return Result.exists;
	}
	async bookInfo(req: Request, res: Response, next: NextFunction): Promise<any> {
		const result = this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const [book] = await model.getInfo(req, res, next);
			return res.json(book);
		}
	}

	async createBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		const result = await this.validateBooks(req, res, next);
		if (result) {
			return res.status(400).send(`the book already exists`);
		} else {
			const [book] = await model.create(req, res, next);
			return res.json(book);
		}
	}

	async updateBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		const result = await this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book = await model.updateInfo(req, res, next);
			return res.json(book);
		}
	}

	async deleteBook(req: Request, res: Response, next: NextFunction): Promise<any> {
		const result = await this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book = await model.delete(req, res, next);
			console.log(123);
			return res.json(book);
		}
	}
}

export const appController = new AppController();
