import Cookies from 'js-cookie'
import Router from 'next/router';

// Set cookie
export const setCookie = (key, value) => {
  if(process.browser) { // if window
    Cookies.set(key, value, {
      expires: 1
    });
  }
};

// Remove from cookie
export const removeCookie = (key) => {
  if(process.browser) { // if window
    Cookies.remove(key);
  }
};

// Get from cookie (e.g. stored token)
// Make request to server with authenticated token
export const getCookie = (key, req) => {
  // if(process.browser) {
  //   return Cookies.get(key);
  // }
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
  return Cookies.get(key);
};

export const getCookieFromServer = (key, req) => {
  if(!req.headers.cookie) {
    return undefined;
  }
  let token = req.headers.cookie.split('token=')[1];
  if(!token) {
    return undefined;
  }
  return token;
};

// Set in local storage
export const setLocalStorage = (key, value) => {
  if(process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from local storage
export const removeLocalStorage = (key) => {
  if(process.browser) {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and local storage during login
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};

// Access user info from local storage
export const isAuth = () => {
  if(process.browser) {
    if(localStorage.getItem('user') && getCookie('token')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return false;
    }
  }
};

// Remove local storage and cookies
export const logout = () => {
  removeLocalStorage('user');
  removeCookie('token');
  return Router.push("/login");
};

export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
};
