import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    public constructor(user: UserModel) {

        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static postValidationSchema = Joi.object({

        userId: Joi.number().forbidden().positive().integer(),
        firstName: Joi.string().required().min(3).max(25),
        lastName: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(50),
        roleId: Joi.number().positive().integer()
        
    });

    private static putValidationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(3).max(25),
        lastName: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(50),
        roleId: Joi.number().required().positive().integer()

     });

    public validatePost(): void {
        const result = UserModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
     }

    public validatePut(): void {
        const result = UserModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
     }
}

export default UserModel;