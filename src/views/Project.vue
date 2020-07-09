/* eslint-disable */
<template>
  <section class>
    <div id="particles-js"></div>

    <!-- #################### PROJECT #################### -->
    <div id="projects">
      <div class="body-content">
        <div class="banner_image for_project">
          <h3 class="content_title">My Projects</h3>
        </div>

        <div class="container-fluid">
          <p class="para load-hidden">
            <span class="light-red subhead animated infinte flip">Y</span>ou
            know your business more than anyone else and I have the caliber to
            give your website an appearance and feel that you find suitable
            according to your vision and mission. I offer a fine hybrid of
            artistic expression and stylish imagery to support your Company
            needs. I will provide you with a concept and design that best suites
            your image.
          </p>
          <div class="navigator-project para load-hidden">
            <span
              v-for="(proButton, index) in projectButton"
              style="text-transform: uppercase;"
              :key="index"
              class="sort_project"
              :class="
                index === 0
                  ? 'pactive ' + proButton.pActive
                  : '' + proButton.pActive
              "
              @click="toggleProject(proButton.class, proButton.pActive)"
            >{{ proButton.label }}</span>
          </div>

          <div class="project-content" v-if="projects.length">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
          </div>
          <div class="mt-5 text-center" v-else>
            <span class="spinner-border spinner-border-md ml-2" role="status" aria-hidden="true"></span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </section>
</template>

<script>
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import $ from "jquery";
export default {
  name: "About",
  components: {
    Footer,
    ProjectCard
  },
  data() {
    return {
      projectButton: [
        {
          label: "All Projects",
          class: "all",
          pActive: "forAll"
        },
        {
          label: "E-Commerce",
          class: "ecommerce",
          pActive: "forEcommerce"
        },
        {
          label: "Custom",
          class: "custom",
          pActive: "forCustom"
        },
        {
          label: "WordPress",
          class: "WordPressPP",
          pActive: "forWordPress"
        },
        {
          label: "Corporate",
          class: "corporate",
          pActive: "forCorporate"
        }
      ]
    };
  },

  computed: {
    projects() {
      return this.$store.state.projects;
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

    toggleProject: function(projectclass, projectActive) {
      if (projectclass == "all") {
        $(".filter")
          .show("2000")
          .addClass("bounce")
          .delay(700);
      } else {
        $(".filter")
          .not("." + projectclass)
          .hide("2000");
        $(".filter")
          .filter("." + projectclass)
          .show("2000")
          .addClass("bounce");
      }

      $("." + projectActive).addClass("pactive");
      $(".sort_project")
        .not("." + projectActive)
        .removeClass("pactive");

      setTimeout(() => {
        $(".filter").removeClass("bounce");
      }, 1200);
    },

    showAllProject: function() {
      $(".filter").show("2000");
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

<style scoped></style>
