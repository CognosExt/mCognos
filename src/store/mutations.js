export const mutations = {
  PENDING_ON(state, { label }) {
    state.pending = state.pending + 1;
    state.label = label;
  },
  PENDING_OFF(state) {
    state.pending = state.pending - 1;
    //  state.label = '';
  },
  SHOW_NOTIFICATION(state, { type, message }) {
    state.notification = {
      type: type,
      message: message
    };
  }
};
