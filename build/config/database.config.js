"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_config_1 = __importDefault(require("./env.config"));
const db = new sequelize_1.Sequelize(env_config_1.default.databaseUrl, { dialect: "mysql" });
// Connect to DB
db.sync().then(() => {
    console.log('finally connected to db');
});
exports.default = db;
