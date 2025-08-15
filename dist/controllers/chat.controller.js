"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const getIp_1 = require("../config/getIp");
const logger_1 = require("../config/logger");
const ai_service_1 = require("../services/ai.service");
const user_service_1 = require("../services/user.service");
const chatController = async (req, res) => {
    try {
        const { message, model = 'gemini-2.0-flash', userName = 'User' } = req.body;
        const clientIP = (0, getIp_1.getRealIP)(req);
        if (!user_service_1.userService.userExists(userName)) {
            return res.status(400).json({
                error: `User ${userName} does not exist`
            });
        }
        let userData = user_service_1.userService.getUserData(userName, clientIP);
        userData ?? (userData = user_service_1.userService.initializeUser(userName, clientIP));
        user_service_1.userService.addMessageToUserHistory(userName, 'user', message, clientIP, model);
        let userSystemPrompt;
        userSystemPrompt = user_service_1.userService.getUserSystemPrompt(userName);
        const aiResponse = await ai_service_1.aiService.generateResponse(model, userData, userSystemPrompt);
        user_service_1.userService.addMessageToUserHistory(userName, 'assistant', aiResponse, clientIP, model);
        const updatedUserData = user_service_1.userService.getUserData(userName, clientIP);
        res.json({
            response: aiResponse,
            usedModel: model,
            userName: userName,
            messageCount: updatedUserData.messageCount,
            // totalUsers: userService.getTotalUserCount(clientIP),
            // totalIPs: userService.getTotalIPCount(),
            userCreatedAt: updatedUserData.createdAt,
            lastActiveAt: updatedUserData.lastActiveAt,
            clientIP: clientIP
        });
    }
    catch (error) {
        logger_1.logger.error('Chat controller error', {
            error: error.message,
            stack: error.stack,
            userName: req.body.userName || 'Unknown',
            model: req.body.model || 'Unknown'
        });
        res.status(500).json({
            error: 'Failed to process chat request',
            details: error.message
        });
    }
};
exports.chatController = chatController;
//# sourceMappingURL=chat.controller.js.map