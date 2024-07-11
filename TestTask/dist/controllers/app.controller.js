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
exports.appController = void 0;
const model_1 = require("../models/model");
class AppController {
    validateBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    bookInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.validateBook;
            if (!result) {
                return res.status(404).send(`book doesn't exist`);
            }
            else {
                const [book] = yield model_1.model.getInfo(req, res, next);
                return res.json(book);
            }
        });
    }
    createBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.appController = new AppController();
console.log(exports.appController.bookInfo());
//# sourceMappingURL=app.controller.js.map