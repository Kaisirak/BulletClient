<template>
	<div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="bullet-day-square">
          <p>{{message}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bullet-message',
  data () {
    return {
      message: "zobobobob"
    }
  }
}
</script>

<style>

</style>