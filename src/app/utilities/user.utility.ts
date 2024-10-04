import {User, UserRole} from "../models/types/user";

export const hasUserRole = (user: Partial<User>, role: UserRole) => {
  return user.roles?.map(x => x.name).includes(role.toString());
};
