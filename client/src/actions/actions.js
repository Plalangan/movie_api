export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_FAVORITE = 'SET_FAVORITE';

export function setMovies(value) {
    return { type: SET_MOVIES, value};
}

export function setFilter(value){
    return { type: SET_FILTER, value};
}

export function setFavorite(value){
    return { type: SET_FAVORITE, value};
}