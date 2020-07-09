<template>
  <div class="item" v-if="movie.poster_path">
    <a @click="getDetails(movie)">
      <div class="img-container">
        <img :src="imageUrl+movie.poster_path" />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  computed: {
    imageUrl() {
      return this.$store.state.imageUrl;
    }
  },
  methods: {
    getDetails: function(movie) {
      let movieId = movie.id;
      this.$store.state.loading = true;
      setTimeout(() => {
        this.$store.state.loading = false;
        this.$router.push({ name: "Movie", params: { id: movieId } });
      }, 2000);
    }
  }
};
</script>

<style></style>
