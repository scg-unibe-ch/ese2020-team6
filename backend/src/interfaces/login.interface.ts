import { User } from '../models/user.model';

export interface LoginResponse {
    user?: User;
    token?: string;
    message?: string;
}

export interface LoginRequest {
    queryValue: string;
    password: string;
    isUsername: boolean;
}
