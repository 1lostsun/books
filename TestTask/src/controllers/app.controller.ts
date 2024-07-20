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

	async validateBooks(
		req: Request,
		res: Response,
		next: NextFunction,
		func: Function,
	): Promise<Response> {
		const { title, genre, author, publicationDate } = req.body;
		const [result] = await db.query(
			`SELECT EXISTS (SELECT FROM books where title = $1 AND genre = $2 AND publicationDate = $3 AND author = $4)`,
			[title, genre, publicationDate, author],
		);
		if (result.exists) {
			return res.status(400).send(`the book already exists`);
		} else {
			const book = await model.create(req, res, next);
			return res.json(book);
		}
	}

	async validateBookID(
		req: Request,
		res: Response,
		next: NextFunction,
		func: Function,
	): Promise<Response> {
		const { id } = req.params;
		const booksId = id.split(':');
		const [result] = await db.query(`SELECT EXISTS (SELECT FROM books where id = $1)`, [
			booksId[1],
		]);
		if (!result.exists) {
			return res.status(404).send(`book doesn't exist`);
		} else {
			const book = await func(req, res, next);
			if (func === model.delete) {
				return book;
			} else if (func === model.updateInfo) {
				return res.send(`book was updated`);
			} else {
				return res.json(book);
			}
		}
	}
	async bookInfo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		await this.validateBookID(req, res, next, model.getInfo);
	}

	async createBook(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		await this.validateBooks(req, res, next, model.create);
	}

	async updateBook(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		this.validateBookID(req, res, next, model.updateInfo);
	}

	async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
		await this.validateBookID(req, res, next, model.delete);
	}
}

export const appController = new AppController();
