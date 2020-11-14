import { User } from '../models/user.model';

export interface LoginResponse {
    user?: User;
    token?: string;
    message?: string;
}

export interface LoginRequest {
    userName: string;
    email: string;
    password: string;
}
