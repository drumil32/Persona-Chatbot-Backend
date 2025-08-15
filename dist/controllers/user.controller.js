"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserHistory = exports.getUserHistory = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const getIp_1 = require("../config/getIp");
const getAllUsers = (req, res) => {
    const clientIP = (0, getIp_1.getRealIP)(req);
    const users = user_service_1.userService.getAllUsers(clientIP);
    res.json({
        users,
        totalUsers: user_service_1.userService.getTotalUserCount(clientIP),
        totalIPs: user_service_1.userService.getTotalIPCount(),
        clientIP: clientIP
    });
};
exports.getAllUsers = getAllUsers;
const getUserHistory = (req, res) => {
    const { userName } = req.params;
    const clientIP = (0, getIp_1.getRealIP)(req);
    if (!user_service_1.userService.userExists(userName)) {
        return res.status(400).json({
            error: `User ${userName} does not exist`
        });
    }
    const userData = user_service_1.userService.getUserData(userName, clientIP);
    if (!userData) {
        return res.status(404).json({
            error: 'User has no chat history yet'
        });
    }
    res.json({
        userName: userData.name,
        history: userData.history,
        messageCount: userData.messageCount,
        createdAt: userData.createdAt,
        lastActiveAt: userData.lastActiveAt,
        clientIP: clientIP
    });
};
exports.getUserHistory = getUserHistory;
const clearUserHistory = (req, res) => {
    const { userName } = req.params;
    const clientIP = (0, getIp_1.getRealIP)(req);
    if (!user_service_1.userService.userExists(userName)) {
        return res.status(400).json({
            error: `User ${userName} does not exist`
        });
    }
    const userData = user_service_1.userService.getUserData(userName, clientIP);
    if (!userData) {
        return res.status(404).json({
            error: 'User has no chat history to clear'
        });
    }
    const success = user_service_1.userService.clearUserHistory(userName, clientIP);
    if (success) {
        res.json({
            message: `Chat history cleared for ${userName}`,
            success: true,
            clientIP: clientIP
        });
    }
    else {
        res.status(500).json({
            error: 'Failed to clear chat history'
        });
    }
};
exports.clearUserHistory = clearUserHistory;
//# sourceMappingURL=user.controller.js.map