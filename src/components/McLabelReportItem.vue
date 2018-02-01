<template><div>

  <h2>{{label}}</h2>
      <f7-preloader v-if="pending" color="blue" size="22px"></f7-preloader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import McReportItemClass from '../baseclasses/McReportItemClass';

export default {
  name: 'McLabelReportItem',
  extends: McReportItemClass(),
  components: {},
  props: {
    index: {
      type: Number
    },
    objectId: {
      String,
      default: () => {
        return '';
      }
    }
  },
  computed: {
    ...mapGetters(['pending']),
    label: function() {
      var result = this.$store.getters[this.objectId + '/content'];
      console.log('Content in McLabelReportItem', result);
      if (result) {
        result = result[0].row[0].value;
      }
      console.log('Label in McLabelReportItem', result);

      return result;
    }
  }
};
</script>
