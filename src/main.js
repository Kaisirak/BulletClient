import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import bulletHomepage from './bulletHomepage.vue'
import bulletMessage from './bulletMessage.vue'
import bulletRecipeList from './bulletRecipeList.vue'
import bulletAddRecipe from './bulletAddRecipe.vue'
import bulletJournal from './bulletJournal.vue'
import bulletHabits from './bulletHabits.vue'
import bulletMisc from './bulletMisc.vue'

import bulletJournalSingle from './bulletJournalSingle.vue'

Vue.use(VueRouter)

window.API_ROUTE = 'http://localhost:3000/api';

//include name to show in menu
const routes = [{
      path: '/',
      redirect: '/home'
    },
  	{ path: '/home', name: 'Home', component: bulletHomepage },
  	{ path: '/about', name: 'About', component: bulletMessage },
  	{ path: '/recipelist', name: 'Recipe List', component: bulletRecipeList },
  	{ path: '/journal', name: 'Journal', component: bulletJournal },
  	{ path: '/habits', name: 'Habits', component: bulletHabits },
  	{ path: '/misc', name: 'Misc', component: bulletMisc },

  	{ path: '/journal/:entryid', component: bulletJournalSingle }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
  linkActiveClass: 'is-active'
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-container')
