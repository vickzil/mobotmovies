<template>
  <div>
    <h3 class="movie-heading" id="all-movie-title">
      TRENDING:
      <router-link
        :to="{ name: 'Category', params: { id: trendingMoviePath } }"
        class="float-right seeAll"
      >SEE ALL</router-link>
    </h3>
    <div id="totalMovies">
      <div class="category-movies" id="cat-id">
        <MovieOneCard v-for="movie in getTrendingMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieOneCard from "../components/MovieOneCard";
export default {
  components: {
    MovieOneCard
  },
  props: ["getTrendingMovies", "trendingMoviePath"]
};
</script>

<style></style>
