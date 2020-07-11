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
      maxPerpage: 30,
      totalResult: 300
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state.currentSearchPage;
      },
      set(value) {
        return (this.$store.state.currentSearchPage = value);
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
      //   if (!this.isCategorySearching) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.isBussy = true;
            this.currentPage += 1;
            this.fetchMoreSearchMovies();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
      //   } else {
      //     this.isBussy = false;
      //   }
    },

    fetchMoreSearchMovies: async function() {
      const urlPath =
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        this.APIKEY +
        "&query=" +
        this.query +
        "&page=" +
        this.currentPage;

      let res = await fetch(urlPath);
      let movies = await res.json();
      this.$store.dispatch("fetchMoreSearchMovies", movies.results);
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
