export interface LoginCredentials {
    email: string;
    password: string
  }
  
export interface LoginResponse {
session: {
    access_token: string;
},

user: {
    id: number;
    name: string;
    email: string;
}
}