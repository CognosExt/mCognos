

<template>

<!-- App -->
<div id="app" data-mark="jeetje">
<loading :show="pending" :label="label"></loading>
<notifications group="notify" />
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>
    <!-- Left Panel -->
    <f7-panel left cover>
        <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-list>
                        <f7-list-item v-if="isLoggedIn" link="/logoff/" title="Log Off" link-view="#main-view" link-close-panel></f7-list-item>
                        <f7-list-item link="/" v-on:click="onResetClick();" title="Reset" link-close-panel></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
        <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
            <!-- iOS Theme Navbar -->
            <f7-navbar v-if="$theme.ios">
                <f7-nav-left>
                    <f7-link icon="icon-bars" open-panel="left"></f7-link>
                </f7-nav-left>
                <f7-nav-center sliding>Mini Mobile Cognos</f7-nav-center>
            </f7-navbar>
            <!-- Pages -->
            <f7-pages>
                <f7-page>
                    <!-- Page Content -->
                    <f7-block-title>Welcome</f7-block-title>
                    <f7-block inner v-if="!isLoggedIn && cognosUrl">
                        <p>You must login to Cognos to connect to {{ cognosUrl }}.</p>
                        <f7-button open-login-screen="#login-screen">Login</f7-button>
                    </f7-block>
                    <f7-block inner v-if="!isLoggedIn && !cognosUrl">
                        <p>You must ask your admin to send you a configuration link or provide the URL of your IBM Cognos installation below.</p>
                        <f7-list form id="set-url-form">
                            <f7-list-item>
                                <!-- type and validationMessage are there to support adding validation in f7 2.0 -->
                                <f7-input name="cognosurl" v-on:input="validateCognosUrl" placeholder="Cognos URL" type="text" validationMessage="Not a URL yet"></f7-input>

                            </f7-list-item>
                            <f7-list-button title="Set URL" :disabled="invalidcognosURL" v-on:click="onSetURLClick();" @keypress.enter="onSetURLClick();"></f7-list-button>
                        </f7-list>

                    </f7-block>
                    <f7-block inner v-if="isLoggedIn">
                        <p>Great, you are logged in. Why not explore the root folders by clicking the button.</p>
                        <f7-button href="/folder/0" link-view="#main-view">Go to the Root folder</f7-button>
                    </f7-block>
                    <!-- Actions -->
                    <f7-actions>
                        <!-- Actions Group -->
                        <f7-actions-group>
                            <!-- Actions Label -->
                            <f7-actions-label>Hello</f7-actions-label>
                            <!-- Actions Buttons -->
                            <f7-actions-button>Button 1</f7-actions-button>
                            <f7-actions-button @click="onLoginClick">Button 2</f7-actions-button>
                        </f7-actions-group>
                        <!-- Another Group -->
                        <f7-actions-group>
                            <!-- Cancel/Close Button -->
                            <f7-actions-button color="red" bold>Cancel</f7-actions-button>
                        </f7-actions-group>
                    </f7-actions>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-views>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen" v-on:loginscreen:open="onOpenLogin" modal-in>
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>Login</f7-login-screen-title>
                    <notifications group="login" />

                    <f7-list form id="login-form">
                        <f7-list-item>
                            <f7-label>Username</f7-label>
                            <f7-input ref="usernameinput" name="username" placeholder="Username" type="text" autocomplete="username" v-model="cognosUser"></f7-input>
                        </f7-list-item>
                        <f7-list-item>
                            <f7-label>Password</f7-label>
                            <f7-input name="password" type="password" placeholder="Password" autocomplete="current-password"></f7-input>
                        </f7-list-item>
                    </f7-list>
                    <f7-list>
                        <f7-list-button title="Sign In" v-on:click="onLoginClick();" @keyup.enter="onLoginClick();"></f7-list-button>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>
</div>

</template>

