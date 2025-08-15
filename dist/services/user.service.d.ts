import { UserData } from '../types';
declare class UserService {
    private readonly ipUserMaps;
    private getUserMapForIP;
    getUserData(userName: string, ip: string): UserData | null;
    userExists(userName: string): boolean;
    initializeUser(userName: string, ip: string): UserData;
    updateUserActivity(userName: string, ip: string): void;
    addMessageToUserHistory(userName: string, role: 'user' | 'assistant', content: string, ip: string, model?: string): void;
    getAllUsers(ip: string): Array<{
        name: string;
        messageCount: number;
        createdAt: Date;
        lastActiveAt: Date;
    }>;
    getTotalUserCount(ip: string): number;
    getTotalIPCount(): number;
    clearUserHistory(userName: string, ip: string): boolean;
    getUserSystemPrompt(userName: string): string;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=user.service.d.ts.map