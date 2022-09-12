import { removeCookies, setCookies } from 'cookies-next';
import { AUTH_ROUTES } from './routes';

export const logout = () => {
  removeCookies('USER_TOKEN');
  removeCookies('USER_ID');
  setCookies('USER_AUTHENTICATED', 'false');

  window.location.href = AUTH_ROUTES.LOGIN;
};
