import { User } from "../../../models/users/users.types.ts";

export const usersKey = (user: User) => `users:${user.userId}:${user.email}`

export const usersUniqueKey = () => `users:unique`
