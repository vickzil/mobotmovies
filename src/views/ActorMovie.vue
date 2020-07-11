<template>
  <div>
    <div class="single-movie-page">
      <div class="single-movie-page-content" v-if="movie && !loadingContent">
        <div class="movie_img_container single-movies">
          <div class="oneMovie actormovie">
            <img :src="imageUrl+movie.profile_path" />
            <div class="large_banner">
              <h3 class="header-title">{{movie.name}}</h3>
              <p v-if="movie.biography">{{movie.biography}}</p>

              <div class="more_movie_details">
                <span class="movie_hidden_title" v-if="movie.birthday">Birthday</span>
                <span v-if="movie.birthday">{{movie.birthday}} |</span>
                <span class="movie_hidden_title" v-if="movie.deathday">Death</span>
                <span v-if="movie.deathday">{{movie.deathday}} |</span>
                <span class="movie_hidden_title" v-if="movie.place_of_birth">Place of Birth</span>
                <span v-if="movie.place_of_birth">{{movie.place_of_birth}} |</span>
                <span class="movie_hidden_title" v-if="movie.known_for_department.length">Profession</span>
                <span v-if="movie.known_for_department">{{movie.known_for_department}} |</span>
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
                <h3 class="movie-heading" id="all-movie-title">{{movie.name}}'s Movies:</h3>
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
  </div>
</template>

<script>
import RelatedMovies from "../components/RelatedMovies";
import AllMovies from "../components/AllMovies";
import LoadingMovies from "../components/LoadingMovies";
import NoResult from "../components/NoResult";
export default {
  components: {
    AllMovies,
    LoadingMovies,
    NoResult,
    RelatedMovies
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
      let movie = this.$store.state.actorMovieCredits;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    },

    films() {
      let movie = this.$store.state.movies;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    }
  },

  props: ["id"],
  methods: {
    getSingleActorDetails: function() {
      this.$store.dispatch("getSingleActorDetails", this.id);
    },

    getActorRelatedMovies: function() {
      this.$store.dispatch("getActorRelatedMovies", this.id);
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
      if (this.movie) {
        setTimeout(() => {
          this.loadingContent = false;
        }, 3000);
      } else {
        setTimeout(() => {
          this.loadingContent = false;
          this.networkError = true;
        }, 18000);
      }
    },
    updateMovie: function() {
      setInterval(() => {
        this.closeLoadingContent();
      }, 1000);
    }
  },
  mounted() {
    this.closeLoadingContent();
    this.getSingleActorDetails();
    this.updateMovie();
    this.getActorRelatedMovies();
    this.currentSitePage = this.$router.history.current.name;
  },
  watch: {
    "$route.params.id": function() {
      this.closeLoadingContent();
      this.getSingleActorDetails();
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
