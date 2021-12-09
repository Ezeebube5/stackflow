"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_config_1 = __importDefault(require("./config/env.config"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes_1 = require("./routes");
// Connect to DB
database_config_1.default.sync().then(() => {
    console.log('connected to db');
});
// Require express
const app = (0, express_1.default)();
// compressing api response
app.use((0, compression_1.default)());
// logger
app.use((0, morgan_1.default)('dev'));
// cors enable
app.use((0, cors_1.default)());
// security config
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.router);
app.listen(env_config_1.default.port, () => {
    console.log(`listening on port ${env_config_1.default.port}`);
});
