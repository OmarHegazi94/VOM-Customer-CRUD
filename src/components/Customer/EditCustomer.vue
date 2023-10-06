<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase/init.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()
const customerId = route.params.id
const updateSuccess = ref(false)

onMounted(async () => {
  const docRef = doc(db, 'Customers', customerId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    editCustomerForm.name = docSnap.data().name
    editCustomerForm.email = docSnap.data().email
    editCustomerForm.phone = docSnap.data().phone
    editCustomerForm.description = docSnap.data().description
    editCustomerForm.avatar = docSnap.data().avatar
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
})

// Customer data
const editCustomerForm = reactive({
  name: '',
  email: '',
  phone: '',
  description: '',
  avatar: ''
})

const rules = {
  name: { required },
  email: { required, email },
  phone: { required },
  description: { required },
  avatar: { required }
}

const v$ = useVuelidate(rules, editCustomerForm)

async function editCustomer() {
  const result = await v$.value.$validate()
  if (result) {
    const customer = {
      name: editCustomerForm.name,
      email: editCustomerForm.email,
      phone: editCustomerForm.phone,
      description: editCustomerForm.description,
      avatar: editCustomerForm.avatar
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
          router.push({ path: '/' })
        }, 2000)
      })
  }
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
          <div class="toast-body">{{ editCustomerForm.name }} was updated successfully.</div>
        </div>
      </div>
    </div>

    <h3 class="mb-3">Edit Customer</h3>
    <form @submit.prevent="editCustomer" class="needs-validation" novalidate="">
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.name.$errors.length > 0 }"
            id="name"
            placeholder=""
            required=""
            v-model="editCustomerForm.name"
          />
          <div v-show="v$.name.$errors" class="div">
            <div
              v-for="error in v$.name.$errors"
              :key="error.$uid"
              class="invalid-feedback d-block"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': v$.email.$errors.length > 0 }"
            id="email"
            placeholder=""
            required=""
            v-model="editCustomerForm.email"
          />
          <div v-show="v$.email.$errors" class="div">
            <div
              v-for="error in v$.email.$errors"
              :key="error.$uid"
              class="invalid-feedback d-block"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="phone" class="form-label">Phone</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.phone.$errors.length > 0 }"
            id="phone"
            placeholder=""
            required=""
            v-model="editCustomerForm.phone"
          />
          <div v-show="v$.phone.$errors" class="div">
            <div
              v-for="error in v$.phone.$errors"
              :key="error.$uid"
              class="invalid-feedback d-block"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <label for="avatar" class="form-label">Avatar (url)</label>
          <input
            type="string"
            class="form-control"
            :class="{ 'is-invalid': v$.avatar.$errors.length > 0 }"
            id="avatar"
            placeholder=""
            required=""
            v-model="editCustomerForm.avatar"
          />
          <div v-show="v$.avatar.$errors" class="div">
            <div
              v-for="error in v$.avatar.$errors"
              :key="error.$uid"
              class="invalid-feedback d-block"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 my-3">
        <div class="col-sm-12 mb-5">
          <label for="description" class="form-label">Description</label>
          <QuillEditor
            v-model:content="editCustomerForm.description"
            theme="snow"
            content-type="text"
          />
          <div v-show="v$.description.$errors" class="div">
            <div
              v-for="error in v$.description.$errors"
              :key="error.$uid"
              class="invalid-feedback d-block"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 mt-4">
        <div class="col-sm-12">
          <button class="w-100 btn btn-primary btn-lg" type="submit">Edit Customer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
