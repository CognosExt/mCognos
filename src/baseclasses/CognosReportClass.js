import reportStoreModule from '../store/modules/report';

export default () => {
  return {
    created: function() {
      //      this.columns = [];
      //      this.rows = [];

      var store = this.$store;
      // register a new module only if doesn't exist
      var reportId = this.$route.params.reportId;
      if (!(store && store.state && store.state[reportId])) {
        store.registerModule(reportId, reportStoreModule);
      } else {
        // re-use the already existing module
        console.log(`reusing module`);
      }

      var params = {
        root: true,
        id: reportId
      };
      console.log('the params for the FETCH_REPORT dispatch', params);
      //        dispatch(reportId + '/triggerSelfDismissingNotifcation', {...}, {root:true})
      store.dispatch(reportId + '/FETCH_REPORT', params, {
        root: true
      });
      this.reportId = reportId;
    }
  };
};
