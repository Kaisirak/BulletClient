<template>
	<div class="hero is-primary is-fullheight">
    <div class="hero-body bullet-right-container">      
      <div class="container">

        <transition-group class="entry-group" name="list" tag="p">
          <div class="box list-item" v-for="entry in miscList" :key="entry.id">
            <a class="delete is-large delete-position" @click="deleteEntry(entry.id)"></a>
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong class="is-size-5">{{entry.name}}</strong>
                    <span class="has-text-weight-light has-text-grey-light is-size-6"> - {{entry.date | readableDate}}</span>
                    <br>
                    {{entry.content}}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </transition-group>

        <div class="box list-item" key="last">
            <div class="">     
              <div class="field">
                <input class="input" type="text" placeholder="Title...">
              </div>
              <div class="field">
                <textarea class="textarea" placeholder="Content..."></textarea>
              </div>
              <div class="field has-text-right">
                <button class="button is-info is-large" >Add Entry</button>
              </div>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'

export default {
  name: 'bullet-misc',
  data () {
    return {
      miscList: []
    }
  },
  filters: {
    readableDate: function(date) {
      return (moment(date).fromNow());
    }
  },
  methods: {
    getMiscList: function(){
      console.log("check");
      let self = this;
      axios.get(window.API_ROUTE + '/journals')
        .then(function(response) {
          if (response.data)
            self.miscList = response.data;
          else
            self.miscList = [];
        })
        .catch(function(error) {
          console.log(error);
        }
      );
    }
  },
  mounted: function(){
    this.getMiscList();
  }
}
</script>

<style scoped>

.entry-group {
  margin-bottom: 25px;
}

.bullet-right-menu {
  position: absolute;
  top: 5px;
  right: 5px;
}

.bullet-right-container {
  position: relative;
}

.delete-position {
  position: absolute;
  right: 15px;
}

.list-item {
  transition: all 0.6s;
  margin-bottom: 30px;
}

.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  margin-bottom: -100px;
  opacity: 0;
}

</style>