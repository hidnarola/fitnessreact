import { BASE_URL } from "../constants/consts";

export const AUTH_CONFIG = {
  domain: 'fitassist.eu.auth0.com',
  clientId: 'YsOdTiUfiX1vpUodXsT6Dkh7waOSjzSH',
  callbackUrl: `${BASE_URL}auth0_callback`,
}

export const AUTH_CALLBACK_ROUTE = '/auth0_callback';