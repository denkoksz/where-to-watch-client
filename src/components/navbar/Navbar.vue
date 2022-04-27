<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>H</div>
        <div>N</div>
      </span>
      <span v-else>Hol nézzem?</span>
    </h1>

    <NavbarLink to="/" :icon="['fas', 'house']">Kezdőlap</NavbarLink>
    <NavbarLink to="/sportevents" :icon="['fas', 'futbol']">Események</NavbarLink>
    <NavbarLink to="/bars" :icon="['fas', 'beer']">Helyszínek</NavbarLink>

    <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
    >
      <font-awesome-icon class="toggle" :icon="['fas', 'arrow-left-long']" />
    </span>
  </div>
</template>

<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state';
import NavbarLink from "@/components/navbar/NavbarLink";

export default {
  components: {NavbarLink},
  setup() {
      return { collapsed, toggleSidebar, sidebarWidth };
  }
}
</script>

<style>
  :root {
    --sidebar-bg-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
  }
</style>

<style scoped>
  .sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
  }
  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
  }
  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }
  .toggle:hover {
    cursor: pointer;
  }
</style>