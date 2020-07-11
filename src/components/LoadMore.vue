<template>
  <div>
    <div ref="infinitescrolltrigger" class="scroll-trigger">
      <span class="spinner-grow spinner-grow-md" role="status" v-if="isBussy" aria-hidden="true"></span>
    </div>
  </div>
</template>
 
<script>
export default {
  props: ["films", "query"],
  data() {
    return {
      isBussy: false,
      maxPerpage: 20,
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
    },
    searchInput: {
      get() {
        return this.$store.state.searchInput;
      },
      set(value) {
        return (this.$store.state.searchInput = value);
      }
    }
  },

  methods: {
    scrollTrigger: function() {
      // if (!this.isCategorySearching) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.isBussy = true;
            this.currentPage += 1;
            this.fetchMoreMovies();
          } else {
            this.isBussy = false;
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
      // } else {
      //   this.isBussy = false;
      // }
    },

    fetchMoreMovies: async function() {
      let urlPath;

      if (this.isCategorySearching) {
        urlPath =
          "https://api.themoviedb.org/3/search/tv?api_key=" +
          this.APIKEY +
          "&query=" +
          this.searchInput +
          "&page=" +
          this.currentPage;
      } else {
        urlPath =
          "https://api.themoviedb.org/3/" +
          this.query +
          "?api_key=" +
          this.APIKEY +
          "&page=" +
          this.currentPage;
      }

      let res = await fetch(urlPath);
      let movies = await res.json();
      this.$store.dispatch("fetchAllCatMovies", movies.results);
      // console.log(movies);
      this.isBussy = false;
      if (this.totalResult < movies.total_results) {
        this.totalResult = movies.total_results;
      }
      if (movies.results.length < 0) {
        this.isBussy = false;
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
