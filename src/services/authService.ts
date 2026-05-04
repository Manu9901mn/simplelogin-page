import { User } from '../types';

const USERS_KEY = 'auth_flow_users';
const SESSION_KEY = 'auth_flow_session';

export const authService = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User) => {
    const users = authService.getUsers();
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  },

  findUserByEmail: (email: string): User | undefined => {
    return authService.getUsers().find(u => u.email === email);
  },

  setCurrentSession: (user: User | null) => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  },

  getCurrentSession: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};
