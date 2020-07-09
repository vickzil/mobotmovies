<template>
  <div>
    <div class="category-movies" id="cat-id">
      <MovieOneCard v-for="movie in films" :key="movie.id" :movie="movie" />
    </div>
    <div ref="infinitescrolltrigger" class="scroll-trigger">
      <span class="spinner-grow spinner-grow-md" role="status" v-if="isBussy" aria-hidden="true"></span>
    </div>
  </div>
</template>
 
<script>
import MovieOneCard from "./MovieOneCard";
export default {
  components: {
    MovieOneCard
  },
  props: ["films", "query"],
  data() {
    return {
      isBussy: false,
      maxPerpage: 30,
      totalResult: 300
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state.currentCatPage;
      },
      set(value) {
        return (this.$store.state.currentCatPage = value);
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
    },
    isCategorySearching: {
      get() {
        return this.$store.state.isCategorySearching;
      },
      set(value) {
        return (this.$store.state.isCategorySearching = value);
      }
    }
  },

  methods: {
    scrollTrigger: function() {
      if (!this.isCategorySearching) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (
              entry.intersectionRatio > 0 &&
              this.currentPage < this.pageCount
            ) {
              this.isBussy = true;
              this.currentPage += 1;
              this.fetchMoreMovies();
            }
          });
        });

        observer.observe(this.$refs.infinitescrolltrigger);
      } else {
        this.isBussy = false;
      }
    },

    fetchMoreMovies: async function() {
      const urlPath =
        "https://api.themoviedb.org/3/" +
        this.query +
        "?api_key=" +
        this.APIKEY +
        "&page=" +
        this.currentPage;
      let res = await fetch(urlPath);
      let movies = await res.json();
      this.$store.dispatch("fetchAllCatMovies", movies.results);
      // console.log(movies);
      this.isBussy = false;
      if (this.totalResult < movies.total_results) {
        this.totalResult = movies.total_results;
      }
    }
  },
  mounted() {
    this.scrollTrigger();
  }
};
</script>

<style scoped>
.scroll-trigger {
  margin: 20px auto 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 160px;
}
</style>
