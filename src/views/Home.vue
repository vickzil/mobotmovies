/* eslint-disable */
<template>
  <!-- #################### HOMEPAGE #################### -->
  <div class="homePage">
    <div class="homepage-content" v-if="!pageLoading">
      <div class="movie_img_container">
        <HomeBanner />
      </div>

      <div id="section">
        <!-- #################### SITE CONTENT #################### -->
        <div id="site-content">
          <div class="container-fluid movie-details" id="movie-details">
            <!-- ALL MOVIES -->
            <UpcomingMovies />
            <!-- ALL MOVIES -->
            <div class="movies">
              <TrendingMovies
                :getTrendingMovies="getTrendingMovies"
                :trendingMoviePath="trendingMoviePath"
              />
            </div>

            <div class="movies" v-if="movies.length">
              <h3 class="movie-heading" id="all-movie-title">
                ACTORS:
                <!-- <router-link
                  :to="{ name: 'Category', params: { id: actorsMoviePath } }"
                  class="float-right seeAll"
                >SEE ALL</router-link>-->
              </h3>
              <ActorDetails :movies="movies" />
            </div>
            <div class="movies" v-if="series.length">
              <TvSeries :series="series" :tvSeriesPath="tvSeriesPath" />
            </div>

            <div class="movies" v-if="films.length">
              <h3 class="movie-heading" id="all-movie-title">POPULAR MOVIES:</h3>
              <div id="totalMovies">
                <AllMovies :films="films" :query="query" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="homePage_loading" v-if="pageLoading">
      <LoadingPage />
    </div>
  </div>
</template>

<script>
import HomeBanner from "../components/HomeBanner";
import AllMovies from "../components/AllMovies";
import LoadingPage from "../components/LoadingPage";
import ActorDetails from "../components/ActorDetails";
import TvSeries from "../components/TvSeries";
import TrendingMovies from "../components/TrendingMovies";
import UpcomingMovies from "../components/UpcomingMovies";

export default {
  name: "Home",
  components: {
    LoadingPage,
    HomeBanner,
    AllMovies,
    ActorDetails,
    TvSeries,
    TrendingMovies,
    UpcomingMovies
  },

  data() {
    return {
      query: "movie/popular",
      i: 1,
      time: 7000
    };
  },

  computed: {
    showWhatsAppWidgets() {
      return this.$store.state.showWhatsAppWidgets;
    },
    pageLoading: {
      get() {
        return this.$store.state.pageLoading;
      },
      set(value) {
        return (this.$store.state.pageLoading = value);
      }
    },
    getTrendingMovies() {
      let movie = this.$store.state.trending;
      let shuffleMovie = this.shuffleArray(movie);
      let newMovie = shuffleMovie.slice(0, 14);
      return newMovie;
    },
    movies() {
      return this.$store.state.actors;
    },
    films() {
      return this.$store.state.movies;
    },
    series() {
      let movie = this.$store.state.series;
      let shuffleMovie = this.shuffleArray(movie);
      let newMovie = shuffleMovie.slice(0, 14);
      return newMovie;
    },
    iUrl() {
      return "https://api.themoviedb.org/3/";
    },

    actorsMoviePath() {
      return "credits";
    },
    trendingMoviePath() {
      return "trending";
    },
    tvSeriesPath() {
      return "tv";
    },
    apiKEY() {
      return this.$store.state.apiKEY;
    },
    currentSitePage: {
      get() {
        return this.$store.state.currentSitePage;
      },
      set(value) {
        return (this.$store.state.currentSitePage = value);
      }
    }
  },

  methods: {
    updateCurrentMovie: function() {
      if (this.films) {
        let index = Math.floor(Math.random() * this.films.length);
        let currentMovie = this.films[index];
        this.$store.dispatch("updateCurrentMovie", currentMovie);
      }
    },
    closeNavigationMenu: function() {
      this.$store.dispatch("closeNavigationMenu");
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
    }
    // changeBanner: function() {
    //   this.$store.state.currentHomeMovie = this.films[this.i];

    //   if (this.i < this.films.length - 1) {
    //     this.i += 1;
    //   } else {
    //     this.i = 1;
    //   }
    // },

    // mountingBanner: function() {
    //   setInterval(() => {
    //     this.changeBanner();
    //   }, this.time);
    // },
    // resetI: function() {
    //   this.i = 1;
    // }
  },

  mounted() {
    this.updateCurrentMovie();
    // this.mountingBanner();
    this.currentSitePage = this.$router.history.current.name;
  },
  beforeRouteLeave(to, from, next) {
    this.searchInput = "";
    this.isCategorySearching = false;
    next();
  }
};
</script>

<style scoped></style>
