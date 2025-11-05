import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return null;
    }
  }

  static async createUser(email: string, password: string, name?: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const isValidPassword = await this.verifyPassword(password, user.password);
    return isValidPassword ? user : null;
  }
}

// Client-side auth utilities
export class AuthClient {
  private static TOKEN_KEY = 'taxcat_token';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getUserFromToken(): JWTPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return AuthService.verifyToken(token);
  }

  static isAuthenticated(): boolean {
    const user = this.getUserFromToken();
    return user !== null && user.exp! > Date.now() / 1000;
  }
}