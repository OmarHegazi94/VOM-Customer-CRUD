<script setup>
import { ref } from 'vue'

const invoiceTableData = ref([
  {
    id: 1,
    name: 'منتج 1',
    price: 50,
    quantity: 5,
    subTotal: 180,
    taxRate: 5,
    taxValue: 27,
    total: 207
  },
  {
    id: 2,
    name: 'منتج 2',
    price: 50,
    quantity: 5,
    subTotal: 180,
    taxRate: 5,
    taxValue: 27,
    total: 207
  },
  {
    id: 3,
    name: 'منتج 3',
    price: 50,
    quantity: 5,
    subTotal: 180,
    taxRate: 5,
    taxValue: 27,
    total: 207
  }
])
</script>

<template>
  <div dir="rtl">
    <div class="row my-3 border-bottom">
      <div class="col-lg-6">
        <h1>فاتورة ضريبية</h1>
        <div class="header-info-group d-flex justify-content-between mt-5">
          <div class="header-info-group-serial d-flex flex-column">
            <h4 class="text-center">الرقم التسلسلي</h4>
            <p class="text-center">SME0030</p>
          </div>
          <div class="header-info-group-date d-flex flex-column">
            <h4 class="text-center">التاريخ</h4>
            <p class="text-center">2022,05,31-14:46:32</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-flex justify-content-end">
        <img src="@/assets/images/QR_code.svg" class="invoice-img" alt="صورة لفاتورة ضريبية" />
      </div>
    </div>
    <div class="row my-3">
      <h4 class="mb-5">معلومات البائع</h4>
      <div class="col-lg-3 border-start">
        <h5>سند البائع</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3 border-start">
        <h5>عنوان البائع</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3">
        <h5>رقم تسجيل ضريبة القيمة المضافة للبائع</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3">
        <h5>رقم السجل التجاري</h5>
        <p>SME0030</p>
      </div>
    </div>
    <div class="row my-3">
      <h4 class="mb-5">معلومات المشتري</h4>
      <div class="col-lg-3 border-start">
        <h5>سند المشتري</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3 border-start">
        <h5>عنوان البائع</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3">
        <h5>رقم السجل التجاري</h5>
        <p>SME0030</p>
      </div>
      <div class="col-lg-3">
        <h5>رقم تسجيل ضريبة القيمة المضافة للمشتري</h5>
        <p>SME0030</p>
      </div>
    </div>
    <div class="row my-5">
      <div class="table-responsive">
        <table class="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th scope="col">المنتج</th>
              <th scope="col">سعر الوحدة</th>
              <th scope="col">الكمية</th>
              <th scope="col">المجموع الفرعي بدون ضريبة</th>
              <th scope="col">نسبة الضريبة</th>
              <th scope="col">قيمة الضريبة</th>
              <th scope="col">المجموع شامل ضريبة القيمة المضافة</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoiceTableData" :key="invoice.id">
              <td class="align-middle">{{ invoice.name }}</td>
              <td class="align-middle">{{ invoice.price }}</td>
              <td class="align-middle">{{ invoice.quantity }}</td>
              <td class="align-middle">{{ invoice.subTotal }}</td>
              <td class="align-middle">{{ invoice.taxRate }} %</td>
              <td class="align-middle">{{ invoice.taxValue }}</td>
              <td class="align-middle">{{ invoice.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row my-3">
        <div class="col-lg-6">
            <h3>
                المجموع
            </h3>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
            <h3 class="">
                260
            </h3>
        </div>
    </div>
    <div class="row my-3">
        <div class="col-lg-6">
            <h3>
                ضريبة القيمة المضافة (%15)
            </h3>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
            <h3 class="">
                260
            </h3>
        </div>
    </div>
    <div class="row my-3 border-top pt-3">
        <div class="col-lg-6">
            <h3>
                المجموع مع الضريبة (%15) 
            </h3>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
            <h3 class="fw-bold">
                260
            </h3>
        </div>
    </div>
  </div>
</template>

<style scoped>
.invoice-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
