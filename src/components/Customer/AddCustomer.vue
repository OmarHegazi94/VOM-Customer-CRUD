<template>
  <div class="py-5 text-center">
    <img
      class="d-block mx-auto mb-4"
      src="/docs/5.3/assets/brand/bootstrap-logo.svg"
      alt=""
      width="72"
      height="57"
    />
    <h2>Checkout form</h2>
    <p class="lead">
      Below is an example form built entirely with Bootstrap’s form controls. Each required form
      group has a validation state that can be triggered by attempting to submit the form without
      completing it.
    </p>
  </div>
  <div class="row g-5">
    <div class="col-md-12 col-lg-12">
      <h4 class="mb-3">Add new customer</h4>
      <form class="needs-validation" novalidate="">
        <div class="row g-3">
          <div class="col-sm-6">
            <label for="firstName" class="form-label">First name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder=""
              value=""
              required=""
            />
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>

          <div class="col-sm-6">
            <label for="lastName" class="form-label">Last name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder=""
              value=""
              required=""
            />
            <div class="invalid-feedback">Valid last name is required.</div>
          </div>

          <div class="col-12">
            <label for="email" class="form-label"
              >Email <span class="text-body-secondary">(Optional)</span></label
            >
            <input type="email" class="form-control" id="email" placeholder="you@example.com" />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div class="col-12">
            <label for="address2" class="form-label"
              >Address 2 <span class="text-body-secondary">(Optional)</span></label
            >
            <input
              type="text"
              class="form-control"
              id="address2"
              placeholder="Apartment or suite"
            />
          </div>
        </div>

        <hr class="my-4" />

        <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
      </form>
    </div>
  </div>
</template>

<script></script>
<style scoped></style>
