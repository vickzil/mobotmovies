<template>
  <div id="totalMovies">
    <carousel
      class="carousel-movies"
      :autoplay="false"
      :nav="false"
      :margin="10"
      :autoWidth="true"
      :responsive="{
        0: {
          items: 3,
        },
        600: {
          items: 4,
        },
        1000: {
          items: 6,
        },
      }"
    >
      <!-- <div class="item">
        <a @click="getDetails()">
          <div class="img-container">
            <img src="../assets/img/img7.jpeg" />
          </div>
        </a>
      </div>
      <div class="item">
        <a @click="getDetails()">
          <div class="img-container">
            <img src="../assets/img/img7.jpeg" />
          </div>
        </a>
      </div>
      <div class="item">
        <a @click="getDetails()">
          <div class="img-container">
            <img src="../assets/img/img7.jpeg" />
          </div>
        </a>
      </div>-->
      <CarouselCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import CarouselCard from "./CarouselCard";
export default {
  components: {
    CarouselCard,
    carousel
  },
  props: ["movies"]
};
</script>

<style></style>
