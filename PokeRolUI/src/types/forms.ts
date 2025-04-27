export interface RegisterUserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterValidationErrors {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface LoginValidationErrors {
    email?: string;
    password?: string;
}