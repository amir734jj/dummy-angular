export type Profile = {
  name: string;
  email: string;
  description: string;
};

export type StoredProfileType = {
  token: string;
  isAdmin: boolean;
  id: number;
} & Profile;

export type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  description: string;
  roles: Role[];
};

export type Role = {
  name: string;
};

export enum UserRole {
  ADMIN = 'admin',
  BASIC = 'basic',
}
