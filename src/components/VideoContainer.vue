<template>
  <transition name="fade">
    <div>
      <div class="video_container_overflay" @click="closeMovieVideo"></div>
      <div class="video_container">
        <div class="video_wrapper">
          <div class="video_tilte_close">
            <span>{{videos.name}}</span>
            <span class="close_poptup" @click="closeMovieVideo">&times;</span>
          </div>
          <div class="clear-fix"></div>
          <iframe
            width="100%"
            height="100%"
            :src="videoSrc"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeMovieVideo: function() {
      this.$store.dispatch("closeVideo");
    }
  },

  computed: {
    videoSrc() {
      return "https://www.youtube.com/embed/" + this.videos.key;
    }
  },

  props: ["videos"]
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25 ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
