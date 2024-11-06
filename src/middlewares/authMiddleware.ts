import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
       res.status(401).json({ error: 'No token provided' });
       return
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
       res.status(401).json({ error: 'Token missing' });
       return
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
      req.user = decoded; 
      next();
    } catch (err) {
       res.status(401).json({ error: 'Invalid or expired token' });
       return
    }
  };