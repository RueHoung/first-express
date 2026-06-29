import logger from "./logger.js";

export const env = {
    jwtAccess: requireEnv('JWTACCESSToken'),
    jwtRefresh: requireEnv('JWTREFRESHToken'),
    accessExpires: requireEnv('ACCESSEXPIRES'),
    refreshExpires: requireEnv('REFRESHEXPIRES'),
    mongoAccount: requireEnv('MONGOACCOUNT'),
    mongoPassword: requireEnv('MONGOPASSWORD'),
    mongoDatabase: requireEnv('DATABASE'),
    port: Number(process.env.Port ?? 3000)
}


function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        const err = `Environment variable ${name} is required.`
        logger.error(err)
        throw err
    }
    return value
}