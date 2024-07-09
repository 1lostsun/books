"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const model_1 = require("../models/model");
const app_controller_1 = require("../controllers/app.controller");
exports.router = (0, express_1.Router)();
const validateBook = app_controller_1.appController.validateBook;
exports.router.get('/books/:id', validateBook);
exports.router.post('/books', model_1.model.create);
exports.router.put('/books/:id', model_1.model.updateInfo);
exports.router.delete('/books/:id', model_1.model.delete);
//# sourceMappingURL=app.router.js.map