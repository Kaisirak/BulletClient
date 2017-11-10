<template>

    <aside class="menu">
      <p class="menu-label">
        Jules Recipe Website
      </p>
      <ul class="menu-list" v-for="route in $router.options.routes" v-if="route.name && route.name != ''">
        <router-link :to="route.path">{{route.name}}</router-link>
      </ul>
    </aside>

</template>

<script>

export default {
  name: 'bullet-menu'
}
</script>

<style>
.menu {
  padding: 15px;
}

</style>
