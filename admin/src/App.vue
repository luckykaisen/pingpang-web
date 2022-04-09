<template>
  <div id="app">
    <nav-menu/>
    <router-view/>
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
</style>
