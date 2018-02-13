<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-6 col-12" v-for="note in myPagination(notes, ((currentPage - 1) * pageSize), pageSize)" :key="note.id">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">
              <router-link class="card-link" :to="`/item/${ note.id }`">{{note.title}}</router-link>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ note.author }} | {{ note.date | date('DD-MM-YYYY hh:mm') }}</h6>
            <p class="card-text">{{ note.description }}</p>
            <router-link class="card-link" :to="`/edit/${ note.id }`" v-if="authUser && authUser.username === note.author">Edit</router-link>
            <router-link class="card-link" :to="`/delete/${ note.id }`" v-if="authUser && authUser.username === note.author">Delete</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <pagination :total="total" :page-size="pageSize" :callback="pageChanged" :options="paginationOptions" nav-class="padding-10 mt-3" ul-class="bg-color-red" li-class="txt-color-blue">
      </pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import pagination from 'vue-pagination-bootstrap';
  
  export default {
    props: [
      'authUser',
      'notes'
    ],
    data() {
      return {
        currentPage: 1,
        pageSize: 4,
        paginationOptions: { // Not required to pass this configurations
          offset: 2,
          previousText: 'Prev',
          nextText: 'Next',
          alwaysShowPrevNext: true
        }
      }
    },
    computed: {
      total() {
        return this.notes.length;
      }
    },
    methods: {
      pageChanged(item) {
        this.currentPage = item;
      },
      myPagination(data, start, limit) {
        if (start !== 0) {
          limit *= this.currentPage;
        }
        return data.slice(start, limit);
      }
    },
    components: {
      pagination
    }
  }
</script>

<style>
  
</style>