import { Router } from 'express';
import { model } from '../models/model';
import { appController } from '../controllers/app.controller';
export const router = Router();
const validateBook = appController.bookInfo;

router.get('/books/:id', validateBook);
router.get('/books', model.getAllBooks);
router.post('/books', model.create);
router.put('/books/:id', model.updateInfo);
router.delete('/books/:id', model.delete);
