export const env = {
    jwtAccess: requireEnv('JWTACCESSToken'),
    jwtRefresh: requireEnv('JWTREFRESHToken'),
    accessExpires: requireEnv('ACCESSEXPIRES'),
    refreshExpires: requireEnv('REFRESHEXPIRES'),
    port: Number(process.env.Port ?? 3000)
}


function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required.`)
    }
    return value
}