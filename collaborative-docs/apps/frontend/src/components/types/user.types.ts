type User = {
    name: string;
    email: string;
    password: string;
};

export type UserRegister = Pick<User, "name" | "email" | "password">;
export type UserLogin = Pick<User, "email" | "password">;
