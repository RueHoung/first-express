import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: String,
    email: String,
    password: String,
    birth: String,
    phone: String
});

export const User = model("users", userSchema)