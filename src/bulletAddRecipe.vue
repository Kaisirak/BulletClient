<template>
        <div class="box">
            <div class="columns">
              
              <div class="control column is-4">
                <input class="input" :class="{'is-danger': recipeValidation.name}" type="text" v-model="recipeToAdd.name" placeholder="Recipe Name...">
              </div>

              <div class="control column is-4">
                <input class="input" :class="{'is-danger': recipeValidation.link}" type="text" v-model="recipeToAdd.link" placeholder="Recipe Link...">
              </div>

              <div class="control column is-2">
                <div class="select" :class="{'is-danger': recipeValidation.type}">
                  <select v-model="recipeToAdd.type">
                    <option disabled selected>Food Type...</option>
                    <option>Main Course</option>
                    <option>Baked Goods</option>
                    <option>Dessert</option>
                  </select>
                </div>
              </div>

              <div class="column is-2 add-relative">
                <button class="button is-info add-position" @click="addRecipe">Add Recipe</button>
              </div>

            </div>
            
            <div class="columns">
              <div class="column is-4">
                <bullet-input-tag :tags="recipeToAdd.tags" placeholder="Tags..."></bullet-input-tag>
              </div>
            </div>
        </div>
</template>

<script>

import axios from 'axios'
import bulletInputTag from './bulletInputTag.vue'

export default {
  name: 'bullet-add-recipe',
  data () {
    return {
      recipeToAdd: {name: '',
                    tags: [],
                    link: '',
                    type: ''},
      recipeValidation: {name: false,
                          link: false,
                          type: false}
    }
  },
  components: {
    bulletInputTag
  },
  methods: {
    checkValidRecipe: function(){
      if (this.recipeToAdd.name && this.recipeToAdd.link && this.recipeToAdd.type)
        return true;
      this.recipeValidation.name = this.recipeToAdd.name ? false : true;
      this.recipeValidation.link = this.recipeToAdd.link ? false : true;
      this.recipeValidation.type = this.recipeToAdd.type ? false : true;
      return false;
    },
    addRecipe: function(){
      if (this.checkValidRecipe())
      {
        let self = this;
        axios.post(window.API_ROUTE + '/recipes', this.recipeToAdd)
          .then(function(response) {
            if (response.data)
              {
                self.recipeToAdd = {name: '',
                    tags: [],
                    link: '',
                    type: ''};
                self.recipeValidation.name = false;
                self.recipeValidation.link = false;
                self.recipeValidation.type = false;
                self.$emit('recipeAdded');
              }
          })
          .catch(function(error) {
            console.log(error);
          }
        );
      }
    }
  }
}
</script>

<style scoped>

.add-relative {
  position: relative;
}

.add-position {
  position: absolute;
  right: 10%;
}

.label {
  color: #666;
}

.select, .select > select {
  width: 100%;
}

</style>