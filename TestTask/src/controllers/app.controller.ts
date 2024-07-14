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

	async validateBooks(req: Request, res: Response, next: NextFunction): Promise<boolean> {
		const { title, genre, author, publicationDate } = req.body;
		const [result] = await db.query(
			`SELECT EXISTS (SELECT FROM books where title = $1 AND genre = $2 AND publicationDate = $3 AND author = $4)`,
			[title, genre, publicationDate, author],
		);
		return result.exists;
	}

	async validateBookID(req: Request, res: Response, next: NextFunction): Promise<boolean> {
		const { id } = req.params;
		const booksId = id.split(':');
		const [result] = await db.query(`SELECT EXISTS (SELECT FROM books where id = $1)`, [
			booksId[1],
		]);
		return result.exists;
	}
	async bookInfo(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const result = this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book: object = await model.getInfo(req, res, next);
			return res.json(book);
		}
	}

	async createBook(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const result = await this.validateBooks(req, res, next);
		if (result) {
			return res.status(400).send(`the book already exists`);
		} else {
			const book = await model.create(req, res, next);
			return res.json(book);
		}
	}

	async updateBook(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		const result = await this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book = await model.updateInfo(req, res, next);
			this.bookInfo(req, res, next);
		}
	}

	async deleteBook(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const result = await this.validateBookID(req, res, next);
		if (!result) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book = await model.delete(req, res, next);
			return res.json(book);
		}
	}
}

export const appController = new AppController();
