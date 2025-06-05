import { User } from "../../../models/users/users.types.js";

export const usersKey = (user: User) => `users:${user.userId}:${user.email}`

export const usersUniqueKey = () => `users:unique`
