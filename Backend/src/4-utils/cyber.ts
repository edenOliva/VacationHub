import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import crypto from "crypto";

const secretKey = "Puty+Chongo=LoveForever!";

// Create token when log-in:
function createToken(user: UserModel): string {

    delete user.password;

    const container = { user };

    const options = { expiresIn: "12h" };

    const token = jwt.sign(container, secretKey, options);

    return token;
}


// Verify user 
async function verifyUser(request: Request): Promise<boolean>{

    return new Promise<boolean>((resolve, reject) => {
        
        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Please login"));
            return;
        }

        const token = header.substring(7);
        
        if(!token) {
            reject(new UnauthorizedError("Please login"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err) => {
            if(err) {
                reject(new UnauthorizedError("Please login"));
                return;
            }
        
            // If we got here the token is ok: 
            resolve(true);

        });
    })
}

async function verifyAdmin(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Please login..."));
            return;
        }

        const token = header.substring(7);
        
        if(!token) {
            reject(new UnauthorizedError("Please login..."));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err,  container: {user: UserModel}) => {
            if(err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // Extract user
            const user = container.user;
        
            if(user.roleId !== RoleModel.Admin){

                reject(new UnauthorizedError("Access denied"));
                return;
            }

            // If we got here the token is ok: 
            resolve(true);

        });
    })
}

function hashPassword(plainText: string): string {

    const salt = "Puty+Chongo=LoveForever!"
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;

}

export default {
    createToken,
    verifyUser,
    verifyAdmin,
    hashPassword
}