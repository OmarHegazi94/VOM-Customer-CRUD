import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import AllCustomers from '@/components/Customer/AllCustomers.vue'
import AddCustomer from '@/components/Customer/AddCustomer.vue'
import EditCustomer from '@/components/Customer/EditCustomer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView,
    },
    {
      path: '/',
      name: 'customers',
      component: () => import('@/views/CustomersView.vue'),
      children: [
        {
          path: '',
          name: 'allcustomers',
          component: AllCustomers,
        },
        {
          path: '/customers/add',
          name: 'addcustomer',
          component: AddCustomer,
        },
        {
          path: '/customers/edit/:id',
          name: 'editcustomer',
          component: EditCustomer,
        },
      ]
    },
    { path: '/:pathMatch(.*)', name: 'page-not-found', component: () => import('@/views/PageNotfound.vue') },
  ]
})

export default router
