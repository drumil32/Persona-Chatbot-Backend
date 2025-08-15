"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const logger_1 = require("../config/logger");
const prompts_1 = require("../systemPrompts/prompts");
class UserService {
    constructor() {
        // IP -> (UserName -> UserData)
        this.ipUserMaps = new Map();
    }
    getUserMapForIP(ip) {
        if (!this.ipUserMaps.has(ip)) {
            this.ipUserMaps.set(ip, new Map());
            logger_1.logger.debug('Created new user map for IP', { ip });
        }
        return this.ipUserMaps.get(ip);
    }
    getUserData(userName, ip) {
        const userMap = this.getUserMapForIP(ip);
        return userMap.get(userName) || null;
    }
    userExists(userName) {
        return userName == 'Hitesh Choudhary' || userName == 'Piyush Garg';
    }
    initializeUser(userName, ip) {
        if (!this.userExists(userName)) {
            throw new Error(`User ${userName} does not exist`);
        }
        const newUser = {
            name: userName,
            history: [],
            createdAt: new Date(),
            lastActiveAt: new Date(),
            messageCount: 0
        };
        const userMap = this.getUserMapForIP(ip);
        userMap.set(userName, newUser);
        logger_1.logger.info('User initialized', { userName, userId: newUser.name, ip });
        return newUser;
    }
    updateUserActivity(userName, ip) {
        const userData = this.getUserData(userName, ip);
        if (userData) {
            userData.lastActiveAt = new Date();
            const userMap = this.getUserMapForIP(ip);
            userMap.set(userName, userData);
        }
    }
    addMessageToUserHistory(userName, role, content, ip, model) {
        const userData = this.getUserData(userName, ip);
        if (userData) {
            userData.history.push({
                role,
                content,
                timestamp: new Date(),
                model
            });
            userData.messageCount++;
            userData.lastActiveAt = new Date();
            const userMap = this.getUserMapForIP(ip);
            userMap.set(userName, userData);
            logger_1.logger.debug('Message added to user history', {
                userName,
                role,
                messageCount: userData.messageCount,
                model,
                ip
            });
        }
    }
    getAllUsers(ip) {
        const userMap = this.getUserMapForIP(ip);
        return Array.from(userMap.entries()).map(([userName, userData]) => ({
            name: userData.name,
            messageCount: userData.messageCount,
            createdAt: userData.createdAt,
            lastActiveAt: userData.lastActiveAt
        }));
    }
    getTotalUserCount(ip) {
        const userMap = this.getUserMapForIP(ip);
        return userMap.size;
    }
    getTotalIPCount() {
        return this.ipUserMaps.size;
    }
    clearUserHistory(userName, ip) {
        if (!this.userExists(userName)) {
            return false;
        }
        const userData = this.getUserData(userName, ip);
        if (!userData) {
            return false;
        }
        const previousMessageCount = userData.messageCount;
        userData.history = [];
        userData.messageCount = 0;
        userData.lastActiveAt = new Date();
        const userMap = this.getUserMapForIP(ip);
        userMap.set(userName, userData);
        logger_1.logger.info('User chat history cleared', { userName, previousMessageCount, ip });
        return true;
    }
    getUserSystemPrompt(userName) {
        if (userName == "Hitesh Choudhary") {
            return JSON.stringify(prompts_1.hiteshChoudhary);
        }
        else {
            return '';
        }
        // try {
        //   const systemPromptPath = path.join(__dirname, '../systemPrompts', `${userName}.json`);
        //   if (!fs.existsSync(systemPromptPath)) {
        //     throw new Error(`System prompt file not found for user: ${userName}`);
        //   }
        //   return fs.readFileSync(systemPromptPath, 'utf-8');
        // } catch (error: any) {
        //   logger.error('Failed to read system prompt', { userName, error: error.message });
        //   throw error;
        // }
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map