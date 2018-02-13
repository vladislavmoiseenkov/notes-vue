<template>

</template>

<script>
    export default {
        mounted() {
            this.$emit('on-logout');
            this.$router.push('/');                        
        }
    }
</script>