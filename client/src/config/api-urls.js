const API_BASE_URL = process.env.VUE_APP_API_BASE;

// Auth
export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
export const SIGNUP_URL = `${AUTH_BASE_URL}/signup`;
export const LOGIN_URL = `${AUTH_BASE_URL}/login`;
export const VALIDATE_USER_URL = `${AUTH_BASE_URL}/validate`;
