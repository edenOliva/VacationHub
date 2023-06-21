import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {
        await cyber.verifyUser(request);
        next();
    }
    
    catch (err: any) {
        next(err);
    }
}

export default verifyLoggedIn;