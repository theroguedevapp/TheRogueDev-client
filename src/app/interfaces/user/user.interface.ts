export interface User {
    username: string;
    systemRole: SystemRole;
    id: string;
}

export interface SystemRole {
    id: number;
    name: string;
    description: string;
    permissions: any[];
}

export interface UserProfile {
    name: string;
    profilePicUrl: string;
    profileBannerUrl: string;
    biography: string;
    discord: string;
    linkedin: string;
    github: string;
    personalWebsite: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
}