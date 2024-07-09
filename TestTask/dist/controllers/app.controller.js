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
            const result = yield model_1.model.getInfo(req, res, next);
            if (!result) {
                return res.status(401).send(`book doesn't exist`);
            }
            else {
                return res.json(result);
            }
        });
    }
    createBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.appController = new AppController();
//# sourceMappingURL=app.controller.js.map