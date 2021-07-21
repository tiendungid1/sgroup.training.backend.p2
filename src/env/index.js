export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'Phudeptrai';
export const EXPPIRE_DAYS = process.env.EXPPIRE_DAYS || '10d';
export const { DATABASE_URL } = process.env;
