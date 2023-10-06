<script setup>
import IconUsers from '@/components/icons/IconUsers.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconDocument from '@/components/icons/IconDocument.vue'
</script>

<template>
  <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div
      class="offcanvas-md offcanvas-end bg-body-tertiary"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-header">
        <RouterLink to="/" class="offcanvas-title" id="sidebarMenuLabel">VOM Customers</RouterLink>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body vh-100 d-md-flex flex-column p-0 overflow-y-auto">
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink
              to="/"
              active-class="active-link"
              exact-active-class="exact-active-link"
              class="nav-link d-flex align-items-center gap-2 py-3"
              aria-current="page"
            >
              <IconUsers />
              All Customers
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/customers/add"
              active-class="active-link"
              exact-active-class="exact-active-link"
              class="nav-link d-flex align-items-center gap-2 py-3"
            >
              <IconAdd />
              Add Customer
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/invoice"
              active-class="active-link"
              exact-active-class="exact-active-link"
              class="nav-link d-flex align-items-center gap-2 py-3"
            >
              <IconDocument />
              Invoice
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  color: #52789d;
  font-weight: 600;
}

.active {
  color: var(--bs-indigo);
  --bs-bg-opacity: 1;
  background-color: var(--bs-gray-200);
}

.exact-active-link {
  color: var(--bs-indigo);
  --bs-bg-opacity: 1;
  background-color: var(--bs-gray-200);
}
</style>
