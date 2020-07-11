<template>
  <div>
    <div class="single-movie-page">
      <div class="single-movie-page-content" v-if="movie && !loadingContent">
        <div class="movie_img_container single-movies">
          <div class="oneMovie">
            <img :src="imageUrl+movie.poster_path" />
            <div class="large_banner">
              <h3 class="header-title">{{movie.title}}</h3>
              <div>
                <span class="checked">{{movie.release_date}}</span>
              </div>
              <p>{{movie.overview}}</p>
              <a @click="playMovieVideo()" class="single_movie_btn">
                <i class="fa fa-play mr-2"></i> Play Video
              </a>
              <div class="more_movie_details">
                <span class="movie_hidden_title" v-if="movie.release_date">Year</span>
                <span v-if="movie.release_date">{{movie.release_date}} |</span>
                <span class="movie_hidden_title" v-if="movie.runtime">Duration</span>
                <span v-if="movie.runtime">{{movie.runtime}}mins |</span>
                <span class="movie_hidden_title" v-if="movie.production_countries.length">Country</span>
                <span
                  v-if="movie.production_countries.length"
                >{{movie.production_countries[0].name}} |</span>
                <span class="movie_hidden_title" v-if="movie.genres.length">Genre</span>
                <span v-if="movie.genres.length">{{movie.genres[0].name}} |</span>
                <span v-if="movie.spoken_languages.length" class="movie_hidden_title">Language</span>
                <span v-if="movie.spoken_languages.length">{{movie.spoken_languages[0].name}} |</span>
              </div>
              <div class="crew_members" v-if="crews.length">
                <h5 class="header-title">Casts:</h5>
                <a
                  @click="getPersonDetails(crew)"
                  style="cursor:pointer!important;"
                  class="mr-2"
                  v-for="crew in crews"
                  :key="crew.id"
                >{{crew.name}}</a>,
              </div>
            </div>
          </div>
        </div>

        <div id="section">
          <!-- #################### SITE CONTENT #################### -->
          <div id="site-content">
            <div class="container-fluid movie-details" id="movie-details">
              <!-- ALL MOVIES -->

              <div class="more_details">
                <h4>More Details</h4>
                <div class="movie_details_boxes">
                  <div class="movie_details_box">
                    <h5>Watch offline</h5>
                    <p>{{movie.video ? "Available to download" : "Not available to download"}}</p>
                  </div>
                  <div class="movie_details_box" v-if="movie.genres.length">
                    <h5>Genres</h5>
                    <span
                      class="mr-2 genress"
                      v-for="genre in movie.genres"
                      :key="genre.name"
                      @click="getActionMovies(''+genre.id)"
                    >{{genre.name}},</span>
                  </div>
                  <div class="movie_details_box" v-if="movie.production_companies.length">
                    <h5>Production Company</h5>
                    <span
                      class="mr-2"
                      v-for="company in movie.production_companies"
                      :key="company.name"
                    >{{company.name}},</span>
                  </div>

                  <div class="movie_details_box" v-if="movie.status">
                    <h5>Status</h5>
                    <p>{{movie.status}}</p>
                  </div>
                  <div class="movie_details_box" v-if="movie.production_countries.length">
                    <h5>Production Country</h5>
                    <span
                      class="mr-2"
                      v-for="country in movie.production_countries"
                      :key="country.name"
                    >{{country.name}},</span>
                  </div>
                  <div class="movie_details_box" v-if="movie.spoken_languages.length">
                    <h5>Spoken Language</h5>
                    <span
                      class="mr-2"
                      v-for="language in movie.spoken_languages"
                      :key="language.name"
                    >{{language.name}},</span>
                  </div>
                </div>

                <div class="more_cast" v-if="casts.length">
                  <h5>Cast</h5>
                  <div class="more_cast_boxes">
                    <span
                      style="cursor:pointer!important;"
                      @click="getPersonDetails(cast)"
                      class="mr-2"
                      v-for="cast in casts"
                      :key="cast.name"
                    >
                      <b>{{cast.name}}</b>
                      <small class="ml-2">({{cast.character}})</small>
                    </span>
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
      <div style="padding-top: 80px; padding-bottom: 180px;" v-if="!loadingContent && !movie">
        <!-- #################### SITE CONTENT #################### -->
        <div id="site-content">
          <div class="container-fluid movie-details" id="movie-details">
            <NoResult :searchInput="nomovie" />
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
import RelatedMovies from "../components/RelatedMovies";
import VideoContainer from "../components/VideoContainer";
import LoadingMovies from "../components/LoadingMovies";
import NoResult from "../components/NoResult";
export default {
  components: {
    AllMovies,
    RelatedMovies,
    VideoContainer,
    LoadingMovies,
    NoResult
  },

  data() {
    return {
      query: "movie/popular",
      loadingContent: true,
      nomovie: "this movie"
    };
  },
  computed: {
    showVideo() {
      return this.$store.state.showVideo;
    },
    movie() {
      return this.$store.state.singleMovie;
    },
    movies() {
      let movie = this.$store.state.relatedMovies;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    },
    imageUrl() {
      return this.$store.state.imageUrl;
    },
    crews() {
      return this.$store.state.crews.slice(0, 10);
    },

    casts() {
      return this.$store.state.crews.slice(0, 21);
    },
    videos() {
      return this.$store.state.videos[0];
    },
    films() {
      return this.$store.state.movies;
    },

    checkId() {
      return this.id == this.movie.id;
    }
  },

  props: ["id"],
  methods: {
    playMovieVideo: function() {
      this.$store.dispatch("showLoading");
      setTimeout(() => {
        this.$store.dispatch("closeLoading");
        this.$store.dispatch("showVideo");
      }, 4000);
    },

    getSingleMovieDetails: function() {
      this.$store.dispatch("getSingleMovieDetails", this.id);
    },
    getCrew: function() {
      this.$store.dispatch("getCrew", this.id);
    },

    getVideo: function() {
      this.$store.dispatch("getVideo", this.id);
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
    getRelatedMovies: function() {
      this.$store.dispatch("getRelatedMovies", this.id);
    },
    closeLoadingContent: function() {
      this.loadingContent = true;
      this.$store.state.showVideo = false;
      setTimeout(() => {
        this.loadingContent = false;
      }, 3000);
    },
    getPersonDetails: function(movie) {
      this.$store.state.loading = true;
      setTimeout(() => {
        this.$store.state.loading = false;
        this.$router.push({
          name: "ActorMovie",
          params: { id: movie.id }
        });
      }, 2000);
    },
    getActionMovies: function(movieId) {
      this.$store.state.loading = true;
      this.$store.dispatch("getActionMovies", movieId);

      setTimeout(() => {
        this.$router
          .push({ name: "MenuCategory", params: { id: movieId } })
          .catch(error => {
            if (error) {
              error;
            }
          });
        this.$store.state.loading = false;
      }, 2500);
    }
  },
  mounted() {
    this.closeLoadingContent();
    this.getSingleMovieDetails();
    this.getCrew();
    this.getVideo();
    this.getRelatedMovies();
    this.currentSitePage = this.$router.history.current.name;
  },
  watch: {
    "$route.params.id": function() {
      this.$store.state.singleMovie = "";
      this.closeLoadingContent();
      this.getSingleMovieDetails();
      this.getCrew();
      this.getVideo();
      this.getRelatedMovies();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.singleMovie = "";
    this.searchInput = "";
    this.isCategorySearching = false;
    next();
  }
};
</script>

<style></style>
