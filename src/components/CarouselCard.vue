<template>
  <div class="item" v-if="movie.profile_path">
    <a @click="getDetails(movie)">
      <div class="img-container">
        <img :src="imageUrl+movie.profile_path" />
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
    getDetails: function() {
      this.$store.state.loading = true;
      setTimeout(() => {
        this.$store.state.loading = false;
        this.$router.push({ name: "Movie", params: { id: 3 } });
      }, 2000);
    }
  }
};
</script>

<style></style>