import axios from 'axios';
import {
  SERVER_BASE_URL,
  VALIDATION_FAILURE_STATUS,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  LOCALSTORAGE_ROLE_KEY,
  ADMIN_ROLE,
  LOCALSTORAGE_ACCESS_TOKEN_KEY,
  LOCALSTORAGE_ID_TOKEN_KEY,
  LOCALSTORAGE_EXPIRES_AT_KEY,
  LOCALSTORAGE_USERNAME_KEY,
  LOCALSTORAGE_REFRESH_TOKEN_KEY,
  SESSION_EXPIRED_URL_TYPE,
  LOCALSTORAGE_USER_DETAILS_KEY,
} from '../constants/consts';
import history from '../config/history';
import { publicPath } from '../constants/routes';
import { adminRootRoute } from '../constants/adminRoutes';
// Simple API wrapper

// const API_URL = 'https://swapi.co/api';
const API_URL = SERVER_BASE_URL;

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  return {
    response,
    message,
    status,
    toString: () => {
      return `${this.message}\nResponse:\n${
        isObject ? JSON.stringify(this.response, null, 2) : this.response
      }`;
    },
  };
}

// API wrapper function
export const fetchResource = (path, userOptions = {}) => {
  // Define default options
  const defaultOptions = {};

  // Define default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const options = {
    // Merge options
    ...defaultOptions,
    ...userOptions,
    // Merge headers
    headers: {
      ...defaultHeaders,
      ...userOptions.headers,
    },
  };

  // Build Url
  const url = `${API_URL}${path}`;

  // Detect is we are uploading a file
  const isFile = typeof window !== 'undefined' && options.body instanceof File;

  // Stringify JSON data
  // If body is not a file
  if (options.body && typeof options.body === 'object' && !isFile) {
    options.body = JSON.stringify(options.body);
  }

  // Variable which will be used for storing response
  let response = null;

  return (
    fetch(url, options)
      .then(responseObject => {
        // Saving response for later use in lower scopes
        response = responseObject;

        // HTTP unauthorized
        if (response.status === UNAUTHORIZED) {
          var userRole = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
          var url = publicPath;
          if (window.atob(userRole) === ADMIN_ROLE) {
            url = adminRootRoute + '/';
          }
          localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_EXPIRES_AT_KEY);
          localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
          localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
          localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_USER_DETAILS_KEY);
          history.replace(`${url}${SESSION_EXPIRED_URL_TYPE}`);
        }

        // Check for error HTTP error codes
        if (response.status < 200 || response.status >= 300) {
          // Get response as text
          return response.text();
        }

        // Get response as json
        return response.json();
      })
      // "parsedResponse" will be either text or javascript object depending if
      // "response.text()" or "response.json()" got called in the upper scope
      .then(parsedResponse => {
        // Check for HTTP error codes
        if (response.status < 200 || response.status >= 300) {
          // Throw error
          throw parsedResponse;
        }

        // Request succeeded
        return parsedResponse;
      })
      .catch(error => {
        // Throw custom API error
        // If response exists it means HTTP error occured
        if (response) {
          throw ApiError(
            `Request failed with status ${response.status}.`,
            error,
            response.status,
          );
        } else {
          throw ApiError(error.toString(), null, 'REQUEST_FAILED');
        }
      })
  );
};

export const postFormData = (path, data, headers) => {
  // Build Url
  const url = `${API_URL}${path}`;

  let defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  let _headers = {
    ...defaultHeaders,
    ...headers,
  };

  try {
    return axios({
      method: 'POST',
      url: url,
      data: data,
      headers: _headers,
    })
      .then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        if (error.response) {
          if (error.response.status === UNAUTHORIZED) {
            var userRole = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
            var url = publicPath;
            if (window.atob(userRole) === ADMIN_ROLE) {
              url = adminRootRoute + '/';
            }
            localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
            localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
            localStorage.removeItem(LOCALSTORAGE_EXPIRES_AT_KEY);
            localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
            localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
            localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
            localStorage.removeItem(LOCALSTORAGE_USER_DETAILS_KEY);
            history.replace(`${url}${SESSION_EXPIRED_URL_TYPE}`);
          } else if (error.response.status === BAD_REQUEST) {
            throw ApiError(
              error.response.data.message,
              error.response.data,
              error.response.status,
            );
          } else if (error.response.status === NOT_FOUND) {
            throw ApiError(
              `Request not found! please try again later.`,
              null,
              error.response.status,
            );
          } else if (error.response.status === VALIDATION_FAILURE_STATUS) {
            throw ApiError(
              `Validation errors.`,
              error.response.data,
              error.response.status,
            );
          } else {
            throw ApiError(
              `Request failed with status ${error.response.status}.`,
              error.response.data,
              error.response.status,
            );
          }
        } else {
          throw ApiError(error.toString(), null, 'REQUEST_FAILED');
        }
      });
  } catch (error) {
    throw ApiError(error.toString(), null, 'REQUEST_FAILED');
  }
};

export const putFormData = (path, data, headers) => {
  // Build Url
  const url = `${API_URL}${path}`;

  let defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  let _headers = {
    ...defaultHeaders,
    ...headers,
  };

  return axios({
    method: 'PUT',
    url: url,
    data: data,
    headers: _headers,
  })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      if (error.response) {
        if (error.response.status === UNAUTHORIZED) {
          var userRole = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
          var url = publicPath;
          if (window.atob(userRole) === ADMIN_ROLE) {
            url = adminRootRoute + '/';
          }
          localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_ID_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_EXPIRES_AT_KEY);
          localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
          localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
          localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
          localStorage.removeItem(LOCALSTORAGE_USER_DETAILS_KEY);
          history.replace(`${url}${SESSION_EXPIRED_URL_TYPE}`);
        } else if (error.response.status === BAD_REQUEST) {
          throw ApiError(
            error.response.data.message,
            error.response.data,
            error.response.status,
          );
        } else if (error.response.status === NOT_FOUND) {
          throw ApiError(
            `Request not found! please try again later.`,
            null,
            error.response.status,
          );
        } else if (error.response.status === VALIDATION_FAILURE_STATUS) {
          throw ApiError(
            `Validation errors.`,
            error.response.data,
            error.response.status,
          );
        } else {
          throw ApiError(
            `Request failed with status ${error.response.status}.`,
            error.response.data,
            error.response.status,
          );
        }
      } else {
        throw ApiError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};
