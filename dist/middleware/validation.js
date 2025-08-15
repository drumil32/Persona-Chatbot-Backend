"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserName = exports.validateChatRequest = void 0;
const ai_service_1 = require("../services/ai.service");
const validateChatRequest = (req, res, next) => {
    const { message, model } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({
            error: 'Message is required and must be a non-empty string'
        });
    }
    if (model && !ai_service_1.aiService.validateModel(model)) {
        return res.status(400).json({
            error: `Unsupported model: ${model}`
        });
    }
    next();
};
exports.validateChatRequest = validateChatRequest;
const validateUserName = (req, res, next) => {
    const { userName } = req.params;
    if (!userName || typeof userName !== 'string') {
        return res.status(400).json({
            error: 'Username is required'
        });
    }
    next();
};
exports.validateUserName = validateUserName;
//# sourceMappingURL=validation.js.map