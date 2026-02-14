export type Role = "viewer" | "operator" | "manager" | "admin";

const roleRank: Record<Role, number> = {
  viewer: 1,
  operator: 2,
  manager: 3,
  admin: 4
};

export function hasRequiredRole(userRole: Role, requiredRole: Role): boolean {
  return roleRank[userRole] >= roleRank[requiredRole];
}
