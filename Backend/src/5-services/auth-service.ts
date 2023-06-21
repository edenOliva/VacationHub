import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";


// Register
async function register (user: UserModel): Promise<string> {

    user.validatePost();

    const isTaken = await isEmailTaken(user.email);

    if(isTaken) throw new ValidationError(`Email ${user.email} is already registered`)

    user.password = cyber.hashPassword(user.password);

    // set role as regular user: 
    user.roleId = RoleModel.User;

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    const result:OkPacket = await dal.execute(sql, 
        [user.firstName, user.lastName,
        user.email, user.password, user.roleId]);

    user.userId = result.insertId;

    const token = cyber.createToken(user);

    return token;
}

// Check if email is taken
async function isEmailTaken(email: string): Promise<boolean>{

    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;

    const resultArr = await dal.execute(sql, [email]);

    const isTaken: number = resultArr[0].isTaken;

    return isTaken === 1;

}

// Login
async function login(credentials: CredentialsModel): Promise<string>{

    credentials.validatePost();

    credentials.password = cyber.hashPassword(credentials.password);
    
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

    const userArr = await dal.execute(sql, [credentials.email, credentials.password]);
    
    const user = userArr[0];
    
    if(!user) throw new UnauthorizedError("Incorrect username or password");

    const token = cyber.createToken(user);

    return token;
    
}

export default {
    register,
    login
}