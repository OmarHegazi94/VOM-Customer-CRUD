<script setup>
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init.js'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

const allCustomers = ref([])
const clickedCustomerId = ref('')


// Get customers
onMounted(() => {

  getAllCustomers()
  
})

async function getAllCustomers(){
  const querySnapshot = await getDocs(collection(db, 'Customers'))
  querySnapshot.forEach((doc) => {
    const customer = {
      id: doc.id,
      ...doc.data()
    }
    allCustomers.value.push(customer)
  })
}

async function deleteCustomer(){
  // console.log('clickedCustomerId', clickedCustomerId.value)
  await deleteDoc(doc(db, "Customers", clickedCustomerId.value));
  getAllCustomers()
}
</script>

<template>
  <div class="mt-3">
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-body p-4 text-center">
            <h5 class="mb-0">Are you sure?</h5>
            <p class="mb-0">You can always change your mind and add him back from add customer</p>
          </div>
          <div class="modal-footer flex-nowrap p-0">
            <button
              @click="deleteCustomer"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
            >
              <strong>Yes, I'm sure</strong>
            </button>
            <button
              type="button"
              class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
              data-bs-dismiss="modal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>

    <h3 class="mb-3">All Customers</h3>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Avatar</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in allCustomers" :key="customer.id">
          <th class="align-middle">
            <img :src="customer.avatar" class="rounded-circle img-fluid" />
          </th>
          <td class="align-middle">{{ customer.name }}</td>
          <td class="align-middle">{{ customer.email }}</td>
          <td class="align-middle">{{ customer.phone }}</td>
          <td class="align-middle">
            <button class="btn btn-primary me-3" title="Edit Customer">
              <IconEdit />
              <!-- Edit Customer -->
            </button>
            <button
              @click="clickedCustomerId = customer.id;"
              class="btn btn-danger"
              title="Delete Customer"
              data-bs-target="#deleteModal"
              data-bs-toggle="modal"
            >
              <IconDelete />
              <!-- Delete Customer -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="" scoped></style>
