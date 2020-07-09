<template>
  <div>
    <h3 class="movie-heading" id="all-movie-title">
      TV SERIES:
      <router-link
        :to="{ name: 'Category', params: { id: tvSeriesPath } }"
        class="float-right seeAll"
      >SEE ALL</router-link>
    </h3>
    <div id="totalMovies">
      <div class="category-movies" id="cat-id">
        <SeriesCard v-for="movie in series" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import SeriesCard from "./SeriesCard";
export default {
  components: {
    SeriesCard
  },
  props: ["series", "tvSeriesPath"]
};
</script>

<style></style>
