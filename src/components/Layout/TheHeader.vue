<script setup>
import IconMenu from '@/components/icons/IconMenu.vue';
</script>

<template>
  <header class="bg-dark flex-md-nowrap navbar p-0 shadow py-3" data-bs-theme="dark">
    <RouterLink to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white fw-bold mb-0">VOM Customers</RouterLink>

    <ul class="navbar-nav flex-row d-md-none">
      <li class="nav-item text-nowrap">
        <button
          class="nav-link px-3 text-white"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <IconMenu />
        </button>
      </li>
    </ul>
  </header>
</template>

<style lang="">

</style>
