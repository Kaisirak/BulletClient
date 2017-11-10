<template>
	<div class="hero is-warning is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        
        <transition-group class="recipe-group" name="list" tag="p">
          <a class="box list-item" :href="recipe.link" target="_blank" v-for="recipe in recipeList" :key="recipe.id">
            <a class="delete is-large pull-right" @click.prevent.stop="deleteRecipe(recipe.id)"></a>
            <div class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <div class="columns">
                    <div class="column is-4">
                      <strong>{{recipe.name}}</strong>
                      <br>
                      {{recipe.type}}
                    </div>
                    <div class="column is-4">
                      <button v-for="tag in recipe.tags" class="button is-small is-outlined is-hovered" style="cursor: default; margin: 0px 3px 3px 3px;">{{tag}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <bullet-add-recipe @recipeAdded="getRecipeList" key="addrecipekey"></bullet-add-recipe>
        </transition-group>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import bulletAddRecipe from './bulletAddRecipe.vue'

export default {
  name: 'bullet-recipe-list',
  data () {
    return {
      recipeList: []
    }
  },
  components: {
    bulletAddRecipe
  },
  methods: {
    getRecipeList: function(){
      console.log("check");
      let self = this;
      axios.get(window.API_ROUTE + '/recipes')
        .then(function(response) {
          if (response.data)
            self.recipeList = response.data;
          else
            self.recipeList = [];
        })
        .catch(function(error) {
          console.log(error);
        }
      );
    },
    deleteRecipe: function(index){
      let self = this;
      axios.delete(window.API_ROUTE + '/recipes/' + index)
        .then(function(response){
          self.getRecipeList();
        })
        .catch(function(error){
          console.log(error);
        })
    }
  },
  mounted: function(){
    this.getRecipeList();
  }
}
</script>

<style scoped>

.list-item {
  transition: all 0.6s;
}

.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  margin-bottom: -100px;
  opacity: 0;
}

</style>