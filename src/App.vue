<template>
  <Navbar/>
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar";
import { sidebarWidth } from "@/components/navbar/state";

export default {
  components: { Navbar },
  setup() {
    return { sidebarWidth }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>