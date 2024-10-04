export type RouteDataStrictType =
  { allowAnonymous: boolean }
  & { allowAdminOnly: boolean }
  & { disallowAuthenticated: boolean }
  & { shouldReuse: boolean };
