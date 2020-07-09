/* eslint-disable */
<template>
  <section class>
    <div id="particles-js"></div>

    <!-- #################### SKILLS #################### -->
    <div class="skills" id="counter">
      <div class="body-content">
        <div class="banner_image for_skills">
          <h3 class="content_title">My Skills</h3>
        </div>

        <div class="container-fluid">
          <p class="mb-4 para load-hidden">
            <span class="light-red subhead animated infinte flip">Do</span>
            you have a business idea, and need expert hands to help you take it
            online? Are you tired of working so hard on your brand and in your
            business but having no income to show for it? Are you fed up of
            getting inquiries from prospects about your products and services,
            but never making sales? Do you think that you are not getting enough
            value for your skills and services? well, I'm here to help you.
          </p>
          <p class="para load-hidden">
            <span class="light-red subhead animated infinte flip">I</span> have
            acquired years of experience as a web developer, Social media
            marketing and WordPress, creating responsive websites of great
            quality and combining design and business logic to achieve a
            user-facing product.
          </p>
          <p class="para load-hidden">
            In my experience, I have also obtained an eye for details and
            appreciation for design, knowledge of integrating with and
            developing server-side, as well as knowing how to efficiently
            project manage and work with clients and colleagues successfully
          </p>

          <div class="skills-content para load-hidden">
            <div class="skills-box para load-hidden">
              <p>HTML & CSS</p>
              <h4>
                <span class="counter-value" data-count="90">90</span>%
              </h4>
            </div>
            <div class="skills-box para load-hidden">
              <p>JavaScript</p>
              <h4>
                <span class="counter-value" data-count="94">94</span>%
              </h4>
            </div>
            <div class="skills-box para load-hidden">
              <p>PHP & MySQL</p>
              <h4>
                <span class="counter-value" data-count="77">77</span>%
              </h4>
            </div>
            <div class="skills-box para load-hidden">
              <p>VueJs/ReactJs</p>
              <h4>
                <span class="counter-value" data-count="93">93</span>%
              </h4>
            </div>
            <div class="skills-box para load-hidden">
              <p>WordPress</p>
              <h4>
                <span class="counter-value" data-count="81">81</span>%
              </h4>
            </div>
          </div>

          <OtherSkills />

          <div class="skills_image">
            <carousel
              :autoplay="true"
              :nav="false"
              :margin="20"
              :autoplayTimeout="4000"
              :responsive="{
                0: {
                  items: 6,
                },
                600: {
                  items: 9,
                },
                1000: {
                  items: 9,
                },
              }"
            >
              <div class="item" v-for="tool in imageTools" :key="tool">
                <img :src="tool" alt />
              </div>
            </carousel>
          </div>

          <SkillsDetails />
          <OfferHelp />
          <TheBest />
        </div>

        <!-- include footer section -->
        <Footer />
      </div>
    </div>
  </section>
</template>

<script>
import Footer from "../components/Footer";
import OtherSkills from "../components/OtherSkills";
import SkillsDetails from "../components/SkillsDetails";
import OfferHelp from "../components/OfferHelp";
import TheBest from "../components/TheBest";
import carousel from "vue-owl-carousel";
import $ from "jquery";

export default {
  name: "About",
  components: {
    Footer,
    carousel,
    OtherSkills,
    SkillsDetails,
    OfferHelp,
    TheBest
  },

  computed: {
    imageTools() {
      return this.$store.state.tools;
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
    GetCounter: function() {
      var a = 0;

      $(window).scroll(() => {
        let oTop = $(".skills-content").offset().top - window.innerHeight;

        if (a == 0 && $(window).scrollTop() > oTop) {
          $(".counter-value").each(function() {
            $(this)
              .prop("Counter", 0)
              .animate(
                {
                  Counterer: $(this).text()
                },
                {
                  duration: 5000,
                  easing: "swing",
                  step: function() {
                    $(this).text(Math.ceil(this.Counterer));
                  },
                  complete: function() {
                    this.text(this.Counterer);
                  }
                }
              );
          });
          a = 1;
        }
      });
    },
    closeMoreNavigationMenu: function() {
      this.$store.dispatch("closeMoreNavigationMenu");
    }
  },
  mounted() {
    this.closeNavigationMenu();
    this.GetCounter();
  },
  beforeRouteLeave(to, from, next) {
    this.closeMoreNavigationMenu();
    next();
  }
};
</script>

<style scoped></style>
