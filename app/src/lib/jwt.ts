import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_demo';

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
}


export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}