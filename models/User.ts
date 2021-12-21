export interface UserInput {
	username: string;
	password: string;
}

export interface IUser extends UserInput {
	role: "OWNER" | "ADMIN" | "MEMBER";
	permissions: string[];
}
