<template>
  <div>
    <div class="single-movie-page">
      <div class="single-movie-page-content" v-if="movie && !loadingContent">
        <div class="movie_img_container single-movies">
          <div class="oneMovie actormovie">
            <img :src="imageUrl+movie.poster_path" />
            <div class="large_banner">
              <h3 class="header-title">{{movie.name}}</h3>
              <div>
                <span class="checked">{{movie.first_air_date}}</span>
              </div>
              <p>{{movie.overview}}</p>

              <div class="more_movie_details">
                <span class="movie_hidden_title" v-if="movie.networks.length">Networks</span>
                <span v-if="movie.networks.length">{{movie.networks[0].name}} |</span>
                <span class="movie_hidden_title" v-if="movie.origin_country.length">Country</span>
                <span v-if="movie.origin_country.length">{{movie.origin_country[0]}} |</span>
                <span class="movie_hidden_title" v-if="movie.created_by.length">Created By</span>
                <span v-if="movie.created_by.length">{{movie.created_by[0].name}} |</span>

                <span class="movie_hidden_title" v-if="movie.genres.length">Genre</span>
                <span v-if="movie.genres.length">{{movie.genres[0].name}} |</span>
              </div>
            </div>
          </div>
        </div>
        <div id="section">
          <!-- #################### SITE CONTENT #################### -->
          <div id="site-content">
            <div class="container-fluid movie-details" id="movie-details">
              <!-- ALL MOVIES -->
              <div class="movies" v-if="movies.length">
                <h3 class="movie-heading" id="all-movie-title">You MAy Also Like:</h3>
                <RelatedMovies :movies="movies" />
              </div>
              <div class="movies">
                <h3 class="movie-heading" id="all-movie-title">FEATURED MOVIES:</h3>
                <div id="totalMovies">
                  <AllMovies :films="films" :query="query" />
                </div>
              </div>

              <NoResult v-if="networkError" :searchInput="searchInput" />
            </div>
          </div>
        </div>
      </div>
      <LoadingMovies v-if="loadingContent" />
    </div>
    <VideoContainer :videos="videos" v-if="showVideo" />
  </div>
</template>

<script>
import AllMovies from "../components/AllMovies";
import LoadingMovies from "../components/LoadingMovies";
import NoResult from "../components/NoResult";
import VideoContainer from "../components/VideoContainer";
import RelatedMovies from "../components/RelatedMovies";
export default {
  components: {
    AllMovies,
    LoadingMovies,
    NoResult,
    RelatedMovies,
    VideoContainer
  },

  data() {
    return {
      query: "movie/popular",
      loadingContent: true,
      networkError: false,
      searchInput: "(NetworkError), Please check your network"
    };
  },
  computed: {
    movie() {
      return this.$store.state.singleMovie;
    },
    imageUrl() {
      return this.$store.state.imageUrl;
    },

    movies() {
      let movie = this.$store.state.relatedMovies;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    },

    showVideo() {
      return this.$store.state.showVideo;
    },

    videos() {
      return this.$store.state.videos[0];
    },

    films() {
      let movie = this.$store.state.movies;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    }
  },

  props: ["id"],
  methods: {
    getSingleSeriesMovies: function() {
      this.$store.dispatch("getSingleSeriesMovies", this.id);
    },

    shuffleArray: function(array) {
      var ctr = array.length,
        temp,
        index;
      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    },
    closeLoadingContent: function() {
      setTimeout(() => {
        this.loadingContent = false;
      }, 3000);
    },
    playMovieVideo: function() {
      this.$store.dispatch("showLoading");
      setTimeout(() => {
        this.$store.dispatch("closeLoading");
        this.$store.dispatch("showVideo");
      }, 4000);
    },

    getVideo: function() {
      this.$store.dispatch("getVideo", this.id);
    },
    getRelatedMovies: function() {
      this.$store.dispatch("getRelatedMovies", this.id);
    }
  },
  mounted() {
    this.closeLoadingContent();
    this.getSingleSeriesMovies();
    this.getRelatedMovies();
    this.getVideo();
    this.currentSitePage = this.$router.history.current.name;
  },
  watch: {
    "$route.params.id": function() {
      this.closeLoadingContent();
      this.getSingleSeriesMovies();
      this.getRelatedMovies();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.loadingContent = false;
    this.networkError = false;
    this.$store.state.singleMovie = "";
    next();
  }
};
</script>

<style></style>
