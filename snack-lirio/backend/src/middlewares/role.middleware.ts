import { Request, Response, NextFunction } from "express";

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = (req as any).userType;

    if (!userType) {
      return res.status(401).json({ error: "Não autenticado." });
    }

    if (!roles.includes(userType)) {
      return res.status(403).json({ error: "Acesso negado. Você não tem permissão para acessar este recurso." });
    }
    
    next();
  };
}
