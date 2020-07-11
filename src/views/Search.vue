<template>
  <div class="categoryPage">
    <div class="category-content" v-if="!loadingContent">
      <div id="section">
        <!-- #################### SITE CONTENT #################### -->
        <div id="site-content" class="categoryPage">
          <div class="container-fluid movie-details" id="movie-details">
            <div class="search_page_form">
              <form @submit.prevent="searchMovies">
                <input
                  type="text"
                  placeholder="Search any Movie..."
                  @keyup="searchMovies"
                  v-model="searchInput"
                  autocomplete="off"
                />
              </form>
            </div>
            <!-- ALL MOVIES -->
            <div class="movies mt-5" v-if="films.length">
              <h3 class="movie-heading" id="all-movie-title">Search Name</h3>
              <div id="totalMovies">
                <div class="category-movies" id="cat-id">
                  <MovieOneCard v-for="movie in films" :key="movie.id" :movie="movie" />
                </div>
                <LoadMoreSearchMovies :films="films" :query="query" />
              </div>
            </div>

            <NoResult v-if="!films.length" :searchInput="searchInput" />
          </div>
        </div>
      </div>
    </div>

    <LoadingMovies v-if="loadingContent" />
  </div>
</template>

<script>
import axios from "axios";
import MovieOneCard from "../components/MovieOneCard";
import LoadingMovies from "../components/LoadingMovies";
import NoResult from "../components/NoResult";
import LoadMoreSearchMovies from "../components/LoadMoreSearchMovies";
export default {
  components: {
    MovieOneCard,
    LoadingMovies,
    NoResult,
    LoadMoreSearchMovies
  },
  data() {
    return {
      currentPage: 1,
      loadingContent: true
    };
  },
  props: ["id"],
  computed: {
    films() {
      return this.$store.state.isCategorySearching
        ? this.$store.state.searchHolder
        : this.$store.state.search;
    },
    apiKEY() {
      return this.$store.state.apiKEY;
    },
    query() {
      let path = this.searchInput;
      return path;
    },
    currentCatPage: {
      get() {
        return this.$store.state.currentCatPage;
      },
      set(value) {
        return (this.$store.state.currentCatPage = value);
      }
    },
    isCategorySearching: {
      get() {
        return this.$store.state.isCategorySearching;
      },
      set(value) {
        return (this.$store.state.isCategorySearching = value);
      }
    },
    searchInput: {
      get() {
        return this.$store.state.searchInput;
      },
      set(value) {
        return (this.$store.state.searchInput = value);
      }
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
    searchMovies: function() {
      if (this.searchInput.length <= 0) {
        this.removeSearchInputValue();
        return;
      } else {
        this.searchAllMovies();
      }
    },
    removeSearchInputValue: function() {
      this.searchInput = "";
      this.isCategorySearching = false;
    },
    searchAllMovies: function() {
      const urlPath =
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        this.apiKEY +
        "&query=" +
        this.searchInput;

      axios
        .get(urlPath)
        .then(response => {
          this.$store.dispatch("searchCategoryMovies", response.data.results);
          this.currentSearchPage = 2;
          this.isCategorySearching = true;
        })
        .catch(err => {
          this.isCategorySearching = false;
          this.currentSearchPage = 2;
          console.log(err);
        });
    },

    closeLoadingContent: function() {
      this.loadingContent = true;
      setTimeout(() => {
        this.loadingContent = false;
      }, 3000);
    }
  },
  mounted() {
    this.closeLoadingContent();
    this.currentSitePage = this.$router.history.current.name;
  },
  beforeRouteLeave(to, from, next) {
    this.currentSearchPage = 2;
    this.searchInput = "";
    this.isCategorySearching = false;
    next();
  }
};
</script>

<style scoped>
.categoryPage {
  margin-top: 40px !important;
}

@media screen and (max-width: 425px) {
  .categoryPage {
    margin-top: 0px !important;
  }
}
</style>
