<template>
  <div id="app">
    <nav-menu/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavMenu from "@/components/content/menu/NavMenu";

export default {
  name: 'app',
  components: {
    NavMenu
  }
}
</script>

<style>
  .container{
    margin: 10px;
  }
</style>
