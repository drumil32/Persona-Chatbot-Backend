"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/chat', validation_1.validateChatRequest, chat_controller_1.chatController);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map