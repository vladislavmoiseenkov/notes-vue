
import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import VueRouter from 'vue-router'
import date from 'vue-date-filter/index.js'
import Vue2Filters from 'vue2-filters'

Vue.use(VueLocalStorage);
Vue.use(VueRouter);
Vue.use(date);
Vue.use(Vue2Filters)

import Capitalize from './filters/Capitalise';
import StartFrom from './filters/StartFrom';

Vue.filter('startFrom', StartFrom);
Vue.filter("capitalize", Capitalize);

import routes from './routes';

let router = new VueRouter({ routes });

import Head from './components/Head';
import CreateItem from './classes/Add.js';

new Vue({
  el: '#app',
  router: router,
  data: {
    authUser: null,
    notes: []
  },
  mounted() {
    this.authUser = JSON.parse(this.$localStorage.get('authUser'));
    this.notes = JSON.parse(this.$localStorage.get('notes'));
  },
  methods: {
    handleLogin(user) {
      this.authUser = user;
      this.$localStorage.set('authUser', JSON.stringify(user));
    },
    handleLogout() {
      this.authUser = false;
      this.$localStorage.set('authUser', JSON.stringify(false));
    },
    handleCreate(title, description) {
      this.notes.push(new CreateItem(
        title, description, this.authUser.username, new Date(), this.notes[this.notes.length - 1].id + 1
      ));

      this.$localStorage.set('notes', JSON.stringify(this.notes));
      this.$router.push('/item/' + this.notes[this.notes.length - 1].id);
    },
    handleEdit(editedNote) {
      this.notes.forEach((note) => {
        if (note.id === editedNote.id) {
          Object.assign(note, editedNote);
        }
      });
      this.$localStorage.set('notes', JSON.stringify(this.notes));
    },
    handleDelete(routeId) {
      
      for(let index in this.notes) {
        if(+this.notes[index].id === +routeId) {
          routeId = index;
        }
      }
      
      this.notes.splice(routeId, 1);
      this.$localStorage.set('notes', JSON.stringify(this.notes));      
    }
  },
  components: {
    'my-head': Head 
  }
});