import { Map } from "immutable";
import jwt from "jwt-simple";
import { SET_LOGGED_ADMIN_FROM_LOCALSTORAGE } from "../../actions/admin/admin";
import { LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY } from "../../constants/consts";

const initialState = Map({
    loggedUserData: null,
});

const actionMap = {
    [SET_LOGGED_ADMIN_FROM_LOCALSTORAGE]: (state, action) => {
        let idDetailsToken = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
        let userDetails = (idDetailsToken) ? jwt.decode(idDetailsToken, FITASSIST_USER_DETAILS_TOKEN_KEY) : {};
        if (userDetails && userDetails.firstName) {
            let name = userDetails.firstName;
            if (userDetails.lastName) {
                name += ' ' + userDetails.lastName;
            }
            userDetails.name = name;
        }
        return state.merge(Map({
            loading: false,
            error: null,
            loggedUserData: userDetails,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}
