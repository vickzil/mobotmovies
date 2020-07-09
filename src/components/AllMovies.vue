<template>
  <div>
    <div class="category-movies" id="cat-id">
      <MovieOneCard v-for="movie in films" :key="movie.id" :movie="movie" />
    </div>
    <LoadingMoreMovies :films="films" :query="query" />
  </div>
</template>

<script>
import MovieOneCard from "./MovieOneCard";
import LoadingMoreMovies from "./LoadingMoreMovies";
export default {
  components: {
    MovieOneCard,
    LoadingMoreMovies
  },
  props: ["films", "query"],

  computed: {
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        return (this.$store.state.currentPage = value);
      }
    },
    APIKEY() {
      return this.$store.state.apiKEY;
    },

    pageCount() {
      return Math.ceil(this.totalResult / this.maxPerpage);
    },

    pageOffset() {
      return this.maxPerpage * this.currentPage;
    }
  },

  methods: {},
  mounted() {}
};
</script>

<style scoped>
.scroll-trigger {
  margin: 20px auto 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 90px;
}
</style>
