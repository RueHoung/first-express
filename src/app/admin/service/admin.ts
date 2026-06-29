import { userPayload } from "../dto/admin.js";
import { hash } from 'bcrypt';
import { User } from "../model/admin.js";


export async function CreateUser (req: userPayload): Promise<string> {
    
    const saltRound = 12;
    const passwordHash = await hash(req.password, saltRound);
    
    const payload: userPayload = {
        name: req.name,
        role: req.role,
        email: req.email,
        password: passwordHash,
        birth: req.birth,
        phone: req.phone
    };
    const result = await User.create(payload);
    return result.id;
}
