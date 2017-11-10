<template>
	<div class="hero-foot">
	<nav class="tabs is-boxed is-fullwidth">
	  <div class="container">
	    <ul>
	      <li v-for="(menu, index) in menuFooter" @click="handleNavigate(index)" :class="{'is-active': (index == currentIndex)}"><a>{{menu}}</a></li>
	    </ul>
	  </div>
	</nav>
	</div>
</template>

<script>

export default {
  name: 'bullet-menu-footer',
  props: ['menuFooter'],
  data: function() {
  	return {
  		currentIndex: 0
  	}
  },
  methods: {
  	handleNavigate: function(idx) {
  		console.log(idx);
  		this.currentIndex = idx;
  		this.$router.push("about");
  	}
  }
}
</script>

<style>
</style>
