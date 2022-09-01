export interface AuthProps {
  LOGIN: string;
  SIGNUP: string;
}

export interface DashProps {
  FOLDER: string;
  PROFILE: string;
  TAG: string;
}

export const DASHBOARD_ROUTES: DashProps = {
  FOLDER: '/folder',
  PROFILE: '/profile',
  TAG: '/tag',
};

export const AUTH_ROUTES: AuthProps = {
  LOGIN: '/login',
  SIGNUP: '/signup',
};
