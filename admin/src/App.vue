<template>
  <div id="app">
    <nav-menu v-show="showNavMenu"/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavMenu from "@/components/content/menu/NavMenu";

export default {
  name: 'app',
  data() {
    return {
      showNavMenu: true
    }
  },
  components: {
    NavMenu
  },
  watch: {
    $route () {
      this.showNavMenu = !(this.$route.path.includes('/login') || this.$route.path.includes('/console/competition/join/'));
    }
  }
}
</script>

<style>
  .container{
    margin: 10px;
  }
</style>
