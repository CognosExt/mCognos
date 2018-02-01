<template>
  <f7-block inner>
    <f7-preloader v-if="pending" color="blue" size="22px"></f7-preloader>
    <div v-for="row in rows" :key="row.name" class="ui card fadeIn-animation">
        <div class="content">
          <span v-html="row.value"></span>
        </div>
    </div>
  </f7-block>
</template>

<script>
import { mapGetters } from 'vuex';
import McReportItemClass from '../baseclasses/McReportItemClass';

export default {
  name: 'McTextReportItem',
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
  data() {
    return {
      columns: [
        {
          label: '',
          field: 'name',
          filterable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['pending']),
    rows: function() {
      var columns = [];
      var table = [];

      var tables = this.$store.getters[this.objectId + '/content'];

      console.log('Tables in McTextReportItem is', tables);
      for (var i = 0; i < tables.length; i++) {
        //rows.forEach(function(row){
        console.log(tables[i]);
        for (var j = 0; j < tables[i].row.length; j++) {
          /*  var keys = Array.keys(tables[i].row[j]);
                          if ((keys.length > 0) && (columns.length == 0)) {
                          columns = keys;
                          console.log('keys', keys);
                        }*/
          var row = {};
          table.push(tables[i].row[j]);
          if (columns.length == 0) {
            for (var property in tables[i].row[j]) {
              if (tables[i].row[j].hasOwnProperty(property)) {
                //          console.log(property);
                //            console.log(tables[i].row[j][property]);
                columns.push({
                  label: property,
                  field: property
                });
              }
            }
          }
        }
      }

      if (table.length == 0) {
        table.push({
          name: 'Really, No Data Available'
        });
        columns.push({
          label: '',
          field: 'name',
          filterable: false
        });
      }
      this.columns = columns;
      console.log('Returning table ', table);

      return table;
    }
  }
};
</script>
