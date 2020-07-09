/* eslint-disable */ /*eslint no-unused-vars: ["error", {"ards": "none"}]*/
<template>
  <!--###################### NAVBAR ##################### -->
  <div>
    <header id="page">
      <div class="top_nav">
        <div class="logo">
          <h1 class="home_nav">
            <a @click="backHome">
              MO
              <span style="margin-left: -10px">BOT</span>
            </a>
          </h1>
        </div>
        <form
          class="search_form"
          id="searchForm"
          :class="showSearchForm && 'search_open'"
          v-if="!currentPage"
          @submit.prevent="searchMovies"
        >
          <input
            type="search"
            :class="showSearchForm && 'input_open'"
            id="header-input"
            v-model="searchInput"
            autocomplete="off"
            placeholder="Search movie title"
          />
          <span>
            <i class="fa fa-search ml-1" @click="showSearch" id="search" style="color: #fff;"></i>
          </span>
        </form>
      </div>
    </header>
    <div class="burger dont-show" @click="showNavigationMenu">
      <div class="line1" :class="showNavMenu && 'toggleline1'"></div>
      <div class="line2" :class="showNavMenu && 'toggleline2'"></div>
      <div class="line3" :class="showNavMenu && 'toggleline3'"></div>
    </div>
    <aside :class="showNavMenu && 'aside-open'">
      <!-- <div class="close_aside"></div> -->
      <a @click="getActionMovies('28')" class="action_nav">ACTION</a>
      <a @click="getActionMovies('12')" class="adventure_nav">ADVENTURE</a>
      <a @click="getActionMovies('35')" class="comedy_nav">COMEDY</a>
      <a @click="getActionMovies('18')" class="romance_nav">DRAMA</a>
      <a @click="getActionMovies('10752')" class="war_nav">WAR</a>
      <a @click="getActionMovies('27')" class="war_nav">HORROR</a>
      <a @click="getActionMovies('878')" class="war_nav">SCI-FICTION</a>
      <a @click="getActionMovies('10751')" class="war_nav">FAMILY</a>
    </aside>
    <div class="overlay" v-if="showNavMenu" @click="closeNavigationMenu"></div>
  </div>
</template>

<script>
// import $ from "jquery";
import axios from "axios";
export default {
  name: "Header",
  computed: {
    showSearchForm() {
      return this.$store.state.showSearchForm;
    },
    currentPage() {
      if (this.currentSitePage == "Search") {
        return true;
      } else if (this.currentSitePage == "Category") {
        return true;
      } else if (this.currentSitePage == "MenuCategory") {
        return true;
      } else {
        return false;
      }
    },
    currentSitePage: {
      get() {
        return this.$store.state.currentSitePage;
      },
      set(value) {
        return (this.$store.state.currentSitePage = value);
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

    apiKEY() {
      return this.$store.state.apiKEY;
    },
    showNavMenu() {
      return this.$store.state.showNavMenu;
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
          this.$store.dispatch("searchAllMovies", response.data.results);
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.push("/search");
    },
    backHome: function() {
      // id: 53
      // name: "Thriller"

      // id: 37
      // name: "Western"

      if (this.$router.history.current.name == "Home") {
        return;
      } else {
        this.$store.dispatch("showLoading");
        setTimeout(() => {
          this.$store.dispatch("closeLoading");
          this.$router.push("/").catch(error => {
            if (error) {
              error;
            }
          });
        }, 2000);
      }
    },
    showSearch: function() {
      this.$store.dispatch("showSearch");
    },
    showNavigationMenu: function() {
      this.$store.dispatch("showNavigationMenu");
    },
    closeNavigationMenu: function() {
      this.$store.dispatch("closeNavigationMenu");
    },
    getActionMovies: function(movieId) {
      // this.$store.state.loading = true;
      this.$store.dispatch("getActionMovies", movieId);
      this.closeNavigationMenu();
      this.$router
        .push({ name: "MenuCategory", params: { id: movieId } })
        .catch(error => {
          if (error) {
            error;
          }
        });
      setTimeout(() => {
        // this.$store.state.loading = false;
      }, 1500);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25 ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
