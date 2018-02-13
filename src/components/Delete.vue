<template>
  
</template>

<script>
    export default {
        props: [
            'authUser'
        ],
        mounted() {
            setTimeout(() => {
                if (this.authUser) {
                    this.$emit('on-delete', this.$route.params.id);
                }
                this.$router.push('/');                
            });
        }
    }
</script>