"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const cn = {
    host: 'localhost',
    port: 5433,
    database: 'testTask',
    user: 'postgres',
    password: '123',
    max: 30,
};
exports.db = pgp(cn);
//# sourceMappingURL=db.js.map