"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = exports.getModels = exports.healthCheck = void 0;
const ai_service_1 = require("../services/ai.service");
const healthCheck = (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
};
exports.healthCheck = healthCheck;
const getModels = (req, res) => {
    const availableModels = ai_service_1.aiService.getAvailableModels();
    res.json({ models: availableModels });
};
exports.getModels = getModels;
const welcome = (req, res) => {
    res.json({
        message: 'Hello World! Backend is running.'
    });
};
exports.welcome = welcome;
//# sourceMappingURL=general.controller.js.map