"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../config/database.config"));
module.exports = async () => {
    await database_config_1.default.sync({ force: true }).then(() => {
        console.log('TEST DB connected!');
    });
};
