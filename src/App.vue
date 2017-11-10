<template>
  <div class="columns">
    <div class="column is-2 menu-mobile">
      <bullet-menu></bullet-menu>
    </div>
    <div class="column is-10 content-mobile">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>

import bulletMenu from './bulletMenu.vue'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'

export default {
  components: {
    bulletMenu
  },
  name: 'App'
}
</script>

<style scoped>

@media screen and (min-width:769px) {
  .menu-mobile {
    position: fixed;
  }

  .content-mobile {
    position: absolute;
    right: 0;
  }
}

.columns{
  margin: 0px;
  padding: 0px;
}

.column{
  margin: 0px;
  padding: 0px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.12s ease-in-out;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateY(25px);
}

</style>
