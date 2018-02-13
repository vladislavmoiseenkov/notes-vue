<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="jumbotron w-50">
        <div class="form-group">
          <label for="Title">Title</label>
          <input v-model="title" type="text" class="form-control" id="Title" placeholder="Enter title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" v-model="description" id="description" placeholder="description"></textarea>
        </div>
        <button type="button" @click="addNewAd" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'authUser'
    ],
    data() {
      return {
        title: '',
        description: ''
      }
    },
    mounted() {
      setTimeout(() => {
        if (!this.authUser) {
          this.$router.push('/');
        }
      });
    },
    methods: {
      addNewAd() {
        if(this.title && this.description) {
          this.$emit('on-create', this.title, this.description);
        } else {
          alert("Поля ввода не должны быть пустыми!!!");
        }
      }
    }
  }
</script>