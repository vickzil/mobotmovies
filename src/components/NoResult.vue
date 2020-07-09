<template>
  <div class="noresultfound text-center">
    <div class="card card-body">
      <p>No Result found for {{searchInput}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchInput"]
};
</script>

<style scoped>
.noresultfound {
  margin-top: 150px;
}
.noresultfound .card,
.noresultfound .card .card-body {
  background: #000;
  color: #fff;
}
</style>