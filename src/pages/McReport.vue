

<template>

<f7-page>

    <f7-navbar title="Cognos Report" back-link="Back" sliding></f7-navbar>
    <f7-block inner>

      <div v-for="mcreport in mcreportitems" :key="mcreport.id" v-if="mcreport.type === 'label'">
        <h1>
          <McLabelReportItem :objectId="mcreport.id"></McLabelReportItem>
        </h1>
      </div>
      <div v-for="mcreport in mcreportitems" :key="mcreport.id" v-if="mcreport.type === 'table'">
        <McTableReportItem :objectId="mcreport.id"></McTableReportItem>
      </div>
      <div v-for="mcreport in mcreportitems" :key="mcreport.id" v-if="mcreport.type === 'text'">
        <McTextReportItem :objectId="mcreport.id"></McTextReportItem>
      </div>

    </f7-block>
</f7-page>

</template>

<script>
import { mapGetters } from 'vuex';
import loading from 'vue-full-loading';
import McReportClass from '../baseclasses/McReportClass';
import McReportStoreModule from '../store/modules/mcreport';

import McLabelReportItem from '../components/McLabelReportItem';
import McTableReportItem from '../components/McTableReportItem';
import McTextReportItem from '../components/McTextReportItem';

export default {
  extends: McReportClass(),
  name: 'cognosreport',
  components: {
    loading,
    McLabelReportItem,
    McTableReportItem,
    McTextReportItem
  },
  data() {
    return {
      columns: [
        {
          label: '',
          field: 'name',
          filterable: false
        }
      ],
      label: 'Loading Report',
      reportId: 0
    };
  },

  computed: {
    ...mapGetters(['pending', 'labelid', 'mcreportitems']),

    mcreportitems: function() {
      var columns = [];
      var table = [];

      var tables = this.$store.getters[this.mcReportId + '/mcreportitems'];
      console.log('mcreportitems is', tables);
      return tables;
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
