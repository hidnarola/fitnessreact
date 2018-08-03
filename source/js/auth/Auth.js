// import history from '../history';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../config/history';
import { publicPath, routeCodes } from '../constants/routes';
import {
  LOCALSTORAGE_ACCESS_TOKEN_KEY,
  LOCALSTORAGE_ID_TOKEN_KEY,
  LOCALSTORAGE_EXPIRES_AT_KEY,
  LOCALSTORAGE_ROLE_KEY,
  USER_ROLE,
  AUTH_STATE_ACTION_LOGIN,
  AUTH_STATE_ACTION_SIGNUP,
  SERVER_BASE_URL,
  LOCALSTORAGE_USERNAME_KEY,
  LOCALSTORAGE_REFRESH_TOKEN_KEY,
  LOCALSTORAGE_USER_DETAILS_KEY,
  FITASSIST_USER_DETAILS_TOKEN_KEY
} from '../constants/consts';

import axios from 'axios';
import { ts } from '../helpers/funs';
import jwt from "jwt-simple";

export default class Auth {
  auth0Lock = new Auth0Lock(
    AUTH_CONFIG.clientId,
    AUTH_CONFIG.domain,
    {
      auth: {
        audience: `https://${AUTH_CONFIG.domain}/api/v2/`,
        redirectUrl: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
        params: {
          scope: 'openid profile email user_metadata app_metadata'
        }
      },
      avatar: null,
      autoclose:false,
    }
  );

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.auth0Lock.on('authenticated', (authResult) => {
      this.handleAuthentication(authResult);
    });
  }

  login() {
    let authState = {
      action: AUTH_STATE_ACTION_LOGIN,
    }
    let authOptions = {
      allowSignUp: false,
      auth: {
        params: {
          state: JSON.stringify(authState),
          scope: 'openid profile email user_metadata app_metadata',
        }
      }
    }
    this.auth0Lock.show(authOptions);
  }

  signUp() {
    let authState = {
      action: AUTH_STATE_ACTION_SIGNUP,
    }
    let authOptions = {
      allowLogin: false,
      auth: {
        params: {
          state: JSON.stringify(authState),
          scope: 'openid profile email user_metadata app_metadata',
        }
      }
    }
    this.auth0Lock.show(authOptions);
  }

  handleAuthentication(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      let reqUrl = SERVER_BASE_URL + 'auth0_user_sync';
      let options = {
        'headers': {
          'x-access-token': AUTH_CONFIG.tokenType + ' ' + authResult.accessToken
        }
      }
      axios.get(reqUrl, options)
        .then((res) => {
          if (authResult.state && authResult.state !== '' && res && res.data) {
            let authState = JSON.parse(authResult.state);
            if (authState && authState.action && authState.action === AUTH_STATE_ACTION_LOGIN) {
              this.setSession(authResult, res.data.user);
              history.replace(routeCodes.DASHBOARD);
            } else if (authState && authState.action && authState.action === AUTH_STATE_ACTION_SIGNUP) {
              this.setSession(authResult, res.data.user);
              history.replace(routeCodes.DASHBOARD);
            }
          }
        })
        .catch((err) => {
          history.replace(publicPath);
          console.log(err);
        });
    } else if (err) {
      history.replace(publicPath);
      console.log(err);
    }
  }

  setSession(authResult, userData = null) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(LOCALSTORAGE_ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(LOCALSTORAGE_EXPIRES_AT_KEY, expiresAt);
    localStorage.setItem(LOCALSTORAGE_ROLE_KEY, window.btoa(USER_ROLE));
    localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, jwt.encode(userData, FITASSIST_USER_DETAILS_TOKEN_KEY));
    if (userData) {
      if (userData.username) {
        localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, window.btoa(userData.username));
      }
    }
    // navigate to the home route
    history.replace(publicPath);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_EXPIRES_AT_KEY);
    localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
    localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
    localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_USER_DETAILS_KEY);
    // navigate to the home route
    ts('Logout success!');
    history.replace(publicPath);
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    let expiresAt = JSON.parse(localStorage.getItem(LOCALSTORAGE_EXPIRES_AT_KEY));
    if (accessToken && (new Date().getTime() < expiresAt)) {
      return true;
    }
    return false;
  }
}
