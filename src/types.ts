export interface User {
  id: string;
  email: string;
  password?: string; // Only for local storage logic, normally not sent to client
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
