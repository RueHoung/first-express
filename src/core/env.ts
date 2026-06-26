export const env = {
    jwtSecret: requireEnv('JWT'),
    expires: requireEnv('EXPIRES'),
    port: Number(process.env.Port ?? 3000)
}


function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required.`)
    }
    return value
}