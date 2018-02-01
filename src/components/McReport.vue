<template>
  <div class="kpi" :style="style" @click="loadMcReport(objectId)">
    <f7-preloader v-if="pending" color="blue" size="22px"></f7-preloader>
    <div v-if="withButton"
         class="kpi-delete-btn"
         @mousedown="remove"></div>
    <slot>
    </slot>
    <McLabelReportItem v-if="labelid" :objectId="labelid">test</McLabelReportItem>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import McReportClass from '../baseclasses/McReportClass';
import McLabelReportItem from './McLabelReportItem';

export default {
  name: 'McReport',
  extends: McReportClass(),
  components: { McLabelReportItem },
  props: {
    index: {
      type: Number
    },
    withButton: {
      type: Boolean,
      default: false
    },
    color: {
      type: Object,
      default: () => {
        return null;
      }
    },
    objectId: {
      String,
      default: () => {
        return '';
      }
    },
    kpiValue: {
      Number,
      default: () => {
        return 0;
      }
    }
  },
  created() {
    var params = {
      id: this.objectId
    };
    //  this.$store.dispatch('FETCH_REPORT', params);
  },
  computed: {
    ...mapGetters(['pending']),
    labelid: function() {
      var result = this.$store.getters[this.objectId + '/labelid'];
      console.log('LabelId', result);
      return result;
    },
    rows: function() {
      var columns = [];
      var table = [];
      debugger;
      var tables = this.$store.getters.rows;
      console.log('Tables in computer is', tables);
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

      this.columns = columns;
      return table;
    },

    brightness() {
      let { r, g, b } = this.color;

      return 0.299 * r + 0.587 * g + 0.114 * b;
    },
    style() {
      if (this.color) {
        let { r, g, b } = this.color;
        let background = `rgb(${r}, ${g}, ${b})`;
        let shadow = `rgba(${r}, ${g}, ${b}, 0.5)`;

        return {
          'background-color': background,
          'box-shadow': `0px 6px 20px ${shadow}`,
          color: this.brightness > 180 ? '#777' : '#f3f3f3'
        };
      }

      return null;
    }
  },
  methods: {
    remove() {
      this.$emit('remove', {
        index: this.index
      });
    },
    loadMcReport(id) {
      f7.mainView.router.loadPage({
        url: '/mcreport/' + id
      });
    }
  }
};
</script>

<style lang="scss">
/*
@keyframes shake {
  from {
    transform: rotate(-4deg);
  },

  to {
    transform: rotate(4deg);
  }
}
*/
.kpi {
  position: relative;
  background-color: transparent;
  margin: 14px;
  height: 52px;
  width: 200px;

  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.07);
  color: #777;

  font-weight: 900;
  font-size: 12px;

  line-height: 52px;
  text-align: center;

  /*  transition: all 0.3s;*/

  cursor: pointer;

  .kpi-delete-btn {
    display: block;
    position: absolute;

    width: 8px;
    height: 8px;
    border-radius: 7px;

    right: 6px;
    top: 6px;

    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
  }
}
/*
.v-grid-item-dragging .kpi {
  animation-name: shake;
  animation-duration: 0.07s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}*/
</style>
