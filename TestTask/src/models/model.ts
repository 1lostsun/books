import { NextFunction, Request, Response } from 'express';
import { IModel } from './model.interface';
import { db } from '../database/db';

class Model implements IModel {
	async getInfo(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { id } = req.params;
		const booksId = id.split(':');
		const book = await db.query(`SELECT * FROM books where id = $1`, [booksId[1]]);
		return book;
	}

	async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<any> {
		const books = await db.query(`SELECT * FROM books`);
		res.send(books);
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<any> {
		const { title, genre, publicationDate, author } = body;
		const newBook = await db.query(
			`INSERT INTO books (title, genre, publicationDate, author) values ($1, $2, $3, $4) RETURNING *`,
			[title, genre, publicationDate, author],
		);
		return res.json(newBook[0]);
	}

	async updateInfo(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { id, title, genre, publicationDate, author } = req.body;
		const updatedBook = await db.query(
			`UPDATE books SET title = $2, genre = $2, publicationDate = $3, author = $4 where id = $1`,
			[id, title, genre, publicationDate, author],
		);
		res.send(updatedBook);
		console.log(`book was updated`);
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
		const { id } = req.body;
		const delBook = await db.query(`DELETE FROM books where id = $1`, [id]);
		res.send(`book was deleted`);
		console.log(`book was deleted`);
	}
}
export const model = new Model();
