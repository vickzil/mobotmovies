<template>
  <div class="oneMovieBanner" v-if="movie">
    <img :src="imageUrl+movie.poster_path" />
    <div class="large_banner">
      <h3 class="header-title">{{movie.title}}</h3>
      <div>
        <span class="checked">{{movie.release_date}}</span>
      </div>
      <p>{{movie.overview.slice(0,350)}}</p>
      <a @click="getDetails(movie)" class="single_movie_btn">
        <i class="fa fa-play mr-2"></i> Details
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    movie() {
      return this.$store.state.currentHomeMovie;
    },
    imageUrl() {
      return this.$store.state.imageUrl;
    },
    films() {
      return this.$store.state.movies;
    }
  },

  data() {
    return {
      i: 1,
      time: 7000
    };
  },
  methods: {
    getDetails: function(movie) {
      let movieId = movie.id;
      this.$store.state.loading = true;
      setTimeout(() => {
        this.$store.state.loading = false;
        this.$router.push({ name: "Movie", params: { id: movieId } });
      }, 2000);
    },
    // changeBanner: function() {
    //   this.$store.state.currentHomeMovie = this.films[this.i];

    //   if (this.i < this.films.length - 1) {
    //     this.i += 1;
    //   } else {
    //     this.i = 1;
    //   }
    // },
    // mountingBanner: function() {
    //   setInterval(() => {
    //     this.changeBanner();
    //   }, this.time);
    // },
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
  },
  mounted() {
    // this.mountingBanner();
  }
};
</script>

<style></style>
