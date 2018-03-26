import { LOCALSTORAGE_TOKEN_ITEM_KEY } from "../constants/consts";

export function extraHeaders() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_ITEM_KEY);
    let headers = {
        'x-access-token': token,
    };
    return headers;
}