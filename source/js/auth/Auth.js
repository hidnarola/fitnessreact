// import history from '../history';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../config/history';
import { publicPath, routeCodes } from '../constants/routes';
import { LOCALSTORAGE_ACCESS_TOKEN_KEY, LOCALSTORAGE_ID_TOKEN_KEY, LOCALSTORAGE_EXPIRES_AT_KEY, LOCALSTORAGE_ROLE_KEY, USER_ROLE } from '../constants/consts';

export default class Auth {
  auth0Lock = new Auth0Lock(
    AUTH_CONFIG.clientId,
    AUTH_CONFIG.domain,
    {
      auth: {
        audience: `https://${AUTH_CONFIG.domain}/api/v2/`,
        redirectUrl: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
      }
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
    this.auth0Lock.show({ allowSignUp: false });
  }

  handleAuthentication(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
      history.replace(routeCodes.DASHBOARD);
    } else if (err) {
      history.replace(publicPath);
      console.log(err);
      // alert(`Error: ${err.error}. Check the console for further details.`);
    }
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(LOCALSTORAGE_ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(LOCALSTORAGE_EXPIRES_AT_KEY, expiresAt);
    localStorage.setItem(LOCALSTORAGE_ROLE_KEY, window.btoa(USER_ROLE));
    // navigate to the home route
    history.replace(publicPath);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_EXPIRES_AT_KEY);
    localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
    // navigate to the home route
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
