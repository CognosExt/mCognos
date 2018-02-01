

<template>

<!-- Login Page -->
<!--<f7-login-screen id="login-screen" modal>
    <f7-view>
        <f7-pages>-->
<f7-page login-screen>
    <loading :show="pending" :label="label">
    </loading>
    <f7-login-screen-title>Login</f7-login-screen-title>
    <f7-list form id="login-form">
        <f7-list-item>
            <f7-label>Username</f7-label>
            <f7-input name="username" placeholder="Username" type="text"></f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>Password</f7-label>
            <f7-input name="password" type="password" placeholder="Password"></f7-input>
        </f7-list-item>
        <f7-list-button title="Sign In" v-on:click="onLoginClick();" @keyup.enter="onLoginClick();"></f7-list-button>
    </f7-list>
    <f7-list>
    </f7-list>
</f7-page>
<!--        </f7-pages>
    </f7-view>
</f7-login-screen>
-->

</template>

<script>

import loading from 'vue-full-loading'
import {
    mapGetters
}
from 'vuex'
import {
    mapState
}
from 'vuex';
export default {
    components: {
        loading
    },
    data() {
        return {
            label: 'Logging In...'
        }
    },
    computed:
        mapGetters([
        'pending',
        'isLoggedIn'
    ]),
    created() {
        var result = this.getCognos()
            .then(function(cognos) {
                console.log("cognos", cognos);
                if (cognos.loggedin) {
                    console.log('Already Logged in, redirecting');
                    f7.mainView.router.loadPage({
                        url: '/about/'
                    });
                }
            });
    },
    methods: {
        onLoginClick: function() {


            var formData = f7.formToData('#login-form');
            this.$store.dispatch("login", {
                username: formData.username,
                password: formData.password
            });
        }
    },
    notifications: {
        showLoginError: { // You can have any name you want instead of 'showLoginError'
            title: 'Login Failed',
            message: 'Failed to authenticate',
            type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
        }
    },
    watch: {
        isLoggedIn: {
            handler: function(newIsLoggedIn, oldIsLoggedIn) {
                console.log('finally logged in');
                // Our fancy notification (2).
                if (newIsLoggedIn) {
                    f7.mainView.router.loadPage({
                        url: '/folder/0'
                    });
                }
                console.log(`We have ${newIsLoggedIn} fruits now, yaay!`)
            },
            deep: true,
        },

        pending: {
            handler: function(newPending, oldPending) {
                if (newPending) {
                console.log('finally pending in');
              }

            },
            deep: true,
        }
    } //,
    //immediate: true
}

</script>
