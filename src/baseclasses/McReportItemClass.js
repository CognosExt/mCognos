import mcreportitemStoreModule from '../store/modules/mcreportitem';

export default () => {
  return {
    created: function() {
      var store = this.$store;
      // register a new module only if doesn't exist

      if (this.objectId) {
        var mcReportItemId = this.objectId;
      } else {
        console.error('Returning without Object ID');
        //    var mcReportItemId = this.$route.params.reportId;
        return;
      }
      this.mcReportItemId = mcReportItemId;

      if (!(store && store.state && store.state[mcReportItemId])) {
        store.registerModule(mcReportItemId, mcreportitemStoreModule);
      } else {
        // re-use the already existing module
        console.log(`reusing module`);
      }

      var params = {
        id: mcReportItemId
      };
      console.log('the params for the FETCH_REPORT_ITEM dispatch', params);
      //        dispatch(reportId + '/triggerSelfDismissingNotifcation', {...}, {root:true})
      store.dispatch(mcReportItemId + '/FETCH_REPORT_ITEM', params, {
        root: true
      });
    }
  };
};
