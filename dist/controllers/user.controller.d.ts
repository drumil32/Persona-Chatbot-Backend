import { Request, Response } from 'express';
export declare const getAllUsers: (req: Request, res: Response) => void;
export declare const getUserHistory: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const clearUserHistory: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=user.controller.d.ts.map