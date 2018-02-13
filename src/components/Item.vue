<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="jumbotron w-50">
                <h1 class="">{{ note.title }}</h1>
                <p class="lead">{{ note.description }}</p>
                <hr class="my-4">
                <p class="text-muted">{{ note.author }}</p>
                <p class="text-muted">{{ note.date | date('DD-MM-YYYY hh:mm') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        props: [
            'notes'
        ],
        data() {
            return {
                note: {
                    title: '',
                    description: '',
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.updateNote();
            });
        },
        methods: {
            updateNote() {
                for (let note of this.notes) {
                    if (note.id === +this.$route.params.id) {
                        this.note = note;    
                    }
                }
            }
        }
    }
</script>

<style>
    .jumbotron {
        padding: 20px;
    }
</style>
