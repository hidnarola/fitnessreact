export const GET_FRIENDS_START = 'GET_FRIENDS_START';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_ERROR = 'GET_FRIENDS_ERROR';

export function getFriendsData() {
    return {
        type: GET_FRIENDS_START,
    }
}

export function friendsSuccessAction(data) {
    return {
        type: GET_FRIENDS_SUCCESS,
        data
    }
}

export function friendsErrorAction(error) {
    return {
        type: GET_FRIENDS_ERROR,
        error
    }
}