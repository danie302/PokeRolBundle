export interface RegisterRequest {
    username: string;
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ErrorResponse {
    message: string;
}