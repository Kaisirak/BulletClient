<template>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="bullet-day-square">
          <p>day {{currentDay | momentformat}}</p>
            <div v-for="activity in currentDayAct">
              <p>{{activity.name}} : </p><progress class="progress is-info" :value="activity.completion" max="5">{{activity.completion}} / 5</progress>
            </div>
        <div class="bullet-bottom-menu">
          <button class="button" @click="previousDay">Previous</button>
          <button class="button" @click="nextDay">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import axios from 'axios'

export default {
  name: 'bullet-day-act',
  data () {
    return {
      currentDay: "",
      currentDayAct: []
    }
  },
  filters: {
    momentformat: function(date) {
      return (moment(date).format('MMMM Do YYYY'));
    }
  },
  methods: {
    fetchDay: function() {
      let self = this;
      axios.get(window.API_ROUTE + '/days',
        {params: {"filter": {"where":{"date":{"between": [moment(self.currentDay).subtract(1, 'days').toDate(), moment(self.currentDay).toDate()]}}}}})
        .then(function(response) {
          if (response.data[0] && response.data[0].activities)
            self.currentDayAct = response.data[0].activities;
          else
            self.currentDayAct = [];
        })
        .catch(function(error) {
          console.log(error);
        }
      );
    },
    previousDay: function() {
      this.currentDay = moment(this.currentDay).subtract(1, 'days').toDate();
      this.fetchDay();
    },
    nextDay: function() {
      this.currentDay = moment(this.currentDay).add(1, 'days').toDate();
      this.fetchDay();
    }
  },
  mounted: function(){
    this.currentDay = Date.now();
  }
}
</script>

<style>
</style>
