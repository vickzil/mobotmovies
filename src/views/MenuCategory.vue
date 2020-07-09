<template>
  <div class="categoryPage">
    <div class="category-content" v-if="!loadingContent">
      <div id="section">
        <!-- #################### SITE CONTENT #################### -->
        <div id="site-content" class="categoryPage">
          <div class="container-fluid movie-details" id="movie-details">
            <!-- ALL MOVIES -->
            <div class="movies mt-5" v-if="films.length">
              <h3 class="movie-heading mb-4" id="all-movie-title">{{pathName}}</h3>

              <div id="totalMovies">
                <div class="category-movies" id="cat-id">
                  <MovieOneCard v-for="movie in films" :key="movie.id" :movie="movie" />
                </div>
                <LoadMoreMenuCategoryMovies :films="films" :query="query" />
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
import MovieOneCard from "../components/MovieOneCard";
import LoadingMovies from "../components/LoadingMovies";
import LoadMoreMenuCategoryMovies from "../components/LoadMoreMenuCategoryMovies";
import NoResult from "../components/NoResult";

export default {
  components: {
    MovieOneCard,
    LoadingMovies,
    LoadMoreMenuCategoryMovies,
    NoResult
  },
  data() {
    return {
      currentPage: 1,
      loadingContent: true,
      searchInput: this.id
    };
  },
  props: ["id"],
  computed: {
    films() {
      return this.$store.state.menuCategory;
    },
    apiKEY() {
      return this.$store.state.apiKEY;
    },
    query() {
      let path = this.id;
      return path;
    },
    pathName() {
      let pageNma;
      if (this.id == "28") {
        pageNma = "ACTION";
      } else if (this.id == "12") {
        pageNma = "ADVENTURE";
      } else if (this.id == "35") {
        pageNma = "COMEDY";
      } else if (this.id == "18") {
        pageNma = "DRAMA";
      } else if (this.id == "10752") {
        pageNma = "WAR";
      } else if (this.id == "27") {
        pageNma = "HORROR";
      } else if (this.id == "878") {
        pageNma = "SCIENCE FICTION";
      } else if (this.id == "10751") {
        pageNma = "FAMILY";
      } else if (this.id == "53") {
        pageNma = "THRILLER";
      } else if (this.id == "14") {
        pageNma = "FANTASY";
      } else if (this.id == "36") {
        pageNma = "HISTORY";
      } else if (this.id == "37") {
        pageNma = "WESTERN";
      }
      return pageNma;
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
    closeLoadingContent: function() {
      this.loadingContent = true;
      setTimeout(() => {
        this.loadingContent = false;
      }, 2500);
    },
    fetchMovies: function() {
      this.$store.dispatch("getActionMovies", this.id);
    }
  },
  mounted() {
    this.closeLoadingContent();
    this.fetchMovies();
    this.currentSitePage = this.$router.history.current.name;
  },
  watch: {
    "$route.params.id": function() {
      this.closeLoadingContent();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.currentMenuCatPage = 2;
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
