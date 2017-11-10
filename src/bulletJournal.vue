<template>
	<div class="hero is-danger is-fullheight">
    <div class="hero-head">
      <div class="box searchbox">
        <input class="input" type="text" v-model="search" @keyup="debounce(getJournalList)" placeholder="Search...">
        <span class="icon delete-inside" @click="clearSearch" v-show="search.length > 0">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
      <button class="button is-small bullet-right-menu" @click="toggleDisplay" style="border-color: #fefefe; width: 32px;">
        <i v-if="displayStyle == 'waterfall'" class="fa fa-list-ul" aria-hidden="true"></i>
        <i v-else class="fa fa-th-large" aria-hidden="true"></i>
      </button>
    </div>
    <div class="hero-body bullet-right-container">
      
      <div class="container">

        <div v-if="displayStyle == 'waterfall'" id="wrapper" class="container has-text-centered">
          <div class="pincontainer">
            <div v-for="entry in journalList" :key="entry.id" class="pin box">
              <p>
                <router-link :to="'/journal/' + entry.id"><strong class="is-size-5">{{entry.name}}</strong></router-link>
                <br>
                <span class="has-text-weight-light has-text-grey-light is-size-6">{{entry.date | readableDate}}</span></p>
              <img src="https://bulma.io/images/placeholders/256x256.png"/>
              <p>{{entry.content}}</p>
              <hr/>
              <button v-for="tag in entry.tags" class="button is-small is-outlined is-hovered" style="cursor: default; margin: 3px;">{{tag}}</button>
            </div>
          </div>
        </div>

        <transition-group v-else class="entry-group" name="list" tag="p">
          <div class="box list-item" v-for="entry in journalList" :key="entry.id">
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
                    <router-link :to="'/journal/' + entry.id"><strong class="is-size-5">{{entry.name}}</strong></router-link>
                    <span class="has-text-weight-light has-text-grey-light is-size-6"> - {{entry.date | readableDate}} - </span>
                    <button v-for="tag in entry.tags" class="button is-small is-outlined is-hovered" style="cursor: default; margin: 3px;">{{tag}}</button>
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
                <input class="input" type="text" v-model="entryToAdd.name" placeholder="Title...">
              </div>
              <div class="field">
                <bullet-input-tag :tags="entryToAdd.tags" :slug="true" placeholder="Tags..."></bullet-input-tag>
              </div>
              <div class="field">
                <textarea class="textarea" v-model="entryToAdd.content" placeholder="Content..."></textarea>
              </div>
              <div class="field has-text-right">
                <button class="button is-info is-large" @click="addEntry">Add Entry</button>
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
import bulletInputTag from './bulletInputTag.vue'

export default {
  name: 'bullet-journal',
  data () {
    return {
      journalList: [],
      search: '',
      timeout: '',
      entryToAdd: {name: '',
                    tags: [],
                    content: '',
                    date: Date.now()},
      displayStyle: 'waterfall'
    }
  },
  filters: {
    readableDate: function(date) {
      return (moment(date).fromNow());
    }
  },
  components: {
    bulletInputTag
  },
  methods: {
    debounce: function(func, wait = 300) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(func, wait);
    },
    clearSearch: function() {
      this.search = '';
      this.getJournalList();
    },
    getJournalList: function(){
      console.log("check:");
      console.log(this.search);
      let self = this;
      var pattern = '/.*' + this.search + '.*/i';
      console.log(pattern);
      axios.get(window.API_ROUTE + '/journals',
        {params: {"filter": {"where": {"or": [{"tags": {"regexp": pattern}}, {"name": {"regexp": pattern}}, {"content": {"regexp": pattern}}]}}}})
        .then(function(response) {
          if (response.data)
            self.journalList = response.data;
          else
            self.journalList = [];
        })
        .catch(function(error) {
          console.log(error);
        }
      );
    },
    toggleDisplay: function(){
      this.displayStyle = this.displayStyle == 'normal'?'waterfall':'normal';

    },
    addEntry: function(){
      if (this.entryToAdd.name && this.entryToAdd.content)
      {
        let self = this;
        axios.post(window.API_ROUTE + '/journals', this.entryToAdd)
          .then(function(response) {
            if (response.data)
            {
              self.entryToAdd = {};
              self.getJournalList();
            }
          })
          .catch(function(error) {
            console.log(error);
          }
        );
      }
    },
    deleteEntry: function(index){
      let self = this;
      axios.delete(window.API_ROUTE + '/journals/' + index)
        .then(function(response){
          self.getJournalList();
        })
        .catch(function(error){
          console.log(error);
        })
    }
  },
  mounted: function(){
    this.getJournalList();
  }
}
</script>

<style scoped>

#wrapper {
  width: 100%;
}

.searchbox {
  max-width: 300px;
  margin: 15px auto 0px auto;
  padding: 10px;
  position: relative;
}

.pincontainer {
  column-count: 2;
  column-gap: 15px;
  column-fill: auto;
}

@media (min-width: 960px) {
  .pincontainer {
    column-count: 3;
  }
}

@media (min-width: 1600px) {
  .pincontainer {
    column-count: 4;
  }
}

.pin {
  display: inline-block;
  width: 100%;
  min-height: 150px;
  color: #333;
  margin: 0 2px 15px;
  column-break-inside: avoid;
  padding: 15px;
  padding-bottom: 5px;
  transition: all .2s ease;
}

.entry-group {
  margin-bottom: 25px;
}

.delete-inside {
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}

.bullet-right-menu {
  position: absolute;
  top: 5px;
  right: 5px;
}

.bullet-right-container {
  position: relative;
  padding: 1.5rem 1.5rem;
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