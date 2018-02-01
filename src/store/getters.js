export const getters = {
  pending: function(state) {
    return state.pending > 0;
  },
  label: function(state) {
    return state.label;
  },
  notification: function(state) {
    return state.notification;
  }
};
