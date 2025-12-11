export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  image: string;
  first_school: string;
  role: string;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export interface LoginData {
  email: string;
  password: string;
}
