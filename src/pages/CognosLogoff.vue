

<template>
<f7-page >
    <loading :show="pending" :label="label">
    </loading>
    <f7-login-screen-title>Logging off</f7-login-screen-title>
    <f7-block inner>
    </f7-block>
</f7-page>

</template>

<script>
import loading from 'vue-full-loading';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  components: {
    loading
  },
  data() {
    return {
      label: 'Logging off...'
    };
  },
  computed: mapGetters(['pending', 'isLoggedIn']),
  created() {
    this.$store.dispatch('logoff');
  },
  methods: {},
  watch: {
    isLoggedIn: {
      handler: function(newIsLoggedIn, oldIsLoggedIn) {
        console.log('logged in is', newIsLoggedIn);
        // Our fancy notification (2).
        if (!newIsLoggedIn) {
          window.location.reload(false);
        }
      },
      deep: true
    }

    /*        pending: {
            handler: function(newPending, oldPending) {
                if (newPending) {
                console.log('pending on');
              } else {
                console.log('pending off');
              }

            },
            deep: true,
        }*/
  } //,
  //immediate: true
};
</script>
