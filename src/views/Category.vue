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
              <h3 class="movie-heading" id="all-movie-title">{{pathName}}</h3>
              <div id="totalMovies" v-if="id == 'tv'">
                <div class="category-movies" id="cat-id">
                  <SeriesCard v-for="movie in series" :key="movie.id" :movie="movie" />
                </div>
                <LoadMore :films="films" :query="query" />
              </div>

              <div id="totalMovies" v-else>
                <CategoryMovies :films="films" :query="query" />
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
import CategoryMovies from "../components/CategoryMovies";
import LoadingMovies from "../components/LoadingMovies";
import NoResult from "../components/NoResult";
import SeriesCard from "../components/SeriesCard";
import LoadMore from "../components/LoadMore";
export default {
  components: {
    CategoryMovies,
    LoadingMovies,
    NoResult,
    SeriesCard,
    LoadMore
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
        : this.$store.state.category;
    },
    series() {
      return this.$store.state.isCategorySearching
        ? this.$store.state.searchHolder
        : this.$store.state.category;
    },
    apiKEY() {
      return this.$store.state.apiKEY;
    },
    query() {
      let path;

      if (this.id == "trending") {
        path = "trending/all/week";
      } else if (this.id == "tv") {
        path = "tv/popular";
      } else if (this.id == "upcoming") {
        path = "movie/upcoming";
      } else {
        let id = 299536;
        path = "movie/" + id + "/credits";
      }
      return path;
    },
    pathName() {
      let pageNma;

      if (this.id == "trending") {
        pageNma = "TRENDING MOVIES";
      } else if (this.id == "tv") {
        pageNma = "TV SERIES";
      } else if (this.id == "upcoming") {
        pageNma = "UPCOMING MOVIES";
      } else {
        pageNma = "ACTORS";
      }
      return pageNma;
    },
    querySearch() {
      let searchQuery;
      if (this.id == "tv") {
        searchQuery = "search/tv";
      } else {
        searchQuery = "search/movie";
      }

      return searchQuery;
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
        this.searchCategoryMovies();
      }
    },
    removeSearchInputValue: function() {
      this.searchInput = "";
      this.isCategorySearching = false;
    },
    fetchMoreCategoryMovies: async function() {
      const urlPath =
        "https://api.themoviedb.org/3/" +
        this.query +
        "?api_key=" +
        this.apiKEY +
        "&page=" +
        this.currentPage;
      let res = await fetch(urlPath);
      let movies = await res.json();
      this.$store.dispatch("fetchMoreCategoryMovies", movies.results);
    },

    searchCategoryMovies: function() {
      let pageNma;
      if (this.id == "tv") {
        pageNma = "search/tv";
      } else {
        pageNma = "search/movie";
      }
      const urlPath =
        "https://api.themoviedb.org/3/" +
        pageNma +
        "?api_key=" +
        this.apiKEY +
        "&query=" +
        this.searchInput;

      axios
        .get(urlPath)
        .then(response => {
          this.$store.dispatch("searchCategoryMovies", response.data.results);
          this.isCategorySearching = true;
          this.currentCatPage = 2;
        })
        .catch(err => {
          this.isCategorySearching = false;
          this.currentCatPage = 2;
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
    this.fetchMoreCategoryMovies();
    this.closeLoadingContent();
    this.currentSitePage = this.$router.history.current.name;
  },
  beforeRouteLeave(to, from, next) {
    this.currentCatPage = 2;
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
