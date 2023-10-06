<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase/init.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const customerId = route.params.id
const updateSuccess = ref(false)

onMounted(async () => {
  const docRef = doc(db, 'Customers', customerId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    name.value = docSnap.data().name
    email.value = docSnap.data().email
    phone.value = docSnap.data().phone
    description.value = docSnap.data().description
    avatar.value = docSnap.data().avatar
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
})

// Customer data
const name = ref('')
const email = ref('')
const phone = ref('')
const description = ref('')
const avatar = ref('')

async function editCustomer() {
  const customer = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    description: description.value,
    avatar: avatar.value
  }

  // Update a new document with a generated id.
  const docRef = doc(db, 'Customers', customerId)
  await updateDoc(docRef, customer)
    .then(() => {
      updateSuccess.value = true
    })
    .catch((error) => {
      console.log('Error updating this document', error)
    })
    .finally(() => {
        setTimeout(() => {
            updateSuccess.value = false
            router.push({ path: '/customers' })
        }, 2000)

    })
}
</script>

<template>
  <div class="col-md-12 col-lg-12 mt-3">
    <div
      v-show="updateSuccess"
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
          <div class="toast-body">{{ name }} was updated successfully.</div>
        </div>
      </div>
    </div>

    <h4 class="mb-3">Edit Customer</h4>
    <form @submit.prevent="editCustomer" class="needs-validation" novalidate="">
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

      <button class="w-100 btn btn-primary btn-lg" type="submit">Edit Customer</button>
    </form>
  </div>
  <!-- <div class="row g-5">
  </div> -->
</template>

<style scoped></style>
