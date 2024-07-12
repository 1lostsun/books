import { Router } from 'express';
import { model } from '../models/model';
import { appController } from '../controllers/app.controller';
export const router = Router();

router.get('/books/:id', appController.bookInfo);
router.get('/books', model.getAllBooks);
router.post('/books', appController.createBook);
router.put('/books/:id', appController.updateBook);
router.delete('/books/:id', appController.deleteBook);
