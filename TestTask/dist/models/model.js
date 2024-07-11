"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const db_1 = require("../database/db");
class Model {
    getInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const booksId = id.split(':');
            const book = yield db_1.db.query(`SELECT * FROM books where id = $1`, [booksId[1]]);
            return book;
        });
    }
    getAllBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield db_1.db.query(`SELECT * FROM books`);
            res.send(books);
        });
    }
    create(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            const { title, genre, publicationDate, author } = body;
            const newBook = yield db_1.db.query(`INSERT INTO books (title, genre, publicationDate, author) values ($1, $2, $3, $4) RETURNING *`, [title, genre, publicationDate, author]);
            return res.json(newBook[0]);
        });
    }
    updateInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, genre, publicationDate, author } = req.body;
            const updatedBook = yield db_1.db.query(`UPDATE books SET title = $2, genre = $2, publicationDate = $3, author = $4 where id = $1`, [id, title, genre, publicationDate, author]);
            res.send(updatedBook);
            console.log(`book was updated`);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const delBook = yield db_1.db.query(`DELETE FROM books where id = $1`, [id]);
            res.send(`book was deleted`);
            console.log(`book was deleted`);
        });
    }
}
exports.model = new Model();
//# sourceMappingURL=model.js.map