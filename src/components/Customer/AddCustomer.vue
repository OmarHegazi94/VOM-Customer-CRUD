<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const addSuccess = ref(false)
const router = useRouter()

// Customer data
const newCustomerForm = reactive({
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

const v$ = useVuelidate(rules, newCustomerForm)

async function addCustomer() {
  const result = await v$.value.$validate()
  if (result) {
    const newCustomer = {
      name: newCustomerForm.name,
      email: newCustomerForm.email,
      phone: newCustomerForm.phone,
      description: newCustomerForm.description,
      avatar: newCustomerForm.avatar
    }
    console.log('newCustomer', newCustomer)

    await addDoc(collection(db, 'Customers'), newCustomer)
      .then(() => {
        addSuccess.value = true
        for (const property in newCustomerForm) {
          newCustomerForm[property] = ''
        }
        // console.log('docRef', docRef.id);
      })
      .catch((error) => {
        console.log('Error Adding this document', error)
      })
      .finally(() => {
        setTimeout(() => {
          addSuccess.value = false
          router.push({ path: '/' })
        }, 2000)
      })
  }
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
          <div class="toast-body">{{ newCustomerForm.name }} was added successfully.</div>
        </div>
      </div>
    </div>
    <h3 class="mb-3">Add New Customer</h3>
    
    <form @submit.prevent="addCustomer" class="needs-validation" novalidate="">
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.name.$errors.length > 0 }"
            id="name"
            placeholder="John Wick"
            required=""
            v-model="newCustomerForm.name"
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
            placeholder="johnwick@chapter4.com"
            required=""
            v-model="newCustomerForm.email"
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
            placeholder="99999999"
            required=""
            v-model="newCustomerForm.phone"
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
            placeholder="https://picsum.photos/9/200/300"
            required=""
            v-model="newCustomerForm.avatar"
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
          <label class="form-label">Description</label>
          <QuillEditor
            v-model:content="newCustomerForm.description"
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

      <!-- <hr class="my-4" /> -->
      <div class="row g-3 mt-5">
        <div class="col-sm-12">
          <button class="w-100 btn btn-primary btn-lg" type="submit">Add Customer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
