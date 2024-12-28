export type Role = 'admin' | 'businessman' | 'user' ;

const allRoles: Record<Role, string[]> = {
    admin: ['admin', 'common'],
    businessman: ['businessman', 'common', 'withOutAdmin'],
    user: ['user', 'common', 'withOutAdmin'],
};

const roles = Object.keys(allRoles) as Array<keyof typeof allRoles>;

// Map the roles to their corresponding rights
const roleRights = new Map<Role, string[]>(Object.entries(allRoles) as [Role, string[]][]);

export { roles, roleRights };
