import { Express } from "express";
import { Create } from "../app/admin/controller/admin.js";

export const adminRoute = (app: Express) => {

    // create user
    app.post("/user", Create)
}