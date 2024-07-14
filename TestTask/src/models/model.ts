import { NextFunction, Request, Response } from 'express';
import { IBook, IModel } from './model.interface';
import { db } from '../database/db';

class Model implements IModel {
	async getInfo(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { id } = req.params;
		const booksId = id.split(':');
		const [book]: IBook = await db.query(`SELECT * FROM books where id = $1`, [booksId[1]]);
		return book;
	}

	async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const books: IBook = await db.query(`SELECT * FROM books`);
		return res.json(books);
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<object> {
		const { title, genre, publicationDate, author } = body;
		const [newBook]: IBook = await db.query(
			`INSERT INTO books (title, genre, publicationDate, author) values ($1, $2, $3, $4) RETURNING *`,
			[title, genre, publicationDate, author],
		);
		return newBook;
	}

	async updateInfo(req: Request, res: Response, next: NextFunction): Promise<object> {
		const { id, title, genre, publicationDate, author } = req.body;
		const updatedBook: object[] = await db.query(
			`UPDATE books 
			SET title = $2, 
			genre = $3, 
			publicationDate = $4, 
			author = $5 
			where id = $1`,
			[id, title, genre, publicationDate, author],
		);
		return updatedBook;
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id } = req.params;
		const booksId = id.split(':');
		const delBook = await db.query(`DELETE FROM books where id = $1`, [booksId[1]]);
		return res.send(`book was deleted`);
	}
}
export const model = new Model();
