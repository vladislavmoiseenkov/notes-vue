<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="jumbotron w-50">
                <div class="form-group">
                    <label for="Title">Title</label>
                    <input type="text" v-model="note.title" class="form-control" id="Title" placeholder="Enter title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" v-model="note.description" id="description" placeholder="description"></textarea>
                </div>
                <button type="button" @click="click" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'notes',
            'authUser'
        ],
        watch: {
            '$route': function(newRoute, oldRoute) {
                this.updateNote();
            },
        },
        route: {
            canReuse: true,
        },
        data() {
            return {
                note: {
                    title: '',
                    description: '',
                }
            }
        },
        methods: {
            updateNote() {
                for (let note of this.notes) {
                    if (note.id === +this.$route.params.id) {
                        this.note = note;    
                    }
                }
                
                if (this.authUser.username !== this.note.author) {
                    this.$router.push('/');
                }
            },
            click() {
                this.$emit('on-edit', this.note);
    
                this.$router.push('/');
            }
        },
        mounted() {
            setTimeout(() => {
                if (this.authUser) {
                    this.updateNote();
                } else {
                    this.$router.push('/');
                }
            });
        }
    }
</script>