<script>
import loading from 'vue-full-loading';
import VueNotifications from 'vue-notifications';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
  components: {
    loading
  },
  props: {},
  data() {
    return {
      disabled: false,
      cognosUrl: {
        default: function() {
          return '';
        }
      },
      cognosUser: {
        default: function() {
          return '';
        }
      },
      cognosRootfolder: {
        default: function() {
          return '';
        }
      },
      debug: {
        default: function() {
          return false;
        }
      },
      invalidcognosURL: {
        default: function() {
          return true;
        }
      }
    };
    //  cognosUrl: ''
  },
  computed: {
    ...mapGetters(['pending', 'isLoggedIn', 'label', 'notification'])
  },
  created() {
    this.cognosUser = localStorage.getItem('cognosUser');
    this.cognosRootfolder = localStorage.getItem('cognosRootfolder');
    this.debug = localStorage.getItem('debug');
    if (this.debug == null) {
      this.debug = false;
    }
    this.cognosUrl = localStorage.getItem('cognosUrl');

    if (device.platform == 'Android' || device.platform == 'Mac OS X') {
      cordova.plugins.SecureKeyStore.get(
        function(password) {
          console.log('Retrieved Password', password); // res - string retrieved
          // If we have all info, login.
          if (this.cognosUser && password && this.cognosUrl) {
            this.$store.dispatch('login', {
              username: this.cognosUser,
              password: password,
              url: this.cognosUrl,
              debug: this.debug
            });
          }
        },
        function(error) {
          console.log(error);
        },
        'cognosPassword'
      );
    } else {
      var password = localStorage.getItem('cognosPassword');
      if (this.cognosUser && password && this.cognosUrl) {
        this.$store.dispatch('login', {
          username: this.cognosUser,
          password: password,
          url: this.cognosUrl,
          debug: true
        });
      }
    }

    // This never happens (yet)
    /*  var result = this.getCognos()
              .then(function(cognos) {
                  console.log("cognos", cognos);
                  if (cognos.loggedin) {
                      console.log('Already Logged in, redirecting');
                      f7.mainView.router.loadPage({
                          url: '/about/'
                      });
                  }
              });*/
  },
  methods: {
    validateCognosUrl: function() {
      var formData = f7.formToData('#set-url-form');
      var url = formData.cognosurl;

      if (url.length > 6) {
        this.invalidcognosURL = false;
      } else {
        this.invalidcognosURL = true;
      }
    },
    onSetURLClick: function() {
      /* We did not bind the property so the UI does not change while we are still typing */
      var formData = f7.formToData('#set-url-form');
      this.cognosUrl = formData.cognosurl;
      f7.loginScreen('#login-screen');
    },
    onLoginClick: function() {
      console.log('Set myself in LoginClick', this);
      console.log('Set myself in LoginClick', this.cognosUrl);
      var formData = f7.formToData('#login-form');
      if (formData.username == '') {
        this.$notify({
          group: 'login',
          type: 'warning',
          title: 'Login Warning',
          text: 'Please provide a username'
        });
        return;
      }
      if (formData.password == '') {
        this.$notify({
          group: 'login',
          type: 'warning',
          title: 'Login Warning',
          text: 'Please provide a password'
        });
        return;
      }
      this.$store.dispatch('login', {
        username: formData.username,
        password: formData.password,
        url: this.cognosUrl,
        debug: this.debug
      });
    },
    onResetClick: function() {
      this.$store.dispatch('logoff', {});
      localStorage.removeItem('cognosUser');
      localStorage.removeItem('cognosPassword');
      localStorage.removeItem('cognosUrl');
      localStorage.removeItem('debug');
      window.location.reload(false);
    },
    onOpenLogin: function() {
      var password = localStorage.getItem('cognosPassword');

      this.$refs.usernameinput.disabled = this.cognosUser.length > 0;
      if (this.cognosUser && !password) {
        var formData = {
          username: this.cognosUser
        };
        f7.formFromData('#login-form', formData);
      }
    }
  },
  watch: {
    isLoggedIn: {
      handler: function(newIsLoggedIn, oldIsLoggedIn) {
        // Our fancy notification (2).
        if (newIsLoggedIn) {
          console.log('Logged in and about to navigate');

          var myApp = new Framework7();
          myApp.closeModal();
          // Retrieve the object from storage
          var defaultFolder = localStorage.getItem('cognosRootfolder');
          console.log('cognosRootfolder', defaultFolder);
          var folder = 0;
          if (defaultFolder) {
            folder = defaultFolder;
          }
          f7.mainView.router.loadPage({
            url: '/folder/' + folder
          });
        }
      },
      deep: true
    },
    notification: {
      handler: function(newPending, oldPending) {
        if (newPending) {
          this.$notify({
            group: 'login',
            type: newPending.type,
            title: newPending.title,
            text: newPending.message
          });

          console.log('notification in', newPending);
        } else {
          console.log('notification out');
        }
      },
      deep: true
    },

    pending: {
      handler: function(newPending, oldPending) {
        if (newPending) {
          console.log('pending in');
        } else {
          console.log('pending out');
        }
      },
      deep: true
    },
    cognosUrl: {
      handler: function(newcognosUrl, oldcognosUrl) {
        if (newcognosUrl) {
          console.log('url in', newcognosUrl);
          localStorage.setItem('cognosUrl', newcognosUrl);
        }
      }
      //deep: true,
    }
  } //,
  //immediate: true
};
</script>
