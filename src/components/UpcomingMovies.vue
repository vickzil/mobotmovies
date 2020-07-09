<template>
  <div class="movies" v-if="movies.length">
    <h3 class="movie-heading" id="all-movie-title">
      UPCOMING MOVIES:
      <router-link
        :to="{ name: 'Category', params: { id: 'upcoming' } }"
        class="float-right seeAll"
      >SEE ALL</router-link>
    </h3>
    <RelatedMovies :movies="movies" />
  </div>
</template>

<script>
import RelatedMovies from "./RelatedMovies";
export default {
  components: {
    RelatedMovies
  },

  data() {
    return {
      query: "movie/upcoming",
      loadingContent: true,
      nomovie: "this movie"
    };
  },
  computed: {
    movies() {
      let movie = this.$store.state.upcoming;
      let newMovie = this.shuffleArray(movie);
      return newMovie;
    }
  },

  methods: {
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
  }
};
</script>

<style>
</style>