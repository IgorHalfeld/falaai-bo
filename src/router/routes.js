const DefaultLayout = () => import('layouts/Default.vue');
const AlertsPage = () => import('pages/Alerts');

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Alerts', component: AlertsPage },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({ path: '*', component: AlertsPage });
}

export default routes;
