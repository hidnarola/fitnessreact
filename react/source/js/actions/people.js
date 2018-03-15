export const GET_PEOPLE_START = 'GET_PEOPLE_START';
export const GET_PEOPLE_ERROR = 'GET_PEOPLE_ERROR';
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';

export const GET_TOTAL_POSTS = 'GET_TOTAL_POSTS';


export function getPeopleNew() {
    return {
        type: GET_PEOPLE_START,
    };
}


export function getPosts(){
    return {
        type:GET_TOTAL_POSTS
    }
}