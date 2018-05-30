import { Map } from "immutable";
import jwtDecode from 'jwt-decode';
import jwt from "jwt-simple";
import { SET_LOGGED_USER_FROM_LOCALSTORAGE } from "../actions/user";
import { LOCALSTORAGE_ID_TOKEN_KEY, LOCALSTORAGE_USERNAME_KEY, LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY } from "../constants/consts";

const initialState = Map({
    loading: false,
    error: null,
    loggedUserData: null,
});

const actionsMap = {
    [SET_LOGGED_USER_FROM_LOCALSTORAGE]: (state, action) => {
        let idToken = localStorage.getItem(LOCALSTORAGE_ID_TOKEN_KEY);
        let idDetailsToken = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
        let encodedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME_KEY);
        let decodedToken = jwtDecode(idToken);
        let userDetails = (idDetailsToken) ? jwt.decode(idDetailsToken, FITASSIST_USER_DETAILS_TOKEN_KEY) : {};
        let username = window.atob(encodedUsername);
        let name = decodedToken.name;
        if (userDetails && userDetails.firstName) {
            name = userDetails.firstName;
            if (userDetails.lastName) {
                name += ' ' + userDetails.lastName;
            }
        }
        let userData = {
            authId: decodedToken.sub,
            name: name,
            email: decodedToken.email,
            avatar: decodedToken.picture,
            username: username,
            userDetails: userDetails,
        }
        return state.merge(Map({
            loading: false,
            error: null,
            loggedUserData: userData,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
