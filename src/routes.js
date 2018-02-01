export default [
  {
    path: '/logoff/',
    component: require('./pages/CognosLogoff.vue')
  },
  {
    path: '/login/',
    component: require('./pages/CognosLogin.vue')
  },
  {
    path: '/folder/:folderId',
    component: require('./pages/CognosFolder.vue')
  },
  {
    path: '/mcreport/:reportId',
    component: require('./pages/McReport.vue')
  }
];
