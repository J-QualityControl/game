import { hasRequiredRole, type Role } from "@/lib/auth/roles";

export function requireRole(userRole: Role, requiredRole: Role) {
  if (!hasRequiredRole(userRole, requiredRole)) {
    throw new Error(`Forbidden: ${userRole} cannot perform action requiring ${requiredRole}`);
  }
}
