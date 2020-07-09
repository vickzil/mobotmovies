/* eslint-disable */
<template>
  <section class>
    <div id="particles-js"></div>

    <!-- #################### PROJECT #################### -->
    <div id="projects-details">
      <div class="body-content">
        <div v-if="project">
          <div class="banner_image" :class="project.label">
            <h3 class="content_title text-white">{{ project.name }}</h3>
          </div>

          <div class="container-fluid">
            <div class="arrow_back singleimage">
              <router-link to="/project" class="text-white">
                <i class="fa fa-arrow-left"></i>
              </router-link>
            </div>
            <p>{{ project.description }}</p>

            <div class="project_details_tools">
              <h4>Tools and technologies Used:</h4>
              <div class="project_details_tools_box">
                <img v-for="image in project.tools" :key="image" :src="image" alt />
              </div>
            </div>

            <!-- <div class="project_details_img">
              <img :src="project.img" alt />
            </div>-->
            <div class="project_img_flex" v-if="project.project_images">
              <img :src="image" alt v-for="image in project.project_images" :key="image" />
            </div>

            <div class="project_details_button text-center">
              <a :href="project.url" class="btn1" target="_blank">Visit Project</a>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="banner_image">
            <h3 class="content_title text-white">Project Not Found</h3>
          </div>
          <div class="container-fluid">
            <div class="no-re text-center" style="height: 400px; margin-top: 60px">
              <p class="lead font-weight-bold">No Project Reult Found</p>

              <div class="arrow_back">
                <router-link to="/project">
                  <i class="fa fa-arrow-left"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- include footer section -->
        <Footer />
      </div>
    </div>
  </section>
</template>

<script>
import Footer from "../components/Footer";

export default {
  name: "Projects",
  components: {
    Footer
  },
  props: ["id"],
  computed: {
    project() {
      const id = this.id;
      return this.$store.getters.projectById(id);
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
    closeMoreNavigationMenu: function() {
      this.$store.dispatch("closeMoreNavigationMenu");
    }
  },
  mounted() {
    this.closeNavigationMenu();
  },
  beforeRouteLeave(to, from, next) {
    this.closeMoreNavigationMenu();
    next();
  }
};
</script>
<style scoped>
.download_image_btn {
  cursor: pointer;
}
</style>
