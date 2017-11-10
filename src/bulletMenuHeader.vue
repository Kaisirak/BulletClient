  <template>
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <span class="icon is-large">
              <i class="fa fa-home"></i>
            </span>
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <a v-for="(menu, index) in menuHeader" @click="currentIndex = index" :class="{'is-active': (index == currentIndex)}" class="navbar-item">{{menu}}</a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>

export default {
  name: 'bullet-menu-header',
  props: ['menuHeader'],
  data: function() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style scoped>
.fa {
  font-size: 48px;
}
</style>
