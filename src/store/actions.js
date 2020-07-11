// GET Movies FROM API
import axios from "axios";
let apiKEY = "871bc413d32dc2aa35cef18698718a80";
let url = "https://api.themoviedb.org/3/";
// GENERATE RANDOM WORDS




// GET TRENDING MOVIES
export const getTrendingMovies = ({
    commit
}) => {

    const urlPath = url + "trending/all/week?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_TRENDING_MOVIES", response.data.results);
    }).catch(err => console.log(err));
};


// GET UPCOMING MOVIES
export const getUpcomingMovies = ({
    commit
}) => {

    const urlPath = url + "movie/upcoming?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_UPCOMING_MOVIES", response.data.results);
    }).catch(err => console.log(err));
};


// GET ACTORS
export const getActors = ({
    commit
}) => {
    let id = 299536;
    const urlPath = url + "movie/" + id + "/credits?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_ACTORS", response.data.cast);
    }).catch(err => console.log(err));
};


// GET TV SERIES
export const tvSeries = ({
    commit
}) => {
    const urlPath = url + "tv/popular?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_TV_SERIES", response.data.results);
    }).catch(err => console.log(err));
};


// GET ALL MOVIES
export const getAllMovies = ({
    commit
}) => {
    let currentPage = 1;
    const urlPath = url + "movie/popular?api_key=" + apiKEY + "&page=" + currentPage;

    axios.get(urlPath).then(response => {
        commit("GET_ALL_MOVIES", response.data.results);
    }).catch(err => console.log(err));
};


// GET RELATED MOVIES
export const getRelatedMovies = ({
    commit
}, movieid) => {
    const urlPath = url + "movie/" + movieid + "/recommendations?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_RELATED_MOVIES", response.data.results);
    }).catch(err => console.log(err));
};


// GET RELATED MOVIES
export const getActorRelatedMovies = ({
    commit
}, movieid) => {
    const urlPath = url + "person/" + movieid + "/movie_credits?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_ACTOR_RELATED_MOVIES", response.data.cast);
    }).catch(err => console.log(err));
};


// GET SINGLE MOVIES
export const getSingleMovieDetails = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "movie/" + movieId + "?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_MOVIE_DETAILS", response.data);
    }).catch(err => console.log(err));
};


// GET SINGLE ACTOR DETAILS
export const getSingleActorDetails = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "person/" + movieId + "?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_MOVIE_DETAILS", response.data);
    }).catch(err => console.log(err));
};


// GET TV SERIES MOVIES
export const getSingleSeriesMovies = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "tv/" + movieId + "?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_MOVIE_DETAILS", response.data);
    }).catch(err => console.log(err));
};

// GET  MOVIES CREW
export const getCrew = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "movie/" + movieId + "/credits?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_MOVIE_CREWS", response.data.cast);
    }).catch(err => console.log(err));
};


// GET  MOVIES VIDEOS
export const getVideo = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "movie/" + movieId + "/videos?api_key=" + apiKEY;

    axios.get(urlPath).then(response => {
        commit("GET_MOVIE_VIDEOS", response.data.results);
    }).catch(err => console.log(err));
};


// GET  MOVIES VIDEOS
export const getActionMovies = ({
    commit
}, id) => {
    let movieId = id;
    const urlPath = url + "discover/movie?api_key=" + apiKEY + "&with_genres=" + movieId;

    axios.get(urlPath).then(response => {
        commit("FETCH_MORE_MENU_CAT_MOVIE", response.data.results);
    }).catch(err => console.log(err));
};


// GET  MOVIES VIDEOS
export const fetchMoreMenuCategoryMovies = ({
    commit
}, movies) => {
    commit("FETCH_MORE_MENU_CAT__MOVIE", movies);
};


// GET  MOVIES VIDEOS
export const fetchMoreSearchMovies = ({
    commit
}, movies) => {
    commit("FETCH_MORE_SEARCH_MOVIES_MOVIE", movies);
};



// SEARCH ALL MOVIES
export const searchAllMovies = ({
    commit
}, movies) => {
    commit("SEARCH_ALL_MOVIE", movies);
};


// FETCH MORE MOVIES
export const fetchMoreMovies = ({
    commit
}, movie) => {
    commit("FETCH_MORE_MOVIE", movie);
};


// SEARCH CATEGORY MOVIES
export const searchCategoryMovies = ({
    commit
}, movies) => {

    commit("SEARCH_CATEGORY_MOVIE", movies);

};


// FETCH MORE MOVIES
export const fetchAllCatMovies = ({
    commit
}, movie) => {
    commit("FETCH_ALL_CATEGORY_MOVIE", movie);
};


// FETCH MORE CATEGORY MOVIES
export const fetchMoreCategoryMovies = ({
    commit
}, movie) => {
    commit("FETCH_MORE_CATEGORY_MOVIE", movie);
};

// SHOW SEARCH FORM
export const updateCurrentMovie = ({
    commit
}, movie) => {
    commit("UPDATE_MOVIE", movie);
};



// SHOW SEARCH FORM
export const showSearch = ({
    commit
}) => {
    commit("SHOW_SEARCH");
};


// SHOW LOADING
export const showLoading = ({
    commit
}) => {
    commit("SHOW_LOADING");
};


// CLOSE LOADING
export const closeLoading = ({
    commit
}) => {
    commit("CLOSE_LOADING");
};


// SHOW VIDEO
export const showVideo = ({
    commit
}) => {
    commit("SHOW_VIDEO");
};


// CLOSE VIDEO
export const closeVideo = ({
    commit
}) => {
    commit("CLOSE_VIDEO");
};

// SHOW NAVIGATION MENU
export const showNavigationMenu = ({
    commit
}) => {
    commit("SHOW_NAVIGATION_MENU");
};


// CLOSE NAVIGATION MENU
export const closeNavigationMenu = ({
    commit
}) => {
    commit("CLOSE_NAVIGATION_MENU");
};