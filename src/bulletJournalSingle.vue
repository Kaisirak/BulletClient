<template>
	<div class="hero is-danger is-fullheight">
    <div class="hero-body bullet-right-container"> 
      <div class="container">

        <div class="box">
          <router-link to="/journal" class="button is-small">
            <span class="icon is-medium"><i class="fa fa-chevron-left"></i></span><span> Back</span>
          </router-link>

          <button class="button is-danger is-small is-pulled-right" @click="deleteEntry"><span class="icon is-medium"><i class="fa fa-trash-o"></i></span><span> Delete</span></button>

          <hr />
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" v-model="entryToEdit.name" type="text" placeholder="Title...">
            </div>
          </div>

          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea class="textarea" v-model="entryToEdit.content" placeholder="Content..."></textarea>
            </div>
          </div>

          <div class="field">
            <label class="label">Tags</label>
            <bullet-input-tag :tags="entryToEdit.tags" :slug="true" placeholder="Tags..."></bullet-input-tag>
          </div>

          <div class="field has-text-right">
                <button class="button is-info is-large" @click="editEntry">Save Entry</button>
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
  name: 'bullet-journal-single',
  data () {
    return {
      entryToEdit: {name: '',
                    tags: [],
                    content: '',
                    date: Date.now()}
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
    getEntry: function(){
      console.log("check");
      let self = this;
      axios.get(window.API_ROUTE + '/journals/' + this.$route.params.entryid)
        .then(function(response) {
          if (response.data)
            self.entryToEdit = response.data;
          else
            self.entryToEdit = {};
        })
        .catch(function(error) {
          console.log(error);
        }
      );
    },
    editEntry: function(){
      if (this.entryToEdit.name && this.entryToEdit.content)
      {
        let self = this;
        axios.put(window.API_ROUTE + '/journals/' + this.$route.params.entryid, this.entryToEdit)
          .then(function(response) {
            if (response.data)
            {
              self.$router.push({path: '/journal'});
            }
          })
          .catch(function(error) {
            console.log(error);
          }
        );
      }
    },
    deleteEntry: function(){
      let self = this;
      axios.delete(window.API_ROUTE + '/journals/' + this.$route.params.entryid)
        .then(function(response){
          self.$router.push({path: '/journal'});
        })
        .catch(function(error){
          console.log(error);
        })
    }
  },
  mounted: function(){
    this.getEntry();
  }
}
</script>

<style scoped>

</style>