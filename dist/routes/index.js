"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_routes_1 = __importDefault(require("./chat.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const general_routes_1 = __importDefault(require("./general.routes"));
const router = (0, express_1.Router)();
// NOT IN USE
router.use('/', general_routes_1.default);
// IN USE
router.use('/', chat_routes_1.default);
// NOT IN USE
router.use('/api', user_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map