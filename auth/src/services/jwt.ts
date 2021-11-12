import jwt from 'jsonwebtoken';

export class Jwt {
    static sign(payload: string | object | Buffer, options?: jwt.SignOptions | undefined): string {
        return jwt.sign(
            payload,
            process.env.JWT_KEY!,
            options,
        );
    }
}