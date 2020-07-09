// SHOW SEARCH FORM
export const SHOW_SEARCH = (state) => {
    state.showSearchForm = !state.showSearchForm;
};

// SHOW LOADING
export const SHOW_LOADING = (state) => {
    state.loading = true;
};


// GET TRENDING MOVIES
export const GET_TRENDING_MOVIES = (state, movies) => {
    let index = Math.floor(Math.random() * movies.length);
    state.trending = movies;
    if (movies) {
        state.currentHomeMovie = movies[index];
    }

};
// GET TRENDING MOVIES
export const GET_ACTORS = (state, movies) => {
    state.actors = movies;
};


// GET TRENDING MOVIES
export const GET_UPCOMING_MOVIES = (state, movies) => {
    state.upcoming = movies;
};


// GET TV SERIES
export const GET_TV_SERIES = (state, movies) => {
    state.series = movies;
};


// GET ALL MOVIES
export const GET_ALL_MOVIES = (state, movies) => {
    state.movies = movies;
};


// GET RELATED MOVIES
export const GET_RELATED_MOVIES = (state, movies) => {
    state.relatedMovies = movies;

};


// GET MOVIES DETAILS
export const GET_MOVIE_DETAILS = (state, movie) => {
    state.singleMovie = movie;
};


// SEARCH MOVIES
export const SEARCH_ALL_MOVIE = (state, movie) => {
    state.search = movie;
};


// GET MOVIES CREWS
export const GET_MOVIE_CREWS = (state, movies) => {
    state.crews = movies;
};


// GET MOVIES VIDEOS
export const GET_MOVIE_VIDEOS = (state, movies) => {
    state.videos = movies;

};


// GET MORE CATEGORY MOVIES 
export const FETCH_MORE_CATEGORY_MOVIE = (state, movies) => {
    state.category = movies;

};

// GET MORE CATEGORY MOVIES 
export const FETCH_MORE_MENU_CAT_MOVIE = (state, movies) => {
    state.menuCategory = movies;

};

// GET MORE CATEGORY MOVIES 
export const FETCH_MORE_MENU_CAT__MOVIE = (state, movies) => {
    state.menuCategory = [...state.menuCategory, ...movies];

};


// GET MORE CATEGORY MOVIES 
export const SEARCH_CATEGORY_MOVIE = (state, movies) => {
    state.searchHolder = movies;

};


// GET MORE MOVIES
export const FETCH_MORE_MOVIE = (state, movies) => {
    state.movies = [...state.movies, ...movies];
};


// GET MORE MOVIES
export const FETCH_ALL_CATEGORY_MOVIE = (state, movies) => {
    state.category = [...state.category, ...movies];
};

// UPDATE CURRENT MOVIES
export const UPDATE_MOVIE = (state, movie) => {
    if (movie) {
        state.currentHomeMovie = movie;
    }

};


// CLOSE LOADING
export const CLOSE_LOADING = (state) => {
    state.loading = false;
};


// SHOW VIDEO
export const SHOW_VIDEO = (state) => {
    state.showVideo = true;
};


// CLOSE VIDEO
export const CLOSE_VIDEO = (state) => {
    state.showVideo = false;
};


// OPEN NAVIGATION MENU
export const SHOW_NAVIGATION_MENU = (state) => {
    state.showNavMenu = !state.showNavMenu;
};


// CLOSE NAVIGATION MENU
export const CLOSE_NAVIGATION_MENU = (state) => {
    state.showNavMenu = false;
};