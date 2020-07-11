/* eslint-disable */
<template>
  <!-- #################### FOOTER ############################## -->

  <footer id="footer">
    <div class="copyright">
      <p>
        copyright &copy;
        <span class="year"></span> Mobot Movies
      </p>
      <p>
        Designed By
        <a href="https://victornwakwue.netlify.app/">
          <span class="yellow-color">Victor Nwakwue</span>
        </a>
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  computed: {
    getCurrentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style></style>
