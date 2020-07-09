/* eslint-disable */
<template>
  <section class>
    <div id="particles-js"></div>

    <!-- #################### ABOUT #################### -->
    <div id="about" class>
      <div class="body-content">
        <div class="banner_image">
          <h3 class="content_title">404 Page</h3>
        </div>

        <div class="container-fluid">
          <div class="no-reult text-center" style="margin-top: 70px; margin-bottom: 120px">
            <p class="lead font-weight-bold">
              Ooppsss!! The page you are looking for cannot be found. Please
              more more photos
            </p>
            <div class="arrow_back">
              <a @click="hasHistory() ? $router.go(-1) : $router.push('/')">
                <i class="fa fa-arrow-left"></i>
                <span>Back</span>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </section>
</template>

<script>
import Footer from "../components/Footer";
export default {
  name: "FourZeroFour",
  components: { Footer },
  computed: {
    images() {
      return this.$store.getters.getPhotos;
    }
  },

  methods: {
    closeNavigationMenu: function() {
      this.$store.dispatch("closeNavigationMenu");
      let navlinks = document.querySelectorAll(".nav-li .navi-links");

      // ANIMATE NAV-LINKS
      navlinks.forEach(link => {
        link.style.animation = "";
      });
    },

    closeInputSearch: function() {
      this.$store.dispatch("closeInputSearch");
    },

    closePageLoading: function() {
      setTimeout(() => {
        this.$store.dispatch("closePageLoading");
      }, 4000);
    },

    showPageLoading: function() {
      this.$store.dispatch("showPageLoading");
    },

    closeMoreNavigationMenu: function() {
      this.$store.dispatch("closeMoreNavigationMenu");
    },
    hasHistory: function() {
      return window.history.length > 2;
    }
  },

  mounted() {
    this.closeNavigationMenu();
    this.closeInputSearch();
    this.closePageLoading();
  },

  beforeRouteLeave(to, from, next) {
    this.closeMoreNavigationMenu();
    next();
  }
};
</script>

<style scoped></style>
