<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
// import { db } from '@/firebase'
// import { collection, getDocs } from "firebase/firestore";


// Customer data
const name = ref('KOKO')
const email = ref('kokowawa@gmail.com')
const phone = ref('01153393948')
const description = ref('as a kokowawa developer i work on vue3 koko app ...')
const avatar = ref('https://picsum.photos/200/300')


function addCustomer(){
  const newCustomer = {
    id: uuidv4(),
    name: name.value,
    email: email.value,
    phone: phone.value,
    description: description.value,
    avatar: avatar.value
  }

  console.log('newCustomer', newCustomer);

}
</script>

<template>
  <div class="col-md-12 col-lg-12 mt-3">
    <h4 class="mb-3">Add New Customer</h4>
    <form @submit.prevent="addCustomer" class="needs-validation" novalidate="">
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder=""
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
            placeholder=""
            required=""
            v-model="email"
          />
          <div class="invalid-feedback">Valid last name is required.</div>
        </div>
      </div>
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="phone" class="form-label">Phone</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder=""
            required=""
            v-model="phone"
          />
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>

        <div class="col-sm-6">
          <label for="avatar" class="form-label">Avatar (url)</label>
          <input
            type="string"
            class="form-control"
            id="avatar"
            placeholder=""
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
