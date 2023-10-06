<script setup>
import { ref } from 'vue'
// import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase/init.js'
import { collection, addDoc } from "firebase/firestore";

const addSuccess = ref(false)

// Customer data
const name = ref('')
const email = ref('')
const phone = ref('')
const description = ref('')
const avatar = ref('')


async function addCustomer(){
  const newCustomer = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    description: description.value,
    avatar: avatar.value
  }
  console.log('newCustomer', newCustomer);

  await addDoc(collection(db, 'Customers'), newCustomer).then(() => {
      addSuccess.value = true
      name.value = ''
      email.value = ''
      phone.value = ''
      description.value = ''
      avatar.value = ''
      // console.log('docRef', docRef.id);
    })
    .catch((error) => {
      console.log('Error Adding this document', error)
    })
    .finally(() => {
        setTimeout(() => {
            addSuccess.value = false
        }, 2000)
    })

}
</script>

<template>
  <div class="col-md-12 col-lg-12 mt-3">
    <div
      v-show="addSuccess"
      aria-live="polite"
      aria-atomic="true"
      class="bg-body-secondary position-relative bd-example-toasts rounded-3"
    >
      <div
        class="toast-container p-3 top-0 end-0"
        id="toastPlacement"
        data-original-class="toast-container p-3"
      >
        <div class="toast fade show">
          <div class="toast-header">
            <svg
              class="bd-placeholder-img rounded me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#008000"></rect>
            </svg>
            <strong class="me-auto">Success</strong>
            <small>Now</small>
          </div>
          <div class="toast-body">{{ name }} was added successfully.</div>
        </div>
      </div>
    </div>
    <h4 class="mb-3">Add New Customer</h4>
    <form @submit.prevent="addCustomer" class="needs-validation" novalidate="">
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="John Wick"
            required=""
            v-model="name"
          />
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>

        <div class="col-sm-6">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="johnwick@chapter4.com"
            required=""
            v-model="email"
          />
          <div class="invalid-feedback">Valid Email is required.</div>
        </div>
      </div>
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="phone" class="form-label">Phone</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder="99999999"
            required=""
            v-model="phone"
          />
          <div class="invalid-feedback">Valid Phone is required.</div>
        </div>

        <div class="col-sm-6">
          <label for="avatar" class="form-label">Avatar (url)</label>
          <input
            type="string"
            class="form-control"
            id="avatar"
            placeholder="https://picsum.photos/9/200/300"
            required=""
            v-model="avatar"
          />
          <div class="invalid-feedback">Valid Avatar url is required.</div>
        </div>
      </div>

      <div class="row g-3 my-3">
        <div class="col-sm-12">
          <label for="description" class="form-label">Description</label>
          <textarea
            type="string"
            class="form-control"
            id="description"
            rows="5"
            placeholder=""
            required=""
            v-model="description"
          ></textarea>
          <div class="invalid-feedback">Valid Description is required.</div>
        </div>
      </div>

      <!-- <hr class="my-4" /> -->

      <button class="w-100 btn btn-primary btn-lg" type="submit">Add Customer</button>
    </form>
  </div>
  <!-- <div class="row g-5">
  </div> -->
</template>

<style scoped></style>
