/* eslint-disable */
<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    <Loading v-if="loading" />
  </div>
</template>

<script>
import "./assets/css/animate.css";
import "./assets/css/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

export default {
  name: "App",
  components: {
    Loading,
    Header,
    Footer
    // AddComment,
    // ReplyComment
    // Loading
  },

  computed: {
    // GET PAGE LOADING
    pageLoading: {
      get() {
        return this.$store.state.pageLoading;
      },
      set(value) {
        return (this.$store.state.pageLoading = value);
      }
    },
    loading() {
      return this.$store.state.loading;
    },
    films() {
      return this.$store.state.movies;
    }
  },
  methods: {
    closePageLoading: function() {
      setTimeout(() => {
        this.pageLoading = false;
      }, 3500);
    },

    getTrendingMovies: function() {
      this.$store.dispatch("getTrendingMovies");
    },
    getActors: function() {
      this.$store.dispatch("getActors");
    },
    tvSeries: function() {
      this.$store.dispatch("tvSeries");
    },
    getAllMovies: function() {
      this.$store.dispatch("getAllMovies");
    },
    getUpcomingMovies: function() {
      this.$store.dispatch("getUpcomingMovies");
    },

    closepageLoading: function() {
      setTimeout(() => {
        this.pageLoading = false;
      }, 4000);
    }
  },

  created() {
    this.getTrendingMovies();
    this.getActors();
    this.tvSeries();
    this.getAllMovies();
    this.getUpcomingMovies();
    this.closepageLoading();
  },

  watch: {
    // WATCH WHEN ROUTES CHANGES
    $route: {
      handler: to => {
        document.title =
          to.meta.title || "Mobot Movies - Movie Trailers, Upcoming Movies";
      },
      immediate: true
    }
  }
};
</script>
<style>
#app {
  background: #000;
}
</style>
