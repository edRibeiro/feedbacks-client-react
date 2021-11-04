export const ACCESS_TOKEN = '&app-token';
export const USER_ID = '&user-id';
export const USER_NAME = '&user-name';

export const login = token => localStorage.setItem(ACCESS_TOKEN, token);
export const logout = () => localStorage.clear();

export const setUserID = id => localStorage.setItem(USER_ID, id);
export const getUserID = () => localStorage.getItem(USER_ID)

export const setUserName = name => localStorage.setItem(USER_NAME, name);
export const getUserName = () => localStorage.getItem(USER_NAME);

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const isLogin = () => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    return true;
  }

  return false;
}
