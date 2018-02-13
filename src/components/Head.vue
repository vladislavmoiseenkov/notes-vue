<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light  mb-3">
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="navbar-nav" v-if="authUser">
                <li class="nav-item">
                    <h4 class="nav-link" style="margin: 0">Hello, {{ authUser.username }}</h4>
                </li>
            </ul>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0" @submit.prevent="login">
                    <div v-if="!authUser">
                        <input type="text" class="form-control" id="Login" placeholder="login" v-model="username">
                        <input type="password" class="form-control" id="Password" placeholder="Password" v-model="password">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
                <ul class="navbar-nav" v-if="authUser">
                    <li class="nav-item">
                        <router-link :to='`/`' class="navbar-brand">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="`/add`">Create</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="`/logout`">logout</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import User from './../classes/User.js';
    import Vue from 'vue';
    
    export default {
        props: [
            'authUser'
        ],
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                if (!this.username || !this.password) {
                    alert("Поля авторизации не должны быть пустыми!!!");
                    return;
                }
    
                let user = findUser(this.username);
    
                if (user) {
                    if (!checkPassword(user, this.password)) {
                        alert("Неправильный пароль");
                        return;
                    }
                } else {
                    let confirmCreateUser = confirm("Пользователь не найден! Создать аккаунт?");
    
                    if (confirmCreateUser) {
                        user = createNewUser(this.username, this.password);
                    } else {
                        return;
                    }
                }
    
                this.username = '';
                this.password = '';
    
                this.$emit('on-login', user);
            }
        }
    }
    
    function findUser(username) {
        let users = JSON.parse(Vue.localStorage.get('users')) || [];
    
        let user = users.filter(user => user.username === username);
    
        return (user && user[0]) || null;
    }
    
    function checkPassword(user, password) {
        return user.password === password;
    }
    
    function createNewUser(username, password) {
        let users = JSON.parse(Vue.localStorage.get('users')) || [];
    
        let newUser = new User(username, password);
    
        users.push(newUser);
    
        Vue.localStorage.set('users', JSON.stringify(users));
    
        return newUser;
    }
</script>