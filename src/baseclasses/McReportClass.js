import mcreportStoreModule from '../store/modules/mcreport';

export default () => {
  return {
    created: function() {
      var store = this.$store;
      // register a new module only if doesn't exist

      if (this.objectId) {
        var mcReportId = this.objectId;
      } else {
        var mcReportId = this.$route.params.reportId;
      }
      this.mcReportId = mcReportId;

      if (!(store && store.state && store.state[mcReportId])) {
        store.registerModule(mcReportId, mcreportStoreModule);
      } else {
        // re-use the already existing module
        console.log(`reusing module`);
      }

      var params = {
        id: mcReportId
      };
      console.log('the params for the FETCH_CONTENT dispatch', params);
      //        dispatch(reportId + '/triggerSelfDismissingNotifcation', {...}, {root:true})
      store.dispatch(mcReportId + '/FETCH_CONTENT', params, {
        root: true
      });
    }
  };
};
