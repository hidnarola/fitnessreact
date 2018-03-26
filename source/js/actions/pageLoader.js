export const SHOW_PAGE_LOADER = 'SHOW_PAGE_LOADER';
export const HIDE_PAGE_LOADER = 'HIDE_PAGE_LOADER';

export function showPageLoader() {
    return {
        type: SHOW_PAGE_LOADER,
    }
}

export function hidePageLoader() {
    return {
        type: HIDE_PAGE_LOADER,
    }
}