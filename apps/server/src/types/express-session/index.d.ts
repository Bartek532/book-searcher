import type { User } from '@book-searcher/types';



declare module 'express-session' {
  interface SessionData {
    user: User;
    isLogged: boolean;
  }
}
